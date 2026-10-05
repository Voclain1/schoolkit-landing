import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";
import { FEATURES } from "@/lib/features";
import { getAllPosts } from "@/lib/posts";
import { TOOLS } from "@/lib/tools/catalog";

/**
 * When each hand-maintained page last changed in substance. Update the date in the
 * same commit as the change: a lastModified that is always "today" teaches search
 * engines to ignore it, while an honest one gets changed pages recrawled sooner.
 */
const PAGES: Array<{ path: string; updated: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = [
  { path: "", updated: "2026-10-05", priority: 1, changeFrequency: "weekly" },
  { path: "/features", updated: "2026-10-05", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pricing", updated: "2026-10-05", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pioneer", updated: "2026-09-12", priority: 0.8, changeFrequency: "weekly" },
  { path: "/tools", updated: "2026-10-05", priority: 0.7, changeFrequency: "monthly" },
  { path: "/demo", updated: "2026-09-11", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", updated: "2026-10-05", priority: 0.6, changeFrequency: "monthly" },
  { path: "/press", updated: "2026-10-05", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy-policy", updated: "2026-08-16", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", updated: "2026-08-16", priority: 0.3, changeFrequency: "yearly" },
];

const FEATURES_UPDATED = "2026-10-05";
const TOOLS_UPDATED = "2026-10-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPost = posts.map((post) => post.updatedAt ?? post.date).sort().at(-1);

  return [
    ...PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: page.updated,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...FEATURES.map((feature) => ({
      url: `${SITE_URL}/features/${feature.slug}`,
      lastModified: FEATURES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...TOOLS.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: TOOLS_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: newestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
