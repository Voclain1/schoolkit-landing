import { NextRequest, NextResponse } from "next/server";
import { firstNameFromEmail, getResendClient, RESEND_FROM } from "@/lib/resend";
import {
  getWelcomeEmailHtml,
  getWelcomeEmailSubject,
  getWelcomeEmailText,
} from "@/lib/email-templates/welcome";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("RESEND_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing webhook signature headers" }, { status: 400 });
  }

  const payload = await request.text();
  const resend = getResendClient();

  let event;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: { id: svixId, timestamp: svixTimestamp, signature: svixSignature },
      webhookSecret,
    });
  } catch (err) {
    console.error("Resend webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (event.type !== "contact.created") {
    return NextResponse.json({ ok: true, skipped: event.type });
  }

  const { email, first_name } = event.data;
  const firstName = first_name?.trim() || firstNameFromEmail(email);

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: email,
    subject: getWelcomeEmailSubject(),
    html: getWelcomeEmailHtml({ firstName }),
    text: getWelcomeEmailText({ firstName }),
  });

  if (error) {
    console.error("Failed to send welcome email:", error);
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
