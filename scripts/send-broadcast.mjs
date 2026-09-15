#!/usr/bin/env node
/**
 * Sends a static-HTML campaign from emails/broadcasts/ to the waitlist audience as a Resend Broadcast.
 *
 *   node scripts/send-broadcast.mjs <campaign> --test      # one send to TEST_RECIPIENT (or --to <email>), no broadcast
 *   node scripts/send-broadcast.mjs <campaign> --dry-run   # print the resolved recipient list, send nothing
 *   node scripts/send-broadcast.mjs <campaign> --send      # create + send the live broadcast now
 *   node scripts/send-broadcast.mjs <campaign> --send --at 2026-09-19T08:00:00+01:00   # schedule it
 *
 * Campaigns are listed in CAMPAIGNS below. Re-running --send on a campaign already in the
 * ledger aborts; to re-send to newer signups, add a new campaign id.
 *
 * The HTML uses Resend broadcast merge tags ({{{FIRST_NAME|there}}}, {{{RESEND_UNSUBSCRIBE_URL}}}).
 * Those only resolve inside broadcasts, so --test substitutes them locally before sending.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const CAMPAIGNS = {
  "onboarding-v1": {
    file: "emails/broadcasts/onboarding.html",
    subject: "30 minutes between you and a fully digital school",
  },
  "pioneer-offer-v1": {
    file: "emails/broadcasts/pioneer-offer.html",
    subject: "Your first term on SchoolKit is free",
  },
};

const AUDIENCE_ID = "93428f81-01f9-42c2-b031-0aed20b410a7";
const FROM = "SchoolKit <hello@schoolkit.ng>";
const REPLY_TO = "hello@schoolkit.ng";
const TEST_RECIPIENT = "vtechconsults@gmail.com";
const LEDGER = path.join(__dirname, ".sent-ledger.json");
const API = "https://api.resend.com";

/** Loads RESEND_API_KEY from the environment, falling back to .env.local. */
function apiKey() {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  const envPath = path.join(ROOT, ".env.local");
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
      const m = line.match(/^\s*RESEND_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, "");
    }
  }
  throw new Error("RESEND_API_KEY is not set (env or .env.local)");
}

async function api(method, endpoint, body) {
  const res = await fetch(API + endpoint, {
    method,
    headers: { Authorization: `Bearer ${apiKey()}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${method} ${endpoint} -> ${res.status} ${JSON.stringify(json)}`);
  }
  return json;
}

/** Walks every page of a list endpoint. The audience is over 100 contacts, so this is not optional. */
async function listAll(endpoint) {
  const out = [];
  let after = "";
  for (let page = 0; page < 50; page++) {
    const sep = endpoint.includes("?") ? "&" : "?";
    const url = `${endpoint}${sep}limit=100${after ? `&after=${after}` : ""}`;
    const { data = [], has_more } = await api("GET", url);
    out.push(...data);
    if (!has_more || data.length === 0) return out;
    after = data[data.length - 1].id;
  }
  throw new Error(`pagination did not terminate for ${endpoint}`);
}

const hash = (email) => crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");

function readLedger() {
  if (!fs.existsSync(LEDGER)) return {};
  return JSON.parse(fs.readFileSync(LEDGER, "utf8"));
}

function writeLedger(ledger) {
  fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n");
}

async function recipients() {
  const contacts = await listAll(`/audiences/${AUDIENCE_ID}/contacts`);
  return contacts.filter((c) => !c.unsubscribed).map((c) => c.email).sort();
}

/** Resolves broadcast-only merge tags so a one-off test email renders like the real thing. */
function fillMergeTagsForTest(html) {
  return html
    .replace(/\{\{\{FIRST_NAME\|([^}]*)\}\}\}/g, "$1")
    .replace(/\{\{\{RESEND_UNSUBSCRIBE_URL\}\}\}/g, "https://www.schoolkit.ng");
}

/**
 * Swaps hosted /email-assets/ images for inline attachments read from public/, so a test
 * renders correctly before the assets are deployed.
 */
