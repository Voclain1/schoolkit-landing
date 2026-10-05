import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, PLANS, SITE_URL, formatNaira } from "@/lib/brand";
import { FEATURES } from "@/lib/features";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

const TITLE = "SchoolKit Press Kit | Facts, Logos and Media Contact";
const DESCRIPTION =
  "Press kit for SchoolKit, school management software for Nigerian private schools: approved descriptions, key facts, pricing, logos and media contact.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/press" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/press`, type: "website", siteName: BRAND.name },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SHORT_BOILERPLATE = BRAND.oneLiner;

const LONG_BOILERPLATE = `${BRAND.name} is school management software built in ${BRAND.city} for Nigerian private schools. It brings fee collection, result processing and report cards, attendance, parent communication and student records into one platform designed around how Nigerian schools work: payments through Paystack by card, transfer or USSD, receipts and notices delivered on WhatsApp, CA and exam grading, and an offline mode for when the network drops. ${BRAND.name} is free for schools with up to 100 students, with paid plans from ${formatNaira(45000)} per term. Learn more at schoolkit.ng.`;

export default function PressPage() {
  return (
    <div className="feature-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Press", path: "/press" }])) }}
      />

      <section className="feature-hero">
        <div className="wrap">
          <div className="eye">Press kit</div>
          <h1>Writing about SchoolKit?</h1>
          <p className="feature-lede">
            Everything you need in one place: approved descriptions, key facts, pricing and logos. For interviews, demo
            accounts or a school to speak to, email <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
          </p>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">
          <h2>Descriptions you can use</h2>
          <h3>One line</h3>
          <blockquote className="press-quote">{SHORT_BOILERPLATE}</blockquote>
          <h3>One paragraph</h3>
          <blockquote className="press-quote">{LONG_BOILERPLATE}</blockquote>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">
          <h2>Key facts</h2>
          <table className="facts-table">
            <tbody>
              <tr><th scope="row">Name</th><td>{BRAND.name} (one word, capital S and K)</td></tr>
              <tr><th scope="row">Category</th><td>{BRAND.category}</td></tr>
              <tr><th scope="row">Market</th><td>Private nursery, primary and secondary schools in Nigeria</td></tr>
              <tr><th scope="row">Headquarters</th><td>{BRAND.city}, {BRAND.country}</td></tr>
              <tr><th scope="row">Website</th><td><a href={BRAND.url}>schoolkit.ng</a></td></tr>
              <tr><th scope="row">Features</th><td>{FEATURES.map((feature) => feature.name).join(", ")}</td></tr>
              <tr><th scope="row">Product demo</th><td><Link href="/demo">schoolkit.ng/demo</Link></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">
          <h2>Pricing</h2>
          <table className="facts-table">
            <thead>
              <tr><th>Plan</th><th>Price per term</th><th>Students</th></tr>
            </thead>
            <tbody>
              {PLANS.map((plan) => (
                <tr key={plan.name}>
                  <td>{plan.name}</td>
                  <td>{plan.pricePerTerm === null ? "Custom" : formatNaira(plan.pricePerTerm)}</td>
                  <td>{plan.maxStudents === null ? "1,200+" : `Up to ${plan.maxStudents.toLocaleString("en-NG")}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">
          <h2>Logos</h2>
          <div className="press-logos">
            {/* eslint-disable-next-line @next/next/no-img-element -- download asset, shown as-is */}
            <img src="/email-assets/schoolkit-lockup.png" alt="SchoolKit logo on a light background" />
            {/* eslint-disable-next-line @next/next/no-img-element -- download asset, shown as-is */}
            <img src="/email-assets/schoolkit-lockup-dark.png" alt="SchoolKit logo on a dark background" />
          </div>
          <p>
            <a href="/email-assets/schoolkit-lockup.png" download>Download the logo (light)</a> ·{" "}
            <a href="/email-assets/schoolkit-lockup-dark.png" download>Download the logo (dark)</a>
          </p>
        </div>
      </section>

      <section className="feature-final">
        <div className="wrap">
          <h2>Media contact</h2>
          <p>Interviews, demo accounts and introductions to pioneer schools.</p>
          <a href={`mailto:${BRAND.email}?subject=Press%20enquiry`} className="pill">
            {BRAND.email}
          </a>
        </div>
      </section>
    </div>
  );
}
