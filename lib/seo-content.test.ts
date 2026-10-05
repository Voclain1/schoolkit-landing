import assert from "node:assert/strict";
import test from "node:test";
import { FEATURES, getFeatureForTags } from "./features.ts";
import { getAllPosts } from "./posts.ts";
import { getHomepageBodyHtml, getHomepageFaqs, parseFaqs } from "./landing.ts";
import { PLANS, formatNaira } from "./brand.ts";
import { buildLlmsTxt } from "./llms-txt.ts";
import { TOOLS } from "./tools/catalog.ts";

const postSlugs = new Set(getAllPosts().map((post) => post.slug));

test("feature slugs are unique", () => {
  const slugs = FEATURES.map((feature) => feature.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("every feature links only to blog posts that exist", () => {
  for (const feature of FEATURES) {
    for (const slug of feature.relatedPosts) {
      assert.ok(postSlugs.has(slug), `${feature.slug} links to missing post "${slug}"`);
    }
  }
});

test("every feature has the SEO fields search results need", () => {
  for (const feature of FEATURES) {
    assert.ok(feature.seoTitle.length <= 65, `${feature.slug}: seoTitle is ${feature.seoTitle.length} chars`);
    assert.ok(
      feature.seoDescription.length <= 170,
      `${feature.slug}: seoDescription is ${feature.seoDescription.length} chars`
    );
    assert.ok(feature.keywords.length > 0);
    assert.ok(feature.faqs.length > 0);
  }
});

test("internal /blog, /features and /tools links in posts point at real pages", () => {
  const featureSlugs = new Set(FEATURES.map((feature) => feature.slug));
  const toolSlugs = new Set(TOOLS.map((tool) => tool.slug));
  for (const post of getAllPosts()) {
    for (const [, kind, slug] of post.content.matchAll(/\]\(\/(blog|features|tools)\/([a-z0-9-]+)\)/g)) {
      const known = kind === "blog" ? postSlugs.has(slug) : kind === "tools" ? toolSlugs.has(slug) : featureSlugs.has(slug);
      assert.ok(known, `${post.slug} links to missing /${kind}/${slug}`);
    }
    for (const slug of post.pinnedRelated ?? []) {
      assert.ok(postSlugs.has(slug), `${post.slug} pins missing post "${slug}"`);
    }
  }
});

test("blog posts map to the feature page that matches their topic", () => {
  assert.equal(getFeatureForTags(["fees", "payments"])?.slug, "school-fees-management-software");
  assert.equal(getFeatureForTags(["school-management", "results"])?.slug, "result-management-software");
  assert.equal(getFeatureForTags(["unrelated"]), undefined);
});

test("homepage FAQ structured data is read from the visible FAQ", () => {
  const faqs = getHomepageFaqs();
  assert.ok(faqs.length >= 5);
  assert.equal(faqs[0].question, "How do I collect school fees online in Nigeria?");
  for (const faq of faqs) assert.ok(!/[<>]/.test(faq.answer));
});

test("parseFaqs strips markup and collapses whitespace", () => {
  const html = `<details class="faq-item">\n  <summary>Fees &amp; results?</summary>\n  <p>Yes —\n    <strong>both</strong>.</p>\n</details>`;
  assert.deepEqual(parseFaqs(html), [{ question: "Fees & results?", answer: "Yes — both." }]);
});

test("published plan prices match the homepage pricing table", () => {
  const html = getHomepageBodyHtml();
  for (const plan of PLANS) {
    if (!plan.pricePerTerm) continue;
    assert.ok(html.includes(formatNaira(plan.pricePerTerm)), `homepage does not show ${plan.name} at ${formatNaira(plan.pricePerTerm)}`);
  }
});

test("llms.txt lists every feature, tool and post", () => {
  const text = buildLlmsTxt();
  for (const feature of FEATURES) assert.ok(text.includes(`/features/${feature.slug}`));
  for (const tool of TOOLS) assert.ok(text.includes(`/tools/${tool.slug}`));
  for (const slug of postSlugs) assert.ok(text.includes(`/blog/${slug}`));
});
