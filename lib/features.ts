/**
 * Feature landing pages (/features/[slug]).
 *
 * These are the site's commercial-intent pages: each one targets a head keyword a
 * Nigerian school owner types when they are shopping for software ("school fees
 * management software Nigeria", "result management software", ...), where the blog
 * posts target the longer, informational questions around them. Blog posts link up
 * to these pages and these pages link back down to the posts, so the two reinforce
 * each other instead of competing for the same query.
 *
 * Only features marked "Live now" on the homepage get a page here. A feature that is
 * still "Coming soon" (CBT, result checker, timetable, mobile app, AI tutor) must not
 * be described as available — add its page when it ships, not before.
 */

export interface FeatureFaq {
  question: string;
  answer: string;
}

export interface FeatureCapability {
  title: string;
  body: string;
}

export interface Feature {
  slug: string;
  /** Short label used in navigation and the /features hub. */
  name: string;
  /** One line for the hub card. */
  summary: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  h1: string;
  lede: string;
  /** The problems the page opens with, in the school's own words. */
  problems: FeatureCapability[];
  capabilities: FeatureCapability[];
  steps: FeatureCapability[];
  faqs: FeatureFaq[];
  /** Blog slugs to link from the page, in order. */
  relatedPosts: string[];
  /** Blog tags whose posts should link back to this page. */
  tags: string[];
}

