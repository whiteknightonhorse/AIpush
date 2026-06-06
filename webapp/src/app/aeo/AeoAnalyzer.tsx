/* AEO Analyzer — faithful port of the claude.ai/design prototype
   (temp/aeo-design/*), wired to the live /api/aeo/* backend.
   Visual source of truth: prototype inline styles + aeo.css tokens.
   Prototype-only affordances (StateJumper, TweaksPanel) are removed;
   the gauge is fixed to the prototype default (semicircle).

   API contract (src/aeo/routes/aeo.ts):
     POST /api/aeo/scan            {url}                      -> gated view
     GET  /api/aeo/scan/:id        -> gated view of stored scan
     POST /api/aeo/subscribe       {email, scanId, consent}   -> {ok}
     GET  /api/aeo/confirm?token=  -> sets cookie, redirects /?scan=<id>&unlocked=1
     GET  /api/aeo/scan/:id/full   -> full findings (confirmed cookie; 403 otherwise)
   Gated findings: failing fixes beyond the first 2 arrive as stubs (locked:true,
   no fix text); only the first 2 fails carry copy/goal/how. */
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./aeo.css";

type CSS = React.CSSProperties;

/* ============================================================ types */
type Status = "pass" | "fail" | "info";
interface Check { id: string; title: string; status: Status; goal: string; result: string; how: string; res: { t: string; u: string }[]; copy: string; skillSlug: string | null; }
interface Category { id: string; label: string; blurb: string; score: number; checks: Check[]; }
interface Level { n: number; name: string; }
interface Data { url: string; score: number; level: Level; categories: Category[]; commerce: Category | null; markdown: string | null; }

const SCAN_PHASES = [
  "Fetching homepage & response headers",
  "Reading robots.txt & sitemaps",
  "Probing /.well-known/ endpoints",
  "Checking structured data & metadata",
  "Evaluating answer-units & content",
  "Scoring agent-readiness",
];

// If the scan response hasn't arrived this many ms after the request started, we
// are almost certainly queued behind other scans (or waiting on a slow target) —
// show the "you're in the queue" hint. Time-based so it's deterministic and does
// not depend on the phase-animation length.
const QUEUE_HINT_MS = 3500;

/* ============================================================ helpers */
function scoreColor(s: number): string {
  if (s < 40) return "var(--score-low)";
  if (s < 70) return "var(--score-mid)";
  return "var(--score-high)";
}
function countPass(checks: Check[]): { pass: number; total: number } {
  const scored = checks.filter((c) => c.status !== "info");
  return { pass: scored.filter((c) => c.status === "pass").length, total: scored.length };
}

function normalizeUrl(raw: string): string | null {
  let v = (raw || "").trim();
  if (!v) return null;
  if (!/^https?:\/\//i.test(v)) v = "https://" + v;
  try {
    const u = new URL(v);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch { return null; }
}

/* adapt the API response (flat findings + categories) -> nested Data */
function adapt(resp: any): Data {
  const findings: any[] = Array.isArray(resp.findings) ? resp.findings : [];
  const byCat: Record<string, Check[]> = {};
  for (const f of findings) {
    const ch: Check = {
      id: f.id, title: f.title, status: f.status,
      goal: f.goal ?? "", result: f.evidence ?? "", how: f.fix ?? "",
      copy: (f.fixCode || f.fix) ?? "", skillSlug: f.skillSlug ?? null,
      res: Array.isArray(f.resources) ? f.resources.map((r: any) => ({ t: r.label ?? r.title ?? "", u: r.url })) : [],
    };
    (byCat[f.category] ||= []).push(ch);
  }
  const cats: any[] = Array.isArray(resp.categories) ? resp.categories : [];
  const categories: Category[] = cats
    .filter((c) => c.id !== "commerce")
    .map((c) => ({ id: c.id, label: c.label, blurb: c.blurb, score: c.score, checks: byCat[c.id] || [] }));
  const commerceCat = cats.find((c) => c.id === "commerce");
  const commerce: Category | null = commerceCat
    ? { id: commerceCat.id, label: commerceCat.label, blurb: commerceCat.blurb, score: commerceCat.score, checks: byCat["commerce"] || [] }
    : null;
  return {
    url: resp.url, score: resp.score,
    level: { n: resp.level || 1, name: resp.levelLabel || "" },
    categories, commerce, markdown: resp.markdown ?? null,
  };
}

function buildBundle(d: Data): string {
  if (d.markdown) return d.markdown;
  const fails: { cat: string; ch: Check }[] = [];
  d.categories.forEach((c) => c.checks.forEach((ch) => { if (ch.status === "fail" && ch.copy) fails.push({ cat: c.label, ch }); }));
  let out = `# AEO fixes for ${d.url}\n# AIPUSH AEO Analyzer · score ${d.score}/100\n# ${fails.length} actionable fixes — paste into your AI coding agent.\n\n`;
  fails.forEach((f, i) => { out += `## ${i + 1}. ${f.ch.title}  (${f.cat})\n${f.ch.goal}\n\n${f.ch.copy}\n\n`; });
  return out.trim();
}
function skillUrl(slug: string): string { return `https://aipush.app/.well-known/agent-skills/${slug}/SKILL.md`; }

/* Google Ads conversion send_to label for the email-gate lead, e.g.
   "AW-18018973770/AbCdEfGh". Leave empty to send only the GA4 event (which can
   still be imported into Ads as a conversion from the GA4 property). */
const ADS_LEAD_SEND_TO = "";

type Gtag = (command: string, action: string, params?: Record<string, unknown>) => void;

/* Fire the lead conversion on a confirmed email-gate submission. The product is
   free, so value is 0; consent-mode + the gtag loader are set up in index.html.
   Fail-soft: never throws into the request flow. */
function trackLeadConversion(): void {
  try {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== "function") return;
    // GA4 key-event (mark as conversion in the GA4 UI).
    gtag("event", "generate_lead", { currency: "USD", value: 0, method: "aeo_email_gate" });
    // Optional dedicated Google Ads conversion (only if a send_to label is set).
    if (ADS_LEAD_SEND_TO) {
      gtag("event", "conversion", { send_to: ADS_LEAD_SEND_TO, value: 0, currency: "USD" });
    }
  } catch { /* analytics must never break the signup */ }
}

/* ============================================================ icons */
type IconFn = (p?: React.SVGProps<SVGSVGElement>) => React.ReactElement;
const I: Record<string, IconFn> = {
  check: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>,
  x: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
  info: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>,
  copy: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="9" width="11" height="11" rx="2.2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>,
  chevron: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6" /></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="9" rx="2.2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
  sun: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>,
  moon: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>,
  share: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2.4" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>,
  ext: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 5h5v5M19 5l-8 8M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...p}><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" /></svg>,
  refresh: (p) => <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v4h-4" /></svg>,
};

