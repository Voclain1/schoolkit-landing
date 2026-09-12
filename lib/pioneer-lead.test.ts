import assert from "node:assert/strict";
import test from "node:test";
import { isConfirmedPioneerSubmission, isPioneerHoneypot, validatePioneerLead } from "./pioneer-lead.ts";

const valid = { schoolName: "Example School", city: "Lagos", state: "Lagos", name: "Ada Okafor", role: "Proprietor/Owner", email: "ada@example.sch.ng", whatsapp: "+234 800 000 0000", schoolSizeBand: "101-200", schoolLevels: ["Primary"], currentMethod: "A mixture", biggestChallenge: "Fees", preferredStart: "This term", consent: true, utmSource: "facebook", utmCampaign: "pioneer_offer_2026" };

test("accepts the approved pioneer fields and campaign attribution", () => {
  const result = validatePioneerLead(valid);
  assert.equal(result.errors, undefined);
  assert.equal(result.data?.utmCampaign, "pioneer_offer_2026");
  assert.deepEqual(result.data?.schoolLevels, ["Primary"]);
});

test("rejects missing consent, invalid contact details and unknown choices", () => {
  const result = validatePioneerLead({ ...valid, consent: false, email: "bad", whatsapp: "abc", role: "Owner of everything" });
  assert.deepEqual(Object.keys(result.errors ?? {}).sort(), ["consent", "email", "role", "whatsapp"]);
});

test("drops malformed UTM values instead of persisting them", () => {
  const result = validatePioneerLead({ ...valid, utmSource: "Ada Okafor <ada@example.com>" });
  assert.equal(result.data?.utmSource, undefined);
});

test("honeypot submissions are detectable and never count as confirmed persistence", () => {
  assert.equal(isPioneerHoneypot({ website: "spam.example" }), true);
  assert.equal(isPioneerHoneypot({ website: "" }), false);
  assert.equal(isConfirmedPioneerSubmission({ ok: true, ignored: true }), false);
  assert.equal(isConfirmedPioneerSubmission({ ok: true }), true);
  assert.equal(isConfirmedPioneerSubmission({ ok: false }), false);
});
