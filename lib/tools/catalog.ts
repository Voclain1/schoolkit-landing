/** The free tools under /tools, for the hub page, the sitemap and llms.txt. */
export interface ToolEntry {
  slug: string;
  name: string;
  summary: string;
}

export const TOOLS: ToolEntry[] = [
  {
    slug: "result-calculator",
    name: "Student Result Calculator",
    summary:
      "Enter CA and exam scores for a class and get totals, grades and positions instantly, with ties handled correctly. Export to CSV.",
  },
  {
    slug: "school-fees-calculator",
    name: "School Fees Calculator",
    summary:
      "Add up termly and one-off fees, apply a sibling discount, split the first term into instalments and see what the school should collect.",
  },
];
