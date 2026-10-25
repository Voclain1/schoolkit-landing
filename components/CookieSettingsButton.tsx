"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/consent";

/** Reopens the cookie banner so a visitor can change their choice. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className ?? "cookie-link"}
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
    >
      Cookie settings
    </button>
  );
}