const STATUS_META: Record<Status, { color: string; dim: string; bd: string; icon: IconFn }> = {
  pass: { color: "var(--status-success)", dim: "var(--status-success-dim)", bd: "var(--status-success-border)", icon: I.check },
  fail: { color: "var(--status-danger)", dim: "var(--status-danger-dim)", bd: "var(--status-danger-border)", icon: I.x },
  info: { color: "var(--text-tertiary)", dim: "var(--surface-inset)", bd: "var(--surface-border)", icon: I.info },
};

/* ============================================================ theme */
function applyTheme(t: string) { document.documentElement.setAttribute("data-theme", t); }
function initialTheme(): string {
  const saved = localStorage.getItem("aeo-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function ThemeToggle({ theme, setTheme }: { theme: string; setTheme: (v: string) => void }) {
  return (
    <button aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{ width: 40, height: 40, borderRadius: 999, display: "grid", placeItems: "center", cursor: "pointer", fontSize: 18, background: "var(--surface-card)", color: "var(--text-secondary)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-sm)" }}>
      {theme === "dark" ? <I.sun /> : <I.moon />}
    </button>
  );
}

/* ============================================================ small UI */
function Spinner({ sm }: { sm?: boolean }) {
  const s = sm ? 13 : 18;
  return <span style={{ width: s, height: s, borderRadius: 999, border: "2px solid var(--surface-border)", borderTopColor: "var(--accent)", display: "inline-block", animation: "aeo-spin .7s linear infinite" }} />;
}
function StatusIcon({ status, size = 26 }: { status: Status; size?: number }) {
  const m = STATUS_META[status];
  const Ico = m.icon;
  return <span style={{ display: "inline-grid", placeItems: "center", flex: "none", width: size, height: size, borderRadius: 999, background: m.dim, color: m.color, border: `1px solid ${m.bd}`, fontSize: size * 0.62 }} aria-hidden="true"><Ico /></span>;
}
function Chip({ href, children, skill }: { href?: string; children: React.ReactNode; skill?: boolean }) {
  return (
    <a href={href || "#"} target="_blank" rel="noopener noreferrer" onClick={(e) => { if (!href) e.preventDefault(); }}
      style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", fontSize: 12, fontWeight: 600, textDecoration: "none", borderRadius: 999, color: skill ? "var(--on-accent)" : "var(--text-secondary)", background: skill ? "var(--accent)" : "var(--surface-card-strong)", border: "1px solid", borderColor: skill ? "transparent" : "var(--surface-border)" }}>
      {skill && <span style={{ fontSize: 11, display: "inline-flex" }}><I.spark /></span>}
      {children}
      {!skill && <span style={{ fontSize: 11, opacity: 0.6, display: "inline-flex" }}><I.ext /></span>}
    </a>
  );
}
function CopyButton({ text, label = "Copy", primary, full }: { text: string; label?: string; primary?: boolean; full?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <button onClick={copy} aria-live="polite"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: full ? "13px 18px" : "8px 14px", width: full ? "100%" : "auto", fontSize: 13.5, fontWeight: 700, cursor: "pointer", borderRadius: "var(--radius-sm)", transition: "background .15s, transform .1s, color .15s", color: primary ? "var(--on-accent)" : done ? "var(--status-success)" : "var(--text-primary)", background: primary ? "var(--accent)" : "var(--surface-card-strong)", border: "1px solid", borderColor: primary ? "transparent" : "var(--surface-border)", boxShadow: primary ? "var(--shadow-accent)" : "none" }}>
      <span style={{ fontSize: 15, display: "inline-flex" }}>{done ? <I.check /> : <I.copy />}</span>
      {done ? "Copied" : label}
    </button>
  );
}
function GhostBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 13px", fontSize: 13, fontWeight: 600, cursor: "pointer", borderRadius: "var(--radius-sm)", color: "var(--text-secondary)", background: "var(--surface-card)", border: "1px solid var(--surface-border)" }}>
      <span style={{ fontSize: 14, display: "inline-flex" }}>{icon}</span><span className="ghost-label">{label}</span>
    </button>
  );
}

