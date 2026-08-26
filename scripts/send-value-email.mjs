#!/usr/bin/env node
/**
 * Sends the "value-led" campaign to the waitlist audience as a Resend Broadcast.
 *
 *   node scripts/send-value-email.mjs --test      # one send to TEST_RECIPIENT, no broadcast
 *   node scripts/send-value-email.mjs --dry-run   # print the resolved recipient list, send nothing
 *   node scripts/send-value-email.mjs --send      # create + send the live broadcast
 *
 * Re-running --send on a campaign that is already in the ledger aborts. Broadcasts
 * always hit every contact in the audience, so there is no partial re-send: to reach
 * only newer signups, use a fresh campaign id.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  getValueLedEmailHtml,
  getValueLedEmailSubject,
  getValueLedEmailText,
} from "../lib/email-templates/value-led.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const CAMPAIGN = "value-led-v1";
const AUDIENCE_ID = "93428f81-01f9-42c2-b031-0aed20b410a7";
const FROM = "SchoolKit <hello@schoolkit.ng>";
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

const KEY = apiKey();

async function api(method, endpoint, body) {
  const res = await fetch(API + endpoint, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
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

async function main() {
  const args = new Set(process.argv.slice(2));
  const mode = args.has("--test") ? "test" : args.has("--send") ? "send" : "dry-run";

  const subject = getValueLedEmailSubject();
  const html = getValueLedEmailHtml();
  const text = getValueLedEmailText();

  console.log(`campaign : ${CAMPAIGN}`);
  console.log(`mode     : ${mode}`);
  console.log(`from     : ${FROM}`);
  console.log(`subject  : ${subject}`);
  console.log(`html     : ${html.length} bytes / text: ${text.length} bytes`);
  console.log("");

  if (mode === "test") {
    const res = await api("POST", "/emails", { from: FROM, to: TEST_RECIPIENT, subject, html, text });
    console.log(`TEST SENT -> ${TEST_RECIPIENT}`);
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
  if (ledger[CAMPAIGN]) {
    console.error(
      `\nABORT: campaign "${CAMPAIGN}" was already sent at ${ledger[CAMPAIGN].sent_at} ` +
        `to ${ledger[CAMPAIGN].recipient_count} recipients (broadcast ${ledger[CAMPAIGN].broadcast_id}).`
    );
    process.exit(1);
  }

  const created = await api("POST", "/broadcasts", {
    audience_id: AUDIENCE_ID,
    from: FROM,
    subject,
    html,
    text,
    name: `SchoolKit value-led (${CAMPAIGN})`,
  });
  console.log(`broadcast created: ${created.id}`);

  const sent = await api("POST", `/broadcasts/${created.id}/send`, {});
  console.log(`broadcast sent   : ${JSON.stringify(sent)}`);

  ledger[CAMPAIGN] = {
    broadcast_id: created.id,
    audience_id: AUDIENCE_ID,
    subject,
    sent_at: new Date().toISOString(),
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
