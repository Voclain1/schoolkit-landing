import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURES, getFeatureBySlug } from "@/lib/features";
import { getPostBySlug } from "@/lib/posts";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";
import { serializeJsonLd } from "@/lib/json-ld";

const SITE_URL = "https://schoolkit.ng";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) return {};

  const url = `${SITE_URL}/features/${feature.slug}`;

  return {
    title: feature.seoTitle,
    description: feature.seoDescription,
    keywords: feature.keywords,
    alternates: { canonical: `/features/${feature.slug}` },
    openGraph: {
      title: feature.seoTitle,
      description: feature.seoDescription,
      url,
      type: "website",
      siteName: "SchoolKit",
    },
    twitter: {
      card: "summary_large_image",
      title: feature.seoTitle,
      description: feature.seoDescription,
    },
  };
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);
  if (!feature) notFound();

  const related = feature.relatedPosts
    .map((postSlug) => getPostBySlug(postSlug))
    .filter((post) => post !== undefined);
  const others = FEATURES.filter((f) => f.slug !== feature.slug);

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Features", path: "/features" },
    { name: feature.name, path: `/features/${feature.slug}` },
  ]);
  const faqs = faqJsonLd(feature.faqs);

  return (
    <div className="feature-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqs) }} />

      <section className="feature-hero">
        <div className="wrap">
          <nav className="feature-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link href="/features">Features</Link> <span aria-hidden="true">/</span>{" "}
            <span aria-current="page">{feature.name}</span>
          </nav>
          <div className="eye">{feature.name}</div>
          <h1>{feature.h1}</h1>
          <p className="feature-lede">{feature.lede}</p>
          <div className="feature-actions">
            <Link href="/#join" className="pill">
              Join pioneer schools
            </Link>
            <Link href="/demo" className="text-link">
              Watch the 2-minute demo
            </Link>
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>Sound familiar?</h2>
          <div className="feature-grid feature-grid-3">
            {feature.problems.map((problem) => (
              <div key={problem.title} className="feature-card feature-card-tint">
                <h3>{problem.title}</h3>
                <p>{problem.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>What SchoolKit does</h2>
          <div className="feature-grid">
            {feature.capabilities.map((capability) => (
              <div key={capability.title} className="feature-card">
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>How it works</h2>
          <ol className="feature-steps">
            {feature.steps.map((step, i) => (
              <li key={step.title}>
                <span className="feature-step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="feature-sec">
        <div className="wrap">
          <h2>Frequently asked questions</h2>
          <div className="feature-faqs">
            {feature.faqs.map((faq) => (
              <details key={faq.question} className="feature-faq">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="feature-sec">
          <div className="wrap">
            <h2>Guides for school owners</h2>
            <div className="feature-grid">
              {related.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="feature-card feature-link-card">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="feature-sec">
        <div className="wrap">
          <h2>More of the platform</h2>
          <div className="feature-grid">
            {others.map((other) => (
              <Link key={other.slug} href={`/features/${other.slug}`} className="feature-card feature-link-card">
                <h3>{other.name}</h3>
                <p>{other.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-final">
        <div className="wrap">
          <h2>Be one of our pioneer schools</h2>
          <p>Free for up to 100 students. Full setup support and a direct line to the team.</p>
          <Link href="/#join" className="pill">
            Join the waitlist
          </Link>
        </div>
      </section>
    </div>
  );
}