/* ============================================================ gauges */
function ScoreGauge({ score }: { score: number }) {
  const [shown, setShown] = useState(0);
  const reduce = useRef(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches).current;
  useEffect(() => {
    if (reduce) { setShown(score); return; }
    let raf = 0; let start = 0; const dur = 450;
    const step = (t: number) => { if (!start) start = t; const p = Math.min(1, (t - start) / dur); const e = 1 - Math.pow(1 - p, 3); setShown(Math.round(score * e)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    const settle = setTimeout(() => setShown(score), dur + 200);
    return () => { cancelAnimationFrame(raf); clearTimeout(settle); };
  }, [score]);
  const col = scoreColor(score);
  const path = "M 24 150 A 126 126 0 0 1 276 150";
  const ARC = Math.PI * 126;
  return (
    <div style={{ position: "relative", width: 300, height: 190 }} role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label="AEO score">
      <svg viewBox="0 0 300 172" width="300" height="172">
        <path d={path} fill="none" stroke="var(--surface-inset)" strokeWidth="18" strokeLinecap="round" />
        <path d={path} fill="none" stroke={col} strokeWidth="18" strokeLinecap="round" strokeDasharray={`${(shown / 100) * ARC} ${ARC}`} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 64, display: "grid", placeItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-.03em", fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}>{shown}</div>
          <div style={{ fontSize: 13, color: "var(--text-tertiary)", marginTop: 6, fontWeight: 600 }}>/ 100</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 10, bottom: 0, fontSize: 12, color: "var(--text-tertiary)", fontWeight: 600 }}>0</div>
      <div style={{ position: "absolute", right: 6, bottom: 0, fontSize: 12, color: "var(--text-tertiary)", fontWeight: 600 }}>100</div>
    </div>
  );
}
function LevelBadge({ level, score }: { level: Level; score: number }) {
  const col = scoreColor(score);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px 8px 12px", borderRadius: 999, background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-sm)" }}>
      <span style={{ display: "inline-flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((n) => <span key={n} style={{ width: 7, height: 14, borderRadius: 3, background: n <= level.n ? col : "var(--surface-border)" }} />)}
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>AEO Level {level.n}</span>
      {level.name ? <span style={{ width: 4, height: 4, borderRadius: 9, background: "var(--text-tertiary)" }} /> : null}
      {level.name ? <span style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500 }}>{level.name}</span> : null}
    </div>
  );
}
function MiniGauge({ score, label, passText, active, onClick }: { score: number; label: string; passText?: string; active?: boolean; onClick?: () => void }) {
  const r = 26, c = 2 * Math.PI * r, col = scoreColor(score);
  return (
    <button onClick={onClick} aria-label={`${label}: score ${score} of 100${passText ? ` (${passText} passed)` : ""}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, padding: "14px 8px 12px", background: active ? "var(--surface-card-strong)" : "transparent", border: "1px solid", borderColor: active ? "var(--surface-border-strong)" : "transparent", borderRadius: "var(--radius-md)", cursor: "pointer", minWidth: 96, flex: "1 1 96px", transition: "background .15s,border-color .15s" }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--surface-inset)" strokeWidth="6" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={col} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(score / 100) * c} ${c}`} style={{ transition: "stroke-dasharray .6s ease" }} />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 17, fontWeight: 800, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>{score}</span>
      </div>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)", textAlign: "center", lineHeight: 1.25 }}>{label}</span>
      {passText ? <span style={{ fontSize: 11.5, color: "var(--text-tertiary)", fontWeight: 600 }}>{passText}</span> : null}
    </button>
  );
}

