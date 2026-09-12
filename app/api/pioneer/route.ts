import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getResendClient, RESEND_FROM } from "@/lib/resend";
import { isPioneerHoneypot, validatePioneerLead } from "@/lib/pioneer-lead";
import { checkPioneerRateLimit, DistributedRateLimitError, pioneerClientKey } from "@/lib/pioneer-abuse";

export const runtime = "nodejs";

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) return NextResponse.json({ ok: false, error: "Request is too large." }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 }); }
  if (isPioneerHoneypot(body)) return NextResponse.json({ ok: true, ignored: true });
  const parsed = validatePioneerLead(body);
  if (!parsed.data) return NextResponse.json({ ok: false, error: "Please correct the highlighted fields.", errors: parsed.errors }, { status: 400 });

  try {
    const rate = await checkPioneerRateLimit(pioneerClientKey(request.headers));
    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": String(rate.retryAfter), "Cache-Control": "no-store" } },
      );
    }
  } catch (error) {
    if (error instanceof DistributedRateLimitError) console.error("Pioneer rate limiter failed:", error.message);
    else console.error("Pioneer rate limiter failed:", error);
    return NextResponse.json(
      { ok: false, error: "Lead submission is temporarily unavailable. Please try again shortly." },
      { status: 503, headers: { "Retry-After": "60", "Cache-Control": "no-store" } },
    );
  }

  const lead = parsed.data;
  const rows = [
    ["School", lead.schoolName], ["Town/city", lead.city], ["State", lead.state], ["Contact", lead.name], ["Role", lead.role],
    ["Work email", lead.email], ["WhatsApp", lead.whatsapp], ["Student population", lead.schoolSizeBand],
    ["School levels", lead.schoolLevels.join(", ")], ["Current method", lead.currentMethod], ["Biggest challenge", lead.biggestChallenge],
    ["Preferred time to begin", lead.preferredStart], ["UTM source", lead.utmSource ?? "—"], ["UTM medium", lead.utmMedium ?? "—"],
    ["UTM campaign", lead.utmCampaign ?? "—"], ["UTM content", lead.utmContent ?? "—"],
  ];
  const html = `<h1>New SchoolKit Pioneer lead</h1><table>${rows.map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table><p>Consent recorded: yes.</p>`;
  const idempotencyKey = `pioneer-${createHash("sha256").update(`${lead.email}|${lead.schoolName}|${lead.whatsapp}`).digest("hex").slice(0, 32)}`;
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({ from: RESEND_FROM, to: [process.env.PIONEER_LEADS_TO ?? "hello@schoolkit.ng"], replyTo: lead.email, subject: `Pioneer setup: ${lead.schoolName}`, html }, { idempotencyKey });
    if (error) { console.error("Pioneer lead persistence failed:", error); return NextResponse.json({ ok: false, error: "We could not save your details. Please try again." }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Pioneer lead persistence failed:", error);
    return NextResponse.json({ ok: false, error: "We could not save your details. Please try again." }, { status: 500 });
  }
}
