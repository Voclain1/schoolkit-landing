import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://schoolkit.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
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
