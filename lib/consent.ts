// The visitor's cookie choice (app/cookies). Google Analytics and the Meta
// Pixel load only once it is "accepted"; until then nothing optional runs,
// and events are not queued for later either.

export const CONSENT_STORAGE_KEY = "sk-cookie-consent";
/** Fired on window when the choice changes, or to reopen the banner. */
export const CONSENT_EVENT = "sk-cookie-consent";
export const OPEN_SETTINGS_EVENT = "sk-cookie-settings";

export type ConsentChoice = "accepted" | "declined";

/** Reads a stored value; anything unexpected counts as no choice yet. */
export function parseConsent(value: string | null | undefined): ConsentChoice | null {
  return value === "accepted" || value === "declined" ? value : null;
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent() === "accepted";
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage unavailable: the choice lasts for this page view */
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}
