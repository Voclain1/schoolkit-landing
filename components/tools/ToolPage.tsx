import Link from "next/link";
import type { ReactNode } from "react";
import { BRAND, SITE_URL } from "@/lib/brand";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

interface ToolPageProps {
  slug: string;
  name: string;
  h1: string;
  lede: string;
  description: string;
  faqs: Array<{ question: string; answer: string }>;
  /** The calculator itself. */
  tool: ReactNode;
  /** Explanatory content under the tool. */
  children: ReactNode;
  cta: { title: string; body: string; href: string };
}

/** Shared frame for a free tool: hero, the tool, the explainer, FAQ and a product CTA. */
export default function ToolPage({ slug, name, h1, lede, description, faqs, tool, children, cta }: ToolPageProps) {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${SITE_URL}/tools/${slug}`,
    description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any (runs in the browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  const crumbs = breadcrumbJsonLd([
    { name: "Free tools", path: "/tools" },
    { name, path: `/tools/${slug}` },
  ]);

  return (
    <div className="feature-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd(faqs)) }} />

      <section className="feature-hero tool-hero">
        <div className="wrap">
          <nav className="feature-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/tools">Free tools</Link>{" "}
            <span aria-hidden="true">/</span> <span aria-current="page">{name}</span>
          </nav>
          <div className="eye">Free tool · by {BRAND.name}</div>
          <h1>{h1}</h1>
          <p className="feature-lede">{lede}</p>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">{tool}</div>
      </section>

      <section className="feature-sec">
        <div className="wrap feature-prose">{children}</div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>Frequently asked questions</h2>
          <div className="feature-faqs">
            {faqs.map((faq) => (
              <details key={faq.question} className="feature-faq">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-final">
        <div className="wrap">
          <h2>{cta.title}</h2>
          <p>{cta.body}</p>
          <Link href={cta.href} className="pill">
            See how it works
          </Link>
        </div>
      </section>
    </div>
  );
}
