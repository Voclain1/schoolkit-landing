import type { ReactNode } from "react";
import Link from "next/link";

export type LegalSection = {
  /** Anchor id — also the target of the contents list at the top of the page. */
  id: string;
  heading: string;
  body: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  effectiveDate: string;
  sections: LegalSection[];
};

/**
 * Shared shell for /privacy-policy and /terms-of-service. Sections drive both the
 * contents list and the headings, so the two can't drift apart.
 */
export default function LegalPage({
  eyebrow,
  title,
  summary,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <div className="blog-wrap legal-wrap">
      <Link href="/" className="blog-back">
        ← Back to SchoolKit
      </Link>

      <header className="blog-post-header">
        <div className="blog-eye">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="blog-post-meta">{summary}</p>
        <p className="legal-date">Effective {effectiveDate}</p>
      </header>

      <nav className="legal-toc" aria-label="On this page">
        <h2>On this page</h2>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="blog-post-body legal-body">
        {sections.map((section, i) => (
          <section key={section.id} id={section.id}>
            <h2>
              {i + 1}. {section.heading}
            </h2>
            {section.body}
          </section>
        ))}
      </div>

      <div className="legal-foot">
        <p>
          Questions about this document? Email{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a> or message us on{" "}
          <a
            href="https://wa.me/2347049677393"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          .
        </p>
        <p className="legal-cross">
          See also: <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
          <Link href="/terms-of-service">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}
