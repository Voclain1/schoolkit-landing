/**
 * Arithmetic for the free school fees calculator (/tools/school-fees-calculator).
 * Amounts are whole naira (the calculator does not take kobo), so integer
 * arithmetic is exact and there is no floating-point drift in the totals.
 */

export type FeeFrequency = "termly" | "once";

export interface FeeItem {
  name: string;
  amount: number;
  frequency: FeeFrequency;
}

export interface FeePlanInput {
  items: FeeItem[];
  students: number;
  /** Percentage off termly fees for a second or later child, 0–100. */
  siblingDiscountPercent: number;
  instalments: 1 | 2 | 3;
}

export interface FeePlan {
  termly: number;
  once: number;
  firstTerm: number;
  session: number;
  siblingFirstTerm: number;
  instalments: number[];
  expectedPerTerm: number;
}

/** Splits an amount into n instalments, rounding the early ones to the nearest ₦100. */
export function splitInstalments(amount: number, n: number): number[] {
  if (n <= 1) return [amount];
  const part = Math.round(amount / n / 100) * 100;
  const parts = Array.from({ length: n - 1 }, () => part);
  return [...parts, amount - part * (n - 1)];
}

export function computeFeePlan(input: FeePlanInput): FeePlan {
  const valid = input.items.filter((item) => Number.isFinite(item.amount) && item.amount > 0);
  const sum = (frequency: FeeFrequency) =>
    valid.filter((item) => item.frequency === frequency).reduce((total, item) => total + Math.round(item.amount), 0);

  const termly = sum("termly");
  const once = sum("once");
  const firstTerm = termly + once;
  const discount = Math.min(Math.max(input.siblingDiscountPercent, 0), 100);
  const siblingTermly = termly - Math.round((termly * discount) / 100);

  return {
    termly,
    once,
    firstTerm,
    session: termly * 3 + once,
    siblingFirstTerm: siblingTermly + once,
    instalments: splitInstalments(firstTerm, input.instalments),
    expectedPerTerm: termly * Math.max(0, Math.floor(input.students)),
  };
}
