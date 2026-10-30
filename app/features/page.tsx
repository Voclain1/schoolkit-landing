import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { FEATURES } from "@/lib/features";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

const SITE_URL = "https://schoolkit.ng";
const TITLE = "School Management System Features | SchoolKit";
const DESCRIPTION =
  "Fee collection, result processing and report cards, attendance, a parent portal and student records — the features of SchoolKit, the school management system built for Nigerian schools.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/features" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/features`,
    type: "website",
    siteName: "SchoolKit",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function FeaturesPage() {
  const breadcrumbs = breadcrumbJsonLd([{ name: "Features", path: "/features" }]);

  return (
    <div className="feature-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />

      <section className="feature-hero">
        <div className="wrap">
          <div className="eye">Features</div>
          <h1>One school management system for the whole school</h1>
          <p className="feature-lede">
            Everything a Nigerian private school runs on — fees, results, attendance, parents and records — built
            to work together, and to keep working when the network doesn&apos;t.
          </p>
          <div className="feature-actions">
            <a href={BRAND.signupUrl} className="pill">
              Start now
            </a>
            <Link href="/#pricing" className="text-link">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <Link key={feature.slug} href={`/features/${feature.slug}`} className="feature-card feature-link-card">
                <h2>{feature.name}</h2>
                <p>{feature.summary}</p>
                <span className="feature-more">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-final">
        <div className="wrap">
          <h2>Free for schools with up to 100 students</h2>
          <p>Sign up and we&apos;ll help you set up, or tell us what you need first.</p>
          <a href={BRAND.signupUrl} className="pill">
            Sign up your school
          </a>{" "}
          <Link href="/#join" className="text-link">
            Learn more
          </Link>
        </div>
      </section>
    </div>
  );
}
