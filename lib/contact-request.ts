// The homepage form (formerly the early-access form): an email, an optional
// WhatsApp number, and what the visitor wants. The team is emailed each one;
// the address also joins the same Resend audience the waitlist used.

export const CONTACT_REASONS = [
  { value: "setup", label: "Set up my school", reply: "Thanks. We’ll be in touch shortly to help you set up your school." },
  { value: "call", label: "Book a setup call", reply: "Thanks. We’ll message you to agree a time for your setup call." },
  { value: "enquiry", label: "General enquiry", reply: "Thanks. We’ll reply to your question shortly." },
  { value: "pricing", label: "Pricing question", reply: "Thanks. We’ll get back to you about pricing shortly." },
  { value: "partnership", label: "Partnership or press", reply: "Thanks. The right person on our team will get back to you." },
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number]["value"];

export interface ContactRequest {
  email: string;
  phone: string;
  reason: ContactReason;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s().-]{8,24}$/;

export function contactReasonLabel(reason: ContactReason): string {
  return CONTACT_REASONS.find((r) => r.value === reason)?.label ?? reason;
}

export function contactReply(reason: ContactReason): string {
  return CONTACT_REASONS.find((r) => r.value === reason)?.reply ?? CONTACT_REASONS[0].reply;
}

/** A missing reason reads as "setup", so an old cached page still works. */
export function validateContactRequest(input: unknown): { data?: ContactRequest; error?: string } {
  if (!input || typeof input !== "object") return { error: "Please complete the form and try again." };
  const body = input as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL.test(email)) return { error: "A valid email is required" };
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  if (phone && !PHONE.test(phone)) return { error: "Please enter a valid WhatsApp number, or leave it empty." };
  const rawReason = body.reason === undefined || body.reason === "" ? "setup" : body.reason;
  const reason = CONTACT_REASONS.find((r) => r.value === rawReason)?.value;
  if (!reason) return { error: "Please choose how we can help." };
  return { data: { email, phone, reason } };
}
