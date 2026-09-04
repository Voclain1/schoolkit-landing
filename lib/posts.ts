import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  coverImage: string;
  pinnedRelated?: string[];
  coverWidth?: number;
  coverHeight?: number;
  imageAlt?: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface Post extends PostFrontmatter {
  content: string;
}

function readPostFile(filename: string): Post {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as PostFrontmatter), content };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Related posts for a given post. Any slugs in the post frontmatter's pinnedRelated
 * are placed first, in the order given; remaining slots are filled by tag-overlap
 * score. A pinned slug that matches no post is skipped with a build warning rather
 * than failing the build.
 */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((post) => post.slug !== current.slug);

  const pinned: Post[] = [];
  for (const slug of current.pinnedRelated ?? []) {
    const match = others.find((post) => post.slug === slug);
    if (!match) {
      console.warn(
        `[posts] ${current.slug}: pinnedRelated slug "${slug}" matches no post - skipping`
      );
      continue;
    }
    if (!pinned.some((post) => post.slug === match.slug)) pinned.push(match);
  }

  const pinnedSlugs = new Set(pinned.map((post) => post.slug));
  const scored = others
    .filter((post) => !pinnedSlugs.has(post.slug))
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return [...pinned, ...scored.map(({ post }) => post)].slice(0, limit);
}
