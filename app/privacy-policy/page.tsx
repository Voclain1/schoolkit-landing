import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

const TITLE = "Privacy Policy | SchoolKit";
const DESCRIPTION =
  "How SchoolKit collects, uses and protects school, student, parent and staff data — written for Nigerian private schools under the Nigeria Data Protection Act 2023.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/privacy-policy",
    type: "article",
  },
};

const EFFECTIVE_DATE = "30 October 2026";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are and what this covers",
    body: (
      <>
        <p>
          SchoolKit is a school management platform built in Lagos, Nigeria for
          private schools across Nigeria and the wider African continent. We help
          schools collect fees, track attendance, manage student and staff records,
          generate report cards and communicate with parents.
        </p>
        <p>
          This Privacy Policy explains what personal data we collect, why we collect
          it, who we share it with and what rights you have. It applies to:
        </p>
        <ul>
          <li>
            <strong>schoolkit.ng</strong> — this website, including our blog and the
            form for getting started or sending us an enquiry;
          </li>
          <li>
            <strong>the SchoolKit application</strong> — the web and mobile software
            your school uses to run day-to-day operations;
          </li>
          <li>
            <strong>school web pages</strong> — each school&apos;s public page at
            &lt;code&gt;.schoolkit.ng, its admission form and its result checker;
          </li>
          <li>
            <strong>our communications</strong> — the emails, text messages (SMS) and
            app notifications we send to schools, staff and parents on a school&apos;s
            behalf.
          </li>
        </ul>
        <p>
          Throughout this policy, &quot;SchoolKit&quot;, &quot;we&quot;, &quot;us&quot;
          and &quot;our&quot; mean SchoolKit, operating from Lagos, Nigeria and
          reachable at <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
        </p>
      </>
    ),
  },
  {
    id: "summary",
    heading: "The short version",
    body: (
      <>
        <p>
          The full policy is below, but here is the substance of it in plain English:
        </p>
        <ul>
          <li>
            <strong>Your school owns its data.</strong> Student records, results,
            attendance and fee history belong to the school, not to us. We hold them on
            the school&apos;s instructions.
          </li>
          <li>
            <strong>We never sell personal data.</strong> Not to advertisers, not to
            data brokers, not to anyone. There is no circumstance in which we would.
          </li>
          <li>
            <strong>We never store card details.</strong> Fee payments run through
            Paystack, a licensed and PCI-DSS compliant processor. Card numbers and PINs
            never reach our servers.
          </li>
          <li>
            <strong>Student data is not sold, rented or used to advertise to
            children.</strong> We do not run advertising inside the SchoolKit
            application.
          </li>
          <li>
            <strong>You can get your data out.</strong> Schools can export their
            records, and can ask us to delete them when they leave.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "roles",
    heading: "Two different roles: your school and SchoolKit",
    body: (
      <>
        <p>
          This distinction matters, and it determines who you contact about what.
        </p>
        <p>
          <strong>Where your school is the data controller.</strong> For everything
          inside the school&apos;s SchoolKit account — student records, guardian
          contact details, attendance marks, results, invoices, staff files — the
          school decides what is collected and why. SchoolKit acts as a{" "}
          <strong>data processor</strong>, handling that information only on the
          school&apos;s documented instructions. If you are a parent, guardian, student
          or staff member and you want to access, correct or delete your information,
          contact your school first. We will support the school in answering you, but
          we cannot act on the school&apos;s data without its authority.
        </p>
        <p>
          <strong>Where SchoolKit is the data controller.</strong> For our own
          business activity — the marketing website, the website contact form, sales
          enquiries, support conversations, billing records and our own staff
          recruitment — we decide the purposes ourselves and act as the{" "}
          <strong>data controller</strong>. Contact us directly about any of this at{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
        </p>
        <p>
          Schools using SchoolKit to process personal data are bound by our{" "}
          <Link href="/terms-of-service">Terms of Service</Link> and our{" "}
          <Link href="/data-processing-agreement">Data Processing Agreement</Link>,
          which set out each side&apos;s duties under the Nigeria Data Protection Act
          2023.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: (
      <>
        <h3>School and administrator information</h3>
        <ul>
          <li>School name, address, logo, term structure and grading configuration</li>
          <li>
            Names, email addresses, phone numbers and roles of the people who
            administer the account
          </li>
          <li>Login credentials — passwords are stored hashed, never in plain text</li>
        </ul>

        <h3>Student information (entered by your school)</h3>
        <ul>
          <li>
            Name, admission number, date of birth, gender, class and enrolment history
          </li>
          <li>Photograph, where the school chooses to upload one</li>
          <li>Attendance records</li>
          <li>Scores, grades, comments and generated report cards</li>
          <li>Fee invoices, payment history and outstanding balances</li>
          <li>
            Homework, assignment answers and files, online exam answers and scores
          </li>
          <li>
            Behaviour and discipline records, library loans, transport routes, hostel
            places, exeats and ID cards, where the school uses those parts of SchoolKit
          </li>
          <li>
            Any additional notes or fields the school chooses to record in free-text
            areas
          </li>
        </ul>

        <h3>Health information (sensitive)</h3>
        <p>
          Where a school uses the health and sickbay features, it may record a
          student&apos;s blood group, allergies, medical conditions, medicines,
          vaccination records and copies of vaccination cards, sickbay visits and
          medicines given at school. Health data is sensitive personal data under the
          NDPA 2023. Only the staff roles the school chooses can see it, every view of a
          health record is limited by role, and a parent sees only their own
          child&apos;s. See <a href="#children">section 6</a> for consent.
        </p>

        <h3>Parent and guardian information</h3>
        <ul>
          <li>Name, relationship to the student, phone number, email and address</li>
          <li>Payment records and receipts associated with their ward&apos;s fees</li>
          <li>
            Messages they send to the school through the parents&apos; site or app,
            with any photos attached, and their replies to events and exeat requests
          </li>
          <li>Delivery status of messages we send on the school&apos;s behalf</li>
          <li>
            The time a parent accepted the portal invitation and agreed to this
            policy, with the version of the wording they saw
          </li>
        </ul>

        <h3>Admission applications</h3>
        <p>
          When a family applies through a school&apos;s admission form, we hold the
          details and documents they send on the school&apos;s behalf, with the time
          they gave consent and the version of the consent wording. Applications that
          do not lead to admission are deleted, as the form tells families.
        </p>

        <h3>Staff information</h3>
        <ul>
          <li>
            Name, contact details, role, subjects and classes assigned, employment
            status
          </li>
          <li>Permissions and access level within the school&apos;s account</li>
          <li>Photograph, salary and bank details, where the school records them</li>
          <li>
            BVN, where the school uses payroll — stored encrypted, and every time it is
            revealed is recorded
          </li>
          <li>Activity logs showing actions taken in the system</li>
        </ul>

        <h3>Payment information</h3>
        <p>
          When fees are paid through SchoolKit, the transaction is handled by Paystack.
          We receive and store a transaction reference, amount, currency, payment
          channel, timestamp, status and a masked identifier (for example, the last four
          digits of a card). <strong>We do not receive or store full card numbers, CVVs,
          PINs or bank login credentials.</strong>
        </p>

        <h3>Photos on school web pages</h3>
        <p>
          A school can publish news and photos on its public page. Photos of pupils are
          not allowed there: staff must confirm, photo by photo, that a photo shows no
          pupils, and anyone can report a photo to us for removal.
        </p>

        <h3>AI-assisted features</h3>
        <p>
          Where a school uses them, we process what a teacher asks for and what is
          drafted in reply, together with the class and subject. See{" "}
          <a href="#ai-tutor">section 9</a> for what is sent and what is not.
        </p>

        <h3>Technical and usage information</h3>
        <ul>
          <li>IP address, browser type, device type and operating system</li>
          <li>Pages visited, features used, and timestamps</li>
          <li>Error reports and diagnostic logs when something goes wrong</li>
          <li>
            For offline mode: a local copy of the school&apos;s working data stored on
            the device, which syncs when connectivity returns
          </li>
        </ul>

        <h3>Website form and marketing information</h3>
        <p>
          If you send us a request through the form on our website, we collect the email
          address you provide, your WhatsApp number if you choose to give one, what you
          asked for help with (for example setting up your school, a setup call or a
          question), the time you sent it and which part of the page you sent it from.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How we use information, and our lawful basis",
    body: (
      <>
        <p>
          Under section 25 of the Nigeria Data Protection Act 2023, we must have a
          lawful basis for each purpose. Ours are:
        </p>
        <ul>
          <li>
            <strong>Performance of a contract</strong> — running the school&apos;s
            account, processing fee payments, generating report cards, delivering
            receipts and notifications, and providing support.
          </li>
          <li>
            <strong>Legitimate interests</strong> — securing the platform against
            fraud and abuse, diagnosing faults, understanding which features are used so
            we can improve them, and communicating with schools about service changes.
            We balance these against your rights and interests.
          </li>
          <li>
            <strong>Consent</strong> — marketing emails, the website contact form,
            non-essential analytics cookies, and any optional feature a school switches
            on. Consent can be withdrawn at any time.
          </li>
          <li>
            <strong>Legal obligation</strong> — retaining financial records, and
            responding to lawful requests from regulators or courts.
          </li>
          <li>
            <strong>Instructions of the data controller</strong> — where we process
            student, parent and staff data on your school&apos;s behalf, the school
            establishes the lawful basis and we act on its instructions, under our{" "}
            <Link href="/data-processing-agreement">Data Processing Agreement</Link>.
          </li>
          <li>
            <strong>Sensitive data</strong> — health information is processed only on
            the school&apos;s instructions, for the child&apos;s care at school, and only
            where the school has the parent&apos;s explicit consent or another lawful
            ground under section 30 of the NDPA 2023.
          </li>
        </ul>
        <p>
          We do not use student, parent or staff data for our own marketing. We do not
          profile students for advertising purposes. We do not make automated decisions
          that produce legal or similarly significant effects on any individual.
        </p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children's data and parental consent",
    body: (
      <>
        <p>
          SchoolKit is used to manage records about children. We treat that data as
          sensitive and handle it accordingly.
        </p>
        <p>
          <strong>SchoolKit is not directed at children.</strong> Accounts are created
          and controlled by schools. Students access only the parts of the platform a
          school assigns to them — for example, their timetable, homework and results.
        </p>
        <p>
          <strong>Consent is obtained by the school.</strong> Under section 31 of the
          NDPA 2023, processing a child&apos;s personal data requires the consent of a
          parent or legal guardian. The school is responsible for obtaining that
          consent, usually through its enrolment forms or parent handbook, for
          obtaining explicit consent before recording health information, and for
          telling parents that it uses SchoolKit. When a school owner creates an
          account, and again when setup is finished, they confirm that the school has
          that consent and the authority to put children&apos;s records into SchoolKit;
          we record when they did.
        </p>
        <p>
          <strong>How SchoolKit helps.</strong> We give schools a ready-made letter to
          tell parents the school uses SchoolKit, what it holds and how to ask
          questions. Families applying online give consent on the admission form, and
          we record the time and wording. Parents agree to this policy when they first
          sign in to the parents&apos; site or app, and we record that too. A
          student&apos;s own app account is set up only through an invitation from
          their parent.
        </p>
        <p>
          <strong>What we will not do.</strong> We do not sell children&apos;s data, do
          not serve advertising to students, do not build advertising profiles from
          student activity, and do not disclose student data to third parties except the
          service providers listed in <a href="#sharing">section 10</a>, all of which are
          bound to process it only on our instructions.
        </p>
        <p>
          If you believe a child&apos;s data has been entered into SchoolKit without
          proper authority, contact your school and copy us at{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>. We will work with
          the school to resolve it promptly.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    heading: "Fee payments and Paystack",
    body: (
      <>
        <p>
          Fee collection through SchoolKit is processed by{" "}
          <a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">
            Paystack
          </a>
          , a payment company licensed by the Central Bank of Nigeria and certified to
          PCI-DSS Level 1.
        </p>
        <p>
          When a parent pays, the card, bank transfer or USSD details are entered
          directly into Paystack&apos;s environment. Those details do not pass through
          and are not stored on SchoolKit&apos;s servers. We receive confirmation of the
          transaction and store the reference, amount, status and timestamp so the
          school&apos;s ledger stays accurate and a receipt can be issued.
        </p>
        <p>
          Paystack acts as an independent data controller for the payment data it
          collects, and its own privacy policy governs that processing. Settlement of
          funds to the school&apos;s bank account is handled under the school&apos;s
          arrangement with Paystack.
        </p>
        <p>
          <strong>SchoolKit is not a bank and is not a licensed payment service
          provider.</strong> We do not hold school funds on deposit.
        </p>
      </>
    ),
  },
  {
    id: "communications",
    heading: "Messages we send to parents and staff",
    body: (
      <>
        <p>
          On your school&apos;s instruction, SchoolKit sends transactional messages by
          email, text message (SMS) and app notification: payment receipts, absence
          notifications, results availability, invoices, sickbay and exeat notices, and
          school announcements.
        </p>
        <p>
          These are sent because the school has a relationship with the recipient and
          has asked us to send them — they are not marketing. Recipients who no longer
          wish to receive them should contact the school, which controls the message
          settings and the contact list.
        </p>
        <p>
          Email is delivered through Resend, text messages through Termii, and app
          notifications through Expo and Apple&apos;s or Google&apos;s notification
          services. These providers process delivery metadata such as whether a message
          was delivered or bounced. A parent can stop announcement emails with the
          unsubscribe link in each one, or in the parents&apos; site settings.
        </p>
        <p>
          Marketing emails from SchoolKit itself — product updates and news
          — are separate, are sent only with consent, and carry an unsubscribe link in
          every message.
        </p>
      </>
    ),
  },
  {
    id: "ai-tutor",
    heading: "AI-assisted features",
    body: (
      <>
        <p>
          SchoolKit can draft some of a teacher&apos;s work: report card comments, lesson
          plans, exam questions, class insights, weekly summaries for parents and
          marking feedback. A school can switch these off, and SchoolKit can switch
          them off for a school. The following applies to all of them.
        </p>
        <ul>
          <li>
            <strong>No child&apos;s name or contact details are sent.</strong> Drafts
            are made from opaque references and class-level context (for example
            &quot;a JSS2 student&quot;), never a student&apos;s name, address, date of
            birth or contact details.
          </li>
          <li>
            <strong>Two narrow exceptions, both off unless the school turns them
            on.</strong> <em>Marking feedback</em> sends the student&apos;s typed answer,
            after SchoolKit removes their name, admission number and classmates&apos;
            names. <em>Smart Student Import</em> (in beta) sends a photo of a class
            register the school already holds, so it can be typed up; it includes
            children&apos;s names, which is the point of the feature. In both cases the
            content is used for that one request and is not kept by the AI service, and
            nothing is saved to a student&apos;s record until a member of staff has
            checked it and confirmed.
          </li>
          <li>
            <strong>Teachers stay in control.</strong> Nothing drafted becomes a grade,
            a report comment or a behaviour record until a teacher approves it.
          </li>
          <li>
            <strong>No training on your data.</strong> We use AI model providers in
            the United States under terms that do not allow them to use your
            school&apos;s data to train their models. We do not sell anything a teacher
            or student writes.
          </li>
          <li>
            <strong>AI output can be wrong.</strong> It supports teaching, it does not
            replace a teacher&apos;s judgement. Treat every draft as a draft.
          </li>
        </ul>
        <p>
          An AI Tutor for students is in development and is not available yet. We will
          update this policy and tell schools before it launches.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share information with",
    body: (
      <>
        <p>
          We do not sell personal data. We share it only in the circumstances below.
        </p>
        <h3>Service providers who help us run SchoolKit</h3>
        <p>
          Each is bound by contract to process data only on our instructions and to
          protect it appropriately. Schools can ask us for the current list, with the
          name of each provider, at any time; we tell schools before adding a provider
          that will handle student data.
        </p>
        <ul>
          <li>
            <strong>Paystack</strong> (Nigeria) — fee collection and payment processing
          </li>
          <li>
            <strong>Resend</strong> (United States) — transactional and marketing email
            delivery
          </li>
          <li>
            <strong>Termii</strong> (Nigeria) — text message (SMS) delivery
          </li>
          <li>
            <strong>Expo</strong> (United States), with Apple and Google — app
            notifications
          </li>
          <li>
            <strong>Hosting and database providers</strong> — Fly.io (servers in South
            Africa), Neon (database in Germany), Vercel (United States) and Contabo
            (servers in the European Union, where we are moving our hosting), which run
            the application and store and back up school data
          </li>
          <li>
            <strong>Cloudflare</strong> (United States) — storage of files such as
            photos, documents and receipts
          </li>
          <li>
            <strong>AI model providers</strong> (United States) — the drafting
            features in <a href="#ai-tutor">section 9</a>, under no-training terms
          </li>
          <li>
            <strong>Sentry</strong> (United States) — error reports, with personal data
            removed where we can
          </li>
          <li>
            <strong>PostHog</strong> (United States) — product usage measurement, sent
            with opaque references only, never names or message content
          </li>
          <li>
            <strong>Meta Platforms</strong> (United States, Ireland) and{" "}
            <strong>Google</strong> (United States) — analytics on this marketing
            website, only if you accept cookies, and the spreadsheet behind our
            website contact form
          </li>
        </ul>
        <h3>Other disclosures</h3>
        <ul>
          <li>
            <strong>At your school&apos;s direction</strong> — for example, exporting
            records to an accountant or an education authority.
          </li>
          <li>
            <strong>Where the law requires it</strong> — in response to a valid court
            order, regulatory demand or lawful request. Where we are permitted to, we
            will tell the affected school first.
          </li>
          <li>
            <strong>To protect people</strong> — where disclosure is necessary to
            prevent serious harm, fraud or a threat to someone&apos;s safety.
          </li>
          <li>
            <strong>In a business transfer</strong> — if SchoolKit is involved in a
            merger, acquisition or sale of assets, data may transfer to the successor,
            which would remain bound by this policy. We would notify schools before their
            data became subject to a different policy.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "transfers",
    heading: "Where your data is stored and cross-border transfers",
    body: (
      <>
        <p>
          Some of the providers listed above are located outside Nigeria: today the
          application runs on servers in South Africa, its database is in Germany, and
          several providers are in the United States. We are moving our hosting to
          servers in the European Union. This means personal data is transferred across
          borders.
        </p>
        <p>
          Under section 41 of the NDPA 2023, we transfer personal data outside Nigeria
          only where there is an adequate legal basis — an adequacy determination, or
          contractual safeguards imposing data-protection obligations equivalent to those
          in the Act, or your consent, or where the transfer is necessary to perform our
          contract with your school.
        </p>
        <p>
          We contractually require every provider handling school data to maintain
          appropriate security and to process it only on our instructions. Schools that
          need data residency within a particular country should contact us at{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a> to discuss options
          before onboarding.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep information",
    body: (
      <>
        <p>We keep personal data only as long as we need it:</p>
        <ul>
          <li>
            <strong>Active school accounts</strong> — for as long as the school uses
            SchoolKit.
          </li>
          <li>
            <strong>After a school leaves</strong> — school data remains available for
            export for 90 days, after which it is deleted or irreversibly anonymised,
            unless the school asks us in writing to delete it sooner.
          </li>
          <li>
            <strong>Admission applications</strong> — rejected and withdrawn
            applications, with their documents, are deleted 90 days after the decision;
            an application left open for 12 months is closed and then follows the same
            rule.
          </li>
          <li>
            <strong>Messages between parents and the school</strong> — a conversation
            closes after 30 days without a new message, and is deleted 2 years after it
            closed.
          </li>
          <li>
            <strong>Smart Student Import photos</strong> — not stored; the photo is
            used for the one request and discarded.
          </li>
          <li>
            <strong>Financial and transaction records</strong> — retained for at least 6
            years to meet Nigerian tax and accounting obligations, even after an account
            closes.
          </li>
          <li>
            <strong>Website form and marketing contacts</strong> — until you unsubscribe or
            ask us to delete your details.
          </li>
          <li>
            <strong>Backups</strong> — deleted data persists in encrypted backups for up
            to 90 days before being overwritten on the normal backup cycle.
          </li>
          <li>
            <strong>Technical logs</strong> — typically 12 months.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    heading: "How we protect information",
    body: (
      <>
        <p>The measures we apply include:</p>
        <ul>
          <li>Encryption in transit using TLS, and encryption of data at rest</li>
          <li>Passwords stored using one-way hashing — we cannot read yours</li>
          <li>
            Role-based access control, so a class teacher sees only what their role
            requires
          </li>
          <li>Activity logging on sensitive actions within a school&apos;s account</li>
          <li>Regular backups, with restore testing</li>
          <li>
            Access to production systems restricted to the smallest number of SchoolKit
            personnel necessary, each bound by confidentiality obligations
          </li>
        </ul>
        <p>
          <strong>Offline mode.</strong> SchoolKit is built to keep working when the
          power or the network does not. To do that, a copy of the school&apos;s working
          data is stored on the device in use and synced when connectivity returns.
          Schools should therefore secure their own devices — screen locks, device
          encryption where available, and prompt removal of access for departing staff.
        </p>
        <p>
          <strong>Breach notification.</strong> If a personal data breach occurs that is
          likely to result in a risk to individuals, we will notify the Nigeria Data
          Protection Commission within 72 hours of becoming aware of it, as required by
          the NDPA 2023, and notify affected schools without undue delay so they can
          inform the individuals concerned.
        </p>
        <p>
          No system is perfectly secure, and we do not claim otherwise. We commit to
          acting quickly and transparently if something goes wrong.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights under the NDPA 2023",
    body: (
      <>
        <p>
          If you are in Nigeria, the Nigeria Data Protection Act 2023 gives you the right
          to:
        </p>
        <ul>
          <li>
            <strong>Be informed</strong> about how your data is used — this policy is
            part of meeting that obligation
          </li>
          <li>
            <strong>Access</strong> the personal data held about you
          </li>
          <li>
            <strong>Correct</strong> data that is inaccurate or incomplete
          </li>
          <li>
            <strong>Delete</strong> data where there is no lawful reason to keep it
          </li>
          <li>
            <strong>Restrict or object</strong> to certain processing, including direct
            marketing
          </li>
          <li>
            <strong>Data portability</strong> — receive your data in a structured,
            commonly used format
          </li>
          <li>
            <strong>Withdraw consent</strong> at any time, where consent was the basis
            for processing
          </li>
          <li>
            <strong>Lodge a complaint</strong> with the Nigeria Data Protection
            Commission
          </li>
        </ul>
        <p>
          <strong>How to exercise them.</strong> If your data sits inside a
          school&apos;s SchoolKit account, contact the school — it is the data
          controller. To ask for your SchoolKit account to be deleted, see{" "}
          <Link href="/delete-account">Delete your account</Link>. For data we control ourselves, email{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>. We respond within
          30 days and may need to verify your identity first. There is no charge unless a
          request is manifestly excessive or repetitive.
        </p>
        <p>
          <strong>Complaints.</strong> If you are unhappy with our response you may
          complain to the Nigeria Data Protection Commission (NDPC), Abuja, at{" "}
          <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">
            ndpc.gov.ng
          </a>
          . We would appreciate the chance to put things right first.
        </p>
      </>
    ),
  },
  {
    id: "other-countries",
    heading: "Schools outside Nigeria",
    body: (
      <>
        <p>
          SchoolKit serves schools elsewhere in Africa. Where local law applies to your
          school, we will honour the equivalent rights and obligations under it,
          including:
        </p>
        <ul>
          <li>
            <strong>Ghana</strong> — Data Protection Act, 2012 (Act 843), supervised by
            the Data Protection Commission
          </li>
          <li>
            <strong>Kenya</strong> — Data Protection Act, 2019, supervised by the Office
            of the Data Protection Commissioner
          </li>
          <li>
            <strong>South Africa</strong> — Protection of Personal Information Act, 2013
            (POPIA), supervised by the Information Regulator
          </li>
          <li>
            <strong>Other jurisdictions</strong> — we comply with applicable local data
            protection law in the countries where we offer the service
          </li>
        </ul>
        <p>
          The substantive protections in this policy — no sale of personal data, no
          advertising to students, school ownership of school data, contractual controls
          on providers, breach notification — apply to every school regardless of
          location. Where your local law grants a right this policy does not mention, you
          keep that right and can exercise it by writing to{" "}
          <a href="mailto:hello@schoolkit.ng">hello@schoolkit.ng</a>.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and website analytics",
    body: (
      <>
        <p>
          On schoolkit.ng we use essential cookies and storage, and — only if you accept
          them — analytics and advertising cookies from Google Analytics and the Meta
          Pixel. Nothing optional loads until you choose. The details, and how to change
          your choice, are in our <Link href="/cookies">Cookie Policy</Link>.
        </p>
        <p>
          <strong>We do not run the Meta Pixel or any advertising tracker inside the
          SchoolKit application, the parents&apos; site or school web pages, where
          student data lives.</strong> They are on this marketing website only.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <>
        <p>
          We update this policy as the product develops — the AI Tutor and other features
          still to come will bring changes. Earlier versions are available on request. The effective date at the top always
          reflects the current version.
        </p>
        <p>
          For material changes affecting how we handle school, student or parent data, we
          will notify schools by email or in-app notice before the change takes effect.
          Continuing to use SchoolKit after that point means you accept the updated
          policy.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact us",
    body: (
      <>
        <p>
          For any privacy question, request or complaint — including data access,
          correction and deletion requests:
        </p>
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
        <p>
          Please write &quot;Privacy request&quot; in your subject line so it reaches the
          right person quickly.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      summary="How SchoolKit collects, uses and protects information about schools, students, parents and staff."
      effectiveDate={EFFECTIVE_DATE}
      sections={sections}
    />
  );
}
