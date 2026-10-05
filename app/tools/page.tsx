import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/brand";
import { TOOLS } from "@/lib/tools/catalog";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

const TITLE = "Free Tools for Nigerian Schools | SchoolKit";
const DESCRIPTION =
  "Free calculators for teachers, bursars and school owners in Nigeria: student result calculator and school fees calculator. No sign-up needed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/tools`, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ToolsPage() {
  return (
    <div className="feature-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Free tools", path: "/tools" }])) }}
      />
      <section className="feature-hero">
        <div className="wrap">
          <div className="eye">Free tools</div>
          <h1>Free tools for Nigerian schools</h1>
          <p className="feature-lede">Quick calculators for teachers, bursars and school owners. Free, no sign-up, and nothing you type leaves your browser.</p>
        </div>
      </section>
      <section className="feature-sec">
        <div className="wrap">
          <div className="feature-grid">
            {TOOLS.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="feature-card feature-link-card">
                <h2>{tool.name}</h2>
                <p>{tool.summary}</p>
                <span className="feature-more">Open the tool →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="feature-final">
        <div className="wrap">
          <h2>Want it all done automatically?</h2>
          <p>SchoolKit runs fees, results and attendance for the whole school. Free for up to 100 students.</p>
          <Link href="/features" className="pill">
            Explore SchoolKit
          </Link>
        </div>
      </section>
    </div>
  );
}
