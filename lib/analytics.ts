/**
 * GA4 analytics contract for the SchoolKit site.
 *
 * Design rules, in order of importance:
 *
 * 1. No personal data ever reaches GA4. Parameters go through an allowlist
 *    (ALLOWED_PARAM_KEYS) and every surviving value is scrubbed for anything
 *    that looks like an email address or a phone number. The waitlist form
 *    collects emails and WhatsApp numbers — none of that belongs in analytics.
 * 2. Conversion events fire *after* the action succeeds, never on intent.
 * 3. Page views are not sent from here at all. GA4 Enhanced Measurement is
 *    their single source — see components/Analytics.tsx and docs/analytics.md.
 *
 * This module deliberately imports nothing from React or Next so it can be
 * unit tested under plain Node (`npm test`).
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

/** The conversion events this site reports. Nothing else should be sent. */
export type AnalyticsEventName =
  | "pilot_application_started"
  | "pilot_application_submitted"
  | "whatsapp_cta_clicked"
  | "demo_viewed"
  | "demo_booking_completed"
  | "school_account_created"
  | "onboarding_completed";

/** Student-count bands, mirroring the pricing tiers on the homepage. */
export type SchoolSizeBand = "1-100" | "101-200" | "201-600" | "601-1200" | "1200+";

export interface AnalyticsParams {
  /** Origin + path of the current page, with only utm_* query params kept. */
  page_location?: string;
  page_path?: string;
  page_title?: string;
  /** CTA placement, from the data-location attribute: "hero", "final-cta", … */
  placement?: string;
  /** Short, non-identifying CTA label. */
  cta_text?: string;
  /** First-touch campaign attribution, from utm_* on the landing URL. */
  campaign_source?: string;
  campaign_medium?: string;
  campaign_name?: string;
  campaign_content?: string;
  /** A band — never the exact student count of an identifiable school. */
  school_size_band?: SchoolSizeBand;
  /** Which waitlist form: "hero" or "footer". */
  form_id?: string;
  video_id?: string;
  video_title?: string;
  /** Percentage of the demo watched, when known. */
  video_percent?: number;
  /** Plan slug from the pricing table, e.g. "starter". */
  plan?: string;
  /** How the action completed, e.g. "whatsapp", "web". */
  method?: string;
  /** Onboarding step count for onboarding_completed. */
  step?: number;
  value?: number;
  currency?: string;
  debug_mode?: boolean;
}

/**
 * Allowlist. Any parameter not named here is dropped before the event leaves
 * the browser, so a future caller cannot leak a field by accident.
 */
const ALLOWED_PARAM_KEYS: ReadonlySet<string> = new Set<keyof AnalyticsParams>([
  "page_location",
  "page_path",
  "page_title",
  "placement",
  "cta_text",
  "campaign_source",
  "campaign_medium",
  "campaign_name",
  "campaign_content",
  "school_size_band",
  "form_id",
  "video_id",
  "video_title",
  "video_percent",
  "plan",
  "method",
  "step",
  "value",
  "currency",
  "debug_mode",
]);

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
/** Loose on purpose: 8+ digits with optional separators covers NG numbers. */
const PHONE_RE = /\+?\d[\d\s().-]{6,}\d/;

const MAX_STRING_LENGTH = 100;

/** True when a string looks like it carries personal data. */
export function looksPersonal(value: string): boolean {
  return EMAIL_RE.test(value) || PHONE_RE.test(value);
}

/**
 * Drops non-allowlisted keys, empty values, and anything resembling an email
 * address or phone number. Only primitives survive — nested objects are where
 * free-form user input tends to hide.
 */
export function sanitizeParams(
  params: Record<string, unknown> = {},
): Record<string, string | number | boolean> {
  const clean: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (!ALLOWED_PARAM_KEYS.has(key)) continue;
    if (value === null || value === undefined || value === "") continue;

    if (typeof value === "string") {
      const trimmed = value.trim().slice(0, MAX_STRING_LENGTH);
      if (!trimmed || looksPersonal(trimmed)) continue;
      clean[key] = trimmed;
    } else if (typeof value === "number") {
      if (Number.isFinite(value)) clean[key] = value;
    } else if (typeof value === "boolean") {
      clean[key] = value;
    }
    // Objects, arrays and functions are intentionally dropped.
  }

  return clean;
}

