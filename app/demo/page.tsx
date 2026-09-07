import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://schoolkit.ng";

// The hosted demo recording. Set NEXT_PUBLIC_DEMO_VIDEO_URL (and optionally a
// poster frame) at build time; the fallback is the file served from /public.
const VIDEO_SRC = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? "/videos/schoolkit-demo.mp4";
const VIDEO_POSTER = process.env.NEXT_PUBLIC_DEMO_VIDEO_POSTER;

const BENEFITS = [
  "Manage school fees",
  "Record attendance",
  "Prepare and release results",
  "Keep student and parent records organised",
];

const TITLE = "SchoolKit Demo — See How SchoolKit Works";
const DESCRIPTION =
  "Watch a short demo of SchoolKit: how a Nigerian school manages fees, attendance, results and student records in one place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/demo` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/demo`,
    type: "website",
    siteName: "SchoolKit",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Fires once, through the site-wide trackEvent hook installed by site-script.js.
const playTrackingScript = `
(function () {
    var v = document.getElementById('demoVideo');
    if (!v) return;
    v.addEventListener('play', function () {
        if (typeof window.trackEvent === 'function') {
            window.trackEvent('demo_video_play', { location: 'demo-page' });
        }
    }, { once: true });
})();
`;

export default function DemoPage() {
  return (
    <div className="demo-wrap">
      <header className="demo-head">
        <h1>See how SchoolKit works</h1>
        <p>
          This short video shows how a Nigerian school can run everyday operations — fees,
          attendance, results and records — with SchoolKit.
        </p>
      </header>

      <div className="demo-video">
        <video
          id="demoVideo"
          controls
          playsInline
          preload="metadata"
          poster={VIDEO_POSTER}
          src={VIDEO_SRC}
        >
          Your browser does not support embedded video.{" "}
          <a href={VIDEO_SRC}>Download the SchoolKit demo video</a>.
        </video>
      </div>

      <ul className="demo-benefits">
        {BENEFITS.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>

      <div className="demo-cta">
        <Link href="/#join" className="pill" data-location="demo-page">
          Get SchoolKit for Your School
        </Link>
      </div>

      <script dangerouslySetInnerHTML={{ __html: playTrackingScript }} />
    </div>
  );
}
