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
  const totalWeight = METHODOLOGY_CHECKS.reduce((sum, c) => sum + c.weight, 0);
  const llmsWeight = METHODOLOGY_CHECKS.find((c) => c.id === "llms_txt")?.weight;

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

        <h2 id="score-not-outcomes">What the score does not tell you</h2>
        <p>
          The AIPUSH score says whether AI agents and answer engines can read your site. It does not measure visits, leads or revenue. AIPUSH cannot see them: the scan needs no account and reads only public pages. A scan from outside cannot tie AI visibility to revenue. You can measure part of it yourself (checked 24 November 2026):
        </p>
        <ul>
          <li>Crawler requests: your server logs, by user-agent.</li>
          <li>Visits from AI assistants: your own analytics, filtered by referrer or campaign tag.</li>
          <li>Sales from those visits: the conversion report of the same analytics, with the same filter.</li>
        </ul>
        <p>An answer that names you without a click leaves no visit, so these numbers undercount the effect.</p>

        <h2 id="crawler-access">Crawler access has two layers</h2>
        <p>
          robots.txt says whether a crawler may read your site. A firewall or CDN rule decides what a request actually receives, and that can differ from robots.txt. AIPUSH reports the two as separate facts for each AI bot. For a disallowed bot the statement is: "robots.txt disallows GPTBot." For the edge, when robots.txt allows the bot but our request with its user-agent received a challenge page: "robots.txt allows GPTBot, but our request with the GPTBot user-agent received a challenge page (HTTP 403, marker). A firewall or CDN rule decides this, not robots.txt. We sent the request from our own server; the real GPTBot comes from its operator's addresses and may be treated differently. Check your firewall or CDN bot settings and your server logs." A challenge or refusal is reported only when the same page, fetched in the same scan with the analyzer's normal user-agent, was returned; if the normal request is challenged too, the report says "Our scanner itself was challenged; no statement about AI bots." When the bot request was challenged or refused, one more request per scan, to the same URL with our own user-agent "AIPUSH-Probe/1.0 (+https://aipush.app/methodology)", tells a rule keyed to the bot name from general bot protection. That user-agent is honest, is not a browser and is on no verified-bot list. Per bot the cause is ai_named when the bot request was refused and the control request and a browser user-agent received the page: "Our request with the GPTBot user-agent was refused (HTTP 403, marker). The same request under an unlisted user-agent and under a browser user-agent received the page. A rule keyed to the GPTBot name decides this. It may be a deliberate AI-bot block, or a rule that refuses the GPTBot name when it comes from outside its operator's addresses. Look for AI-bot or user-agent rules in your firewall or CDN, and search your server logs for GPTBot." The cause is generic_bot when the bot request and the control request were both refused and a browser user-agent received the page: "Our requests with the GPTBot user-agent and with an unlisted user-agent were both refused (HTTP 403, marker); a browser user-agent received the page. This is general bot protection, not a rule against AI bots. Verified AI crawlers may still pass: the verified-bots setting of your firewall or CDN decides that, and only your server logs show it." generic_bot is a note, not a failed finding; when the control request fails for a network reason the cause is unknown, and when the browser request is refused the scan is blocked and no cause is stated. A challenged or refused spoofed request is reported and not scored.
        </p>

        <h2 id="scanner-refused">When our scanner is refused</h2>
        <p>
          {"Our scanner could not read <host> on <date>: our request received HTTP <status> (<marker>). This is not a score. Verified AI crawlers come from their operators' addresses and may be treated differently. If this is your site, check your firewall or CDN bot settings and your server logs, then scan again."} This text replaces the result when our request for the home page, sent with a browser user-agent, ends in HTTP 401, 403, 429, 451 or 503 or in a challenge page, also after one retry 10 seconds later. The scan then has access "blocked": score, level, ladder and category scores are null, every check is "not measured", and no fixes are made.
        </p>

        <h2 id="llms-txt-check">What the llms.txt check means</h2>
        <p>
          This check passes when the file exists and parses. It does not show that AI crawlers fetch it or that it changes citations. Weight: {llmsWeight} of {totalWeight}.
        </p>
        <p>
          Ahrefs' study reports: "Of the ~38,000 domains with a valid file, 97% saw no requests for it whatsoever in May" (<a href="https://ahrefs.com/blog/llmstxt-study/" rel="noopener">Ahrefs, 15 June 2026</a>). Google's documentation says: "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search (including its generative AI capabilities), as Google Search itself doesn't use them" (<a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" rel="noopener">Google Search Central, updated 10 July 2026</a>).
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
