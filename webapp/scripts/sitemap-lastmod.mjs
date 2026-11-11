// Stamps the build date as <lastmod> of the homepage entry in dist/sitemap.xml.
// Every other entry keeps the per-page date from public/sitemap.xml.
import fs from "node:fs";

const file = new URL("../dist/sitemap.xml", import.meta.url);
const today = new Date().toISOString().slice(0, 10);
const xml = fs.readFileSync(file, "utf8");
const out = xml.replace(
  /(<loc>https:\/\/aipush\.app\/<\/loc>[\s\S]*?<lastmod>)[^<]*(<\/lastmod>)/,
  `$1${today}$2`,
);
if (out === xml && !xml.includes(`<lastmod>${today}</lastmod>`)) {
  throw new Error("sitemap homepage lastmod not found");
}
fs.writeFileSync(file, out);
