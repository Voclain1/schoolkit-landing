import assert from "node:assert/strict";
import test from "node:test";
import { computeResults, gradeFor, ordinal, parsePastedScores, positions, summarise, toCsv } from "./results.ts";
import { computeFeePlan, splitInstalments } from "./fees.ts";

test("grades on the boundary are inclusive, after rounding", () => {
  assert.equal(gradeFor(70, "standard").grade, "A");
  assert.equal(gradeFor(69.4, "standard").grade, "B");
  assert.equal(gradeFor(69.5, "standard").grade, "A");
  assert.equal(gradeFor(50, "waec").grade, "C6");
  assert.equal(gradeFor(39, "waec").grade, "F9");
  assert.equal(gradeFor(100, "waec").grade, "A1");
});

test("tied totals share a position and the next one is skipped", () => {
  assert.deepEqual(positions([82.4, 79.1, 79.1, 76.8]), [1, 2, 2, 4]);
  assert.deepEqual(positions([50, 60, 60, 60]), [4, 1, 1, 1]);
});

test("ordinals", () => {
  assert.deepEqual([1, 2, 3, 4, 11, 12, 13, 21, 22, 101, 111].map(ordinal), [
    "1st", "2nd", "3rd", "4th", "11th", "12th", "13th", "21st", "22nd", "101st", "111th",
  ]);
});

test("computes totals, grades, positions and the class summary", () => {
  const results = computeResults(
    [
      { name: "Adaeze", ca: 35, exam: 50 },
      { name: "Tunde", ca: 30, exam: 45 },
      { name: "Halima", ca: 25, exam: 50 },
      { name: "", ca: null, exam: null },
      { name: "Emeka", ca: 20, exam: null },
    ],
    "standard"
  );
  assert.deepEqual(
    results.map((r) => [r.name, r.total, r.grade, r.position]),
    [["Adaeze", 85, "A", 1], ["Tunde", 75, "A", 2], ["Halima", 75, "A", 2], ["Emeka", 20, "F", 4]]
  );
  assert.deepEqual(summarise(results), { count: 4, average: 63.8, highest: 85, lowest: 20 });
  assert.equal(summarise([]), null);
});

test("parses rows pasted from Excel or typed with commas, skipping a header", () => {
  assert.deepEqual(parsePastedScores("Name\tCA\tExam\nAda\t30\t50\n\nBola, 25, \n"), [
    { name: "Ada", ca: 30, exam: 50 },
    { name: "Bola", ca: 25, exam: null },
  ]);
});

test("CSV export quotes names with commas", () => {
  const csv = toCsv(computeResults([{ name: "Okafor, Ada", ca: 30, exam: 40 }], "standard"));
  assert.equal(csv.split("\n")[1], '"Okafor, Ada",30,40,70,A,Excellent,1st');
});

test("instalments round to ₦100 and always add back to the total", () => {
  assert.deepEqual(splitInstalments(100000, 3), [33300, 33300, 33400]);
  assert.deepEqual(splitInstalments(85000, 2), [42500, 42500]);
  assert.deepEqual(splitInstalments(85000, 1), [85000]);
  for (const amount of [1, 999, 123457, 250050]) {
    assert.equal(splitInstalments(amount, 3).reduce((a, b) => a + b, 0), amount);
  }
});

test("fee plan separates termly and one-off fees and applies the sibling discount to termly fees only", () => {
  const plan = computeFeePlan({
    items: [
      { name: "Tuition", amount: 80000, frequency: "termly" },
      { name: "PTA levy", amount: 5000, frequency: "termly" },
      { name: "Uniform", amount: 20000, frequency: "once" },
      { name: "Blank", amount: Number.NaN, frequency: "termly" },
    ],
    students: 120,
    siblingDiscountPercent: 10,
    instalments: 2,
  });
  assert.deepEqual(plan, {
    termly: 85000,
    once: 20000,
    firstTerm: 105000,
    session: 275000,
    siblingFirstTerm: 96500,
    instalments: [52500, 52500],
    expectedPerTerm: 10200000,
  });
});
