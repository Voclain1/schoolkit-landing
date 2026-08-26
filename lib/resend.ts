import { Resend } from "resend";

let client: Resend | null = null;

export function getResendClient(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    client = new Resend(apiKey);
  }
  return client;
}

export const RESEND_FROM = "SchoolKit <hello@schoolkit.ng>";

/** Derives a friendly first name from an email's local part, e.g. "arinze.voclain@x.com" -> "Arinze". */
export function firstNameFromEmail(email: string): string {
  const local = email.split("@")[0] || "";
  const cleaned = local.replace(/[.\-_0-9]+/g, " ").trim();
  const first = cleaned.split(" ")[0];
  if (!first) return "there";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

/** The "early access" audience — every waitlist signup must land here so broadcasts can reach them. */
export const WAITLIST_AUDIENCE_ID = "93428f81-01f9-42c2-b031-0aed20b410a7";
