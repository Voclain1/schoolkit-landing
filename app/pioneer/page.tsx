import type { Metadata } from "next";
import PioneerLeadForm from "@/components/PioneerLeadForm";
import { serializeJsonLd } from "@/lib/json-ld";

const URL = "https://schoolkit.ng/pioneer";
const TITLE = "Use SchoolKit Free for One Term | Pioneer Offer";
const DESCRIPTION = "Set up your Nigerian private school on SchoolKit and use it free for one full term, with guided onboarding and permanent Pioneer pricing.";
const faqs = [
  ["Is SchoolKit really free for one term?", "Yes. Your school can use the appropriate SchoolKit plan for one full term without paying a subscription fee. Any future pricing will be explained before your free period ends."],
  ["Do we need a payment card to start?", "No. A card is not required to begin the Pioneer Offer."],
  ["Will someone help us set it up?", "Yes. Guided setup is part of the offer. We will work with your appointed school contact to configure the account and prepare the initial records."],
  ["What happens after the free term?", "You decide whether SchoolKit has worked for your school. If you continue, your Pioneer pricing remains locked while your school stays active."],
  ["Is this suitable for a small private school?", "Yes. SchoolKit is designed for Nigerian private schools of different sizes. We will recommend the setup and plan that match your student population and workflow."],
  ["What happens after I submit my school’s details?", "The SchoolKit team will contact you within two business days to understand your current process and arrange a short walkthrough."],
];

export const metadata: Metadata = { title: TITLE, description: DESCRIPTION, alternates: { canonical: URL }, openGraph: { title: TITLE, description: DESCRIPTION, url: URL, type: "website", siteName: "SchoolKit" }, twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION } };

const benefits = [
  ["See every school-fee balance clearly", "Track invoices, payments, outstanding balances and digital receipts without reconciling scattered records by hand."],
  ["Move from scores to report cards faster", "Record scores, calculate grades and prepare professional report cards through a controlled approval workflow."],
  ["Keep attendance and records organised", "Manage students, staff, classes and attendance from one platform instead of disconnected registers."],
  ["Keep the right people informed", "Give owners, administrators, bursars, teachers, guardians and students access to the information relevant to them."],
];

export default function PioneerPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return <div className="pioneer-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    <section className="pioneer-hero"><div className="wrap pioneer-hero-grid"><div><p className="eye">Pioneer Offer · Now onboarding Nigerian private schools</p><h1>Run your school on SchoolKit for one full term—<em>free.</em></h1><p className="pioneer-lede">Bring school fees, attendance, results, student records and parent communication into one platform built for Nigerian schools. Our team will guide you through setup.</p><div className="pioneer-actions"><a className="pill" href="#setup">Set Up My School Free</a><a className="text-link" href="/demo">Watch the 2-minute walkthrough →</a></div><p className="trust-line">No setup fee · No card required · No long-term commitment</p></div><div className="pioneer-hero-card" aria-label="Pioneer Offer includes"><span>One full term free</span><span>Guided school setup</span><span>Direct implementation support</span><span>Pioneer pricing locked while active</span></div></div></section>

    <section className="pioneer-section"><div className="wrap narrow"><p className="eye">A clearer school day</p><h2>Your school has outgrown notebooks, spreadsheets and scattered WhatsApp messages.</h2><p>When payment records sit in one place, attendance in another and results move between notebooks and spreadsheets, simple questions become difficult:</p><ul className="pain-list"><li>Who has paid and who still owes?</li><li>Which students were absent today?</li><li>Are the results complete and approved?</li><li>Can we find the right student record immediately?</li><li>Have parents received the correct update?</li></ul><p>SchoolKit puts those answers in one connected system.</p></div></section>

    <section className="pioneer-section pioneer-tint"><div className="wrap"><div className="section-heading"><p className="eye">The benefits</p><h2>One clearer way to run the school day.</h2></div><div className="benefit-grid">{benefits.map(([title, body], i) => <article key={title}><span className="benefit-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

    <section className="pioneer-section pioneer-offer"><div className="wrap offer-grid"><div><p className="eye">The Pioneer Offer</p><h2>This is not another software subscription your school has to figure out alone.</h2><p>We will work with your team to get SchoolKit configured for real school operations.</p><p>Use SchoolKit through a real school term. See what it changes. Then decide whether it is right for your school.</p><p className="offer-trust">No setup fee. No card required. No long-term commitment.</p><a className="pill" href="#setup">Start My Free School Setup</a></div><div className="offer-list"><h3>Your school gets:</h3><ul><li>One full term of SchoolKit free</li><li>Guided setup and implementation</li><li>Help preparing your initial records</li><li>Direct support from the SchoolKit team</li><li>Permanent Pioneer pricing if you continue</li></ul></div></div></section>

    <section className="pioneer-section"><div className="wrap"><div className="section-heading"><p className="eye">How it works</p><h2>From first conversation to a working school setup.</h2></div><ol className="steps-grid"><li><b>Tell us about your school.</b><span>Share a few details so we can prepare the right setup conversation.</span></li><li><b>See SchoolKit in action.</b><span>We will show the workflows most relevant to your school and answer your questions.</span></li><li><b>Set up with our team.</b><span>We guide your staff through configuration and initial records.</span></li><li><b>Use it for one term free.</b><span>Run real school workflows before deciding whether to continue.</span></li></ol></div></section>

    <section className="pioneer-section pioneer-fit"><div className="wrap narrow"><p className="eye">Built for your school</p><h2>Built for private schools ready to simplify daily administration.</h2><p>SchoolKit is a strong fit if your school wants a clearer way to manage fees, attendance, results, student records or parent communication—and can appoint one staff member to coordinate setup.</p></div></section>

    <section className="pioneer-section"><div className="wrap"><div className="section-heading"><p className="eye">Built here. For schools here.</p><h2>Trusted by Nigerian school leaders.</h2></div><blockquote className="pioneer-quote"><p>“What got me was the offline mode. Every other software I’ve tried assumes you have stable internet. We’re in Surulere—NEPA doesn’t care about our school management software. A platform that works without internet and syncs when it’s back? That’s not a feature. That’s a necessity.”</p><footer><b>Mr. Emeka A</b><span>School Administrator, Greenfield International School, Lagos</span></footer></blockquote></div></section>

    <section className="pioneer-section pioneer-tint" id="setup"><div className="wrap"><PioneerLeadForm /></div></section>

    <section className="pioneer-section"><div className="wrap"><div className="section-heading"><p className="eye">Questions, answered</p><h2>Frequently asked questions</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>

    <section className="pioneer-final"><div className="wrap"><div className="pioneer-final-card"><h2>Give your school one full term to experience a better way of working.</h2><p>Set up SchoolKit with our team, use it in real school operations and decide after you have seen the difference.</p><a className="pill" href="#setup">Set Up My School Free</a><span>One term free · Guided onboarding · No setup fee</span></div></div></section>
  </div>;
}

