# Plan-First: SchoolKit Blog (schoolkit.ng/blog)

Status: APPROVED — ready for Claude Code to scaffold.
Repo: Voclain1/schoolkit-landing

## 1. Problem / Goal
The landing repo is currently a single static `index.html` deployed on Vercel. There is
no way to publish SEO content. We need a blog at `schoolkit.ng/blog` to target long-tail,
low-competition keywords (fee collection, AI tutor/WAEC, report cards) identified in
keyword research, without disturbing the existing waitlist landing page.

## 2. Decisions
- **Framework migration:** Convert `schoolkit-landing` from static HTML to Next.js 15
  (App Router), consistent with the rest of the SchoolKit stack (apps/web, apps/portal).
- **Content authoring:** MDX files in-repo (`content/blog/*.mdx`). No headless CMS —
  keeps everything git-based and fits the existing plan-first/CI workflow.
- **URL structure:** Path-based, same domain — `schoolkit.ng/blog`, `schoolkit.ng/blog/[slug]`.
  No subdomain (subdomains split domain authority; path-based is stronger for SEO here).
- **Hosting:** Unchanged — Vercel.

## 3. Hard constraint
The migration must preserve the current landing page **exactly** — same copy, same
waitlist form, same Google Apps Script → Google Sheet integration (must remain set to
"Anyone" access, not "Anyone with Google account", per known CORS gotcha). Only the
underlying framework changes, from raw HTML to `app/page.tsx`. This is a framework
migration, not a content or funnel change.

## 4. Scope

### Routes
- `/blog` — paginated index, newest first
- `/blog/[slug]` — individual post, statically generated via `generateStaticParams`
- `/blog/tag/[tag]` — deferred; only add if tag volume justifies it later

### Content model (MDX frontmatter)
```
title: string
slug: string
description: string
date: string (ISO)
updatedAt: string (ISO, optional)
tags: string[]
coverImage: string
seoTitle: string
seoDescription: string
keywords: string[]
```

### SEO requirements (non-negotiable — this is the entire point of the feature)
- `generateMetadata` per post: title, description, OG tags, canonical URL
- `sitemap.ts` — includes all blog posts, regenerated on build
- `robots.ts`
- JSON-LD `Article` schema per post
- Dynamic OG images via `next/og`, branded (Deep Emerald #0E5C43 / Gold Spark #E0A52E, Hanken Grotesk)
- Internal linking: related-posts block + CTA back to waitlist on every post

### Out of scope for this slice
- CMS integration
- Comments
- Newsletter/RSS (revisit later if useful)
- Tag pages (unless keyword data says otherwise)

## 5. Verification / manual gate (before merge)
- [ ] Existing CI gate passes: lint / typecheck / test / build
- [ ] Landing page (`/`) renders identically to current production — copy, waitlist form, Apps Script submission all functional on Vercel preview
- [ ] `/blog` index renders with at least 1 seed post
- [ ] `/blog/[slug]` renders correctly, metadata/OG tags verified via preview
- [ ] `sitemap.xml` includes `/blog` and the seed post
- [ ] Lighthouse SEO score sanity check on `/blog/[slug]`
- [ ] Playwright e2e: known 20-min timeout — bypass via admin override as usual

## 6. Initial content backlog (write after scaffold ships)
1. **"How Nigerian Schools Can Collect Fees Online Without WhatsApp Chaos"**
   Target: *school fees payment software Nigeria*, *collect school fees online Nigeria*
2. **"What an AI Tutor Aligned to the WAEC Syllabus Actually Means"**
   Target: *AI tutor WAEC*, *AI study app Nigerian students* — least contested keyword space, lead with this one
3. **"Digital Report Cards vs. Paper: What Nigerian Parents Actually Want to See"**
   Target: *report card software Nigeria*

## 7. Sign-off
Confirmed by Arinzechukwu: proceed with full Next.js migration of the landing repo.
Claude Code may begin scaffolding per sections 4–5.
