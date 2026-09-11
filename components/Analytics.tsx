"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  GA_MEASUREMENT_ID,
  shouldSendPageView,
  trackEvent,
  trackPageView,
  type AnalyticsEventName,
  type AnalyticsParams,
} from "@/lib/analytics";

/**
 * GA4 for the whole site.
 *
 * Page views are counted exactly once per navigation:
 *
 *  - First load: the Google tag's own `config` call sends page_view.
 *  - After that: the inline script below re-configures the tag with
 *    send_page_view:false, which stops it emitting page views of its own for
 *    history changes, and the effect sends one page_view per pathname change.
 *
 * The inline script is a sibling of <GoogleAnalytics> rather than an effect
 * because next/script runs afterInteractive scripts in render order, which
 * guarantees it lands after the tag's initial config — an effect could run
 * first and be overwritten by it.
 *
 * The Meta Pixel is unaffected; it lives in components/MetaPixel.tsx and keeps
 * its own PageView tracking.
 */
export default function Analytics() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // First-render guard: the pathname this component first sees was already
    // counted by the tag's initial config, so only later client-side
    // navigations are sent. The ref survives Strict Mode's double effect.
    const send = shouldSendPageView(lastPath.current, pathname);
    lastPath.current = pathname;
    if (send) trackPageView();
  }, [pathname]);

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

  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <Script id="ga-spa-pageviews" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:false});`}
      </Script>
    </>
  );
}