function inlineEmailAssetsForTest(html) {
  const attachments = [];
  const out = html.replace(/https:\/\/www\.schoolkit\.ng\/email-assets\/([\w.-]+)/g, (_, file) => {
    if (!attachments.some((a) => a.filename === file)) {
      const content = fs.readFileSync(path.join(ROOT, "public/email-assets", file)).toString("base64");
      attachments.push({ filename: file, content, content_id: file });
    }
    return `cid:${file}`;
  });
  return { html: out, attachments };
}

function parseArgs(argv) {
  const [campaign, ...rest] = argv;
  const flags = new Set(rest.filter((a) => a.startsWith("--")));
  const atIndex = rest.indexOf("--at");
  const at = atIndex >= 0 ? rest[atIndex + 1] : undefined;
  if (atIndex >= 0 && (!at || Number.isNaN(Date.parse(at)))) {
    throw new Error(`--at needs an ISO 8601 timestamp with offset, e.g. 2026-09-19T08:00:00+01:00`);
  }
  const toIndex = rest.indexOf("--to");
  const to = toIndex >= 0 ? rest[toIndex + 1] : TEST_RECIPIENT;
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error(`--to needs an email address`);
  }
  const mode = flags.has("--test") ? "test" : flags.has("--send") ? "send" : "dry-run";
  return { campaign, mode, at, to };
}

async function main() {
  const { campaign, mode, at, to } = parseArgs(process.argv.slice(2));
  const config = CAMPAIGNS[campaign];
  if (!config) {
    console.error(`usage: node scripts/send-broadcast.mjs <${Object.keys(CAMPAIGNS).join("|")}> [--test|--dry-run|--send [--at ISO]]`);
    process.exit(1);
  }

  const { subject } = config;
  const html = fs.readFileSync(path.join(ROOT, config.file), "utf8");

  console.log(`campaign : ${campaign}`);
  console.log(`mode     : ${mode}${at ? ` (scheduled ${at})` : ""}`);
  console.log(`from     : ${FROM}`);
  console.log(`subject  : ${subject}`);
  console.log(`html     : ${config.file} (${html.length} bytes)`);
  console.log("");

  if (mode === "test") {
    const inlined = inlineEmailAssetsForTest(fillMergeTagsForTest(html));
    const res = await api("POST", "/emails", {
      from: FROM,
      to,
      reply_to: REPLY_TO,
      subject: `[TEST] ${subject}`,
      html: inlined.html,
      attachments: inlined.attachments,
    });
    console.log(`TEST SENT -> ${to}`);
    console.log(`message id: ${res.id}`);
    return;
  }

  const list = await recipients();
  console.log(`audience   : ${AUDIENCE_ID}`);
  console.log(`recipients : ${list.length}`);

  if (mode === "dry-run") {
    console.log("");
    list.forEach((e, i) => console.log(`${String(i + 1).padStart(3)}. ${e}`));
    console.log("\n(dry run - nothing sent)");
    return;
  }

  const ledger = readLedger();
  if (ledger[campaign]) {
    console.error(
      `\nABORT: campaign "${campaign}" was already sent at ${ledger[campaign].sent_at} ` +
        `to ${ledger[campaign].recipient_count} recipients (broadcast ${ledger[campaign].broadcast_id}).`
    );
    process.exit(1);
  }

  const created = await api("POST", "/broadcasts", {
    audience_id: AUDIENCE_ID,
    from: FROM,
    reply_to: REPLY_TO,
    subject,
    html,
    name: `SchoolKit ${campaign}`,
  });
  console.log(`broadcast created: ${created.id}`);

  const sent = await api("POST", `/broadcasts/${created.id}/send`, at ? { scheduled_at: at } : {});
  console.log(`broadcast ${at ? "scheduled" : "sent"}: ${JSON.stringify(sent)}`);

  ledger[campaign] = {
    broadcast_id: created.id,
    audience_id: AUDIENCE_ID,
    subject,
    sent_at: new Date().toISOString(),
    ...(at ? { scheduled_at: at } : {}),
    recipient_count: list.length,
    recipient_hashes: list.map(hash),
  };
  writeLedger(ledger);
  console.log(`ledger updated   : ${path.relative(ROOT, LEDGER)}`);
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
