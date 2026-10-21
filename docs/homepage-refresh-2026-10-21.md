# Homepage and content refresh — 21 October 2026

The homepage now presents SchoolKit as a live product. Its visual direction follows the supplied references: large, short headlines; a highlighted phrase; warm backgrounds; a product illustration; clear actions; and readable mobile sections. SchoolKit keeps its own green and cream identity.

The product illustration is original HTML/CSS and is explicitly labelled as sample data. It is not presented as a screenshot or customer performance evidence.

## Copy and product evidence

The source repository’s October announcements describe features that the previous homepage and brand sheet still marked as planned:

- [October product and plan update](https://github.com/Voclain1/schoolkit-landing/blob/master/emails/broadcasts/platform-update-2026-10.html): result PINs, question banks and exam-paper exports, report cards, homework and absence alerts. Paystack collection and receipts are included on Free.
- [October operations update](https://github.com/Voclain1/schoolkit-landing/blob/master/emails/broadcasts/platform-update-2026-10b.html): admissions, ID cards, store stock, private parent messages, homework submissions, boarding, transport, library, sickbay and exports.

Removed from the homepage: the past September resumption date; a waitlist as the main action; lifetime promotional language; a fixed pioneer-school count; unsupported monetary-loss statistics; unverified testimonial quotations; and the claim that every function works offline.

Calls to action now lead to the live app or a school walkthrough on WhatsApp. Old `#join` and `#waitlist` inbound anchors remain valid. No existing lead API was changed.

Pricing retains the published termly plans in `lib/brand.ts`. The annual toggle now displays three terms less 10%: Starter ₦121,500, Growth ₦243,000, Professional ₦486,000. Free lists Paystack and receipts in line with the plan update. The homepage asks schools to confirm the plan for newer operations rather than inventing their entitlements.

## Four new articles

| Article | Specific purchase decision |
|---|---|
| School Management Software for Small Schools in Nigeria | What to pay for at a small school; total cost; testing real bursary and report-card work |
| Online Admission Software for Nigerian Private Schools | Whether forms, document review, offers and admission connect properly |
| School Inventory Software in Nigeria | Whether uniform sizes, book sales, stock counts and student charges reconcile |
| Offline School Management Software in Nigeria | Which tasks survive an outage and how pending work syncs |

Each article has a worked school scenario, a comparison/checklist table, relevant internal links, visible FAQs and matching FAQ metadata, a clear next step, and an original local SVG cover. The existing blog loader automatically includes them in the blog, static routes, sitemap and `llms.txt`.

## Keyword research: evidence and limits

Market: Nigeria; language: English. Ubersuggest `location_suggest` returned location **2566**. Authentication succeeded. Seeds: `school management software`, `school admission software`, `school inventory software`.

The usual opportunity score would favour demand and purchase intent while accounting for ranking difficulty. That calculation is not defensible for this shortlist because reliable exact-query metrics are mostly unavailable. The editorial priorities below therefore use **specificity of the buying decision, product relevance and lack of overlap with existing posts**, not a claimed traffic forecast.

| Evidence | Tool result | Interpretation |
|---|---|---|
| `school management software` | Suggestions response: volume 140, SD 44, CPC USD 1.12 | Broad Nigerian seed; not the target or forecast for a new article. The tool’s metric timestamp predates this research. |
| `school management software for small schools` | Overview: volume 0, SD 4, CPC 0 | No measured demand in this dataset. Also present in Google suggestions, which is an interest signal without volume. |
| `school admission management software` | Overview: volume 0, SD 4, CPC 0 | No measured demand in this dataset. Variants including `school admission form software` and `software for school admission` appeared in autocomplete. |
| `school management software offline` | Present in autocomplete; detailed metric lookup failed | Relevant modifier with unverified Nigerian demand and difficulty. |
| Inventory-related exact queries | Detailed lookups failed | Product-led commercial topic; demand remains unvalidated. |

The first expansion returned many irrelevant geographic and source-code queries. Those were excluded. Existing articles already cover broad best/free/pricing searches, fee collection, fee debt, results and report templates; these four avoid simply rewriting those topics.

Several overview calls returned `INVALID_ARGUMENT`/connection-reset errors. No volume, difficulty, CPC or ranking claims were inferred from those failures. In particular, zero-reported queries are not presented as established high-volume opportunities. Recheck the shortlist when reliable metrics and SERP data are available.

Raw tool responses are saved in `keyword-research-2026-10-21.json`. No paid article generation or metric-recalculation tool was used.

## Validation

- Existing dependency-free Node test files run successfully: analytics, pioneer abuse controls, pioneer lead validation and calculators.
- Static checks cover new article metadata, cover files, internal links, related posts, FAQ extraction, plan totals and HTML structure.
- Full dependency installation could not complete: network/proxy access failed, and the offline cache did not contain the required packages. Full Next.js build, typecheck and dependency-based SEO tests remain unverified.
- Chromium preview was attempted but failed on a sandbox socket permission error before a page opened. Responsive CSS is implemented; rendered layouts and interactions still require a browser review.

This branch is for review, not a production deployment. Existing binary assets remain in GitHub; the workspace was reconstructed from UTF-8 source through the connector because Git cloning failed. Only explicitly changed/new files are included in the proposed GitHub tree.
