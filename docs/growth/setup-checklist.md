# Setup checklist (weeks 1–4)

## Week 1: measurement

- [ ] **Google Search Console:** add a *Domain* property for `schoolkit.ng` (DNS TXT record at the registrar). Submit `https://schoolkit.ng/sitemap.xml`. Use *URL inspection → Request indexing* for `/features`, `/pricing`, `/tools/result-calculator`, `/tools/school-fees-calculator` and the six newest posts.
- [ ] **Bing Webmaster Tools:** sign in, choose *Import from Google Search Console* (fastest), and confirm the sitemap is listed. ChatGPT search and Copilot draw on Bing's index.
- [ ] **IndexNow (optional):** in Bing Webmaster Tools, turn on IndexNow so new pages are picked up within hours.
- [ ] **Ahrefs:** connect Search Console to Ahrefs (Account → Integrations) so query data is available for the monthly review. Keyword research needs a plan that includes Keywords Explorer.
- [ ] **GA4:** create a custom channel group with an "AI assistants" channel where *Session medium* exactly matches `ai_assistant` (the site now tags AI referrals this way), placed above "Referral".
- [ ] **GA4:** mark `tool_used` as a key event (Admin → Events), alongside `pilot_application_submitted`.

## Week 1: site messages

- [ ] Choose one status message and use it everywhere: either "Live: start free" or "Early access: join the waitlist". The announcement bar and the homepage FAQ currently disagree.
- [ ] Update the pricing cards: each paid plan still says "Free during early access · billing starts September 2026".

## Weeks 2–4: profiles to claim

Use the exact words in [brand-fact-sheet.md](brand-fact-sheet.md). After each one is live, add its URL to `BRAND.sameAs` in `lib/brand.ts`.

| Profile | Why | Link |
| --- | --- | --- |
| Google Business Profile | Brand panel in Google and Gemini; reviews | business.google.com |
| LinkedIn company page | Entity signal; founder posts | linkedin.com → For Business → Create a Company Page |
| Capterra (covers GetApp and Software Advice) | Heavily cited when AI is asked "which is best" | vendors.capterra.com |
| G2 | Same | sell.g2.com |
| SaaSHub | Alternatives pages rank for competitor names | saashub.com/submit |
| Crunchbase | Entity data used by AI and journalists | crunchbase.com |
| Product Hunt | Launch day backlink and audience | producthunt.com |
| YouTube channel | Video results; link every description to the matching page | youtube.com |
| Paystack partner/showcase listing | Relevant, trusted backlink | Ask your Paystack account contact |
| Wikidata item | Entity data for Google and AI (only once there is independent press coverage to cite) | wikidata.org |
