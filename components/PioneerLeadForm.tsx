"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { campaignParamsFromUrl, sanitizeParams, trackEvent, type AnalyticsParams, type SchoolSizeBand } from "@/lib/analytics";
import { CHALLENGES, CURRENT_METHODS, ROLES, SCHOOL_LEVELS, SCHOOL_SIZES } from "@/lib/pioneer-lead";

const FIELD_LABELS: Record<string, string> = { schoolName: "School name", city: "Town/city", state: "State", name: "Your name", role: "Your role", email: "Work email", whatsapp: "WhatsApp number", schoolSizeBand: "Student population", currentMethod: "Current method", biggestChallenge: "Biggest challenge", preferredStart: "Preferred time to begin" };

export default function PioneerLeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const [campaign, setCampaign] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = {};
    for (const [query, field] of [["utm_source", "utmSource"], ["utm_medium", "utmMedium"], ["utm_campaign", "utmCampaign"], ["utm_content", "utmContent"]]) {
      const value = params.get(query);
      if (value) next[field] = value.slice(0, 100);
    }
    if (Object.keys(next).length) {
      sessionStorage.setItem("sk_pioneer_campaign", JSON.stringify(next));
      setCampaign(next);
    } else {
      try { setCampaign(JSON.parse(sessionStorage.getItem("sk_pioneer_campaign") ?? "{}")); } catch { setCampaign({}); }
    }
  }, []);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    trackEvent("pilot_application_started", { form_id: "pioneer", placement: "lead-form", ...campaignParamsFromUrl(window.location.href) }, { includePageContext: false });
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting"); setErrors({});
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, unknown>;
    payload.schoolLevels = data.getAll("schoolLevels");
    payload.consent = data.get("consent") === "on";
    Object.assign(payload, campaign);
    try {
      const response = await fetch("/api/pioneer", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (!response.ok || !result.ok) { setErrors(result.errors ?? { form: result.error ?? "Please try again." }); setStatus("idle"); return; }
      const size = payload.schoolSizeBand as SchoolSizeBand;
      const analytics: AnalyticsParams = { form_id: "pioneer", placement: "lead-form", school_size_band: size, ...campaignParamsFromUrl(window.location.href) };
      trackEvent("pilot_application_submitted", analytics, { includePageContext: false });
      window.fbq?.("track", "Lead", sanitizeParams({ ...analytics }));
      form.reset(); setStatus("success");
    } catch { setErrors({ form: "We could not submit your details. Check your connection and try again." }); setStatus("idle"); }
  }

  if (status === "success") return <div className="pioneer-success" role="status"><span aria-hidden="true">✓</span><h3>Your school’s details have been received.</h3><p>Thank you. The SchoolKit team will contact you within two business days to understand your current workflow and arrange the next step.</p><a className="pill" href="/demo">Watch the SchoolKit walkthrough</a></div>;

  return <form className="pioneer-form" onSubmit={submit} onInput={onStart} noValidate>
    <div className="pioneer-form-head"><p className="eye">Free guided setup</p><h2>Let’s set up SchoolKit for your school.</h2><p>Tell us a little about your school. We will use this information to prepare the right walkthrough and setup conversation.</p></div>
    {errors.form && <p className="form-error form-error-banner" role="alert">{errors.form}</p>}
    <div className="pioneer-fields">
      {Object.entries(FIELD_LABELS).map(([name, label]) => {
        const options = name === "role" ? ROLES : name === "schoolSizeBand" ? SCHOOL_SIZES : name === "currentMethod" ? CURRENT_METHODS : name === "biggestChallenge" ? CHALLENGES : null;
        return <div className="field" key={name}><label htmlFor={name}>{label}</label>{options ? <select id={name} name={name} defaultValue="" aria-describedby={errors[name] ? `${name}-error` : undefined} aria-invalid={!!errors[name]}><option value="" disabled>Choose one</option>{options.map(option => <option key={option}>{option}</option>)}</select> : <input id={name} name={name} type={name === "email" ? "email" : name === "whatsapp" ? "tel" : "text"} autoComplete={name === "email" ? "email" : name === "name" ? "name" : name === "whatsapp" ? "tel" : name === "schoolName" ? "organization" : name === "city" ? "address-level2" : name === "state" ? "address-level1" : "off"} aria-describedby={errors[name] ? `${name}-error` : undefined} aria-invalid={!!errors[name]} />}{errors[name] && <span className="form-error" id={`${name}-error`}>{errors[name]}</span>}</div>;
      })}
      <fieldset className="field field-wide"><legend>School levels</legend><div className="check-grid">{SCHOOL_LEVELS.map(level => <label key={level}><input type="checkbox" name="schoolLevels" value={level} /> {level}</label>)}</div>{errors.schoolLevels && <span className="form-error">{errors.schoolLevels}</span>}</fieldset>
      <div className="website-field" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="field field-wide consent"><label><input type="checkbox" name="consent" aria-invalid={!!errors.consent} /> I authorise SchoolKit to contact me by WhatsApp, phone or email about setting up SchoolKit for my school.</label>{errors.consent && <span className="form-error">{errors.consent}</span>}</div>
    </div>
    <button className="pill pioneer-submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending securely…" : "Set Up My School Free"}</button>
    <p className="privacy-note">Your details are sent securely and used only to contact you about SchoolKit setup. See our <a href="/privacy-policy">Privacy Policy</a>.</p>
  </form>;
}
