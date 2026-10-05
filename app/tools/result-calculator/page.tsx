import type { Metadata } from "next";
import Link from "next/link";
import ResultCalculator from "@/components/tools/ResultCalculator";
import ToolPage from "@/components/tools/ToolPage";
import { SITE_URL } from "@/lib/brand";

const TITLE = "Free Student Result Calculator (CA + Exam, Grade, Position) | SchoolKit";
const DESCRIPTION =
  "Free result calculator for Nigerian teachers: enter CA and exam scores, get totals, grades (A–F or WAEC A1–F9) and class positions with ties handled correctly.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "result calculator",
    "student result calculator",
    "CA and exam score calculator",
    "class position calculator",
    "school result computation",
    "WAEC grade calculator",
  ],
  alternates: { canonical: "/tools/result-calculator" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/tools/result-calculator`, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const FAQS = [
  {
    question: "How is a student's position calculated?",
    answer:
      "Students are ranked by total score from highest to lowest. Students with the same total share a position and the next position is skipped, so two students tied for 2nd are followed by 4th. This is the method most Nigerian schools use.",
  },
  {
    question: "What happens if a score is missing?",
    answer:
      "A blank CA or exam score is counted as 0, so the student still appears on the list. Fill in the score, or remove the student, before you rely on the positions.",
  },
  {
    question: "Which grading scale should I use?",
    answer:
      "Use the scale your school publishes. Many schools use A (70–100) to F (0–39); senior secondary classes often use the WAEC nine-point scale from A1 to F9 so students get used to it before WASSCE.",
  },
  {
    question: "Is my students' data saved or shared?",
    answer: "No. The calculator runs entirely in your browser. Names and scores are not uploaded or stored anywhere.",
  },
];

export default function ResultCalculatorPage() {
  return (
    <ToolPage
      slug="result-calculator"
      name="Student Result Calculator"
      h1="Free student result calculator"
      lede="Enter CA and exam scores for one subject. Totals, grades and class positions update as you type, and ties are handled the way Nigerian schools rank them."
      description={DESCRIPTION}
      faqs={FAQS}
      tool={<ResultCalculator />}
      cta={{
        title: "Doing this for every subject, every term?",
        body: "SchoolKit does it for the whole school: teachers enter scores once, and totals, grades, positions and report cards are produced for you.",
        href: "/features/result-management-software",
      }}
    >
      <h2>How the calculator works</h2>
      <ol>
        <li>
          <strong>Total</strong> = CA + exam. Choose how many marks the CA is worth; the exam makes up the rest of the 100.
        </li>
        <li>
          <strong>Grade</strong>: the total is rounded to a whole number, then matched to the grading scale you pick. 69.5
          becomes 70, which is an A.
        </li>
        <li>
          <strong>Position</strong>: students are ranked by total. Equal totals share a position, and the next one is
          skipped (1st, 2nd, 2nd, 4th).
        </li>
        <li>
          <strong>Class average, highest and lowest</strong> are shown under the table, ready for the report card.
        </li>
      </ol>
      <p>
        If a test was marked out of a different number, scale it first: (score ÷ marks available) × weight. Our guide to{" "}
        <Link href="/blog/nigerian-school-grading-system-how-to-calculate-results">
          the Nigerian school grading system and how to calculate results
        </Link>{" "}
        walks through every step with worked examples. For the remarks that go with the scores, see{" "}
        <Link href="/blog/report-card-comments-for-teachers-nigeria">150+ report card comments for teachers</Link>.
      </p>
    </ToolPage>
  );
}
