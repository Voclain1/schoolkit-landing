#!/usr/bin/env node
// One-time setup: registers the Resend webhook that triggers the welcome email.
// Usage:
//   RESEND_API_KEY=re_xxx node scripts/setup-resend-webhook.mjs [webhookUrl]
//
// Run this once per environment (e.g. once for production). It prints a
// signing secret — save it as RESEND_WEBHOOK_SECRET, it is only shown once.

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const endpoint = process.argv[2] || process.env.RESEND_WEBHOOK_URL || "https://www.schoolkit.ng/api/webhooks/resend";

if (!apiKey) {
  console.error("Set RESEND_API_KEY before running this script.");
  process.exit(1);
}

const resend = new Resend(apiKey);

const { data, error } = await resend.webhooks.create({
  endpoint,
  events: ["contact.created"],
});

if (error) {
  console.error("Failed to create webhook:", error.message);
  process.exit(1);
}

console.log(`Webhook created (id: ${data.id})`);
console.log(`Endpoint: ${endpoint}`);
console.log(`Events: contact.created`);
console.log("\nSave this as RESEND_WEBHOOK_SECRET in your deployment env — it will not be shown again:");
console.log(data.signing_secret);
