import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, SITE_URL } from "@/lib/brand";
import { FEATURES } from "@/lib/features";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

const TITLE = "About SchoolKit | School Management Software Built in Nigeria";
const DESCRIPTION =
  "SchoolKit is school management software built in Lagos for Nigerian private schools: fees, results, attendance and parent communication, designed for how Nigerian schools actually run.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/about`, type: "website", siteName: BRAND.name },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    name: TITLE,
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div className="feature-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "About", path: "/about" }])) }}
      />

      <section className="feature-hero">
        <div className="wrap">
          <div className="eye">About SchoolKit</div>
          <h1>School software built for how Nigerian schools actually run</h1>
          <p className="feature-lede">{BRAND.oneLiner}</p>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">
          <h2>Why SchoolKit exists</h2>
          <p>
            Most Nigerian private schools still run on Excel sheets, receipt books, bank-alert screenshots and WhatsApp
            groups. The software built for them is usually adapted from a UK or Indian product, and it shows: semesters
            instead of terms, card payments instead of transfers, and nothing that works when the network drops.
          </p>
          <p>
            SchoolKit is built from scratch in Lagos for Nigerian schools. Fees are collected through Paystack by card,
            transfer or USSD. Results follow the CA and exam structures Nigerian schools use. Receipts and notices reach
            parents on WhatsApp. And the whole system keeps working offline, then syncs when the connection returns.
          </p>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>What SchoolKit does</h2>
          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <Link key={feature.slug} href={`/features/${feature.slug}`} className="feature-card feature-link-card">
                <h3>{feature.name}</h3>
                <p>{feature.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">
          <h2>At a glance</h2>
          <table className="facts-table">
            <tbody>
              <tr><th scope="row">Product</th><td>{BRAND.category}</td></tr>
              <tr><th scope="row">For</th><td>Private nursery, primary and secondary schools in Nigeria</td></tr>
              <tr><th scope="row">Based in</th><td>{BRAND.city}, {BRAND.country}</td></tr>
              <tr><th scope="row">Pricing</th><td>Free up to 100 students; paid plans from ₦45,000 per term (<Link href="/pricing">see pricing</Link>)</td></tr>
              <tr><th scope="row">Works on</th><td>Any web browser; built to work offline</td></tr>
              <tr><th scope="row">Contact</th><td><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></td></tr>
            </tbody>
          </table>
          <p>
            Writing about SchoolKit? Our <Link href="/press">press kit</Link> has approved descriptions, logos and contact
            details.
          </p>
        </div>
      </section>

      <section className="feature-final">
        <div className="wrap">
          <h2>See it for yourself</h2>
          <p>Watch the 2-minute walkthrough, or start free for up to 100 students.</p>
          <Link href="/demo" className="pill">
            Watch the demo
          </Link>
        </div>
      </section>
    </div>
  );
}
