/**
 * Result calculation for the free result calculator (/tools/result-calculator).
 * Pure functions, no DOM, so the arithmetic is unit-tested on its own.
 */

export interface GradeBand {
  min: number;
  grade: string;
  remark: string;
}

export type ScaleId = "standard" | "waec";

export const GRADING_SCALES: Record<ScaleId, { label: string; bands: GradeBand[] }> = {
  standard: {
    label: "Common school scale (A–F)",
    bands: [
      { min: 70, grade: "A", remark: "Excellent" },
      { min: 60, grade: "B", remark: "Very good" },
      { min: 50, grade: "C", remark: "Credit" },
      { min: 45, grade: "D", remark: "Pass" },
      { min: 40, grade: "E", remark: "Fair" },
      { min: 0, grade: "F", remark: "Fail" },
    ],
  },
  waec: {
    label: "WAEC scale (A1–F9)",
    bands: [
      { min: 75, grade: "A1", remark: "Excellent" },
      { min: 70, grade: "B2", remark: "Very good" },
      { min: 65, grade: "B3", remark: "Good" },
      { min: 60, grade: "C4", remark: "Credit" },
      { min: 55, grade: "C5", remark: "Credit" },
      { min: 50, grade: "C6", remark: "Credit" },
      { min: 45, grade: "D7", remark: "Pass" },
      { min: 40, grade: "E8", remark: "Pass" },
      { min: 0, grade: "F9", remark: "Fail" },
    ],
  },
};

export interface ScoreRow {
  name: string;
  ca: number | null;
  exam: number | null;
}

export interface ResultRow extends ScoreRow {
  total: number;
  grade: string;
  remark: string;
  /** 1-based; tied totals share a position and the next is skipped (1, 2, 2, 4). */
  position: number;
}

export interface ClassSummary {
  count: number;
  average: number;
  highest: number;
  lowest: number;
}

/** Totals are rounded to the nearest whole number before grading, as most schools do. */
export function gradeFor(total: number, scale: ScaleId): GradeBand {
  const rounded = Math.round(total);
  const band = GRADING_SCALES[scale].bands.find((b) => rounded >= b.min);
  return band ?? GRADING_SCALES[scale].bands[GRADING_SCALES[scale].bands.length - 1];
}

/** Standard competition ranking: equal totals share a position, the next is skipped. */
export function positions(totals: number[]): number[] {
  return totals.map((total) => 1 + totals.filter((other) => other > total).length);
}

export function ordinal(n: number): string {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  const suffix = { 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th";
  return `${n}${suffix}`;
}

/** Rows with no name and no scores are ignored; a missing score counts as 0. */
export function computeResults(rows: ScoreRow[], scale: ScaleId): ResultRow[] {
  const filled = rows.filter((row) => row.name.trim() !== "" || row.ca !== null || row.exam !== null);
  const totals = filled.map((row) => round1((row.ca ?? 0) + (row.exam ?? 0)));
  const ranks = positions(totals);
  return filled.map((row, i) => {
    const band = gradeFor(totals[i], scale);
    return { ...row, total: totals[i], grade: band.grade, remark: band.remark, position: ranks[i] };
  });
}

export function summarise(results: ResultRow[]): ClassSummary | null {
  if (results.length === 0) return null;
  const totals = results.map((r) => r.total);
  return {
    count: totals.length,
    average: round1(totals.reduce((a, b) => a + b, 0) / totals.length),
    highest: Math.max(...totals),
    lowest: Math.min(...totals),
  };
}

/** Parses pasted rows: "name, CA, exam" separated by commas or tabs (as copied from Excel). */
export function parsePastedScores(text: string): ScoreRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.split(/\t|,/).map((cell) => cell.trim()))
    .filter((cells) => cells.some((cell) => cell !== ""))
    .filter((cells) => !/^(name|student)/i.test(cells[0] ?? ""))
    .map(([name = "", ca = "", exam = ""]) => ({ name, ca: toScore(ca), exam: toScore(exam) }));
}

export function toScore(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function toCsv(results: ResultRow[]): string {
  const escape = (value: string) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
  const lines = results.map((r) =>
    [escape(r.name), r.ca ?? "", r.exam ?? "", r.total, r.grade, r.remark, ordinal(r.position)].join(",")
  );
  return ["Name,CA,Exam,Total,Grade,Remark,Position", ...lines].join("\n");
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
