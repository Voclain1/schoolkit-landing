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
