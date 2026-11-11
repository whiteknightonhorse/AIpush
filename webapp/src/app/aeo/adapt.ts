/* Adapts the /api/aeo/* response (flat findings + scoring categories) into the
   nested shape the result UI renders. No React import: unit-tested from vitest. */

import { CATEGORY_BLURBS, METHODOLOGY_CHECKS } from "./methodologyData";

export type Status = "pass" | "fail" | "skip" | "info";
export interface Check { id: string; title: string; status: Status; goal: string; result: string; how: string; res: { t: string; u: string }[]; copy: string; why: string; tech: string; skillSlug: string | null; scoring: boolean; locked?: boolean; issue?: string; }
export interface Category { id: string; label: string; blurb: string; score: number; passed: number; total: number; assessed: boolean; skipped: number; notScored: number; checks: Check[]; }
export interface Level { n: number; name: string; }
export interface Data { url: string; score: number; catalogVersion: number; ladderLevel: number | null; level: Level; categories: Category[]; commerce: Category | null; markdown: string; }

export function docLabel(u: string): string {
  try {
    const url = new URL(u);
    const last = url.pathname.split("/").filter(Boolean).pop();
    return url.hostname.replace(/^www\./, "") + (last ? ` /${last}` : "");
  } catch { return u; }
}

export function normalizeStatus(s: unknown): Status {
  return s === "pass" || s === "fail" || s === "skip" ? s : "info";
}

export function adapt(resp: any): Data {
  const findings: any[] = Array.isArray(resp.findings) ? resp.findings : [];
  const byCat: Record<string, Check[]> = {};
  for (const f of findings) {
    const scoring = f.scoring !== false;
    const status = normalizeStatus(f.status);
    const ch: Check = {
      id: f.id, title: f.title, status: !scoring && status === "fail" ? "info" : status,
      goal: f.goal ?? "", result: f.evidence ?? "", how: f.fix ?? "",
      copy: f.copyMarkdown ?? "", why: f.why ?? "", tech: f.techDetail ?? "", skillSlug: f.skillSlug ?? null, scoring,
      locked: f.locked === true, issue: f.issue ?? "",
      res: Array.isArray(f.docs) ? f.docs.map((u: string) => ({ t: docLabel(u), u })) : [],
    };
    (byCat[f.category] ||= []).push(ch);
  }
  const cats: any[] = Array.isArray(resp.categories) ? resp.categories : [];
  const categories: Category[] = cats
    .filter((c) => c.id !== "commerce")
    .map((c) => {
      const checks = byCat[c.id] || [];
      return {
        id: c.id, label: c.label, blurb: CATEGORY_BLURBS[c.id] ?? "", score: c.score, passed: c.passed ?? 0, total: c.total ?? 0,
        assessed: c.total !== 0,
        skipped: checks.filter((k) => k.status === "skip").length,
        notScored: checks.filter((k) => !k.scoring && k.status !== "skip").length,
        checks,
      };
    });
  // The API scores five categories only; commerce rows come from the findings.
  const commerceChecks = (byCat["commerce"] || []).filter((c) => !c.locked);
  const commerce: Category | null = commerceChecks.length
    ? { id: "commerce", label: "Commerce", blurb: CATEGORY_BLURBS.commerce ?? "", score: 0, passed: 0, total: 0, assessed: true, skipped: 0, notScored: 0, checks: commerceChecks }
    : null;
  return {
    url: resp.url, score: resp.score,
    catalogVersion: typeof resp.catalogVersion === "number" ? resp.catalogVersion : 1,
    ladderLevel: typeof resp.ladderLevel === "number" ? resp.ladderLevel : null,
    level: { n: resp.level || 1, name: resp.levelLabel || "" },
    categories, commerce, markdown: resp.markdown ?? "",
  };
}

const WEIGHT = new Map(METHODOLOGY_CHECKS.map((c) => [c.id, c.weight]));

/** Unlocked fail rows with fix text, highest weight first (stable for ties). */
export function freeFixes(data: Data): Check[] {
  const arr: Check[] = [];
  data.categories.forEach((c) => c.checks.forEach((ch) => { if (ch.status === "fail" && !ch.locked && ch.copy) arr.push(ch); }));
  return arr.sort((a, b) => (WEIGHT.get(b.id) ?? 0) - (WEIGHT.get(a.id) ?? 0));
}

/** Count line under "Recommended fixes"; "all free" when nothing is locked. */
export function fixCountLine(found: number, free: number): string {
  const n = `${found} ${found === 1 ? "fix" : "fixes"} found`;
  return found === free ? `${n} · all free` : `${n} · ${free} unlocked free`;
}
