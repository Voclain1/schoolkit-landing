import type { Metadata } from "next";
import Link from "next/link";
import { BRAND, PLANS, SITE_URL, formatNaira } from "@/lib/brand";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

const TITLE = "School Management Software Pricing in Nigeria | SchoolKit";
const DESCRIPTION =
  "SchoolKit pricing: free for up to 100 students, then from ₦45,000 per term for up to 200 students. Simple per-term plans for Nigerian private schools, no hidden fees.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/pricing`, type: "website", siteName: BRAND.name },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "How much does SchoolKit cost?",
    answer:
      "SchoolKit is free for schools with up to 100 students. Paid plans are billed per term: Starter is ₦45,000 for up to 200 students, Growth is ₦90,000 for up to 600 students and Professional is ₦180,000 for up to 1,200 students. Larger schools get custom Enterprise pricing.",
  },
  {
    question: "Is the Free plan really free?",
    answer:
      "Yes. The Free plan has no time limit. It covers up to 100 students with student records, attendance tracking and basic fee tracking.",
  },
  {
    question: "How much is that per student?",
    answer:
      "On the Starter plan a full 200-student school pays ₦45,000 a term, which is ₦225 per student per term, or ₦675 per student for a three-term year.",
  },
  {
    question: "Is there a discount for paying yearly?",
    answer: "Yes. Paying for the whole year instead of term by term saves 10%.",
  },
  {
    question: "Are there hidden fees?",
    answer:
      "No. The plan price is the price. Online fee payments go through Paystack, which charges its own standard transaction fee on each payment.",
  },
  {
    question: "What happens if our school grows past our plan's limit?",
    answer:
      "You move up to the next plan. Your data, settings and history stay exactly as they are, so there is nothing to re-enter.",
  },
];

export default function PricingPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND.name} school management software`,
    description: BRAND.oneLiner,
    brand: { "@type": "Brand", name: BRAND.name },
    url: `${SITE_URL}/pricing`,
    offers: PLANS.filter((plan) => plan.pricePerTerm !== null).map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: String(plan.pricePerTerm),
      priceCurrency: "NGN",
      url: `${SITE_URL}/pricing`,
      availability: "https://schema.org/InStock",
      description: `Per term, up to ${plan.maxStudents?.toLocaleString("en-NG")} students. ${plan.summary}`,
    })),
  };

  return (
    <div className="feature-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd([{ name: "Pricing", path: "/pricing" }])) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(FAQS)) }} />

      <section className="feature-hero">
        <div className="wrap">
          <div className="eye">Pricing</div>
          <h1>Simple, honest pricing for Nigerian schools</h1>
          <p className="feature-lede">
            Free for up to 100 students. Paid plans are billed per term, sized by the number of students, with no hidden
            fees. Pay yearly and save 10%.
          </p>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`pricing-card${plan.name === "Starter" ? " is-popular" : ""}`}>
                {plan.name === "Starter" && <div className="pricing-badge">Most popular</div>}
                <h2>{plan.name}</h2>
                <div className="pricing-price">
                  {plan.pricePerTerm === null ? "Custom" : formatNaira(plan.pricePerTerm)}
                  {plan.pricePerTerm !== null && <span> / term</span>}
                </div>
                <div className="pricing-size">
                  {plan.maxStudents === null
                    ? "1,200+ students"
                    : `Up to ${plan.maxStudents.toLocaleString("en-NG")} students`}
                </div>
                <p>{plan.summary}</p>
              </div>
            ))}
          </div>
          <div className="feature-actions">
            <Link href="/#join" className="pill">
              Get started free
            </Link>
            <a
              href={`https://wa.me/${BRAND.whatsapp.replace("+", "")}?text=${encodeURIComponent("Hi SchoolKit, I'd like to ask about pricing")}`}
              className="text-link text-link-dark"
              target="_blank"
              rel="noopener noreferrer"
              data-location="pricing"
            >
              Ask about pricing on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>Pioneer offer</h2>
          <div className="feature-card feature-card-tint pricing-offer">
            <p>
              The first 50 schools to onboard keep the Free plan forever and get 2 terms free on any paid plan. Early-access
              schools lock in today&apos;s prices for life. <Link href="/pioneer">See the Pioneer Offer</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>Frequently asked questions</h2>
          <div className="feature-faqs">
            {FAQS.map((faq) => (
              <details key={faq.question} className="feature-faq">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="pricing-more">
            Comparing options? Read{" "}
            <Link href="/blog/school-management-software-pricing-nigeria">
              what Nigerian schools pay for school management software
            </Link>{" "}
            and <Link href="/blog/free-school-management-software-nigeria">what free plans really include</Link>.
          </p>
        </div>
      </section>

      <section className="feature-final">
        <div className="wrap">
          <h2>Start free today</h2>
          <p>Free for up to 100 students. Upgrade only when your school is ready.</p>
          <Link href="/#join" className="pill">
            Get started free
          </Link>
        </div>
      </section>
    </div>
  );
}
