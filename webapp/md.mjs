// Converts each prerendered dist/<route>/index.html (routes from dist/prerendered-routes.json)
// to a Markdown twin: dist/<route>.md, and dist/index.md for "/". Regex tokenizer, no dependency.
// Usage: node md.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SKIP = new Set(["script", "style", "svg", "noscript", "video", "button", "form", "input", "select", "textarea", "iframe", "head"]);
const BLOCK = new Set(["p", "div", "section", "article", "main", "header", "footer", "nav", "ul", "ol", "li", "table", "tr", "blockquote", "pre", "details", "summary", "figure", "aside", "h1", "h2", "h3", "h4", "h5", "h6"]);
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "—", ndash: "–", rarr: "→", larr: "←", hellip: "…", times: "×" };
const dec = (s) => s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e] ?? m);

export function htmlToMarkdown(html) {
  const root = html.match(/<main[\s>][\s\S]*<\/main>/i)?.[0] ?? html.match(/<body[\s>]([\s\S]*)<\/body>/i)?.[1] ?? html;
  let out = "", skip = 0, pre = false;
  const lists = [], hrefs = [];
  const nl = (n = 2) => { out = out.replace(/[ \t]+$/, ""); const have = out.match(/\n*$/)[0].length; if (out && have < n) out += "\n".repeat(n - have); };
  for (const m of root.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/g)) {
    if (m[4] !== undefined) { if (!skip) out += pre ? dec(m[4]) : dec(m[4]).replace(/\s+/g, " "); continue; }
    const close = m[1] === "/", tag = m[2].toLowerCase(), attrs = m[3];
    if (SKIP.has(tag)) { if (!attrs.endsWith("/")) skip += close ? -1 : 1; skip = Math.max(skip, 0); continue; }
    if (skip) continue;
    if (/^h[1-6]$/.test(tag)) { nl(); if (!close) out += "#".repeat(+tag[1]) + " "; else nl(); }
    else if (tag === "a") {
      if (!close) { hrefs.push(attrs.match(/href="([^"]*)"/)?.[1] ?? ""); out += "["; }
      else { const h = hrefs.pop(); out += h ? `](${dec(h)})` : "]"; }
    }
    else if (tag === "strong" || tag === "b") out += "**";
    else if (tag === "em" || tag === "i") out += "_";
    else if (tag === "code" && !pre) out += "`";
    else if (tag === "br") out += "\n";
    else if (tag === "ul" || tag === "ol") { close ? lists.pop() : lists.push({ ordered: tag === "ol", n: 0 }); nl(); }
    else if (tag === "li") { nl(1); if (!close) { const l = lists[lists.length - 1]; out += "  ".repeat(Math.max(lists.length - 1, 0)) + (l?.ordered ? `${++l.n}. ` : "- "); } }
    else if (tag === "pre") { pre = !close; nl(); out += "```\n"; if (close) { out += "\n```"; nl(); } }
    else if (tag === "td" || tag === "th") { if (close) out += " | "; }
    else if (BLOCK.has(tag)) nl(tag === "tr" ? 1 : 2);
  }
  return out.replace(/\*\*\s*\*\*/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const DIST = path.resolve(process.env.WEB_DIST || path.join(path.dirname(fileURLToPath(import.meta.url)), "dist"));
  const routes = JSON.parse(fs.readFileSync(path.join(DIST, "prerendered-routes.json"), "utf8"));
  for (const r of routes) {
    const src = r === "/" ? "index.prerendered.html" : path.join(r, "index.html");
    fs.writeFileSync(path.join(DIST, r === "/" ? "index.md" : `${r}.md`), htmlToMarkdown(fs.readFileSync(path.join(DIST, src), "utf8")));
  }
  process.stdout.write(`[md] ${routes.length} twins\n`);
}
