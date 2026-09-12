import assert from "node:assert/strict";
import test from "node:test";
import {
  campaignParamsFromUrl,
  looksPersonal,
  sanitizeParams,
  sanitizeUrl,
  schoolSizeBand,
} from "./analytics.ts";

test("sanitizeParams keeps allowlisted parameters", () => {
  assert.deepEqual(
    sanitizeParams({
      page_path: "/demo",
      placement: "hero",
      school_size_band: "201-600",
      video_percent: 75,
      debug_mode: true,
    }),
    {
      page_path: "/demo",
      placement: "hero",
      school_size_band: "201-600",
      video_percent: 75,
      debug_mode: true,
    },
  );
});

test("sanitizeParams drops keys that are not on the allowlist", () => {
  assert.deepEqual(
    sanitizeParams({
      email: "head@school.ng",
      phone: "+2347049677393",
      student_name: "Ada",
      user_id: "abc123",
      placement: "hero",
    }),
    { placement: "hero" },
  );
});

test("sanitizeParams drops allowlisted values that look personal", () => {
  assert.deepEqual(sanitizeParams({ cta_text: "mail head@school.ng" }), {});
  assert.deepEqual(sanitizeParams({ placement: "+234 704 967 7393" }), {});
  assert.deepEqual(sanitizeParams({ campaign_source: "08012345678" }), {});
});

test("sanitizeParams drops empty values and non-primitives", () => {
  assert.deepEqual(
    sanitizeParams({
      placement: "",
      plan: "   ",
      method: null,
      form_id: undefined,
      video_percent: Number.NaN,
      page_title: { toString: () => "leak" },
    }),
    {},
  );
});

test("looksPersonal spots emails and phone numbers, not ordinary copy", () => {
  assert.equal(looksPersonal("hello@schoolkit.ng"), true);
  assert.equal(looksPersonal("+234 704 967 7393"), true);
  assert.equal(looksPersonal("07049677393"), true);
  assert.equal(looksPersonal("Join the waitlist"), false);
  assert.equal(looksPersonal("201-600"), false);
  assert.equal(looksPersonal("final-cta"), false);
});

test("sanitizeUrl keeps utm parameters and strips everything else", () => {
  assert.equal(
    sanitizeUrl("https://schoolkit.ng/demo?utm_source=whatsapp&email=head@school.ng&ref=x"),
    "https://schoolkit.ng/demo?utm_source=whatsapp",
  );
  assert.equal(sanitizeUrl("https://schoolkit.ng/"), "https://schoolkit.ng/");
  assert.equal(sanitizeUrl("not a url"), "");
});

test("campaignParamsFromUrl returns only the params present", () => {
  assert.deepEqual(
    campaignParamsFromUrl("https://schoolkit.ng/?utm_source=whatsapp&utm_campaign=pilot-sep"),
    { campaign_source: "whatsapp", campaign_name: "pilot-sep" },
  );
  assert.deepEqual(campaignParamsFromUrl("https://schoolkit.ng/"), {});
});

test("campaignParamsFromUrl keeps safe campaign content", () => {
  assert.deepEqual(
    campaignParamsFromUrl("https://schoolkit.ng/pioneer?utm_source=facebook&utm_content=launch"),
    { campaign_source: "facebook", campaign_content: "launch" },
  );
});

test("schoolSizeBand maps student counts onto the pricing bands", () => {
  assert.equal(schoolSizeBand(1), "1-100");
  assert.equal(schoolSizeBand(100), "1-100");
  assert.equal(schoolSizeBand(101), "101-200");
  assert.equal(schoolSizeBand(600), "201-600");
  assert.equal(schoolSizeBand(1200), "601-1200");
  assert.equal(schoolSizeBand(5000), "1200+");
  assert.equal(schoolSizeBand(0), undefined);
  assert.equal(schoolSizeBand(Number.NaN), undefined);
});
