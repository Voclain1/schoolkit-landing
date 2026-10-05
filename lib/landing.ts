import fs from "fs";
import path from "path";

const landingDir = path.join(process.cwd(), "content", "landing");

export function getHomepageBodyHtml(): string {
  return fs.readFileSync(path.join(landingDir, "homepage-body.html"), "utf8");
}

export function getHomepageScript(): string {
  return fs.readFileSync(path.join(landingDir, "homepage-script.js"), "utf8");
}

export function getFaviconDataUri(): string {
  return fs.readFileSync(path.join(landingDir, "favicon-data-uri.txt"), "utf8").trim();
}

export function getLogoDataUri(): string {
  return fs.readFileSync(path.join(landingDir, "logo-data-uri.txt"), "utf8").trim();
}

export function getSiteScript(): string {
  return fs.readFileSync(path.join(landingDir, "site-script.js"), "utf8");
}

/**
 * The homepage FAQ, read from the homepage markup itself so the FAQPage structured
 * data can never drift from the questions visitors actually see.
 */
export function getHomepageFaqs(): Array<{ question: string; answer: string }> {
  return parseFaqs(getHomepageBodyHtml());
}

export function parseFaqs(html: string): Array<{ question: string; answer: string }> {
  const items = html.matchAll(
    /<details class="faq-item">\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g
  );
  return Array.from(items, ([, question, answer]) => ({
    question: toPlainText(question),
    answer: toPlainText(answer),
  }));
}

function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
