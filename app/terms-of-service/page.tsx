import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const TITLE = "Terms of Service | SchoolKit";
const DESCRIPTION =
  "The agreement between SchoolKit and the schools that use it — plans and fees, fee collection via Paystack, data ownership, acceptable use and governing law.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/terms-of-service",
    type: "article",
  },
};

const EFFECTIVE_DATE = "16 August 2026";

const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "This agreement",
    body: (
      <>
        <p>
          These Terms of Service govern your school&apos;s use of SchoolKit — the school
          management platform at schoolkit.ng and its associated web and mobile
          applications. SchoolKit operates from Lagos, Nigeria and can be reached at{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
        </p>
        <p>
          By creating an account, joining the early-access waitlist, or using any part of
          the service, you agree to these Terms. If you do not agree, do not use
          SchoolKit.
        </p>
        <p>
          <strong>Authority to accept.</strong> If you are accepting on behalf of a
          school, you confirm you are authorised to bind that school to this agreement.
          &quot;You&quot; and &quot;your&quot; then mean the school. If you have no such
          authority, do not create an account.
        </p>
        <p>
          These Terms work alongside our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, which forms part of this
          agreement.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    heading: "Definitions",
    body: (
      <ul>
        <li>
          <strong>&quot;Service&quot;</strong> — the SchoolKit platform, website,
          applications, APIs and support.
        </li>
        <li>
          <strong>&quot;School&quot;</strong> — the educational institution that holds
          the account.
        </li>
        <li>
          <strong>&quot;Authorised User&quot;</strong> — anyone the School permits to
          access its account: administrators, teachers, non-teaching staff, and where
          enabled, students and parents.
        </li>
        <li>
          <strong>&quot;School Data&quot;</strong> — all content the School or its
          Authorised Users put into the Service, including student records, attendance,
          results, staff files and financial records.
        </li>
        <li>
          <strong>&quot;Term&quot;</strong> — an academic term as configured in the
          School&apos;s account, and the billing period for term-based plans.
        </li>
      </ul>
    ),
  },
  {
    id: "the-service",
    heading: "The Service and its early-access status",
    body: (
      <>
        <p>SchoolKit currently provides:</p>
        <ul>
          <li>Fee collection via Paystack, with automatic digital receipts</li>
          <li>Student and enrolment management</li>
          <li>Attendance tracking, with automatic absence notifications to parents</li>
          <li>Grading and report card generation</li>
          <li>Staff management with roles and permissions</li>
          <li>A finance dashboard covering invoiced, collected and outstanding amounts</li>
          <li>Parent communication by WhatsApp and email</li>
          <li>Offline-capable operation that syncs when connectivity returns</li>
        </ul>
        <p>
          Features described on our website as &quot;coming soon&quot; — including the AI
          Tutor, reports and analytics, lesson notes, timetable management, event
          calendar, assessments and exams, and the result checker — are{" "}
          <strong>not yet available</strong>. Nothing on our website or in our marketing
          is a commitment to deliver a feature by a particular date, and you should not
          subscribe in reliance on functionality that has not shipped.
        </p>
        <p>
          <strong>Early access.</strong> SchoolKit is in early access. Some features are
          new, and the Service may change, break or be interrupted more often than a
          fully mature product. We onboard pioneer schools by hand and support them
          closely, but early-access schools should keep their own independent records
          during the first term of use.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    heading: "Accounts, users and security",
    body: (
      <>
        <p>
          You are responsible for everything that happens under your account. That means:
        </p>
        <ul>
          <li>
            Providing accurate registration details and keeping them up to date
          </li>
          <li>
            Keeping login credentials confidential and requiring the same of your staff
          </li>
          <li>
            Assigning roles and permissions appropriately, so each user sees only what
            their job requires
          </li>
          <li>
            Removing access promptly when a staff member leaves or changes role
          </li>
          <li>
            Telling us at once, at{" "}
            <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>, if you suspect
            unauthorised access
          </li>
        </ul>
        <p>
          Accounts may not be shared between schools. Each school requires its own
          subscription.
        </p>
      </>
    ),
  },
  {
    id: "school-responsibilities",
    heading: "Your responsibilities as a school",
    body: (
      <>
        <p>
          Because you control the personal data of children, parents and staff, you agree
          that:
        </p>
        <ul>
          <li>
            You have the lawful authority and any necessary parental or guardian consent
            to enter student data into SchoolKit, and to have us send messages to the
            parents and guardians whose contact details you upload.
          </li>
          <li>
            You have told parents, guardians and staff that you use a third-party school
            management platform, as your own privacy notice requires.
          </li>
          <li>
            The data you enter is accurate, and you will correct it when you learn it is
            not.
          </li>
          <li>
            You will comply with the Nigeria Data Protection Act 2023 — or the equivalent
            law where your school operates — in your use of the Service.
          </li>
          <li>
            You will use fee, attendance and results functionality honestly, and will not
            use the Service to issue misleading receipts or falsify records.
          </li>
        </ul>
        <p>
          You are the data controller for School Data. We act as your data processor and
          handle it on your documented instructions, as set out in our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <>
        <p>You must not:</p>
        <ul>
          <li>
            Use the Service for anything unlawful, fraudulent, or harmful to children
          </li>
          <li>
            Upload malware, attempt to breach security, probe our infrastructure without
            written permission, or access another school&apos;s data
          </li>
          <li>
            Reverse engineer, decompile or copy the Service, or use it to build a
            competing product
          </li>
          <li>
            Resell, sublicense or provide the Service to a third party as a bureau
            service, unless we agree in writing
          </li>
          <li>
            Scrape or bulk-extract data other than through the export tools we provide
          </li>
          <li>
            Send spam, or use parent communication features for anything other than
            legitimate school business
          </li>
          <li>
            Place an unreasonable load on the Service, or interfere with other
            schools&apos; use of it
          </li>
        </ul>
        <p>
          We may suspend an account immediately where we reasonably believe this section
          has been breached, and will tell you why.
        </p>
      </>
    ),
  },
  {
    id: "plans-and-fees",
    heading: "Plans, fees and billing",
    body: (
      <>
        <p>
          SchoolKit is priced per academic term, with a discount for annual payment.
          Current published plans are Free (up to 100 students), Starter, Growth,
          Professional and Enterprise, each with its own student cap and feature set as
          shown on our pricing page. The Free plan does not include Paystack fee
          collection, digital receipts, report cards or parent communication.
        </p>
        <ul>
          <li>
            <strong>Currency.</strong> Fees are stated and payable in Nigerian Naira
            (₦) unless we agree otherwise in writing.
          </li>
          <li>
            <strong>Taxes.</strong> Prices exclude VAT and any other applicable tax,
            which is added where the law requires it.
          </li>
          <li>
            <strong>Payment timing.</strong> Subscription fees are payable in advance for
            each term or year.
          </li>
          <li>
            <strong>Student caps.</strong> If your enrolment exceeds your plan&apos;s
            cap, we will contact you to move you to the appropriate plan from the
            following billing period.
          </li>
          <li>
            <strong>Price changes.</strong> We may change prices with at least 30
            days&apos; notice before your next billing period. Pioneer and founding-school
            pricing, where we have granted it in writing, is honoured for as long as the
            school remains continuously subscribed.
          </li>
          <li>
            <strong>Late or failed payment.</strong> If a subscription payment fails, we
            will contact you. If it remains unpaid, we may restrict paid features while
            keeping your data available for export.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "fee-collection",
    heading: "Collecting school fees through SchoolKit",
    body: (
      <>
        <p>
          Where you use SchoolKit to collect fees from parents, the following applies and
          is important.
        </p>
        <ul>
          <li>
            <strong>Paystack processes the payments.</strong> Transactions are handled by
            Paystack under the School&apos;s own merchant arrangement with Paystack, and
            are subject to Paystack&apos;s terms. Settlement to the School&apos;s bank
            account is made by Paystack, on Paystack&apos;s settlement cycle.
          </li>
          <li>
            <strong>SchoolKit is not a bank or a licensed payment service
            provider.</strong> We do not take deposits, hold school funds, or guarantee
            settlement. We record and reconcile transactions; we do not move the money.
          </li>
          <li>
            <strong>Transaction charges.</strong> Paystack&apos;s processing charges
            apply to each transaction and are separate from your SchoolKit subscription
            fee.
          </li>
          <li>
            <strong>Refunds and chargebacks to parents</strong> are a matter between the
            School, the parent and Paystack. We will provide the transaction records
            needed to resolve a dispute.
          </li>
          <li>
            <strong>Your ledger is your responsibility.</strong> While SchoolKit is built
            to keep fee records accurate, the School remains responsible for reconciling
            its own accounts and for the fee amounts it charges.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-ownership",
    heading: "Ownership of data and getting it back",
    body: (
      <>
        <p>
          <strong>School Data belongs to the School.</strong> We claim no ownership of
          your student records, results, attendance or financial data. We use it only to
          provide and support the Service, and as described in our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
        <p>
          You grant us a limited licence to host, copy, transmit, display and back up
          School Data strictly for the purpose of operating the Service for you. That
          licence ends when the data is deleted.
        </p>
        <p>
          <strong>Export.</strong> You can export your School Data at any time while your
          account is active. After termination, your data remains available for export
          for 90 days, after which it is deleted or irreversibly anonymised, subject to
          the financial-record retention described in our Privacy Policy.
        </p>
        <p>
          <strong>Aggregated statistics.</strong> We may compile anonymised, aggregated
          statistics about how the Service is used — for example, average fee collection
          rates across schools — to improve the product and describe it publicly. These
          never identify a school, student, parent or staff member.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    heading: "Availability, offline mode and support",
    body: (
      <>
        <p>
          We work to keep SchoolKit available continuously, but we do not offer a
          guaranteed uptime commitment during early access. The Service may be
          unavailable during maintenance, or because of failures at a hosting, payment or
          messaging provider.
        </p>
        <p>
          <strong>Offline mode</strong> lets the Service keep working without an internet
          connection, syncing when connectivity returns. Sync depends on the device
          reconnecting; data entered offline on a device that is lost, wiped or never
          reconnected may not reach our servers. Schools should reconnect devices
          regularly.
        </p>
        <p>
          <strong>Support</strong> is provided by email at{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a> and by WhatsApp
          during Nigerian business hours. Early-access schools receive hands-on
          onboarding support as described when they join.
        </p>
      </>
    ),
  },
  {
    id: "ai-tutor",
    heading: "AI features",
    body: (
      <>
        <p>
          When the AI Tutor and other AI features become available, these additional
          terms apply:
        </p>
        <ul>
          <li>
            AI-generated lessons and quizzes are held for teacher review and must be
            approved before students see them. The School is responsible for that review.
          </li>
          <li>
            AI output may contain errors. It supports teaching and does not replace a
            teacher&apos;s judgement or a school&apos;s curriculum obligations. Do not
            rely on it for assessment decisions without checking it.
          </li>
          <li>
            We do not permit our AI providers to use School Data to train their general
            models.
          </li>
          <li>
            Schools may disable AI features for their students at any time.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: (
      <>
        <p>
          SchoolKit, including its software, design, branding, documentation and content,
          belongs to us and is protected by intellectual property law. We grant you a
          non-exclusive, non-transferable, revocable right to use the Service for your
          school&apos;s own internal operations for as long as your subscription is
          active.
        </p>
        <p>
          You may not use our name, logo or branding without written permission, except
          to state factually that your school uses SchoolKit.
        </p>
        <p>
          <strong>Feedback.</strong> If you suggest improvements, we may implement them
          freely and without obligation or payment to you. You keep no rights in the
          resulting features.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    heading: "Third-party services",
    body: (
      <p>
        The Service depends on third parties — Paystack for payments, Meta&apos;s
        WhatsApp for messaging, Resend for email, and hosting and infrastructure
        providers. Their own terms govern their services, and we are not responsible for
        their acts, omissions, outages, charges or policy changes. Where a third-party
        provider changes or withdraws its service in a way that affects SchoolKit, we
        will tell you and work to find an alternative.
      </p>
    ),
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: (
      <p>
        Each party may learn confidential information about the other. Both agree to
        protect it, use it only for the purposes of this agreement, and not disclose it
        except to staff and advisers who need it and are bound by equivalent obligations,
        or where disclosure is required by law. This does not apply to information that
        is public through no fault of the receiving party, or was already lawfully known
        to it.
      </p>
    ),
  },
  {
    id: "warranties",
    heading: "Warranties and disclaimers",
    body: (
      <>
        <p>
          We warrant that we will provide the Service with reasonable skill and care, and
          in accordance with applicable Nigerian law.
        </p>
        <p>
          Beyond that, and to the fullest extent permitted by law, the Service is
          provided <strong>&quot;as is&quot;</strong>. We do not warrant that it will be
          uninterrupted, error-free, or that it will meet every requirement of your
          school. We disclaim all implied warranties, including merchantability and
          fitness for a particular purpose, to the extent the law allows.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot lawfully be
          excluded, including liability for death or personal injury caused by negligence,
          or for fraud.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: (
      <>
        <p>To the fullest extent permitted by Nigerian law:</p>
        <ul>
          <li>
            Neither party is liable for indirect, incidental, special or consequential
            loss, or for loss of profit, revenue, goodwill or anticipated savings.
          </li>
          <li>
            Our total aggregate liability arising out of or relating to this agreement,
            in any 12-month period, is limited to the total subscription fees you paid us
            in the 12 months before the event giving rise to the claim.
          </li>
          <li>
            For schools on the Free plan, where no fees have been paid, our total
            aggregate liability is limited to ₦50,000.
          </li>
          <li>
            We are not liable for loss arising from your failure to keep your own records
            or backups, from unauthorised access caused by your handling of credentials,
            or from a third-party provider&apos;s failure.
          </li>
        </ul>
        <p>
          These limits reflect the price of the Service and the allocation of risk between
          us. They do not apply to your obligation to pay fees, to either party&apos;s
          breach of confidentiality, or to liability that cannot lawfully be limited.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: (
      <p>
        You agree to indemnify us against claims, losses and reasonable costs arising
        from your use of the Service in breach of these Terms, from School Data you
        entered without lawful authority or the necessary consent, or from your breach of
        applicable data protection law. We will notify you promptly of any such claim and
        will not settle it without consulting you.
      </p>
    ),
  },
  {
    id: "termination",
    heading: "Cancellation, suspension and termination",
    body: (
      <>
        <p>
          <strong>You may cancel at any time.</strong> Cancellation takes effect at the
          end of your current billing period, and you keep access until then. Fees
          already paid are not refunded for a partial term or year except where the law
          requires it, or where we have failed to provide the Service in a material way.
        </p>
        <p>
          <strong>We may suspend or terminate</strong> if you materially breach these
          Terms and do not fix it within 14 days of written notice; if fees remain unpaid
          after notice; if we reasonably believe your use endangers children, other
          schools or the Service; or if required by law. Where a breach is serious and
          ongoing, suspension may be immediate.
        </p>
        <p>
          <strong>Discontinuing the Service.</strong> If we ever decide to withdraw
          SchoolKit, we will give schools at least 90 days&apos; notice, provide full data
          export, and refund the unused portion of any prepaid fee.
        </p>
        <p>
          <strong>On termination</strong> your access ends, and the export window in{" "}
          <a href="#data-ownership">section 9</a> applies. Sections on data ownership,
          confidentiality, liability, indemnity and governing law survive termination.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to these Terms and to the Service",
    body: (
      <>
        <p>
          We may update these Terms as SchoolKit develops. For material changes we will
          give at least 30 days&apos; notice by email or in-app notice before they take
          effect. If you do not accept a material change, you may cancel before it takes
          effect and we will refund the unused portion of any prepaid fee.
        </p>
        <p>
          We may also change, add or remove features. We will not materially reduce the
          core functionality of a paid plan during a period you have already paid for
          without offering you a pro-rata refund.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law and disputes",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria,
          without regard to conflict-of-law rules.
        </p>
        <p>
          <strong>Talk to us first.</strong> If a dispute arises, both parties agree to
          try in good faith to resolve it by discussion, starting with written notice to{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>, for 30 days before
          starting formal proceedings.
        </p>
        <p>
          If that fails, the courts of Lagos State, Nigeria have exclusive jurisdiction,
          and both parties submit to them. Schools outside Nigeria retain any
          non-waivable rights and protections available under the mandatory law of their
          own country.
        </p>
      </>
    ),
  },
  {
    id: "general",
    heading: "General",
    body: (
      <ul>
        <li>
          <strong>Force majeure.</strong> Neither party is liable for failure to perform
          caused by events beyond reasonable control — including power failure, network or
          telecommunications outage, natural disaster, civil unrest, government action or
          failure of a third-party provider. SchoolKit&apos;s offline mode is designed to
          reduce the impact of power and connectivity problems, but does not eliminate
          them.
        </li>
        <li>
          <strong>Assignment.</strong> You may not assign this agreement without our
          written consent. We may assign it to a successor in a merger, acquisition or
          sale of assets, on notice to you.
        </li>
        <li>
          <strong>Severability.</strong> If any provision is held unenforceable, the rest
          continues in force.
        </li>
        <li>
          <strong>No waiver.</strong> Failure to enforce a provision is not a waiver of
          the right to enforce it later.
        </li>
        <li>
          <strong>Entire agreement.</strong> These Terms and the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, together with any written
          order form or pioneer-pricing agreement we sign with you, are the entire
          agreement between us and replace any prior understanding.
        </li>
        <li>
          <strong>Notices.</strong> We send notices to the email on your account. Send
          notices to us at <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
        </li>
      </ul>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <>
        <p>Questions about these Terms:</p>
        <ul>
          <li>
            Email: <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>
          </li>
          <li>
            WhatsApp:{" "}
            <a
              href="https://wa.me/2347049677393"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 704 967 7393
            </a>
          </li>
          <li>Location: Lagos, Nigeria</li>
        </ul>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      summary="The agreement between SchoolKit and the schools that use it."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
    />
  );
}
