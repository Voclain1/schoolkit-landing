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
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
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

export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((post) => post.slug !== current.slug);
  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ post }) => post);
}
