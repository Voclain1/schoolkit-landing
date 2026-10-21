#!/usr/bin/env node
/**
 * Sends the "pick up where you left off" email to schools whose onboarding
 * stalled.
 *
 *   node scripts/send-reengagement-email.mjs --test      # one send to TEST_RECIPIENT
 *   node scripts/send-reengagement-email.mjs --dry-run   # print the recipient list, send nothing
 *   node scripts/send-reengagement-email.mjs --send      # send to every recipient below
 *
 * Unlike the other campaigns this is NOT a broadcast. It goes one address at a
 * time through POST /emails, because:
 *   - the recipients are a hand-picked list, not an audience; and
 *   - adding them to an audience would fire contact.created, which the Resend
 *     webhook answers by sending the welcome email — the wrong message for
 *     schools who signed up weeks ago and got stuck.
 * Nothing here writes to audience membership.
 *
 * Re-running --send on a campaign already in the ledger aborts.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

import {
  getReengagementEmailHtml,
  getReengagementEmailSubject,
  getReengagementEmailText,
} from "../lib/email-templates/reengagement.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const CAMPAIGN = "reengagement-v1";
const FROM = "SchoolKit <hello@schoolkit.ng>";
const TEST_RECIPIENT = "arinzevoclain@gmail.com";
const TEST_SCHOOL = "Atika Pinnacles School";
const LEDGER = path.join(__dirname, ".sent-ledger.json");
const API = "https://api.resend.com";

/** Schools whose onboarding did not complete, with the address they signed up with. */
const RECIPIENTS = [
  { email: "aatikapinnaclesschools@gmail.com", schoolName: "Atika Pinnacles School" },
  { email: "solomone028@gmail.com", schoolName: "Dominion Group Of Schools" },
  { email: "sharonspringsenquiries@gmail.com", schoolName: "Sharon Springs Nursery and Primary School" },
  { email: "engr.abdul15@gmail.com", schoolName: "Daarul-Istiqaamah Academy" },
  { email: "thepoeticseal@gmail.com", schoolName: "Wisdom Rules Group of Schools" },
  { email: "nehedarscholars@gmail.com", schoolName: "Nehedar Scholars Nursery and Primary School" },
];

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

const hash = (email) => crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readLedger() {
  if (!fs.existsSync(LEDGER)) return {};
  return JSON.parse(fs.readFileSync(LEDGER, "utf8"));
}

function writeLedger(ledger) {
  fs.writeFileSync(LEDGER, JSON.stringify(ledger, null, 2) + "\n");
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const mode = args.has("--test") ? "test" : args.has("--send") ? "send" : "dry-run";

  const subject = getReengagementEmailSubject();

  console.log(`campaign : ${CAMPAIGN}`);
  console.log(`mode     : ${mode}`);
  console.log(`from     : ${FROM}`);
  console.log(`subject  : ${subject}`);
  console.log("");

  if (mode === "test") {
    const html = getReengagementEmailHtml({ schoolName: TEST_SCHOOL });
    const text = getReengagementEmailText({ schoolName: TEST_SCHOOL });
    const res = await api("POST", "/emails", { from: FROM, to: TEST_RECIPIENT, subject, html, text });
    console.log(`TEST SENT -> ${TEST_RECIPIENT}  (rendered as "${TEST_SCHOOL}")`);
    console.log(`message id: ${res.id}`);
    return;
  }

  console.log(`recipients : ${RECIPIENTS.length}`);
  RECIPIENTS.forEach((r, i) =>
    console.log(`${String(i + 1).padStart(2)}. ${r.email.padEnd(36)} ${r.schoolName}`)
  );

  if (mode === "dry-run") {
    console.log("\n(dry run - nothing sent)");
    return;
  }

  const ledger = readLedger();
  if (ledger[CAMPAIGN]) {
    console.error(
      `\nABORT: campaign "${CAMPAIGN}" was already sent at ${ledger[CAMPAIGN].sent_at} ` +
        `to ${ledger[CAMPAIGN].recipient_count} recipients.`
    );
    process.exit(1);
  }

  console.log("");
  const sent = [];
  const failed = [];
  for (const r of RECIPIENTS) {
    try {
      const res = await api("POST", "/emails", {
        from: FROM,
        to: r.email,
        subject,
        html: getReengagementEmailHtml({ schoolName: r.schoolName }),
        text: getReengagementEmailText({ schoolName: r.schoolName }),
      });
      sent.push({ ...r, id: res.id });
      console.log(`  ok   ${r.email.padEnd(36)} ${res.id}`);
    } catch (err) {
      failed.push({ ...r, error: err.message });
      console.error(`  FAIL ${r.email.padEnd(36)} ${err.message}`);
    }
    await sleep(600); // stay well inside Resend's rate limit
  }

  console.log(`\nsent: ${sent.length}  failed: ${failed.length}`);

  ledger[CAMPAIGN] = {
    audience_id: null,
    delivery: "individual /emails sends (no audience writes)",
    subject,
    sent_at: new Date().toISOString(),
    recipient_count: sent.length,
    message_ids: sent.map((s) => s.id),
    recipient_hashes: sent.map((s) => hash(s.email)),
  };
  writeLedger(ledger);
  console.log(`ledger updated   : ${path.relative(ROOT, LEDGER)}`);

  if (failed.length) process.exit(1);
}

main().catch((err) => {
  console.error("\nFAILED:", err.message);
  process.exit(1);
});
