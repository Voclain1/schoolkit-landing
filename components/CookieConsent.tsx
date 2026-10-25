"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";
import {
  CONSENT_EVENT,
  OPEN_SETTINGS_EVENT,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Asks before any optional cookie is set (app/cookies). Google Analytics and
 * the Meta Pixel are rendered only after "Accept"; "Decline" keeps the site
 * exactly as it is. The banner returns from the footer's "Cookie settings".
 */
export default function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [open, setOpen] = useState(false);

  // Read after mount so the server markup (no banner, no trackers) matches
  // the first client render.
  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    setOpen(stored === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (next: ConsentChoice) => {
    const wasAccepted = choice === "accepted";
    writeConsent(next);
    setChoice(next);
    setOpen(false);
    // Scripts already loaded cannot be unloaded; a reload drops them.
    if (wasAccepted && next === "declined") window.location.reload();
  };

  useEffect(() => {
    const sync = (e: Event) => setChoice((e as CustomEvent<ConsentChoice>).detail);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return (
    <>
      <Analytics enabled={choice === "accepted"} />
      {choice === "accepted" && <MetaPixel />}
      {open && (
        <div className="cookie-bar" role="dialog" aria-live="polite" aria-label="Cookie choice">
          <p>
            We use cookies to see which pages help schools find SchoolKit (Google Analytics
            and the Meta Pixel), only if you accept.{" "}
            <Link href="/cookies">Cookie Policy</Link>
          </p>
          <div className="cookie-actions">
            <button type="button" className="cookie-btn cookie-btn-quiet" onClick={() => decide("declined")}>
              Decline
            </button>
            <button type="button" className="cookie-btn" onClick={() => decide("accepted")}>
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
