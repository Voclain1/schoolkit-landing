/**
 * Brand facts: the single source for how SchoolKit describes itself.
 *
 * AI assistants decide whether to recommend a product partly by checking that
 * independent sources agree about it. Every place the brand is described — this
 * site's structured data, /llms.txt, directory listings, press kits, social bios —
 * should copy these exact facts, so there is one consistent story to corroborate.
 * docs/brand-fact-sheet.md is the human-readable copy for external profiles; keep
 * the two in step.
 */

export const SITE_URL = "https://schoolkit.ng";

export const BRAND = {
  name: "SchoolKit",
  url: SITE_URL,
  appUrl: "https://app.schoolkit.ng",
  /** The one-line description to reuse verbatim everywhere. */
  oneLiner:
    "SchoolKit is school management software for Nigerian private schools: fee collection via Paystack, results and report cards, attendance and a parent portal, built to work offline.",
  category: "School management software",
  country: "Nigeria",
  city: "Lagos",
  email: "hello@schoolkit.ng",
  whatsapp: "+2347049677393",
  /**
   * Official profiles on other sites, for Organization.sameAs. Add each one here as
   * soon as it is claimed (LinkedIn, Crunchbase, Capterra, G2, YouTube, ...).
   */
  sameAs: [] as string[],
} as const;

export interface Plan {
  name: string;
  /** Price per term in naira; null when quoted per school. */
  pricePerTerm: number | null;
  maxStudents: number | null;
  summary: string;
}

/** Published plans. Mirrors the pricing section of the homepage. */
export const PLANS: Plan[] = [
  {
    name: "Free",
    pricePerTerm: 0,
    maxStudents: 100,
    summary:
      "Student records, attendance tracking, basic fee tracking and fee collection via Paystack. Pioneer schools also get parent communication free.",
  },
  {
    name: "Starter",
    pricePerTerm: 45000,
    maxStudents: 200,
    summary:
      "Everything in Free, plus instant digital receipts, report cards, parent communication, staff management, a finance dashboard and offline mode.",
  },
  {
    name: "Growth",
    pricePerTerm: 90000,
    maxStudents: 600,
    summary:
      "Everything in Starter, plus priority support, an advanced finance dashboard, bulk operations and multi-class management.",
  },
  {
    name: "Professional",
    pricePerTerm: 180000,
    maxStudents: 1200,
    summary:
      "Everything in Growth, plus a dedicated account manager, custom report card templates, advanced analytics and API access.",
  },
  {
    name: "Enterprise",
    pricePerTerm: null,
    maxStudents: null,
    summary:
      "For schools above 1,200 students: everything in Professional, plus a white-label option, custom integrations, an SLA and onboarding support.",
  },
];

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
