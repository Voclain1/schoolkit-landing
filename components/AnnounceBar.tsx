"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "sk-announce-app-dismissed";

export default function AnnounceBar() {
  const [dismissed, setDismissed] = useState(false);

  // Read the stored preference after mount so the server-rendered markup
  // (bar visible) always matches the first client render.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
    } catch {
      /* storage unavailable (private mode) — keep the bar visible */
    }
  }, []);

  // Drives --ann-h, which offsets the fixed header and the page content.
  useEffect(() => {
    document.documentElement.dataset.ann = dismissed ? "off" : "on";
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* nothing to persist to — dismissal lasts for this page view only */
    }
  };

  if (dismissed) return null;

  return (
    <div className="announce" role="region" aria-label="Announcement">
      <p className="announce-txt">
        📱 Mobile app coming soon — <Link href="/#join">join the waitlist</Link> to get early access
      </p>
      <button type="button" className="announce-x" onClick={dismiss} aria-label="Dismiss announcement">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </button>
    </div>
  );
}
