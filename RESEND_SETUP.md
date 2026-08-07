# Resend welcome email — setup

Code is in place; these are the one-time steps in your Resend account to activate it.

## How it works

1. A visitor joins the waitlist → `content/landing/homepage-script.js` posts the email to `POST /api/waitlist` ([app/api/waitlist/route.ts](app/api/waitlist/route.ts)), which creates a Resend contact.
2. Resend fires a `contact.created` webhook for **every** new contact — from the form, a CSV import, or added manually in the dashboard.
3. `POST /api/webhooks/resend` ([app/api/webhooks/resend/route.ts](app/api/webhooks/resend/route.ts)) verifies the webhook signature and sends the welcome email via `resend.emails.send()`, using the template in [lib/email-templates/welcome.ts](lib/email-templates/welcome.ts).

`{{firstName}}` in the greeting is filled from the contact's `first_name` if Resend has one, otherwise it's derived from the email's local part (e.g. `arinze.voclain@x.com` → "Arinze"). The current waitlist form only collects an email, so most sends will use the derived name — add a "Name" field to the form later if you want true personalization.

## 1. Verify the sending domain

In the [Resend dashboard → Domains](https://resend.com/domains), add and verify `schoolkit.ng` (SPF/DKIM DNS records) so you can send from `hello@schoolkit.ng`.

## 2. Turn on open/click tracking

Same domain settings page → enable **Open Tracking** and **Click Tracking**. This is what makes opens/clicks show up on the Resend dashboard and on individual email logs.

## 3. Set environment variables

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — from [API Keys](https://resend.com/api-keys).
- `RESEND_WEBHOOK_SECRET` — generated in step 4 below.

Set the same variables in your production host's environment (e.g. Vercel project settings).

## 4. Register the webhook

`schoolkit.ng` (apex) is a Vercel redirect domain that 307s everything to `www.schoolkit.ng` — the actual deployment. Resend does not follow redirects when delivering webhooks, so the webhook **must** point at the `www` host or delivery silently fails. Once the app is deployed (so `https://www.schoolkit.ng/api/webhooks/resend` is reachable), run:

```bash
RESEND_API_KEY=re_xxx node scripts/setup-resend-webhook.mjs
```

(If your domain setup ever changes so the apex is canonical instead, pass the correct URL explicitly: `node scripts/setup-resend-webhook.mjs https://schoolkit.ng/api/webhooks/resend`.)

This calls `resend.webhooks.create()` and prints a signing secret — copy it into `RESEND_WEBHOOK_SECRET` (dashboard + `.env.local`) and redeploy. It's shown once; if you lose it, delete the webhook in the [Resend dashboard → Webhooks](https://resend.com/webhooks) and re-run the script.

## Testing

- Add a test contact from the Resend dashboard (Contacts → Add contact) and confirm the welcome email arrives.
- Or submit the waitlist form locally against a deployed webhook URL (the webhook needs a public HTTPS endpoint — use a tunnel like `ngrok` for local testing, pointing `scripts/setup-resend-webhook.mjs`'s argument at the tunnel URL).
- Check delivery/opens/clicks under [Resend → Emails](https://resend.com/emails).
