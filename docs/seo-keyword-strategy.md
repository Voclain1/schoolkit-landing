# SEO keyword strategy

Last updated: 2026-10-05.

## How the site is organised for search

| Page type | Intent | Example query | Where |
|---|---|---|---|
| Homepage | Head term, brand | school management software Nigeria | `/` |
| Feature pages | Commercial ("I'm shopping") | school fees management software Nigeria | `/features/[slug]` (`lib/features.ts`) |
| Comparison / pricing posts | Commercial investigation | best school management software in Nigeria | `/blog/...` |
| Guides | Informational, high volume | report card comments, how to calculate CA and exam scores | `/blog/...` |

Each search query should have **one** page that targets it. Feature pages link down to
the guides (`relatedPosts`). Every blog post links up to the matching feature page
(chosen by tag in `getFeatureForTags`). That way pages support each other instead of
competing for the same query.

## Keyword map

| Cluster | Primary target | Page |
|---|---|---|
| Brand / category | school management software Nigeria, school management system Nigeria | `/`, `/blog/best-school-management-software-nigeria` |
| Fees | school fees management software Nigeria, school fee payment software, Paystack school fees | `/features/school-fees-management-software` |
| Fees (how-to) | how to collect school fees online Nigeria, automate school fee collection | existing fee posts |
| Results | school result management software, report card software Nigeria, result processing software | `/features/result-management-software` |
| Results (how-to) | Nigerian school grading system, how to calculate CA and exam scores, how to calculate position in class, WAEC grading system | `/blog/nigerian-school-grading-system-how-to-calculate-results` |
| Report cards (top of funnel) | report card comments, teacher's remarks on report card, principal's comment on report card | `/blog/report-card-comments-for-teachers-nigeria` |
| Attendance | school attendance software Nigeria, digital attendance register | `/features/school-attendance-software` |
| Parents | school portal Nigeria, school parent portal, parent communication app | `/features/school-parent-portal` |
| Records | student information system, student management system | `/features/student-information-system` |
| Price-sensitive | free school management software Nigeria, school management software pricing | `/blog/free-school-management-software-nigeria`, `/blog/school-management-software-pricing-nigeria` |
| AI | AI tutor WAEC | `/blog/ai-tutor-waec-syllabus` |

Keyword volumes were **not** measured for this pass: the connected Ahrefs plan does
not include Keywords Explorer. The clusters are based on what competing Nigerian
products and the publishers ranking for "best school management software Nigeria"
cover (CBT, school portal, result checker, report cards, fees). Re-check them against
Search Console once there is data (see below).

## Next content to write (in priority order)

1. **CBT software for schools** (computer-based test software Nigeria). This is a big
   cluster that competitors rank for. Write it when SchoolKit's CBT ships. Do not
   describe it as available before then.
2. **School result checker / scratch card** (online result checker for schools). Same
   rule: wait until the result checker ships.
3. **School timetable software / how to make a school timetable.** Feature page when
   timetables are marked live on the homepage. The how-to guide can be written now.
4. **Lesson note template for Nigerian teachers.** High-volume informational topic for
   teachers, with no product dependency.
5. **Scheme of work / first-term calendar guides.** Seasonal; publish before each term.
6. City pages (school management software in Lagos, Abuja, Port Harcourt). Only write
   these with genuinely local content, such as named pioneer schools or local
   testimonials. Thin doorway pages hurt rankings.

Rule for every feature page: only features marked "Live now" on the homepage get one.

## Technical SEO in place

- Per-page title, description, canonical and Open Graph tags. Blog posts and feature
  pages are statically generated.
- `sitemap.xml` covers the homepage, `/features` with every feature page, the blog,
  every post and the other public pages.
- Structured data:
  - `SoftwareApplication` with offers, plus `Organization` and `WebSite`, site-wide.
  - `FAQPage` on the homepage. It is parsed from the visible FAQ, so the two cannot
    drift apart.
  - `FAQPage` and `BreadcrumbList` on every feature page.
  - `BlogPosting`, `BreadcrumbList` and `FAQPage` on posts.
- A table of contents on every post with five or more `##` sections.
- `lib/seo-content.test.ts` fails CI if:
  - an internal `/blog/` or `/features/` link points at a page that doesn't exist;
  - a feature's title or description is too long for search results.

## Off-site work this needs (not code)

- **Google Search Console:** verify `schoolkit.ng`, submit `/sitemap.xml`, and request
  indexing for `/features` and the three new posts. Connect GSC to Ahrefs so query data
  becomes available here.
- **Google Business Profile** for SchoolKit (Lagos).
- **Listings / backlinks:** Capterra, G2, GetApp, SaaSHub and Nigerian directories.
  Also pitch the publishers already writing "best school management software in
  Nigeria" roundups: Nairametrics, Legit.ng, headteacher.ng and nigerianqueries.com.
- **Video:** the YouTube demo should link back to `/features` and use the target
  keywords in its title and description.
