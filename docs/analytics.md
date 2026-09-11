# Analytics

The site runs two tags side by side:

| Tag | Where | Purpose |
| --- | --- | --- |
| Google Analytics 4 | [components/Analytics.tsx](../components/Analytics.tsx) | Traffic and conversion reporting |
| Meta Pixel | [components/MetaPixel.tsx](../components/MetaPixel.tsx) | Ad attribution (`PageView`, `Lead`) — unchanged |

## Configuration

GA4 is driven entirely by one environment variable. There is no hardcoded
Measurement ID anywhere in the codebase.

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-CW31VWGXHY
```

If the variable is unset, `Analytics` renders nothing and every `trackEvent`
call is a no-op — so local development and previews stay out of the property
unless you opt in.

### Vercel

Add this to the SchoolKit project (Settings → Environment Variables), then
redeploy — `NEXT_PUBLIC_*` values are inlined at build time, so an existing
deployment will not pick it up on its own:

| Key | Value | Environments |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-CW31VWGXHY` | Production (add Preview/Development only if you want that traffic in the same property) |

Or from the CLI:

```bash
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production
# paste: G-CW31VWGXHY
```

## Page views

Counted exactly once per navigation:

- **First load** — the Google tag's own `config` call sends `page_view`.
- **Afterwards** — an inline script re-configures the tag with
  `send_page_view: false`, which stops it emitting its own page views on
  history changes, and `Analytics` sends one `page_view` per pathname change.

Page views are keyed on pathname, not on the query string, so a `?utm_source=…`
change alone does not produce a second view. `page_location` is rebuilt from
origin + path plus `utm_source`, `utm_medium` and `utm_campaign` only, so a
stray query parameter can never carry personal data into GA4.

## Events

Fired by [lib/analytics.ts](../lib/analytics.ts) via `trackEvent`, always
*after* the underlying action has succeeded.

| Event | Fires when | Parameters | Where |
| --- | --- | --- | --- |
| `pilot_application_started` | First keystroke in a waitlist form (once per form, per load) | `form_id`, `placement`, `school_size_band`* | `content/landing/homepage-script.js` |
| `pilot_application_submitted` | Waitlist signup has been accepted by the sheet endpoint | `form_id`, `placement`, `method`, `school_size_band`* | `content/landing/homepage-script.js` |
| `whatsapp_cta_clicked` | Any `wa.me` / `whatsapp.com` link is clicked | `placement` (from `data-location`), `method` | `content/landing/site-script.js` |
| `demo_viewed` | Demo player has been ≥50% on screen for 2s | `video_id`, `video_title`, `placement` | `components/DemoViewTracker.tsx` |
| `demo_booking_completed` | A booked demo is confirmed | `method`, `school_size_band` | **Not fired on this site** — see below |
| `school_account_created` | A school account finishes signup | `school_size_band`, `plan` | **Not fired on this site** |
| `onboarding_completed` | The setup wizard completes | `step`, `school_size_band`, `plan` | **Not fired on this site** |

\* `school_size_band` is emitted only if a waitlist form carries a
`data-size-band` attribute. The current form asks for an email and an optional
WhatsApp number, so the band is absent today; add the attribute (or a
school-size field that sets it) and the parameter starts flowing with no code
change here. `schoolSizeBand()` in `lib/analytics.ts` maps a student count onto
the bands used by the pricing tiers: `1-100`, `101-200`, `201-600`,
`601-1200`, `1200+`.

Every event also carries `page_location`, `page_path`, `page_title` and, when
the visit arrived with UTM tags, `campaign_source` / `campaign_medium` /
`campaign_name`. Campaign attribution is first-touch: the values are read from
the landing URL and kept in `sessionStorage` for the rest of the session.

### The three app-side events

`demo_booking_completed`, `school_account_created` and `onboarding_completed`
all happen inside the product at `app.schoolkit.ng`, which is a separate
codebase — demos are booked over WhatsApp, and accounts and onboarding live in
the app. They are part of the typed contract here so both sides agree on names
and parameters, but nothing on the marketing site can honestly fire them.

To send them from the app, use the same Measurement ID and the same parameter
names:

```ts
gtag("event", "school_account_created", { school_size_band: "201-600", plan: "starter" });
```

Do not fire them from a redirect back to the marketing site — a URL can be
opened by anyone, which would corrupt the conversion counts.

## Privacy

No names, emails, phone numbers, student data or any other personal
information is sent to GA4. Two mechanisms enforce this in
`sanitizeParams()`:

1. **Allowlist** — only the parameter keys named in `ALLOWED_PARAM_KEYS` are
   sent. A key like `email` or `student_name` is dropped even if a caller
   passes it.
2. **Value scrubbing** — any surviving string that matches an email address or
   a phone number is dropped, as are nested objects and arrays. Strings are
   truncated to 100 characters.

The waitlist form's own values are never read by the analytics code; the
handler tracks only *that* a submission succeeded.

Unit tests for both mechanisms: `npm test` (`lib/analytics.test.ts`).

## Verifying

### Realtime

1. Deploy with `NEXT_PUBLIC_GA_MEASUREMENT_ID` set, then open
   <https://schoolkit.ng> in a normal window.
2. GA4 → **Reports → Realtime**. The visit appears within ~30s.
3. Navigate Home → /demo → /blog. Under *Event count by Event name* the
   `page_view` count should increase by exactly one per navigation. Two at a
   time means the automatic history page views are not suppressed — check that
   the `ga-spa-pageviews` inline script is present in the page source.
4. Click a WhatsApp button and watch for `whatsapp_cta_clicked`; sit on /demo
   for a few seconds and watch for `demo_viewed`.

### DebugView

1. Install the [Google Analytics Debugger](https://chromewebstore.google.com/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
   extension and enable it on the site (or append `?_dbg=1` — the extension is
   the simpler route since the tag is configured without `debug_mode`).
2. GA4 → **Admin → DebugView**, and pick your device in the top-left selector.
3. Run through the funnel: type an email into the hero form
   (`pilot_application_started`), submit it (`pilot_application_submitted`),
   open /demo (`demo_viewed`), click a WhatsApp CTA
   (`whatsapp_cta_clicked`).
4. Click any event in the stream and check its parameters: you should see
   `placement`, `form_id`, `page_location` and friends — and **no** email,
   phone number or name. If you ever see one, the allowlist in
   `lib/analytics.ts` is the place to fix it.

To mark the conversions: GA4 → **Admin → Events**, toggle *Mark as key event*
on `pilot_application_submitted`, `school_account_created` and
`onboarding_completed`. Events must have been received at least once before
they can be marked.
