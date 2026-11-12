import React from "react";
import { Link } from "react-router-dom";
import { CATEGORY_BLURBS, METHODOLOGY_CHECKS } from "../aeo/methodologyData";

const CATEGORIES = [
  { id: "agent_discovery", label: "Agent Discovery" },
  { id: "agent_interfaces", label: "Agent Interfaces" },
  { id: "identity_auth", label: "Identity & Auth" },
  { id: "content_structure", label: "Content Structure" },
  { id: "structured_data", label: "Structured Data" },
  { id: "commerce", label: "Commerce" },
];

const TITLE = "How AIPUSH scores a site — AEO methodology | AIPUSH";

export function Methodology() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLE;
    const mDesc = document.querySelector('meta[name="description"]');
    const prev = mDesc?.getAttribute("content") ?? "";
    if (mDesc)
      mDesc.setAttribute(
        "content",
        "Every check the AIPUSH AEO analyzer runs, with its weight and goal, and how the score, level and ladder are calculated."
      );
    return () => {
      if (mDesc) mDesc.setAttribute("content", prev);
    };
  }, []);

  const n = METHODOLOGY_CHECKS.length;
  const scored = METHODOLOGY_CHECKS.filter((c) => c.weight > 0).length;

  return (
    <main className="aipush-seo-page">
      <section className="aipush-seo-hero">
        <h1 className="aipush-seo-heroTitle">How AIPUSH scores a site</h1>
        <p className="aipush-seo-heroSub">
          AIPUSH runs {n} checks on the URL you enter. {scored} of them are scored; the other {n - scored} are shown in every report and never change the score.
        </p>
      </section>

      <div className="aipush-seo-content">
        <h2>What it does</h2>
        <p>
          AIPUSH reads your site (files, headers, markup); it does not sign up, buy or submit forms on it. Every check is a read-only HTTP request or a parse of the homepage HTML. FAQ schema is also accepted on your FAQ page when the homepage links to it or the sitemap lists it. Payment protocols (x402, MPP) are read from what your site declares: the homepage response, /openapi.json and /.well-known/x402. AIPUSH never calls a paid route.
        </p>

        <h2>Score</h2>
        <p>
          Score = round(100 × passed weight ÷ weight of checks that ran). A skip result (for example a JavaScript-only shell where markup checks cannot run) is left out of the denominator. A page counts as a JavaScript-only shell only when its mount element is empty; a prerendered single-page app is read like any other page. Checks with weight 0 are informational: shown, never scored and never reported as a fail. A category in which no scored check ran is shown as not assessed and adds nothing to the score. Four checks (A2A Agent Card, OAuth/OIDC discovery, OAuth Protected Resource, WebMCP) are scored only when your site declares that capability; otherwise they are not applicable and are left out.
        </p>

        <h2 id="levels">Level and ladder</h2>
        <p>
          The score level is the badge under the gauge: 0–19 Not Agent-Ready, 20–39 Basic Web Presence, 40–59 Emerging, 60–79 Agent-Friendly, 80–100 Agent-Optimized.
        </p>
        <p>
          The readiness ladder (steps 0–5) is a separate, sequential checklist; it does not change the score or the AEO Level. Each step requires all lower ones: 1 = at least two of robots.txt, sitemap and Link headers; 2 = plus AI-bot rules and Content Signals in robots.txt; 3 = plus Markdown content negotiation; 4 = plus at least one agent interface (MCP server card, A2A agent card, agent-skills index or API catalog); 5 = plus any two of Web Bot Auth, three or more agent interfaces, and OIDC, OAuth protected-resource or auth.md discovery.
        </p>

        <h2 id="where-to-see-ai-use">Where to see whether AI answers use your site</h2>
        <p>
          The AIPUSH score measures readiness. It does not measure citations or visits. To see those, look here (checked 12 November 2026):
        </p>
        <ul>
          <li>
            Google AI Overviews and AI Mode: counted inside the Performance report of Google Search Console, within the "Web" search type. <a href="https://developers.google.com/search/docs/appearance/ai-features" rel="noopener">Google's documentation</a>.
          </li>
          <li>
            Microsoft Copilot and Bing AI answers: the AI Performance report in Bing Webmaster Tools (public preview at the time of checking). <a href="https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/" rel="noopener">Microsoft's announcement</a>.
          </li>
          <li>Other assistants: no console. Your server logs show their crawlers by user-agent.</li>
          <li>
            One public 190-day test found no trace of Gemini, Perplexity or Grok in either console (M. Landwehr, 2026-11, <a href="https://x.com/MalteLandwehr/status/2119924404813512953" rel="noopener">post on X</a>). It is one test, not a rule.
          </li>
        </ul>

        <h2 id="crawler-access">Crawler access has two layers</h2>
        <p>
          robots.txt says whether a crawler may read your site. A firewall or CDN rule decides what a request actually receives, and that can differ from robots.txt. AIPUSH reports the two as separate facts for each AI bot. For a disallowed bot the statement is: "robots.txt disallows GPTBot." For the edge, when robots.txt allows the bot but our request with its user-agent received a challenge page: "robots.txt allows GPTBot, but our request with the GPTBot user-agent received a challenge page (HTTP 403, marker). A firewall or CDN rule decides this, not robots.txt. We sent the request from our own server; the real GPTBot comes from its operator's addresses and may be treated differently. Check your firewall or CDN bot settings and your server logs." A challenge or refusal is reported only when the same page, fetched in the same scan with the analyzer's normal user-agent, was returned; if the normal request is challenged too, the report says "Our scanner itself was challenged; no statement about AI bots." A challenged or refused spoofed request is reported and not scored.
        </p>

        {CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2>{cat.label}</h2>
            <p>{CATEGORY_BLURBS[cat.id]}</p>
            <table>
              <thead>
                <tr><th>Check</th><th>Weight</th><th>Goal</th></tr>
              </thead>
              <tbody>
                {METHODOLOGY_CHECKS.filter((c) => c.category === cat.id).map((c) => (
                  <tr key={c.id} data-check-id={c.id}>
                    <td>{c.title} <code>{c.id}</code></td>
                    <td>{c.weight === 0 ? "not scored" : c.weight}</td>
                    <td>{c.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

        <p><Link to="/">Run the analyzer</Link></p>
      </div>
    </main>
  );
}
