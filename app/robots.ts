import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/brand";

// AI search and assistant crawlers, named explicitly so the intent is unambiguous:
// SchoolKit wants to be read, cited and recommended by AI answers. Each is already
// covered by the "*" rule; listing them guards against a future blanket disallow
// silently removing the site from AI search.
const AI_CRAWLERS = [
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "GPTBot", // OpenAI training
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended", // Gemini
  "Applebot-Extended",
  "Bingbot", // Bing index, which ChatGPT search and Copilot draw on
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
