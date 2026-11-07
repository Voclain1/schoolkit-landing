import type { Metadata } from "next";
import "../homepage.css";
import "./pioneer.css";
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


const included = [
  ["01", "Guided school setup", "We help configure your school, classes and initial records. Your team has someone to turn to from day one."],
  ["02", "A full term to try it", "Use SchoolKit for real school work, with your staff and your records, before deciding whether to continue."],
  ["03", "A price you can plan around", "If you continue, your Pioneer pricing stays locked while your school remains active. We explain it before your free term ends."],
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>;
}

function DashboardPreview() {
  return (
    <figure className="pn-scene" aria-label="SchoolKit dashboard illustration with sample school data">
      <div className="pn-handnote" aria-hidden="true">Your school. A little clearer.<svg viewBox="0 0 100 45"><path d="M4 4Q20 50 83 23M69 17l17 5-9 14" /></svg></div>
      <div className="pn-dashboard">
        <div className="pn-browser"><span className="pn-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>schoolkit.ng / your school</span><span className="pn-preview-label">Product illustration</span></div>
        <div className="pn-app">
          <div className="pn-sidebar" aria-hidden="true"><b>sk<span>•</span></b><span className="pn-current">Overview</span><span>Students</span><span>Bursary</span><span>Academics</span><span>Attendance</span><span>Parents</span><small>YOUR SCHOOL,<br />CONNECTED.</small></div>
          <div className="pn-app-content">
            <div className="pn-app-title"><div><span>YOUR SCHOOL AT A GLANCE</span><h2>A clearer picture.</h2></div><span className="pn-app-avatar" aria-hidden="true">AO</span></div>
            <div className="pn-kpis"><div><span>Fees collected</span><strong>₦8.4m</strong><small>This term</small></div><div><span>Students</span><strong>248</strong><small>12 classes</small></div><div><span>Attendance</span><strong>96%</strong><small>Today</small></div></div>
            <div className="pn-chart"><div><b>Fee collection</b><span>This term ↗</span></div><div className="pn-chart-bars" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <i key={i} />)}</div><div className="pn-chart-axis"><span>Week 1</span><span>Week 10</span></div></div>
            <div className="pn-payment"><span className="pn-payment-icon" aria-hidden="true">✓</span><div><b>Payment recorded</b><span>Basic 4 · Digital receipt issued</span></div><strong>₦45,000</strong></div>
          </div>
        </div>
      </div>
      <div className="pn-floating"><span aria-hidden="true">✓</span><div><b>You bring the school.</b><small>We help with the setup.</small></div></div>
      <figcaption>Illustrative dashboard. Figures shown are sample data.</figcaption>
    </figure>
  );
}