/* ============================================================ fix cards */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(96px,118px) 1fr", gap: 14, alignItems: "baseline" }}>
      <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</span>
      <span style={{ fontSize: 14.5, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}
function FixCard({ check, density = "comfy", defaultOpen }: { check: Check; density?: string; defaultOpen?: boolean }) {
  const failing = check.status === "fail";
  const [open, setOpen] = useState(defaultOpen != null ? defaultOpen : failing);
  const pad = density === "compact" ? "14px 16px" : "18px 20px";
  const resultColor = check.status === "pass" ? "var(--status-success)" : check.status === "fail" ? "var(--status-danger)" : "var(--text-tertiary)";
  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface-card)", border: "1px solid var(--surface-border)", borderLeft: failing ? "3px solid var(--status-danger)" : "1px solid var(--surface-border)", boxShadow: open ? "var(--shadow-sm)" : "none", transition: "box-shadow .15s" }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "left", padding: pad, background: "transparent", border: "none", cursor: "pointer" }}>
        <StatusIcon status={check.status} size={density === "compact" ? 24 : 28} />
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: density === "compact" ? 14.5 : 15.5, fontWeight: 700, color: "var(--text-primary)" }}>{check.title}</span>
          {!open && check.result && <span style={{ display: "block", fontSize: 13, color: resultColor, fontWeight: 500, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{check.result}</span>}
        </span>
        {check.status === "info" && <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".06em", flex: "none" }}>Info</span>}
        <span style={{ fontSize: 18, color: "var(--text-tertiary)", display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flex: "none" }}><I.chevron /></span>
      </button>
      {open && (
        <div style={{ padding: `0 ${density === "compact" ? 16 : 20}px ${density === "compact" ? 16 : 20}px`, display: "grid", gap: 14 }}>
          <div style={{ height: 1, background: "var(--surface-border)" }} />
          {check.goal && <Field label="Goal"><span style={{ color: "var(--text-secondary)" }}>{check.goal}</span></Field>}
          {check.result && (
            <Field label={check.status === "pass" ? "Result" : "Issue"}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: resultColor, fontWeight: 600 }}>
                <span style={{ fontSize: 14, display: "inline-flex" }}>{check.status === "pass" ? <I.check /> : check.status === "fail" ? <I.x /> : <I.info />}</span>
                {check.result}
              </span>
            </Field>
          )}
          {check.how && <Field label="How to implement"><span style={{ color: "var(--text-secondary)" }}>{check.how}</span></Field>}
          {(check.res.length > 0 || check.skillSlug) && (
            <Field label="Resources">
              <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {check.res.map((r, i) => <Chip key={i} href={r.u}>{r.t}</Chip>)}
                {check.skillSlug && <Chip skill href={skillUrl(check.skillSlug)}>Skill</Chip>}
              </span>
            </Field>
          )}
          {check.status === "fail" && check.copy && (
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 2 }}>
              <CopyButton text={check.copy} label="Copy fix for agent" primary />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function CategorySection({ cat, idAttr }: { cat: Category; idAttr: string }) {
  const { pass, total } = countPass(cat.checks);
  return (
    <section id={idAttr} style={{ scrollMarginTop: 24, display: "grid", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 6 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-.01em" }}>{cat.label}</h3>
          <p style={{ margin: "3px 0 0", fontSize: 13.5, color: "var(--text-tertiary)" }}>{cat.blurb}</p>
        </div>
        <span style={{ flex: "none", fontSize: 13, fontWeight: 700, color: pass === total ? "var(--status-success)" : "var(--text-secondary)", padding: "5px 11px", borderRadius: 999, background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", whiteSpace: "nowrap" }}>{pass}/{total} passed</span>
      </div>
      <div style={{ display: "grid", gap: 10 }}>{cat.checks.map((c) => <FixCard key={c.id} check={c} />)}</div>
    </section>
  );
}
function CommerceSection({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(false);
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 18px", borderRadius: "var(--radius-md)", background: "var(--surface-card-strong)", border: "1px dashed var(--surface-border-strong)", cursor: "pointer", textAlign: "left" }}>
        <span>
          <span style={{ display: "block", fontSize: 15.5, fontWeight: 700, color: "var(--text-primary)" }}>{cat.label} <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: ".06em" }}>· informational</span></span>
          <span style={{ display: "block", fontSize: 13.5, color: "var(--text-tertiary)", marginTop: 2 }}>{cat.blurb}</span>
        </span>
        <span style={{ fontSize: 18, color: "var(--text-tertiary)", display: "inline-flex", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flex: "none" }}><I.chevron /></span>
      </button>
      {open && <div style={{ display: "grid", gap: 10 }}>{cat.checks.map((c) => <FixCard key={c.id} check={c} />)}</div>}
    </section>
  );
}

/* ============================================================ gate */
const gateWrap: CSS = { position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 54, zIndex: 3 };
const gateCard: CSS = { width: "min(420px,92%)", display: "grid", gap: 13, padding: "28px 26px", background: "var(--surface-card)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" };
function GatePanel({ lockedCount, sent, email, setEmail, agree, setAgree, feature, setFeature, onSubmit, error }: { lockedCount: number; sent: boolean; email: string; setEmail: (v: string) => void; agree: boolean; setAgree: (v: boolean) => void; feature: boolean; setFeature: (v: boolean) => void; onSubmit: () => void; error: string }) {
  const [err, setErr] = useState("");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) { setErr("Enter a valid email address."); return; }
    if (!agree) { setErr("Please agree to receive emails to continue."); return; }
    setErr(""); onSubmit();
  };
  if (sent) {
    return (
      <div style={gateWrap}>
        <div style={{ ...gateCard, textAlign: "center" }}>
          <span style={{ width: 56, height: 56, borderRadius: 999, display: "grid", placeItems: "center", margin: "0 auto 4px", background: "var(--status-info-dim)", color: "var(--status-info)", border: "1px solid var(--status-info-border)", fontSize: 26 }}><I.mail /></span>
          <h3 style={{ margin: 0, fontSize: 21, fontWeight: 800 }}>Check your inbox</h3>
          <p style={{ margin: 0, fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>We sent a confirmation link to <strong style={{ color: "var(--text-primary)" }}>{email}</strong>. Click it to unlock all fixes.</p>
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-tertiary)" }}>Didn't get it? Check spam, or wait a minute and try again.</p>
        </div>
      </div>
    );
  }
  return (
    <div style={gateWrap}>
      <form onSubmit={submit} noValidate style={gateCard}>
        <span style={{ width: 48, height: 48, borderRadius: 999, display: "grid", placeItems: "center", margin: "0 auto", background: "var(--surface-card-strong)", color: "var(--accent)", border: "1px solid var(--surface-border)", fontSize: 22 }}><I.lock /></span>
        <h3 style={{ margin: 0, fontSize: 21, fontWeight: 800, textAlign: "center", letterSpacing: "-.01em" }}>{lockedCount === 1 ? "Unlock the remaining fix" : `Unlock all ${lockedCount > 0 ? lockedCount + " " : ""}fixes`}</h3>
        <p style={{ margin: 0, fontSize: 14.5, color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.5 }}>Get the full report + copy-ready instructions for your AI agent.</p>
        <div style={{ display: "grid", gap: 10, marginTop: 2 }}>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} placeholder="you@company.com" aria-label="Email address"
            style={{ padding: "13px 15px", fontSize: 15, borderRadius: "var(--radius-sm)", width: "100%", background: "var(--surface-card-strong)", color: "var(--text-primary)", border: `1px solid ${err && !valid ? "var(--status-danger)" : "var(--surface-border)"}`, outline: "none" }} />
          <label style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", cursor: "pointer", lineHeight: 1.45 }}>
            <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErr(""); }} style={{ marginTop: 2, width: 17, height: 17, accentColor: "var(--accent)", flex: "none" }} />
            {/* Keep equivalent to CONSENT_TEXT / CONSENT_VERSION in src/aeo/routes/aeo.ts —
                that string is recorded verbatim per subscriber as the proof of consent. */}
            <span>I agree to receive emails from AIPUSH. Unsubscribe anytime. See our <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>Privacy Policy</a>.</span>
          </label>
          <label style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", cursor: "pointer", lineHeight: 1.45 }}>
            <input type="checkbox" checked={feature} onChange={(e) => setFeature(e.target.checked)} style={{ marginTop: 2, width: 17, height: 17, accentColor: "var(--accent)", flex: "none" }} />
            <span>Want your website featured in a video? We pick sites to analyze on our channel.</span>
          </label>
          {(err || error) && <span style={{ fontSize: 12.5, color: "var(--status-danger)", fontWeight: 600 }}>{err || error}</span>}
          <button type="submit" style={{ padding: "13px 18px", fontSize: 15, fontWeight: 700, cursor: "pointer", borderRadius: "var(--radius-sm)", color: "var(--on-accent)", background: "var(--accent)", border: "none", boxShadow: "var(--shadow-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Unlock report <span style={{ fontSize: 16, display: "inline-flex" }}><I.arrow /></span>
          </button>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>Double opt-in — confirm via the link we email you.</p>
      </form>
    </div>
  );
}
function LockedStack() {
  return (
    <div aria-hidden="true" style={{ position: "relative", filter: "blur(5px) saturate(.6)", opacity: 0.55, pointerEvents: "none", userSelect: "none", display: "grid", gap: 10 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ height: 70 - i * 4, borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--surface-border)", borderLeft: "3px solid var(--status-danger)", display: "flex", alignItems: "center", gap: 13, padding: "0 20px" }}>
          <span style={{ width: 26, height: 26, borderRadius: 999, background: "var(--surface-inset)", flex: "none" }} />
          <span style={{ display: "grid", gap: 7, flex: 1 }}>
            <span style={{ height: 11, width: `${55 - i * 8}%`, background: "var(--surface-inset)", borderRadius: 6 }} />
            <span style={{ height: 9, width: `${72 - i * 6}%`, background: "var(--surface-inset)", borderRadius: 6 }} />
          </span>
        </div>
      ))}
    </div>
  );
}
function CopyAllModal({ bundle, gated, freeCount, totalCount, onClose }: { bundle: string; gated: boolean; freeCount: number; totalCount: number; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Copy all fixes" style={{ position: "fixed", inset: 0, zIndex: 60, background: "color-mix(in oklab, var(--ctp-crust) 62%, transparent)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(680px,100%)", maxHeight: "86vh", display: "flex", flexDirection: "column", background: "var(--surface-card)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "20px 22px 14px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{gated ? "Copy free instructions" : "Copy all instructions"}</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--text-tertiary)" }}>{gated ? `${freeCount} unlocked ${freeCount === 1 ? "fix" : "fixes"} — enter your email to get all ${totalCount}.` : "Paste into Cursor, Claude Code, Copilot, or send to your developer."}</p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ flex: "none", width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", color: "var(--text-secondary)", cursor: "pointer", fontSize: 16 }}><I.x /></button>
        </div>
        <pre className="scroll-thin" style={{ margin: "0 22px", flex: 1, overflow: "auto", padding: "16px 18px", fontSize: 12.5, lineHeight: 1.6, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", color: "var(--text-secondary)", whiteSpace: "pre-wrap", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-md)" }}>{bundle}</pre>
        <div style={{ padding: "16px 22px 20px" }}><CopyButton text={bundle} label={gated ? "Copy free instructions" : "Copy all instructions"} primary full /></div>
      </div>
    </div>
  );
}

