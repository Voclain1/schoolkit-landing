import { NextRequest, NextResponse } from "next/server";
import { getResendClient, WAITLIST_AUDIENCE_ID } from "@/lib/resend";

export const runtime = "nodejs";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { email } = (body ?? {}) as { email?: unknown };

  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }

  try {
    const resend = getResendClient();
    const { error } = await resend.contacts.create({
      audienceId: WAITLIST_AUDIENCE_ID,
      email: email.trim().toLowerCase(),
      unsubscribed: false,
    });

    if (error) {
      console.error("Resend contact create failed:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist signup failed:", err);
    return NextResponse.json({ ok: false, error: "Something went wrong" }, { status: 500 });
  }
}
