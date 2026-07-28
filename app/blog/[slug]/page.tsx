import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";

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
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
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

  return (
    <div className="blog-wrap">
      <Link href="/blog" className="blog-back">
        ← Back to blog
      </Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="blog-post-header">
          <div className="blog-eye">
            {post.tags[0] ?? "SchoolKit"} · {formatDate(post.date)}
          </div>
          <h1>{post.title}</h1>
          <p className="blog-post-meta">{post.description}</p>
        </header>

        <Image
          className="blog-cover"
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          priority
        />

        <div className="blog-post-body">
          <MDXRemote source={post.content} />
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