/* ============================================================ screens */
function Landing({ onAnalyze, busy, error }: { onAnalyze: (u: string) => void; busy: boolean; error: string }) {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); onAnalyze(url); };
  // "What we check" overlay: dismiss on Escape or outside click (parity with the modals).
  useEffect(() => {
    if (!custom) return undefined;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setCustom(false); };
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || toggleRef.current?.contains(t)) return;
      setCustom(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [custom]);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "90px 20px 64px" }}>
      <div style={{ width: "min(620px,100%)", display: "grid", gap: 22, position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, justifySelf: "center", fontSize: 13, fontWeight: 700, color: "var(--text-tertiary)", letterSpacing: ".04em", textTransform: "uppercase" }}>
          <span style={{ color: "var(--accent)", fontSize: 15, display: "inline-flex" }}><I.spark /></span> AIPUSH · AEO Analyzer
        </div>
        <h1 style={{ margin: 0, textAlign: "center", fontSize: "clamp(30px,6vw,44px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.025em" }}>Is your site ready for AI agents?</h1>
        <p style={{ margin: "0 auto", maxWidth: 540, textAlign: "center", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.55 }}>Scan your site for AI-agent and answer-engine readiness — robots, sitemaps, MCP, structured data, and more.</p>
        <form onSubmit={submit} style={{ marginTop: 4 }}>
          <div className="url-row" style={{ display: "flex", gap: 10, padding: 6, borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-md)" }}>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourwebsite.com" inputMode="url" aria-label="Website URL" style={{ flex: 1, minWidth: 0, padding: "14px 14px", fontSize: 16, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)" }} />
            <button type="submit" className="analyze-btn" disabled={busy} style={{ flex: "none", padding: "14px 24px", fontSize: 15.5, fontWeight: 700, cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1, borderRadius: "var(--radius-md)", color: "var(--on-accent)", background: "var(--accent)", border: "none", boxShadow: "var(--shadow-accent)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              Analyze <span style={{ fontSize: 16, display: "inline-flex" }}><I.arrow /></span>
            </button>
          </div>
        </form>
        {error && <p style={{ margin: 0, textAlign: "center", fontSize: 13.5, color: "var(--status-danger)", fontWeight: 600 }}>{error}</p>}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Free · No account needed to start</span>
          <button ref={toggleRef} onClick={() => setCustom((c) => !c)} aria-expanded={custom} aria-controls="aeo-what-we-check" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", background: "transparent", border: "none", cursor: "pointer" }}>
            What we check <span style={{ fontSize: 14, display: "inline-flex", transform: custom ? "rotate(180deg)" : "none", transition: "transform .2s" }}><I.chevron /></span>
          </button>
        </div>
        {custom && (
          <div ref={panelRef} id="aeo-what-we-check" role="region" aria-label="What we check" style={{ position: "absolute", top: "calc(100% + 12px)", left: 0, right: 0, zIndex: 5, display: "grid", gap: 10, padding: "18px 20px", borderRadius: "var(--radius-md)", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-lg)" }}>
            {["Discoverability — robots, sitemaps, crawlability", "Agent access & content — readable, structured content", "Identity & auth — OAuth & agent identity discovery", "Content structure — schema, FAQ, answer-units", "Structured data — JSON-LD, metadata, machine-readable signals"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent)", fontSize: 13, display: "inline-flex" }}><I.check /></span>{t}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function Scanning({ url, ready, onDone }: { url: string; ready: boolean; onDone: () => void }) {
  const phases = SCAN_PHASES;
  const [idx, setIdx] = useState(0);
  const reduce = useRef(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches).current;
  useEffect(() => {
    // PRE-response only: advance phases on a timer purely as progress feedback while
    // we wait. Stops the moment the response is in — the snap effect below takes over.
    // We deliberately do NOT "race" phases with a faster interval after the response:
    // background-tab timer throttling clamps any setInterval to ~1s, which silently
    // re-introduces a multi-second tail. A direct jump (below) is immune to that.
    if (ready || reduce) return undefined;
    const t = setInterval(() => setIdx((i) => Math.min(i + 1, phases.length)), 380);
    return () => clearInterval(t);
  }, [phases.length, ready, reduce]);
  useEffect(() => {
    // Response is in → snap every remaining phase to done at once (no timer racing,
    // so it's immune to tab throttling) and settle to results after a short beat
    // (0ms under reduced motion). This is what actually removes the post-response hang.
    if (!ready) return undefined;
    setIdx(phases.length);
    const t = setTimeout(onDone, reduce ? 0 : 120);
    return () => clearTimeout(t);
  }, [ready, phases.length, onDone, reduce]);
  // Time-based queue hint: if the result hasn't arrived within QUEUE_HINT_MS we are
  // queued behind other scans (or waiting on a slow site). Independent of the phase
  // animation, so it fires reliably instead of only after the animation finishes.
  const [waitedLong, setWaitedLong] = useState(false);
  useEffect(() => {
    if (ready) { setWaitedLong(false); return undefined; }
    const t = setTimeout(() => setWaitedLong(true), QUEUE_HINT_MS);
    return () => clearTimeout(t);
  }, [ready]);
  const waitingInQueue = waitedLong && !ready;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "90px 20px 64px" }}>
      <div style={{ width: "min(560px,100%)", display: "grid", gap: 30, justifyItems: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "9px 16px", borderRadius: 999, background: "var(--surface-card)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-sm)", maxWidth: "100%" }}>
          <Spinner />
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Scanning {url}</span>
        </div>
        <div style={{ width: "min(420px,100%)", display: "grid", gap: 9 }}>
          {phases.map((p, i) => {
            const done = i < idx, active = i === idx;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 15px", borderRadius: "var(--radius-md)", background: active ? "var(--surface-card)" : "transparent", border: "1px solid", borderColor: active ? "var(--surface-border-strong)" : "transparent", opacity: done || active ? 1 : 0.4, transition: "opacity .25s, background .25s, border-color .25s" }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, flex: "none", display: "grid", placeItems: "center", fontSize: 13, background: done ? "var(--status-success-dim)" : "var(--surface-inset)", color: done ? "var(--status-success)" : "var(--text-tertiary)", border: `1px solid ${done ? "var(--status-success-border)" : "var(--surface-border)"}` }}>
                  {done ? <I.check /> : active ? <Spinner sm /> : <span style={{ width: 5, height: 5, borderRadius: 9, background: "var(--text-tertiary)" }} />}
                </span>
                <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: done || active ? "var(--text-primary)" : "var(--text-tertiary)" }}>{p}</span>
              </div>
            );
          })}
        </div>
        {waitingInQueue && (
          <div role="status" aria-live="polite" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4, padding: "12px 14px", borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--surface-border)", color: "var(--text-secondary)", maxWidth: "min(420px,100%)" }}>
            <Spinner sm />
            <span style={{ fontSize: 13 }}>High demand right now — you're in the queue. Hang tight, this can take a little longer…</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ShareModal({ url, shareId, score, level, onClose }: { url: string; shareId: string; score: number; level: Level; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  // Share a stable link to THIS scan (?scan=<id>) so the recipient sees the exact
  // cached score the sharer saw, restored without a re-scan. A re-scan (?url=) could
  // return a different number and break the social-proof claim in the share text.
  const pageUrl = shareId
    ? `${location.origin}/?scan=${encodeURIComponent(shareId)}`
    : `${location.origin}/?url=${encodeURIComponent(url)}`;
  const text = `My site scored ${score}/100 (AEO Level ${level.n}${level.name ? " · " + level.name : ""}) on the AIPUSH AI-readiness analyzer. Check yours:`;
  const eu = encodeURIComponent(pageUrl);
  const et = encodeURIComponent(text);
  const targets: { label: string; href: string }[] = [
    { label: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${et}&url=${eu}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${eu}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${eu}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(text + " " + pageUrl)}` },
    { label: "Email", href: `mailto:?subject=${encodeURIComponent("AIPUSH AEO score")}&body=${encodeURIComponent(text + "\n\n" + pageUrl)}` },
  ];
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(pageUrl); }
    catch { const ta = document.createElement("textarea"); ta.value = pageUrl; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Share results" style={{ position: "fixed", inset: 0, zIndex: 60, background: "color-mix(in oklab, var(--ctp-crust) 62%, transparent)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 18 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(440px,100%)", display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16, padding: "22px 22px 24px", background: "var(--surface-card)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Share your result</h3>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--text-tertiary)" }}>Score {score}/100 · AEO Level {level.n}{level.name ? " · " + level.name : ""}</p>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ flex: "none", width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", color: "var(--text-secondary)", cursor: "pointer", fontSize: 16 }}><I.x /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 8 }}>
          {targets.map((t) => (
            <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 15px", fontSize: 14.5, fontWeight: 600, textDecoration: "none", color: "var(--text-primary)", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-sm)" }}>
              <span>{t.label}</span>
              <span style={{ fontSize: 14, color: "var(--text-tertiary)", display: "inline-flex" }}><I.ext /></span>
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 12px", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", borderRadius: "var(--radius-sm)" }}>
          <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pageUrl}</span>
          <button onClick={copyLink} style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 13px", fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: "var(--radius-sm)", color: copied ? "var(--status-success)" : "var(--on-accent)", background: copied ? "var(--surface-card)" : "var(--accent)", border: copied ? "1px solid var(--status-success-border)" : "none" }}>
            <span style={{ fontSize: 14, display: "inline-flex" }}>{copied ? <I.check /> : <I.copy />}</span>{copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}

const primaryBtn: CSS = { display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", borderRadius: "var(--radius-md)", color: "var(--on-accent)", background: "var(--accent)", border: "none", boxShadow: "var(--shadow-accent)" };
const secondaryBtn: CSS = { display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 18px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", borderRadius: "var(--radius-md)", color: "var(--text-primary)", background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)" };

function Results({ data, scanId, unlocked, lockedCount, sent, gate, onScanAnother }: {
  data: Data; scanId: string; unlocked: boolean; lockedCount: number; sent: boolean;
  gate: { email: string; setEmail: (v: string) => void; agree: boolean; setAgree: (v: boolean) => void; feature: boolean; setFeature: (v: boolean) => void; onSubmit: () => void; error: string };
  onScanAnother: () => void;
}) {
  const [modal, setModal] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  // Always open our own branded share modal — consistent on every device and
  // avoids the OS native share sheet opening alongside it (the two-windows bug).
  const onShare = () => setShareOpen(true);
  const findingsRef = useRef<HTMLDivElement>(null);
  const bundle = useMemo(() => buildBundle(data), [data]);
  const freeFixes = useMemo(() => {
    const arr: Check[] = [];
    data.categories.forEach((c) => c.checks.forEach((ch) => { if (ch.status === "fail" && ch.copy) arr.push(ch); }));
    return arr.slice(0, 2);
  }, [data]);
  const scrollToFindings = () => { const el = findingsRef.current; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: "smooth" }); };
  const scrollToCat = (id: string) => { const el = document.getElementById("cat-" + id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: "smooth" }); };

  return (
    <div style={{ minHeight: "100vh", padding: "74px 18px 80px" }}>
      <div style={{ width: "min(720px,100%)", margin: "0 auto", display: "grid", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontSize: 13.5, color: "var(--text-tertiary)", display: "inline-flex", alignItems: "center", gap: 7, minWidth: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: 9, background: "var(--status-success)", flex: "none" }} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.url}</span>
          </span>
          <div style={{ display: "flex", gap: 8, flex: "none" }}>
            <GhostBtn icon={<I.share />} label="Share" onClick={onShare} />
            <GhostBtn icon={<I.refresh />} label="Scan another" onClick={onScanAnother} />
          </div>
        </div>

        <div style={{ display: "grid", gap: 18, padding: "30px 24px 26px", borderRadius: "var(--radius-xl)", background: "var(--surface-card)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-md)", justifyItems: "center" }}>
          <ScoreGauge score={data.score} />
          <LevelBadge level={data.level} score={data.score} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 2 }}>
            <button onClick={scrollToFindings} style={primaryBtn}>Improve your score <span style={{ fontSize: 15, display: "inline-flex" }}><I.arrow /></span></button>
            <button onClick={() => setModal(true)} style={secondaryBtn}><span style={{ fontSize: 15, display: "inline-flex" }}><I.copy /></span> {!unlocked && lockedCount > 0 ? "Copy free fixes" : "Copy all fixes"}</button>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: 8, borderRadius: "var(--radius-lg)", background: "var(--surface-card)", border: "1px solid var(--surface-border)" }}>
          {data.categories.map((c) => {
            const { pass, total } = countPass(c.checks);
            return <MiniGauge key={c.id} score={c.score} label={c.label} passText={unlocked ? `${pass}/${total}` : undefined} active={activeCat === c.id} onClick={() => { setActiveCat(c.id); scrollToCat(c.id); }} />;
          })}
        </div>

        <div ref={findingsRef} style={{ display: "grid", gap: 18, marginTop: 4 }}>
          {unlocked ? (
            <>
              {data.categories.map((c) => <CategorySection key={c.id} cat={c} idAttr={"cat-" + c.id} />)}
              {data.commerce && <CommerceSection cat={data.commerce} />}
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800 }}>Recommended fixes</h3>
                  <p style={{ margin: "3px 0 0", fontSize: 13.5, color: "var(--text-tertiary)" }}>{lockedCount + freeFixes.length} fixes found · {freeFixes.length} unlocked free</p>
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>{freeFixes.map((ch) => <FixCard key={ch.id} check={ch} defaultOpen />)}</div>
              {lockedCount > 0 && (
                <div style={{ position: "relative", minHeight: 430 }}>
                  <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", zIndex: 4, fontSize: 12.5, fontWeight: 700, color: "var(--text-secondary)", padding: "5px 13px", borderRadius: 999, background: "var(--surface-card-strong)", border: "1px solid var(--surface-border)", boxShadow: "var(--shadow-sm)" }}>+ {lockedCount} more fixes</div>
                  <div style={{ paddingTop: 18 }}><LockedStack /></div>
                  <GatePanel lockedCount={lockedCount} sent={sent} email={gate.email} setEmail={gate.setEmail} agree={gate.agree} setAgree={gate.setAgree} feature={gate.feature} setFeature={gate.setFeature} onSubmit={gate.onSubmit} error={gate.error} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {modal && <CopyAllModal bundle={bundle} gated={!unlocked && lockedCount > 0} freeCount={freeFixes.length} totalCount={lockedCount + freeFixes.length} onClose={() => setModal(false)} />}
      {shareOpen && <ShareModal url={data.url} shareId={scanId} score={data.score} level={data.level} onClose={() => setShareOpen(false)} />}
    </div>
  );
}

/* ============================================================ root */
export function AeoAnalyzer() {
  const [theme, setThemeState] = useState(initialTheme);
  const [screen, setScreen] = useState<"landing" | "scanning" | "results">("landing");
  const [data, setData] = useState<Data | null>(null);
  const [scanId, setScanId] = useState<string>("");
  const [lockedCount, setLockedCount] = useState(0);
  const [scanReady, setScanReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [feature, setFeature] = useState(false);
  const [landingError, setLandingError] = useState("");
  const [gateError, setGateError] = useState("");
  const [busy, setBusy] = useState(false);
  const leadFired = useRef(false);

  const setTheme = (v: string) => { setThemeState(v); applyTheme(v); localStorage.setItem("aeo-theme", v); };
  useEffect(() => { applyTheme(theme); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { window.scrollTo(0, 0); }, [screen]);
  // Fire the lead conversion exactly once, on the confirmed unlock (server-verified
  // /full -> unlocked), not on the unconfirmed subscribe submit. This counts only
  // double-opt-in-confirmed leads, matching the conversion's intent.
  useEffect(() => {
    if (unlocked && !leadFired.current) { leadFired.current = true; trackLeadConversion(); }
  }, [unlocked]);

  const startScan = useCallback(async (raw: string) => {
    const norm = normalizeUrl(raw);
    if (!norm) { setLandingError("Enter a valid website URL (e.g. example.com)."); return; }
    setLandingError(""); setBusy(true);
    setData(null); setUnlocked(false); setSent(false); setScanReady(false); setLockedCount(0);
    setScreen("scanning");
    try {
      const r = await fetch("/api/aeo/scan", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ url: norm }) });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        setLandingError(scanErrorMessage(j.error, r.status)); setScreen("landing"); setBusy(false); return;
      }
      const resp = await r.json();
      setScanId(resp.scanId); setLockedCount(resp.lockedCount ?? 0);
      setData(adapt(resp)); setScanReady(true); setBusy(false);
      // A confirmed access cookie (e.g. the local video-capture automation) returns
      // the full ungated report with unlocked:true → render every fix, no gate.
      if (resp.unlocked) setUnlocked(true);
    } catch {
      setLandingError("Could not reach the analyzer. Please try again."); setScreen("landing"); setBusy(false);
    }
  }, []);

  // deep-link handling:
  //  - /?url=<site> auto-starts a scan (the Share-modal links use this format)
  //  - /?scan=<id>&unlocked=1 restores a confirmed report after the email click
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // A failed/expired confirmation click lands here as /?aeo_error=... — without this
    // the user saw a blank landing page and silently abandoned. Show why and how to retry.
    const aeoError = params.get("aeo_error");
    if (aeoError) {
      setLandingError(aeoError === "expired"
        ? "That confirmation link has expired. Re-enter your URL below to get a fresh one."
        : "That confirmation link is invalid. Re-enter your URL below to get a fresh one.");
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }
    const urlParam = params.get("url");
    if (urlParam && urlParam.trim()) { startScan(urlParam.trim()); return; }
    const sid = params.get("scan");
    if (!sid) return;
    const wantUnlock = params.get("unlocked") === "1";
    (async () => {
      try {
        if (wantUnlock) {
          const rf = await fetch(`/api/aeo/scan/${encodeURIComponent(sid)}/full`, { credentials: "include" });
          if (rf.ok) { const full = await rf.json(); setScanId(sid); setData(adapt(full)); setLockedCount(0); setUnlocked(true); setScanReady(true); setScreen("results"); return; }
        }
        const rg = await fetch(`/api/aeo/scan/${encodeURIComponent(sid)}`, { credentials: "include" });
        if (rg.ok) { const g = await rg.json(); setScanId(sid); setData(adapt(g)); setLockedCount(g.lockedCount ?? 0); setScanReady(true); setScreen("results"); }
      } catch { /* ignore — stay on landing */ }
    })();
  }, []);

  // attempt to unlock when results show / on focus (after confirming via email in another tab)
  const tryUnlock = useCallback(async () => {
    if (!scanId || unlocked) return;
    try {
      const r = await fetch(`/api/aeo/scan/${encodeURIComponent(scanId)}/full`, { credentials: "include" });
      if (r.ok) { const full = await r.json(); setData(adapt(full)); setLockedCount(0); setUnlocked(true); }
    } catch { /* not confirmed yet */ }
  }, [scanId, unlocked]);
  useEffect(() => {
    if (screen !== "results" || !sent || unlocked) return undefined;
    const onFocus = () => tryUnlock();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [screen, sent, unlocked, tryUnlock]);

  const submitGate = useCallback(async () => {
    setGateError("");
    try {
      const r = await fetch("/api/aeo/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ email: email.trim(), scanId, consent: true }) });
      if (!r.ok) { const j = await r.json().catch(() => ({})); setGateError(subscribeErrorMessage(j.error)); return; }
      setSent(true);
      // Fire-and-forget: if they opted to be featured, register the site for the video pool.
      if (feature) {
        fetch("/api/aeo/feature", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ scanId, email: email.trim() }) }).catch(() => {});
      }
    } catch { setGateError("Could not send the confirmation email. Please try again."); }
  }, [email, scanId, feature]);

  return (
    <div className="aeo-root">
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 40 }}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      {screen === "landing" && <Landing onAnalyze={startScan} busy={busy} error={landingError} />}
      {screen === "scanning" && <Scanning url={data?.url || ""} ready={scanReady} onDone={() => setScreen("results")} />}
      {screen === "results" && data && (
        <Results data={data} scanId={scanId} unlocked={unlocked} lockedCount={lockedCount} sent={sent}
          gate={{ email, setEmail, agree, setAgree, feature, setFeature, onSubmit: submitGate, error: gateError }}
          onScanAnother={() => { setScreen("landing"); setData(null); setLandingError(""); }} />
      )}

      {(sent || unlocked) && screen === "results" && (
        <footer style={{ padding: "22px 18px 30px", display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12.5, color: "var(--text-tertiary)" }}>
            <a href="/privacy" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Privacy</a>
            <span style={{ width: 3, height: 3, borderRadius: 9, background: "var(--text-tertiary)" }} />
            <a href="/terms" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>Terms</a>
            <span style={{ width: 3, height: 3, borderRadius: 9, background: "var(--text-tertiary)" }} />
            <span>© AIPUSH</span>
          </div>
        </footer>
      )}
    </div>
  );
}

function scanErrorMessage(code: string | undefined, status: number): string {
  switch (code) {
    case "URL_REQUIRED": return "Please enter a website URL.";
    case "INVALID_URL": return "That doesn't look like a valid website URL.";
    case "SCAN_PERSIST_FAILED": return "Something went wrong saving the scan. Please try again.";
    case "ANALYZER_BUSY": return "The analyzer is busy right now — please try again in a few seconds.";
    default:
      if (status === 429) return "Too many scans — please wait a moment and try again.";
      if (status === 503) return "The analyzer is busy right now — please try again in a few seconds.";
      return "We couldn't analyze that site. Check the URL and try again.";
  }
}
function subscribeErrorMessage(code: string | undefined): string {
  switch (code) {
    case "EMAIL_INVALID": return "Enter a valid email address.";
    case "CONSENT_REQUIRED": return "Please agree to receive emails to continue.";
    case "SCAN_ID_REQUIRED": case "SCAN_NOT_FOUND": return "Please run a scan first.";
    case "SERVER_MISCONFIGURED": return "Email isn't available right now. Please try again later.";
    default: return "Could not send the confirmation email. Please try again.";
  }
}
