"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const VISIBLE_RATIO = 0.5;
/** The player has to stay on screen this long before it counts as viewed. */
const DWELL_MS = 2000;

/**
 * Fires demo_viewed once the demo player has actually been on screen — a page
 * hit alone is not a view, and the iframe is below the fold on small screens.
 */
export default function DemoViewTracker({
  targetId,
  videoId,
  videoTitle,
}: {
  targetId: string;
  videoId: string;
  videoTitle: string;
}) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || typeof IntersectionObserver === "undefined") return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            timer ??= setTimeout(() => {
              trackEvent("demo_viewed", {
                video_id: videoId,
                video_title: videoTitle,
                placement: "demo-page",
              });
              observer.disconnect();
            }, DWELL_MS);
          } else if (timer) {
            clearTimeout(timer);
            timer = undefined;
          }
        }
      },
      { threshold: VISIBLE_RATIO },
    );

    observer.observe(target);

    return () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [targetId, videoId, videoTitle]);

  return null;
}
