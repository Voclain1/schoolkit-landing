import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://schoolkit.ng";

// Hosted on YouTube; embedded through youtube-nocookie.com so no tracking
// cookies are set until the visitor actually plays the video.
const VIDEO_ID = "14Ie5eFYbzY";
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`;

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
        <iframe
          src={EMBED_SRC}
          title="SchoolKit product demo"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
    </div>
  );
}
