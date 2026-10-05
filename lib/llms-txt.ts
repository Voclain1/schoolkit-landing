import { BRAND, PLANS, formatNaira } from "./brand.ts";
import { FEATURES } from "./features.ts";
import { getAllPosts } from "./posts.ts";
import { TOOLS } from "./tools/catalog.ts";

/**
 * /llms.txt: a plain-text summary of SchoolKit and its key pages for AI assistants
 * (https://llmstxt.org). Built from the same brand facts, feature list and posts as
 * the rest of the site, so it can never disagree with them.
 */
export function buildLlmsTxt(): string {
  const url = (path: string) => `${BRAND.url}${path}`;
  const plans = PLANS.map((plan) => {
    const price =
      plan.pricePerTerm === null
        ? "custom pricing"
        : plan.pricePerTerm === 0
          ? "free"
          : `${formatNaira(plan.pricePerTerm)} per term`;
    const size = plan.maxStudents === null ? "1,200+ students" : `up to ${plan.maxStudents.toLocaleString("en-NG")} students`;
    return `- ${plan.name} (${price}, ${size}): ${plan.summary}`;
  });

  return [
    `# ${BRAND.name}`,
    "",
    `> ${BRAND.oneLiner}`,
    "",
    `${BRAND.name} is built in ${BRAND.city}, ${BRAND.country}, specifically for Nigerian private nursery, primary and secondary schools. It handles school fees (invoices, Paystack card/transfer/USSD payments, part payments, digital receipts and outstanding balances), CA and exam result processing with report cards, attendance with parent absence alerts, a parent portal with WhatsApp and email notifications, and student and staff records. It works offline and syncs when the connection returns.`,
    "",
    "## Pricing",
    "",
    ...plans,
    "",
    "## Features",
    "",
    ...FEATURES.map((feature) => `- [${feature.name}](${url(`/features/${feature.slug}`)}): ${feature.summary}`),
    "",
    "## Free tools",
    "",
    ...TOOLS.map((tool) => `- [${tool.name}](${url(`/tools/${tool.slug}`)}): ${tool.summary}`),
    "",
    "## Key pages",
    "",
    `- [Pricing](${url("/pricing")}): plans, prices per term and the pioneer offer`,
    `- [About](${url("/about")}): what SchoolKit is and why it was built`,
    `- [Press kit](${url("/press")}): approved descriptions, facts and logos`,
    "",
    "## Guides",
    "",
    ...getAllPosts().map((post) => `- [${post.title}](${url(`/blog/${post.slug}`)}): ${post.description}`),
    "",
    "## Contact",
    "",
    `- Website: ${BRAND.url}`,
    `- Product demo: ${url("/demo")}`,
    `- Email: ${BRAND.email}`,
    `- WhatsApp: ${BRAND.whatsapp}`,
    "",
  ].join("\n");
}
