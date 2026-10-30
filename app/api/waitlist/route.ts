import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getResendClient, RESEND_FROM, WAITLIST_AUDIENCE_ID } from "@/lib/resend";
import { contactReasonLabel, validateContactRequest } from "@/lib/contact-request";
import { isPioneerHoneypot } from "@/lib/pioneer-lead";
import { checkPioneerRateLimit, pioneerClientKey } from "@/lib/pioneer-abuse";

export const runtime = "nodejs";

// The homepage "Get started with SchoolKit" form (it was the early-access
// waitlist; the path is kept so cached pages still post here). The address
// joins the same Resend audience as before, and the team is emailed what the
// visitor wants: set up a school, book a call, a question, pricing, press.

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }
  if (isPioneerHoneypot(body)) return NextResponse.json({ ok: true, ignored: true });

  const parsed = validateContactRequest(body);
  if (!parsed.data) return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  const { email, phone, reason } = parsed.data;

  // The form had no limit before; a limiter that is down must not take it away.
  try {
    const rate = await checkPioneerRateLimit(pioneerClientKey(request.headers));
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfter), "Cache-Control": "no-store" } },
      );
    }
  } catch (error) {
    console.error("Contact form rate limiter unavailable:", error instanceof Error ? error.message : error);
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.contacts.create({ audienceId: WAITLIST_AUDIENCE_ID, email, unsubscribed: false });
    if (error) {
      console.error("Resend contact create failed:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    }

    // The team's copy. A failure here is logged; the visitor's request is
    // already saved as a contact, so it does not fail the form.
    const rows = [["Wants", contactReasonLabel(reason)], ["Email", email], ["WhatsApp", phone || "—"]];
    const html = `<h1>New request from schoolkit.ng</h1><table>${rows.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table>`;
    const idempotencyKey = `contact-${createHash("sha256").update(`${email}|${reason}|${new Date().toISOString().slice(0, 13)}`).digest("hex").slice(0, 32)}`;
    try {
      const sent = await resend.emails.send(
        { from: RESEND_FROM, to: [process.env.PIONEER_LEADS_TO ?? "hello@schoolkit.ng"], replyTo: email, subject: `${contactReasonLabel(reason)}: ${email}`, html },
        { idempotencyKey },
      );
      if (sent.error) console.error("Contact form team email failed:", sent.error);
    } catch (err) {
      console.error("Contact form team email failed:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
