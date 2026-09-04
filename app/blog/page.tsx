import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | SchoolKit",
  description:
    "Practical guidance on school fees, AI tutoring, results and running a modern Nigerian school — from the SchoolKit team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | SchoolKit",
    description:
      "Practical guidance on school fees, AI tutoring, results and running a modern Nigerian school — from the SchoolKit team.",
    url: "/blog",
    type: "website",
  },
};

const POSTS_PER_PAGE = 10;

export default function BlogIndexPage() {
  const posts = getAllPosts().slice(0, POSTS_PER_PAGE);

  return (
    <div className="blog-wrap blog-index">
      <Link href="/" className="blog-back">
        ← Back to SchoolKit
      </Link>
      <div className="blog-eye">SchoolKit blog</div>
      <h1>Notes on running a modern Nigerian school</h1>
      <p className="blog-index-lede">
        Fee collection, AI tutoring, results and everything in between — practical
        guidance for owners, teachers and parents.
      </p>

      {posts.length === 0 && <p>No posts yet — check back soon.</p>}

      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
          <Image
            className="blog-card-cover"
            src={post.coverImage}
            alt={post.imageAlt ?? post.title}
            width={post.coverWidth ?? 1200}
            height={post.coverHeight ?? 630}
          />
          <div className="meta">{formatDate(post.date)}</div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
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
