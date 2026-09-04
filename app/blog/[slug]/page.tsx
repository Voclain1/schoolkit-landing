import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts, getReadingTime } from "@/lib/posts";
import BlogTableOfContents, { type TableOfContentsItem } from "@/components/BlogTableOfContents";

const SITE_URL = "https://schoolkit.ng";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          alt: post.imageAlt ?? post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const readingTime = getReadingTime(post.content);
  const tableOfContents = getTableOfContents(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Organization",
      name: "SchoolKit",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "SchoolKit",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const faqJsonLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : undefined;

  return (
    <div className="blog-wrap">
      <Link href="/blog" className="blog-back">
        ← Back to blog
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
        />
      )}

      <article>
        <header className="blog-post-header">
          <div className="blog-eye">
            {post.tags[0] ?? "SchoolKit"} · {formatDate(post.date)} · {readingTime} min read
          </div>
          <h1>{post.title}</h1>
          <p className="blog-post-meta">{post.description}</p>
        </header>

        <Image
          className="blog-cover"
          src={post.coverImage}
          alt={post.imageAlt ?? post.title}
          width={post.coverWidth ?? 1200}
          height={post.coverHeight ?? 630}
          priority
        />

        {["school-management-software-pricing-nigeria", "best-school-fees-management-software-nigeria", "best-school-result-management-software-nigeria", "how-to-automate-school-fee-collection-nigeria"].includes(post.slug) && (
          <BlogTableOfContents items={tableOfContents} />
        )}

        <div className="blog-post-body">
          <MDXRemote
            source={post.content}
            components={{
              h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
              h3: ({ children }) => <h3 id={headingId(children)}>{children}</h3>,
            }}
          />
        </div>

        <div className="blog-cta">
          <h3>Be one of our pioneer schools</h3>
          <p>Join the SchoolKit early-access waitlist — full setup support, a direct line to the team.</p>
          <Link href="/#join" className="pill">
            Join the waitlist
          </Link>
        </div>

        {related.length > 0 && (
          <div className="blog-related">
            <h3>Related reading</h3>
            <div className="blog-related-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-related-card">
                  <div className="meta">{formatDate(r.date)}</div>
                  <h4>{r.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

/**
 * Serializes structured data for an inline <script> tag. Escapes "</" so a post's
 * own content — an FAQ answer mentioning "</script>", say — cannot close the tag
 * early and break page parsing. The escaped form is still valid JSON, so parsers
 * are unaffected.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/<\//g, "<\\/");
}

function getTableOfContents(content: string): TableOfContentsItem[] {
  return content
    .split("\n")
    .map((line) => line.match(/^(##)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      id: slugifyHeading(match[2]),
      label: match[2].replace(/[*_`]/g, ""),
      level: match[1].length as 2 | 3,
    }));
}

function headingId(children: React.ReactNode): string {
  return slugifyHeading(plainText(children));
}

function plainText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return plainText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
