// Build-time prerender: for every <loc> of public/sitemap.xml, load the built app from a
// local static server, wait for rendered root text, and write dist/<route>/index.html with
// the real body, per-page canonical and per-page JSON-LD. The app still mounts client-side
// (createRoot replaces the prerendered body with the identical live render).
// Usage: node prerender.mjs   (after `vite build`; writes dist/prerendered-routes.json)
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(process.env.WEB_DIST || path.join(HERE, "dist"));
const ORIGIN = "https://aipush.app";
// dist/index.html stays the empty SPA template the server reuses for every non-prerendered route.
const HOME_FILE = "index.prerendered.html";
const APP_ROUTES = new Set(["/", "/analyzer"]);
const MIME = { ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".webmanifest": "application/manifest+json", ".txt": "text/plain", ".xml": "application/xml" };

const shell = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
if (!shell.includes('<div id="root"></div>')) throw new Error("dist/index.html root div not found (already prerendered?)");

const routes = [...fs.readFileSync(path.join(HERE, "public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((p, i, a) => a.indexOf(p) === i);

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = path.join(DIST, p);
  if (file.startsWith(DIST + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile() && p !== "/index.html") {
    res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(shell);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

function pageJsonLd(route, d) {
  const url = ORIGIN + (route === "/" ? "/" : route);
  const out = [];
  if (!APP_ROUTES.has(route) && !d.ldTypes.includes("Article")) {
    out.push(ld({
      "@context": "https://schema.org", "@type": "Article", headline: d.h1 || d.title, description: d.description,
      mainEntityOfPage: url, image: `${ORIGIN}/og.jpg`, inLanguage: "en",
      author: { "@type": "Organization", name: "AIPUSH" }, publisher: { "@id": `${ORIGIN}/#org` },
    }));
  }
  if (d.faq.length && !d.ldTypes.includes("FAQPage")) {
    out.push(ld({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: d.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }));
  }
  return out.join("\n");
}

// Shell JSON-LD @graph: keep Organization + WebSite everywhere, WebApplication only on app routes.
function shellGraph(route) {
  return shell.replace(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/, (_m, json) => {
    const g = JSON.parse(json);
    if (!APP_ROUTES.has(route)) g["@graph"] = g["@graph"].filter((n) => n["@type"] !== "WebApplication");
    return `<script type="application/ld+json">${JSON.stringify(g)}</script>`;
  });
}

const browser = await chromium.launch();
const done = [];
try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.route("**/*", (r) => (r.request().url().startsWith(base) ? r.continue() : r.abort()));
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base + route, { waitUntil: "load" });
    await page.waitForFunction(() => (document.getElementById("root").innerText || "").trim().length > 40, null, { timeout: 30000 })
      .catch((e) => { throw new Error(`prerender ${route}: no main text (${errors.join("; ") || e.message})`); });
    const d = await page.evaluate(() => ({
      body: document.getElementById("root").innerHTML,
      ldTypes: [...document.querySelectorAll('#root script[type="application/ld+json"]')].map((n) => { try { return JSON.parse(n.textContent)["@type"]; } catch { return ""; } }),
      title: document.title,
      h1: document.querySelector("h1")?.textContent?.trim() || "",
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      faq: [...document.querySelectorAll(".aipush-seo-faq")].flatMap((box) =>
        [...box.querySelectorAll("h3")].map((h) => ({ q: h.textContent.trim(), a: h.nextElementSibling?.textContent?.trim() || "" })).filter((f) => f.a)),
    }));
    await page.close();
    let html = shellGraph(route)
      .replace('<div id="root"></div>', () => `<div id="root">${d.body}</div>`)
      .replace(/<title>[^<]*<\/title>/, () => `<title>${attr(d.title).replace(/&quot;/g, '"')}</title>`)
      .replace(/<meta name="description" content="[^"]*"/, () => `<meta name="description" content="${attr(d.description)}"`)
      .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${ORIGIN}${route}"`)
      .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${ORIGIN}${route}"`)
      .replace(/<meta property="og:title" content="[^"]*"/, () => `<meta property="og:title" content="${attr(d.title)}"`)
      .replace(/<meta property="og:description" content="[^"]*"/, () => `<meta property="og:description" content="${attr(d.description)}"`);
    const extra = pageJsonLd(route, d);
    if (extra) html = html.replace("</head>", () => `${extra}\n  </head>`);
    const out = route === "/" ? path.join(DIST, HOME_FILE) : path.join(DIST, route, "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    done.push(route);
  }
} finally {
  await browser.close();
  server.close();
}
fs.writeFileSync(path.join(DIST, "prerendered-routes.json"), JSON.stringify(done));
process.stdout.write(`[prerender] ${done.length} routes\n`);
