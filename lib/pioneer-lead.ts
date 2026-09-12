export const ROLES = ["Proprietor/Owner", "Director", "Principal", "Administrator", "Bursar/Accountant", "Other"] as const;
export const SCHOOL_SIZES = ["1-100", "101-200", "201-600", "601-1200", "1200+"] as const;
export const SCHOOL_LEVELS = ["Nursery", "Primary", "Junior Secondary", "Senior Secondary"] as const;
export const CURRENT_METHODS = ["Paper records", "Excel/Google Sheets", "Existing school software", "A mixture"] as const;
export const CHALLENGES = ["Fees", "Results/report cards", "Attendance", "Student records", "Parent communication", "Staff/class management", "Other"] as const;

export interface PioneerLead {
  schoolName: string;
  city: string;
  state: string;
  name: string;
  role: (typeof ROLES)[number];
  email: string;
  whatsapp: string;
  schoolSizeBand: (typeof SCHOOL_SIZES)[number];
  schoolLevels: (typeof SCHOOL_LEVELS)[number][];
  currentMethod: (typeof CURRENT_METHODS)[number];
  biggestChallenge: (typeof CHALLENGES)[number];
  preferredStart: string;
  consent: true;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

export function isPioneerHoneypot(input: unknown): boolean {
  return !!input && typeof input === "object" && typeof (input as Record<string, unknown>).website === "string" && (input as Record<string, string>).website.trim().length > 0;
}

export function isConfirmedPioneerSubmission(result: unknown): boolean {
  if (!result || typeof result !== "object") return false;
  const response = result as { ok?: unknown; ignored?: unknown };
  return response.ok === true && response.ignored !== true;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s().-]{8,24}$/;
const UTM = /^[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]{1,100}$/;
const clean = (value: unknown, max = 160) => typeof value === "string" ? value.trim().slice(0, max) : "";
const member = <T extends readonly string[]>(value: unknown, values: T): value is T[number] =>
  typeof value === "string" && values.includes(value);

export function validatePioneerLead(input: unknown): { data?: PioneerLead; errors?: Record<string, string> } {
  if (!input || typeof input !== "object") return { errors: { form: "Please complete the form and try again." } };
  const body = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const required = ["schoolName", "city", "state", "name", "email", "whatsapp", "preferredStart"] as const;
  for (const key of required) if (!clean(body[key])) errors[key] = "This field is required.";
  if (clean(body.email) && !EMAIL.test(clean(body.email))) errors.email = "Enter a valid work email.";
  if (clean(body.whatsapp) && !PHONE.test(clean(body.whatsapp))) errors.whatsapp = "Enter a valid WhatsApp number.";
  if (!member(body.role, ROLES)) errors.role = "Choose your role.";
  if (!member(body.schoolSizeBand, SCHOOL_SIZES)) errors.schoolSizeBand = "Choose a student population.";
  if (!member(body.currentMethod, CURRENT_METHODS)) errors.currentMethod = "Choose your current method.";
  if (!member(body.biggestChallenge, CHALLENGES)) errors.biggestChallenge = "Choose your biggest challenge.";
  const levels = Array.isArray(body.schoolLevels) ? body.schoolLevels.filter((v): v is PioneerLead["schoolLevels"][number] => member(v, SCHOOL_LEVELS)) : [];
  if (!levels.length) errors.schoolLevels = "Choose at least one school level.";
  if (body.consent !== true) errors.consent = "Consent is required so our team can contact you.";
  if (Object.keys(errors).length) return { errors };
  const utm = (key: string) => { const value = clean(body[key], 100); return value && UTM.test(value) ? value : undefined; };
  return { data: {
    schoolName: clean(body.schoolName), city: clean(body.city), state: clean(body.state), name: clean(body.name),
    role: body.role as PioneerLead["role"], email: clean(body.email).toLowerCase(), whatsapp: clean(body.whatsapp),
    schoolSizeBand: body.schoolSizeBand as PioneerLead["schoolSizeBand"], schoolLevels: levels,
    currentMethod: body.currentMethod as PioneerLead["currentMethod"], biggestChallenge: body.biggestChallenge as PioneerLead["biggestChallenge"],
    preferredStart: clean(body.preferredStart), consent: true,
    utmSource: utm("utmSource"), utmMedium: utm("utmMedium"), utmCampaign: utm("utmCampaign"), utmContent: utm("utmContent"),
  } };
}
