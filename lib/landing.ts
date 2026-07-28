import fs from "fs";
import path from "path";

const landingDir = path.join(process.cwd(), "content", "landing");

export function getLandingBodyHtml(): string {
  return fs.readFileSync(path.join(landingDir, "landing-body.html"), "utf8");
}

export function getLandingScript(): string {
  return fs.readFileSync(path.join(landingDir, "landing-script.js"), "utf8");
}

export function getFaviconDataUri(): string {
  return fs.readFileSync(path.join(landingDir, "favicon-data-uri.txt"), "utf8").trim();
}