export const FEATURES: Feature[] = [
  {
    slug: "school-fees-management-software",
    name: "Fees & Payments",
    summary:
      "Invoices, Paystack payments, part payments, receipts and outstanding balances in one place.",
    seoTitle: "School Fees Management Software in Nigeria | SchoolKit",
    seoDescription:
      "Collect school fees online with Paystack, track part payments and balances, and send receipts automatically. School fees software built for Nigerian schools.",
    keywords: [
      "school fees management software Nigeria",
      "school fee payment software",
      "school fees collection software",
      "online school fees payment Nigeria",
      "school fee management system",
      "Paystack school fees",
    ],
    h1: "School fees management software built for Nigerian schools",
    lede:
      "Bill every student, let parents pay online through Paystack, and see exactly who has paid, who has part-paid and who still owes — without one bank-alert screenshot.",
    problems: [
      {
        title: "“I already paid that.”",
        body: "A parent insists the fee was paid. The bursar scrolls through bank alerts and WhatsApp screenshots trying to prove it either way.",
      },
      {
        title: "Balances live in someone's head",
        body: "Part payments, sibling discounts and carried-over balances sit in an Excel sheet only one person understands.",
      },
      {
        title: "Resumption-week queues",
        body: "Parents queue at the bursary with cash and tellers, and every receipt is written by hand.",
      },
    ],
    capabilities: [
      {
        title: "Fee structures and invoices",
        body: "Set fees per class and term — tuition, levies, uniforms, PTA — and generate every student's invoice at once.",
      },
      {
        title: "Online payment via Paystack",
        body: "Parents pay by card, bank transfer or USSD. Each payment lands against the right invoice automatically, so there is nothing to reconcile by hand.",
      },
      {
        title: "Part payments and balances",
        body: "Accept instalments and see each student's outstanding balance update the moment money arrives.",
      },
      {
        title: "Digital receipts, instantly",
        body: "Every payment produces a receipt the parent can keep. No more handwritten receipt books.",
      },
      {
        title: "Manual payments too",
        body: "Record cash and direct bank transfers alongside online payments, so the ledger is complete whichever way a parent pays.",
      },
      {
        title: "Finance dashboard",
        body: "Total invoiced, collected and outstanding for the term, and your collection rate, on one screen for the proprietor.",
      },
    ],
    steps: [
      { title: "Set your fees", body: "Enter the fee items for each class and term once." },
      { title: "Invoice every student", body: "Generate invoices for a class or the whole school in one action." },
      { title: "Parents pay, balances update", body: "Payments are matched to invoices and receipts go out automatically." },
    ],
    faqs: [
      {
        question: "How do Nigerian schools collect school fees online?",
        answer:
          "With SchoolKit, the school sets its fees and invoices each student; parents then pay through Paystack by card, bank transfer or USSD. Each payment is matched to the student's invoice automatically and a digital receipt is issued, so the bursar no longer has to confirm transfers from screenshots.",
      },
      {
        question: "Can parents pay school fees in instalments?",
        answer:
          "Yes. SchoolKit accepts part payments against an invoice and keeps a running outstanding balance for each student, so the school always knows how much is left to pay.",
      },
      {
        question: "Can we still record cash and bank transfers?",
        answer:
          "Yes. Cash and direct transfers can be recorded manually alongside Paystack payments, so every payment — however it was made — appears in the same ledger and on the same receipt history.",
      },
      {
        question: "Who receives the money paid through Paystack?",
        answer:
          "Online payments are settled to the school's own bank account through Paystack. SchoolKit records and reconciles the payment; it does not hold the school's money.",
      },
      {
        question: "How much does school fees software cost in Nigeria?",
        answer:
          "SchoolKit is free for schools with up to 100 students. Paid plans start at ₦45,000 per term for up to 200 students, which includes Paystack fee collection, receipts, report cards and parent communication.",
      },
    ],
    relatedPosts: [
      "best-school-fees-management-software-nigeria",
      "how-to-collect-school-fees-online-nigeria",
      "how-to-automate-school-fee-collection-nigeria",
      "how-to-reduce-late-fee-payments-nigerian-school",
      "school-fee-reminder-messages",
    ],
    tags: ["fees", "fee-collection", "payments", "finance"],
  },
  {
    slug: "result-management-software",
    name: "Results & Report Cards",
    summary:
      "CA and exam scores, automatic totals, grades and positions, and report cards in minutes.",
    seoTitle: "School Result Management & Report Card Software | SchoolKit",
    seoDescription:
      "Compute CA and exam results automatically, generate report cards in minutes and release them to parents. Result processing software for Nigerian schools.",
    keywords: [
      "school result management software Nigeria",
      "report card software Nigeria",
      "result processing software",
      "school result software",
      "report card generator Nigeria",
      "student result management system",
    ],
    h1: "Result processing and report cards, done in minutes — not three days",
    lede:
      "Teachers enter CA and exam scores once. SchoolKit totals them, applies your grading scale, works out positions and produces report cards the principal can approve and release.",
    problems: [
      {
        title: "The end-of-term Excel marathon",
        body: "Scores arrive in a dozen different spreadsheets, and someone spends the weekend copying them into one broadsheet.",
      },
      {
        title: "Calculator checks",
        body: "Totals and averages are re-added by hand because no one fully trusts the formulas any more.",
      },
      {
        title: "Late, inconsistent report cards",
        body: "Comments, positions and grades are typed card by card, and parents keep asking when results will be ready.",
      },
    ],
    capabilities: [
      {
        title: "Your assessment structure",
        body: "Configure the CA and exam split your school actually uses — 40/60, 30/70, or several tests and assignments before the terminal exam.",
      },
      {
        title: "Automatic totals and grades",
        body: "Scores are totalled and graded against your school's grading scale the moment a teacher saves them.",
      },
      {
        title: "Positions and class averages",
        body: "Subject and class positions are calculated for you, with ties handled consistently — or switched off if your school doesn't rank.",
      },
      {
        title: "Teacher and principal comments",
        body: "Class teacher and principal remarks sit on the card alongside the scores, with an approval step before anything goes to parents.",
      },
      {
        title: "Professional report cards",
        body: "Report cards carry your school's name and logo and are generated for a whole class at once.",
      },
      {
        title: "Results parents can see",
        body: "Once approved, results are delivered to parents digitally — each parent sees only their own children's results.",
      },
    ],
    steps: [
      { title: "Set your grading scale", body: "Enter your CA/exam split and grade boundaries once." },
      { title: "Teachers enter scores", body: "Each teacher records scores for their own subjects and classes." },
      { title: "Approve and release", body: "Review the report cards, approve them, and release them to parents." },
    ],
    faqs: [
      {
        question: "What is result management software?",
        answer:
          "Result management software lets teachers enter assessment scores and then calculates totals, grades, averages and positions automatically, producing broadsheets and report cards without retyping scores into spreadsheets.",
      },
      {
        question: "Can SchoolKit handle our CA and exam split?",
        answer:
          "Yes. Schools configure their own assessment structure, whether that is a single CA and an exam or several tests and assignments followed by a terminal examination, together with their own grading scale.",
      },
      {
        question: "Does SchoolKit calculate positions?",
        answer:
          "Yes. Subject and class positions are calculated automatically from the scores teachers enter. Schools that do not publish positions can leave them off the report card.",
      },
      {
        question: "Can parents view report cards online?",
        answer:
          "Yes. After the school approves results, parents can view their own children's report cards digitally. Results are never published publicly.",
      },
      {
        question: "Can we put our school logo on the report card?",
        answer:
          "Yes. Report cards carry the school's name and logo. Custom report card templates are available on the Professional plan.",
      },
    ],
    relatedPosts: [
      "best-school-result-management-software-nigeria",
      "nigerian-school-grading-system-how-to-calculate-results",
      "report-card-comments-for-teachers-nigeria",
      "school-result-broadsheet-template-excel",
    ],
    tags: ["results", "report-cards", "grading"],
  },
  {
    slug: "school-attendance-software",
    name: "Attendance",
    summary: "Mark attendance in seconds, see patterns early, and let parents know when a child is absent.",
    seoTitle: "School Attendance Management Software in Nigeria | SchoolKit",
    seoDescription:
      "A digital attendance register for Nigerian schools: mark every class in seconds, alert parents to absences automatically, and keep working offline.",
    keywords: [
      "school attendance software Nigeria",
      "student attendance management system",
      "digital attendance register for schools",
      "attendance tracking software for schools",
      "school attendance app",
    ],
    h1: "A digital attendance register your teachers will actually use",
    lede:
      "Mark a class in under a minute, see who is regularly absent before it becomes a problem, and let parents know the same morning — even when the network is down.",
    problems: [
      {
        title: "Paper registers nobody reads",
        body: "Attendance is taken every morning, then the register sits in a drawer until the end of term.",
      },
      {
        title: "Parents find out last",
        body: "A child misses three days and the parent only learns about it at the PTA meeting.",
      },
      {
        title: "Report-card attendance by guesswork",
        body: "“Times present” on the report card is counted by hand from a tattered register — or estimated.",
      },
    ],
    capabilities: [
      {
        title: "Mark a class in seconds",
        body: "Everyone starts present; the teacher taps the few who are absent or late and saves.",
      },
      {
        title: "Absence alerts to parents",
        body: "Parents are notified automatically when their child is marked absent.",
      },
      {
        title: "Works offline",
        body: "Attendance can be marked without internet and syncs automatically once the connection returns.",
      },
      {
        title: "Attendance on the report card",
        body: "Days present and absent flow straight onto the report card — no counting.",
      },
      {
        title: "School-wide view",
        body: "Admins see which classes have marked attendance today and which students are falling behind.",
      },
    ],
    steps: [
      { title: "Teachers open their class", body: "Each class teacher sees only the classes they are assigned." },
      { title: "Mark and save", body: "Tap the absent or late students; everyone else is present." },
      { title: "Parents are informed", body: "Absence notifications go out and records roll up into reports." },
    ],
    faqs: [
      {
        question: "Can teachers take attendance without internet?",
        answer:
          "Yes. SchoolKit is offline-ready: attendance can be marked without a connection and is synced automatically when the internet returns.",
      },
      {
        question: "Are parents told when their child is absent?",
        answer:
          "Yes. When a student is marked absent, their parent is notified automatically so the school and family can follow up the same day.",
      },
      {
        question: "Does attendance appear on the report card?",
        answer:
          "Yes. The number of days present and absent is taken directly from the attendance records, so nobody has to count the register at the end of term.",
      },
      {
        question: "Is attendance tracking included in the free plan?",
        answer: "Yes. Attendance and fee tracking are included in SchoolKit's Free plan for schools with up to 100 students.",
      },
    ],
    relatedPosts: [
      "best-school-management-software-nigeria",
      "why-nigerian-private-schools-choose-schoolkit",
    ],
    tags: ["attendance"],
  },
  {
    slug: "school-parent-portal",
    name: "Parent Portal & Communication",
    summary: "Receipts, results and announcements delivered to parents automatically, by WhatsApp and email.",
    seoTitle: "School Parent Portal & Parent Communication App | SchoolKit",
    seoDescription:
      "Give parents one place to see fees, receipts, results and announcements. SchoolKit keeps Nigerian parents informed by WhatsApp and email — automatically.",
    keywords: [
      "school parent portal Nigeria",
      "school portal Nigeria",
      "parent communication app for schools",
      "school communication app Nigeria",
      "parent portal for schools",
    ],
    h1: "Keep every parent informed — without a hundred WhatsApp messages",
    lede:
      "Fees, receipts, results and school announcements reach parents automatically, and each parent sees only their own children.",
    problems: [
      {
        title: "The class WhatsApp group",
        body: "Important notices get buried under good-morning messages and forwarded broadcasts.",
      },
      {
        title: "“How much do I still owe?”",
        body: "Parents call the bursar to ask about balances the school should be able to show them.",
      },
      {
        title: "Results by hand delivery",
        body: "Report cards travel home in school bags — and sometimes never arrive.",
      },
    ],
    capabilities: [
      {
        title: "A parent portal",
        body: "Parents sign in to see their children's invoices, balances, receipts and released results.",
      },
      {
        title: "Automatic receipts",
        body: "Every payment sends the parent a receipt — by WhatsApp and email — with no extra work for the bursar.",
      },
      {
        title: "Results delivered digitally",
        body: "When the principal releases results, parents can view them straight away.",
      },
      {
        title: "Announcements",
        body: "Send notices to the whole school, a class or a group of parents, and keep them in one place instead of a chat thread.",
      },
      {
        title: "One parent, several children",
        body: "Families with more than one child at the school see them all from one account.",
      },
    ],
    steps: [
      { title: "Add guardians", body: "Link each parent or guardian to their children's records." },
      { title: "Invite them", body: "Parents receive an invitation and set up their own sign-in." },
      { title: "They stay informed", body: "Receipts, results and announcements reach them automatically." },
    ],
    faqs: [
      {
        question: "What is a school parent portal?",
        answer:
          "A parent portal is a secure online account where parents see information about their own children — fees and balances, receipts, results and school announcements — instead of calling or visiting the school.",
      },
      {
        question: "Do parents need to install an app?",
        answer:
          "No. The parent portal works in any web browser, and receipts and notices also reach parents by WhatsApp and email. Native mobile apps are in development.",
      },
      {
        question: "Can a parent see other children's results?",
        answer:
          "No. Each parent sees only the children linked to their own account, and results are only visible after the school has approved and released them.",
      },
      {
        question: "Can parents pay fees from the portal?",
        answer: "Yes. Parents can see outstanding invoices and pay them online through Paystack.",
      },
    ],
    relatedPosts: [
      "how-to-collect-school-fees-online-nigeria",
      "why-nigerian-private-schools-choose-schoolkit",
      "how-to-reduce-late-fee-payments-nigerian-school",
    ],
    tags: ["parents", "communication"],
  },
  {
    slug: "student-information-system",
    name: "Students & Staff",
    summary: "Student records, enrollment, classes and staff roles in one searchable system.",
    seoTitle: "Student Information System for Nigerian Schools | SchoolKit",
    seoDescription:
      "Keep every student record, enrollment, class and guardian in one secure place, and manage teaching and non-teaching staff with proper roles and permissions.",
    keywords: [
      "student information system Nigeria",
      "student management system",
      "school records management software",
      "student database software for schools",
      "staff management software for schools",
    ],
    h1: "Every student, class and staff record in one place",
    lede:
      "Find any student in seconds, move a whole school into a new session in one step, and give every staff member access to exactly what their role needs — nothing more.",
    problems: [
      {
        title: "Records in five places",
        body: "Admission files, class lists, guardian phone numbers and medical notes are spread across folders, Excel and notebooks.",
      },
      {
        title: "Everyone has the admin password",
        body: "Teachers, the bursar and the proprietor share one login, so nobody knows who changed what.",
      },
      {
        title: "A new session means retyping",
        body: "Every September, class lists are rebuilt by hand for the new academic year.",
      },
    ],
    capabilities: [
      {
        title: "Complete student records",
        body: "Admission number, class, guardians, contact details and history for every student, searchable in seconds.",
      },
      {
        title: "Enrollment and classes",
        body: "Organise students into classes and arms, and carry them forward from term to term.",
      },
      {
        title: "Staff with proper roles",
        body: "Invite teachers, bursars and admins, each with permissions to match their job — a teacher sees their classes, the bursar sees fees.",
      },
      {
        title: "A full history",
        body: "Changes to sensitive records are logged, so the school can see who did what and when.",
      },
      {
        title: "Data protection built in",
        body: "Records are kept separate for every school and handled in line with the NDPR.",
      },
    ],
    steps: [
      { title: "Create your school", body: "Set up your school, academic year and terms in the setup wizard." },
      { title: "Add students and staff", body: "Bring your students and classes in, then invite your staff." },
      { title: "Run your school", body: "Fees, attendance and results all build on the same records." },
    ],
    faqs: [
      {
        question: "What is a student information system?",
        answer:
          "A student information system (SIS) is the central record of every student — personal details, class, guardians and academic history — that the rest of a school's software, such as fees and results, is built on.",
      },
      {
        question: "Can we import our existing student list?",
        answer:
          "Yes. Schools can bring in their existing student records during setup rather than typing every student in one at a time, and the SchoolKit team helps pioneer schools with onboarding.",
      },
      {
        question: "Can teachers see fee information?",
        answer:
          "Only if the school gives them that permission. Access is role-based, so a teacher sees their own classes and a bursar sees fees, unless the school decides otherwise.",
      },
      {
        question: "Is student data safe?",
        answer:
          "Each school's data is isolated from every other school's, access is controlled by role, and SchoolKit handles personal data in line with Nigeria's data protection regulations (NDPR).",
      },
    ],
    relatedPosts: [
      "best-school-management-software-nigeria",
      "school-management-software-pricing-nigeria",
      "free-school-management-software-nigeria",
    ],
    tags: ["school-management", "school-owners"],
  },
];

export function getFeatureBySlug(slug: string): Feature | undefined {
  return FEATURES.find((feature) => feature.slug === slug);
}

/** The feature page a blog post should point readers to, chosen by tag overlap. */
export function getFeatureForTags(tags: string[]): Feature | undefined {
  return FEATURES.find((feature) => feature.tags.some((tag) => tags.includes(tag)));
}