export default function PioneerPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };

  return (
    <div className="sk-home pn-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <section className="pn-hero">
        <div className="wrap pn-hero-grid">
          <div className="pn-hero-copy">
            <p className="pn-eyebrow"><span /> THE SCHOOLKIT PIONEER OFFER</p>
            <h1>Your school.<br />A fresh start.<br /><mark>One term free.</mark></h1>
            <p className="pn-lede">Bring fees, results, attendance and parent communication together. We’ll help your team get set up. You’ll have a full school term to make it your own.</p>
            <div className="pn-actions"><a className="pn-button pill" href="#setup">Set up my school free <Arrow diagonal /></a><a className="pn-secondary" href="/demo"><span className="pn-play" aria-hidden="true">▶</span> Watch the walkthrough</a></div>
            <p className="pn-reassurance"><span>✓ No setup fee</span><span>✓ No card required</span><span>✓ No long-term commitment</span></p>
          </div>
          <DashboardPreview />
        </div>
        <div className="wrap pn-facts"><div><strong>One full term</strong><span>Use SchoolKit in your real school day</span></div><div><strong>Guided onboarding</strong><span>Set up alongside our team</span></div><div><strong>Pioneer pricing</strong><span>Locked while your school stays active</span></div><div><span className="pn-made">MADE FOR NIGERIAN<br /><b>PRIVATE SCHOOLS.</b></span></div></div>
      </section>

      <section className="pn-section" aria-labelledby="pn-work-heading">
        <div className="wrap">
          <div className="pn-heading"><div><p className="pn-eyebrow">LESS CHASING. MORE CLARITY.</p><h2 id="pn-work-heading">The work you already do.<br /><em>A better way to do it.</em></h2></div><p>Give your bursar, teachers and school leaders one connected place to find the answers they need.</p></div>
          <div className="pn-feature-grid">
            <article className="pn-feature pn-finance"><div className="pn-feature-label"><span>01 / FEES & PAYMENTS</span><Arrow diagonal /></div><h3>Know what’s paid.<br />And what’s still due.</h3><p>Keep bills, part payments, balances and receipts with the right student. Spend less time piecing together bank alerts and spreadsheets.</p><div className="pn-statement"><div><b>Student account</b><span>Example · First term</span></div><dl><div><dt>Total billed</dt><dd>₦125,000</dd></div><div><dt>Amount paid</dt><dd>₦80,000</dd></div><div><dt>Outstanding</dt><dd>₦45,000</dd></div></dl><span className="pn-status">Part payment recorded</span></div><a className="pn-secondary" href="/features/school-fees-management-software">Explore fee management <Arrow /></a></article>
            <article className="pn-feature pn-academics"><div className="pn-feature-label"><span>02 / RESULTS & REPORTS</span><Arrow diagonal /></div><h3>From scores<br />to something parent-ready.</h3><p>Record marks, calculate grades and prepare report cards through an approval workflow. Keep results connected to the student’s record.</p><div className="pn-report"><div><b>Term report</b><span className="pn-status">For review</span></div><table><caption className="pn-sr-only">Illustrative subject scores</caption><thead><tr><th scope="col">Subject</th><th scope="col">CA</th><th scope="col">Exam</th><th scope="col">Total</th></tr></thead><tbody><tr><td>English</td><td>32</td><td>50</td><td>82</td></tr><tr><td>Mathematics</td><td>35</td><td>53</td><td>88</td></tr><tr><td>Basic Science</td><td>30</td><td>48</td><td>78</td></tr></tbody></table><small>Example data · Your school’s grading setup</small></div><a className="pn-secondary" href="/features/result-management-software">Explore results & reports <Arrow /></a></article>
            <article className="pn-feature pn-everyday"><span className="pn-round-icon" aria-hidden="true">✓</span><div><p className="pn-feature-label">03 / EVERYDAY SCHOOL LIFE</p><h3>The right record. The right people.</h3><p>Find student details, mark attendance and keep parents informed. Give each member of your school community access to what they need.</p></div><a className="pn-secondary" href="/features">See the platform <Arrow /></a></article>
          </div>
        </div>
      </section>

      <section className="pn-section pn-offer" aria-labelledby="pn-offer-heading">
        <div className="wrap pn-offer-grid">
          <div className="pn-offer-copy"><p className="pn-eyebrow">MORE THAN A FREE TRIAL</p><h2 id="pn-offer-heading">A proper start.<br /><em>With people beside you.</em></h2><p>Moving your school’s work into a new system takes care. You won’t have to figure it all out on your own.</p><a className="pn-button pn-button-cream" href="#setup">Let’s set up your school <Arrow diagonal /></a><p className="pn-offer-small">Built around your school’s size and workflow.</p></div>
          <div className="pn-offer-card"><div className="pn-offer-price"><div><span>YOUR FIRST FULL TERM</span><strong>₦0<span> / subscription</span></strong></div><span className="pn-offer-seal">PIONEER<br />OFFER</span></div><div className="pn-included">{included.map(([number, title, body]) => <div key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div><p className="pn-offer-note">No setup fee. No card required. You decide whether to continue after your free term.</p></div>
        </div>
      </section>

      <section className="pn-section pn-process" aria-labelledby="pn-process-heading"><div className="wrap"><div className="pn-heading"><div><p className="pn-eyebrow">ONE PRACTICAL STEP AT A TIME</p><h2 id="pn-process-heading">You bring your school.<br /><em>We help with the next steps.</em></h2></div><p>Choose a staff member to coordinate with us. We’ll work with your team on a setup that fits your school.</p></div><ol className="pn-timeline"><li><span className="pn-step-number">01</span><h3>Let’s talk about your school.</h3><p>Share your details below. We’ll get in touch within two business days and arrange a walkthrough around your needs.</p></li><li><span className="pn-step-number">02</span><h3>Get set up, together.</h3><p>We’ll guide your appointed contact through configuration and help prepare your initial school records.</p></li><li><span className="pn-step-number">03</span><h3>Make it part of your day.</h3><p>Use SchoolKit for one full term. See how it works for your staff, then decide whether to keep going.</p></li></ol></div></section>

      <section className="pn-section pn-setup-section" id="setup" aria-labelledby="pn-setup-heading"><div className="wrap pn-setup-grid">
        <aside className="pn-setup-aside"><p className="pn-eyebrow">YOUR SCHOOL’S NEXT CHAPTER</p><h2 id="pn-setup-heading">Let’s make<br />the school day<br /><mark>a little easier.</mark></h2><p>Tell us where your school is today. We’ll help you work out where SchoolKit can make a difference.</p><div className="pn-next"><span>WHAT HAPPENS NEXT</span><p><b>A conversation, not a commitment.</b> Our team will contact you within two business days to arrange your walkthrough.</p></div><ul className="pn-setup-checks"><li>One term free</li><li>Guided school setup</li><li>Pioneer pricing if you continue</li></ul><a className="pn-secondary" href="https://wa.me/2347049677393?text=Hello%20SchoolKit%2C%20I%27d%20like%20to%20discuss%20the%20Pioneer%20Offer." data-location="pioneer-setup">Prefer to talk? WhatsApp us <Arrow diagonal /></a></aside>
        <div className="pn-form-shell"><PioneerLeadForm /></div>
      </div></section>

      <section className="pn-section" aria-labelledby="pn-faq-heading"><div className="wrap pn-faq-grid"><div><p className="pn-eyebrow">BEFORE YOU GET STARTED</p><h2 id="pn-faq-heading">Good questions.<br /><em>Clear answers.</em></h2><p className="pn-faq-intro">Anything else on your mind? <a href="https://wa.me/2347049677393" data-location="pioneer-faq">Ask our team.</a></p></div><div className="pn-faqs">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="pn-closing"><div className="wrap"><div className="pn-closing-card"><p className="pn-eyebrow">A FULL TERM. A FRESH PERSPECTIVE.</p><h2>Give your school<br /><mark>a clearer day.</mark></h2><p>One term to use it. A team to help you start.<br />The decision to continue stays with you.</p><a className="pn-button pill" href="#setup">Set up my school free <Arrow diagonal /></a><span>No setup fee · No card required</span></div></div></section>
    </div>
  );
}
