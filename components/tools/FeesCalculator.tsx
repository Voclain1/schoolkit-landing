"use client";

import { useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { formatNaira } from "@/lib/brand";
import { type FeeFrequency, computeFeePlan } from "@/lib/tools/fees";

interface ItemInput {
  name: string;
  amount: string;
  frequency: FeeFrequency;
}

const STARTER_ITEMS: ItemInput[] = [
  { name: "Tuition", amount: "", frequency: "termly" },
  { name: "Development levy", amount: "", frequency: "termly" },
  { name: "PTA levy", amount: "", frequency: "termly" },
  { name: "Uniforms and books", amount: "", frequency: "once" },
];

/** Accepts "85,000" or "₦85000" as typed by a bursar. */
const toAmount = (value: string) => Number(value.replace(/[₦,\s]/g, "")) || 0;

export default function FeesCalculator() {
  const [items, setItems] = useState<ItemInput[]>(STARTER_ITEMS);
  const [students, setStudents] = useState("100");
  const [discount, setDiscount] = useState("10");
  const [instalments, setInstalments] = useState<1 | 2 | 3>(2);
  const tracked = useRef(false);

  const plan = useMemo(
    () =>
      computeFeePlan({
        items: items.map((item) => ({ name: item.name, amount: toAmount(item.amount), frequency: item.frequency })),
        students: Number(students) || 0,
        siblingDiscountPercent: Number(discount) || 0,
        instalments,
      }),
    [items, students, discount, instalments]
  );

  const markUsed = () => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("tool_used", { tool_id: "school-fees-calculator" });
  };

  const update = (index: number, patch: Partial<ItemInput>) => {
    markUsed();
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  return (
    <div className="tool">
      <div className="tool-table-wrap">
        <table className="tool-table">
          <thead>
            <tr>
              <th>Fee item</th>
              <th>Amount (₦)</th>
              <th>Charged</th>
              <th aria-label="Remove item" />
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <input aria-label={`Fee item ${i + 1} name`} value={item.name} onChange={(e) => update(i, { name: e.target.value })} />
                </td>
                <td>
                  <input
                    aria-label={`${item.name || `Fee item ${i + 1}`} amount in naira`}
                    inputMode="numeric"
                    placeholder="0"
                    value={item.amount}
                    onChange={(e) => update(i, { amount: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    aria-label={`${item.name || `Fee item ${i + 1}`} frequency`}
                    value={item.frequency}
                    onChange={(e) => update(i, { frequency: e.target.value as FeeFrequency })}
                  >
                    <option value="termly">Every term</option>
                    <option value="once">Once a session</option>
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    className="tool-remove"
                    aria-label={`Remove ${item.name || `fee item ${i + 1}`}`}
                    onClick={() => setItems((current) => current.filter((_, k) => k !== i))}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tool-actions">
        <button
          type="button"
          className="tool-btn"
          onClick={() => setItems((current) => [...current, { name: "", amount: "", frequency: "termly" }])}
        >
          Add fee item
        </button>
      </div>

      <div className="tool-settings">
        <label>
          Students in the school
          <input inputMode="numeric" value={students} onChange={(e) => { markUsed(); setStudents(e.target.value); }} />
        </label>
        <label>
          Sibling discount (%)
          <input inputMode="numeric" value={discount} onChange={(e) => { markUsed(); setDiscount(e.target.value); }} />
        </label>
        <label>
          First-term instalments
          <select value={instalments} onChange={(e) => setInstalments(Number(e.target.value) as 1 | 2 | 3)}>
            <option value={1}>Pay in full</option>
            <option value={2}>2 instalments</option>
            <option value={3}>3 instalments</option>
          </select>
        </label>
      </div>

      <dl className="tool-summary">
        <div>
          <dt>Fees per term</dt>
          <dd>{formatNaira(plan.termly)}</dd>
        </div>
        <div>
          <dt>First term, with one-off fees</dt>
          <dd>{formatNaira(plan.firstTerm)}</dd>
        </div>
        <div>
          <dt>Full session (3 terms)</dt>
          <dd>{formatNaira(plan.session)}</dd>
        </div>
        <div>
          <dt>Second child, first term</dt>
          <dd>{formatNaira(plan.siblingFirstTerm)}</dd>
        </div>
        <div>
          <dt>Expected per term, all students</dt>
          <dd>{formatNaira(plan.expectedPerTerm)}</dd>
        </div>
      </dl>

      {instalments > 1 && plan.firstTerm > 0 && (
        <div className="tool-schedule">
          <h3>First-term payment schedule</h3>
          <ol>
            {plan.instalments.map((amount, i) => (
              <li key={i}>
                Instalment {i + 1}: <strong>{formatNaira(amount)}</strong>
              </li>
            ))}
          </ol>
        </div>
      )}

      <p className="tool-privacy">
        &ldquo;Expected per term&rdquo; counts termly fees only, at full price. Nothing you type leaves your browser.
      </p>
    </div>
  );
}
