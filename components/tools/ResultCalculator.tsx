"use client";

import { useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  GRADING_SCALES,
  type ScaleId,
  type ScoreRow,
  computeResults,
  ordinal,
  parsePastedScores,
  summarise,
  toCsv,
  toScore,
} from "@/lib/tools/results";

/** What the teacher typed. Kept as text so "32." survives until "32.5" is finished. */
interface InputRow {
  name: string;
  ca: string;
  exam: string;
}

const BLANK: InputRow = { name: "", ca: "", exam: "" };
const EMPTY_ROWS: InputRow[] = Array.from({ length: 5 }, () => BLANK);

const toScoreRow = (row: InputRow): ScoreRow => ({ name: row.name, ca: toScore(row.ca), exam: toScore(row.exam) });

export default function ResultCalculator() {
  const [rows, setRows] = useState<InputRow[]>(EMPTY_ROWS);
  const [caMax, setCaMax] = useState(40);
  const [scale, setScale] = useState<ScaleId>("standard");
  const [paste, setPaste] = useState("");
  const tracked = useRef(false);

  const examMax = 100 - caMax;
  const scoreRows = useMemo(() => rows.map(toScoreRow), [rows]);
  const results = useMemo(() => computeResults(scoreRows, scale), [scoreRows, scale]);
  const summary = summarise(results);
  const resultByRow = new Map(
    scoreRows
      .map((row, i) => [i, row] as const)
      .filter(([, row]) => row.name.trim() !== "" || row.ca !== null || row.exam !== null)
      .map(([i], k) => [i, results[k]])
  );

  const markUsed = () => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("tool_used", { tool_id: "result-calculator" });
  };

  const update = (index: number, patch: Partial<InputRow>) => {
    markUsed();
    setRows((current) => current.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const importPasted = () => {
    const parsed = parsePastedScores(paste);
    if (parsed.length === 0) return;
    markUsed();
    setRows(parsed.map((row) => ({ name: row.name, ca: row.ca?.toString() ?? "", exam: row.exam?.toString() ?? "" })));
    setPaste("");
  };

  const download = () => {
    const blob = new Blob([toCsv(results)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "results.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const outOfRange = (value: number | null, max: number) => value !== null && (value < 0 || value > max);

  return (
    <div className="tool">
      <div className="tool-settings">
        <label>
          CA is out of
          <select value={caMax} onChange={(e) => setCaMax(Number(e.target.value))}>
            {[20, 30, 40, 50].map((n) => (
              <option key={n} value={n}>
                {n} (exam {100 - n})
              </option>
            ))}
          </select>
        </label>
        <label>
          Grading scale
          <select value={scale} onChange={(e) => setScale(e.target.value as ScaleId)}>
            {(Object.keys(GRADING_SCALES) as ScaleId[]).map((id) => (
              <option key={id} value={id}>
                {GRADING_SCALES[id].label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>CA ({caMax})</th>
              <th>Exam ({examMax})</th>
              <th>Total</th>
              <th>Grade</th>
              <th>Position</th>
              <th aria-label="Remove row" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const result = resultByRow.get(i);
              return (
                <tr key={i}>
                  <td>
                    <input
                      aria-label={`Student ${i + 1} name`}
                      value={row.name}
                      placeholder={`Student ${i + 1}`}
                      onChange={(e) => update(i, { name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`Student ${i + 1} CA score`}
                      inputMode="decimal"
                      value={row.ca}
                      aria-invalid={outOfRange(scoreRows[i].ca, caMax)}
                      onChange={(e) => update(i, { ca: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      aria-label={`Student ${i + 1} exam score`}
                      inputMode="decimal"
                      value={row.exam}
                      aria-invalid={outOfRange(scoreRows[i].exam, examMax)}
                      onChange={(e) => update(i, { exam: e.target.value })}
                    />
                  </td>
                  <td className="tool-out">{result?.total ?? ""}</td>
                  <td className="tool-out">{result?.grade ?? ""}</td>
                  <td className="tool-out">{result ? ordinal(result.position) : ""}</td>
                  <td>
                    <button
                      type="button"
                      className="tool-remove"
                      aria-label={`Remove student ${i + 1}`}
                      onClick={() => setRows((current) => current.filter((_, k) => k !== i))}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {scoreRows.some((row) => outOfRange(row.ca, caMax) || outOfRange(row.exam, examMax)) && (
        <p className="tool-warning">Some scores are above the maximum for their column. Check the highlighted cells.</p>
      )}

      <div className="tool-actions">
        <button type="button" className="tool-btn" onClick={() => setRows((r) => [...r, BLANK])}>
          Add student
        </button>
        <button type="button" className="tool-btn" onClick={download} disabled={results.length === 0}>
          Download CSV
        </button>
        <button type="button" className="tool-btn tool-btn-quiet" onClick={() => setRows(EMPTY_ROWS)}>
          Clear
        </button>
      </div>

      {summary && (
        <dl className="tool-summary">
          <div>
            <dt>Students</dt>
            <dd>{summary.count}</dd>
          </div>
          <div>
            <dt>Class average</dt>
            <dd>{summary.average}</dd>
          </div>
          <div>
            <dt>Highest</dt>
            <dd>{summary.highest}</dd>
          </div>
          <div>
            <dt>Lowest</dt>
            <dd>{summary.lowest}</dd>
          </div>
        </dl>
      )}

      <details className="tool-paste">
        <summary>Paste a whole class from Excel</summary>
        <p>Copy three columns (name, CA, exam) from Excel or Google Sheets and paste them here.</p>
        <textarea
          rows={6}
          value={paste}
          placeholder={"Adaeze\t32\t50\nTunde\t28\t47"}
          onChange={(e) => setPaste(e.target.value)}
        />
        <button type="button" className="tool-btn" onClick={importPasted}>
          Use these scores
        </button>
      </details>

      <p className="tool-privacy">Everything is calculated in your browser. Names and scores are never sent anywhere.</p>
    </div>
  );
}