/** Maps a student count onto the pricing bands. */
export function schoolSizeBand(students: number): SchoolSizeBand | undefined {
  if (!Number.isFinite(students) || students <= 0) return undefined;
  if (students <= 100) return "1-100";
  if (students <= 200) return "101-200";
  if (students <= 600) return "201-600";
  if (students <= 1200) return "601-1200";
  return "1200+";
}

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

/**
 * Rebuilds a URL keeping only the utm_* query parameters, so a stray
 * `?email=` never reaches GA4 as page_location.
 */
export function sanitizeUrl(href: string): string {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return "";
  }
  const kept = new URLSearchParams();
  for (const key of CAMPAIGN_KEYS) {
    const value = url.searchParams.get(key);
    if (value && !looksPersonal(value)) kept.set(key, value.slice(0, MAX_STRING_LENGTH));
  }
  const query = kept.toString();
  return `${url.origin}${url.pathname}${query ? `?${query}` : ""}`;
}

type CampaignParams = Pick<
  AnalyticsParams,
  "campaign_source" | "campaign_medium" | "campaign_name"
  | "campaign_content"
>;

/** Extracts campaign params from a URL. Returns only what is present. */
export function campaignParamsFromUrl(href: string): CampaignParams {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return {};
  }
  const read = (key: string): string | undefined => {
    const value = url.searchParams.get(key)?.trim();
    if (!value || looksPersonal(value)) return undefined;
    return value.slice(0, MAX_STRING_LENGTH);
  };

  const params: CampaignParams = {};
  const source = read("utm_source");
  const medium = read("utm_medium");
  const name = read("utm_campaign");
  const content = read("utm_content");
  if (source) params.campaign_source = source;
  if (medium) params.campaign_medium = medium;
  if (name) params.campaign_name = name;
  if (content) params.campaign_content = content;
  return params;
}

const CAMPAIGN_STORAGE_KEY = "sk_campaign";

/**
 * First-touch campaign attribution: the utm_* values from the first page of
 * the visit, kept for the session so a conversion later on still carries them.
 */
export function getSessionCampaign(): CampaignParams {
  if (typeof window === "undefined") return {};

  const fromUrl = campaignParamsFromUrl(window.location.href);
  if (fromUrl.campaign_source) {
    try {
      sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      /* Private mode or storage disabled — attribution is best effort. */
    }
    return fromUrl;
  }

  try {
    const stored = sessionStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object") return {};
    return sanitizeParams(parsed as Record<string, unknown>) as CampaignParams;
  } catch {
    return {};
  }
}

/** Page context added to every event. Safe on the server (returns {}). */
export function pageContext(): AnalyticsParams {
  if (typeof window === "undefined") return {};
  const context: AnalyticsParams = {
    page_location: sanitizeUrl(window.location.href),
    page_path: window.location.pathname,
  };
  if (document.title) context.page_title = document.title.slice(0, MAX_STRING_LENGTH);
  return context;
}

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["set", Record<string, unknown>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    /** Bridge for the inline landing scripts in content/landing/. */
    skTrack?: (event: AnalyticsEventName, params?: AnalyticsParams) => void;
  }
}

/**
 * Pushes onto the dataLayer directly, which works even before gtag.js has
 * finished loading. gtag.js reads the `arguments` object itself, so this has
 * to push `arguments` rather than an array.
 */
const gtagPush = function (this: void) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  window.dataLayer = window.dataLayer ?? [];
  // gtag.js reads the `arguments` object off the dataLayer; a rest array is
  // not equivalent and would be ignored by the tag.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
} as unknown as (...args: GtagArgs) => void;

/**
 * Sends one of the conversion events. Call it only once the underlying action
 * has actually succeeded.
 */
export function trackEvent(
  event: AnalyticsEventName,
  params: AnalyticsParams = {},
  options: { includePageContext?: boolean } = {},
): void {
  const payload = sanitizeParams({
    ...(options.includePageContext === false ? {} : pageContext()),
    ...getSessionCampaign(),
    ...params,
  });
  gtagPush("event", event, payload);
}
