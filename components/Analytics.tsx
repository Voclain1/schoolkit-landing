"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import {
  GA_MEASUREMENT_ID,
  trackEvent,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "@/lib/analytics";

/**
 * GA4 for the whole site.
 *
 * Page views are left entirely to GA4 Enhanced Measurement, which is the
 * single source of page_view events: "Page loads" covers the first load and
 * "Page changes based on browser history events" covers App Router client-side
 * navigation. This component sends no page views of its own — doing so would
 * double-count every navigation. Both options must stay enabled on the web
 * data stream; see docs/analytics.md.
 *
 * Custom funnel events still go through lib/analytics.ts, which scrubs them
 * before they reach GA4.
 *
 * The Meta Pixel is unaffected; it lives in components/MetaPixel.tsx and keeps
 * its own PageView tracking.
 */
export default function Analytics() {
  // Bridge for the inline landing scripts in content/landing/, which are plain
  // JS injected into the page and cannot import this module.
  useEffect(() => {
    window.skTrack = (event: AnalyticsEventName, params?: AnalyticsParams) => {
      trackEvent(event, params);
    };
    return () => {
      delete window.skTrack;
    };
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
