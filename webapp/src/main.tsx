import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { useTheme } from "./useTheme";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import { VideoDemo } from "./app/components/VideoDemo";
import { MipReport } from "./app/pages/MipReport";
import { Dashboard } from "./app/Dashboard";
import { ClientDashboard } from "./app/pages/ClientDashboard";
import { RequireAuth } from "./app/RequireAuth";
import { Guide } from "./app/pages/Guide";
import { HowToRankInChatgpt } from "./app/pages/seo/HowToRankInChatgpt";
import { HowToGetMentionedInChatgpt } from "./app/pages/seo/HowToGetMentionedInChatgpt";
import { LlmSeo } from "./app/pages/seo/LlmSeo";
import { OptimizeWebsiteForAi } from "./app/pages/seo/OptimizeWebsiteForAi";
import { AiSearchOptimization } from "./app/pages/seo/AiSearchOptimization";
import { ChatgptIndexing } from "./app/pages/seo/ChatgptIndexing";
import { HowToAppearInAiAnswers } from "./app/pages/seo/HowToAppearInAiAnswers";
import { AiSeoConsultant } from "./app/pages/seo/AiSeoConsultant";
import { AiSeoCompany } from "./app/pages/seo/AiSeoCompany";
import { AiSeoAgency } from "./app/pages/seo/AiSeoAgency";
import { AiVisibilityTracking } from "./app/pages/seo/AiVisibilityTracking";
import { GenerativeEngineOptimizationGuide } from "./app/pages/seo/GenerativeEngineOptimizationGuide";
import { AiSeoServices } from "./app/pages/seo/AiSeoServices";
import { AiCitationOptimizationGuide } from "./app/pages/seo/AiCitationOptimizationGuide";
import { AnswerEngineOptimizationGuide } from "./app/pages/seo/AnswerEngineOptimizationGuide";
import { AiSeoVsTraditionalSeo } from "./app/pages/seo/AiSeoVsTraditionalSeo";
import { AiSeoVsTraditionalSeoGuide } from "./app/pages/seo/AiSeoVsTraditionalSeoGuide";
import { CompetitorAnalysisReport } from "./app/pages/seo/CompetitorAnalysisReport";
import { AgentApi } from "./app/pages/AgentApi";
import { Privacy } from "./app/pages/Privacy";
import { DashBro } from "./app/pages/DashBro";
import { HowChatgptRecommendsBusiness } from "./app/pages/HowChatgptRecommendsBusiness";
import { GetIndexedByAi } from "./app/pages/GetIndexedByAi";
import { GetMyBusinessOnChatgpt } from "./app/pages/ads/GetMyBusinessOnChatgpt";
import { AiSeoToolsForSmallBusiness } from "./app/pages/ads/AiSeoToolsForSmallBusiness";
import { RankOnPerplexityAiBusiness } from "./app/pages/ads/RankOnPerplexityAiBusiness";
import { ChatgptBusinessRecommendationsAutomation } from "./app/pages/ads/ChatgptBusinessRecommendationsAutomation";
import { AiContentPagesForSeo } from "./app/pages/ads/AiContentPagesForSeo";
import { AutomatedAiPageGenerationSeo } from "./app/pages/ads/AutomatedAiPageGenerationSeo";
import { MakeMyWebsiteAppearInAiSearch } from "./app/pages/ads/MakeMyWebsiteAppearInAiSearch";
import { AiVisibilityToolForBusinessOwners } from "./app/pages/ads/AiVisibilityToolForBusinessOwners";
import { HowToRankInChatgptAd } from "./app/pages/ads/HowToRankInChatgptAd";
import { HowToGetMentionedInChatgptAd } from "./app/pages/ads/HowToGetMentionedInChatgptAd";
import { LlmSeoAd } from "./app/pages/ads/LlmSeoAd";
import { OptimizeWebsiteForAiAd } from "./app/pages/ads/OptimizeWebsiteForAiAd";
import { AiSearchOptimizationAd } from "./app/pages/ads/AiSearchOptimizationAd";
import { ChatgptIndexingAd } from "./app/pages/ads/ChatgptIndexingAd";
import { HowToAppearInAiAnswersAd } from "./app/pages/ads/HowToAppearInAiAnswersAd";
import { MyBusinessNotShowingInAiSearch } from "./app/pages/ads/MyBusinessNotShowingInAiSearch";
import { BusinessNotAppearingInAiSearch } from "./app/pages/ads/BusinessNotAppearingInAiSearch";
import { ShowUpInPerplexityAi } from "./app/pages/ads/ShowUpInPerplexityAi";
import { GetCitedByAi } from "./app/pages/ads/GetCitedByAi";
import { AiVisibilityService } from "./app/pages/ads/AiVisibilityService";
import { GenerativeEngineOptimization } from "./app/pages/ads/GenerativeEngineOptimization";
import { AnswerEngineOptimization } from "./app/pages/ads/AnswerEngineOptimization";
import { AiCitationOptimization } from "./app/pages/ads/AiCitationOptimization";
import { LlmOptimizationService } from "./app/pages/ads/LlmOptimizationService";
import { AiSearchPresence } from "./app/pages/ads/AiSearchPresence";
import { BrandMentionsInAiAnswers } from "./app/pages/ads/BrandMentionsInAiAnswers";
import { AiAnswerOptimization } from "./app/pages/ads/AiAnswerOptimization";
import { AiSeoVsTraditionalSeo } from "./app/pages/ads/AiSeoVsTraditionalSeo";
import { SeoForAiEra } from "./app/pages/ads/SeoForAiEra";
import { AiFirstSeoStrategy } from "./app/pages/ads/AiFirstSeoStrategy";
import { WritesonicAlternative } from "./app/pages/ads/WritesonicAlternative";
import { ProfoundAlternative } from "./app/pages/ads/ProfoundAlternative";
import { AiVisibilityTool } from "./app/pages/ads/AiVisibilityTool";
import { GeoTools } from "./app/pages/ads/GeoTools";
import { AiCitationTracking } from "./app/pages/ads/AiCitationTracking";
import { AiSeoToolsPage } from "./app/pages/ads/AiSeoToolsPage";
import { AiSeoSoftware } from "./app/pages/ads/AiSeoSoftware";
import { AiSeoPlatform } from "./app/pages/ads/AiSeoPlatform";
import {
  startAudit,
  getAudit,
  type AuditFinding,
} from "./api/client";

type UiAuditJobResponse = {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  url?: string;

  createdAt: number;

  completedAt?: number;
  score?: number;
  findings: AuditFinding[];

  error?: unknown;

  // Versioned audit binding
  fetchedSha256?: string;
  publishedSha256?: string;
  pageSlug?: string;
};

/* ================= tiny route components ================= */

function ContactRedirect() {
  React.useEffect(() => { window.location.href = "mailto:support@aipush.app"; }, []);
  return <p style={{textAlign:"center",padding:"4rem",color:"var(--text-primary)"}}>Redirecting to <a href="mailto:support@aipush.app">support@aipush.app</a>...</p>;
}

function MobileMenu({ shellAuth }: { shellAuth: string }) {
  const [open, setOpen] = React.useState(false);
  const loc = useLocation();
  React.useEffect(() => { setOpen(false); }, [loc.pathname]);
  return (
    <div className="mobile-menu-wrap">
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <span className={`mobile-menu-icon ${open ? "mobile-menu-icon--open" : ""}`} />
      </button>
      {open && (
        <div className="mobile-menu-dropdown">
          <Link className="mobile-menu-item" to="/audit" onClick={() => setOpen(false)}>Audit</Link>
          <Link className="mobile-menu-item" to="/mip" onClick={() => setOpen(false)}>MIP Report <span className="header-new-badge">New</span></Link>
          {shellAuth !== "authed" && (
            <Link className="mobile-menu-item" to="/login" onClick={() => setOpen(false)}>Login</Link>
          )}
          {shellAuth === "authed" && (
            <Link className="mobile-menu-item" to="/client" onClick={() => setOpen(false)}>Dashboard</Link>
          )}
          {shellAuth !== "authed" && (
            <Link className="mobile-menu-item mobile-menu-cta" to="/login" onClick={() => setOpen(false)}>Get Started</Link>
          )}
        </div>
      )}
    </div>
  );
}

/* ================= utils ================= */

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function severityRank(s: AuditFinding["severity"]) {
  if (s === "critical") return 0;
  if (s === "warning") return 1;
  return 2;
}

function sortFindings(findings: AuditFinding[]) {
  return [...findings].sort((a, b) => {
    const da = severityRank(a.severity);
    const db = severityRank(b.severity);
    if (da !== db) return da - db;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });
}

/**
 * Normalize various backend shapes into our AuditJobResponse shape
 * (keeps UI stable even if API returns job_id/result nested etc.)
 */
function normalizeJobResponse(input: unknown): UiAuditJobResponse {
  if (input == null || typeof input !== "object") {
    return { jobId: "", status: "processing", createdAt: Date.now(), findings: [] };
  }
  const src = input as Record<string, unknown>;

  const jobId =
    (src as any)?.jobId ??
    (src as any)?.job_id ??
    (src as any)?.audit_job_id ??
    (src as any)?.id ??
    "";

  const rawStatus = (src as any)?.status;
  const status: UiAuditJobResponse["status"] =
    rawStatus === "completed"
      ? "completed"
      : rawStatus === "failed"
      ? "failed"
      : rawStatus === "queued"
      ? "queued"
      : "processing";

  const findings: AuditFinding[] =
    (Array.isArray((src as any)?.findings) && (src as any).findings) ||
    (Array.isArray((src as any)?.result?.findings) && (src as any).result.findings) ||
    (Array.isArray((src as any)?.data?.findings) && (src as any).data.findings) ||
    (Array.isArray((src as any)?.data?.result?.findings) &&
      (src as any).data.result.findings) ||
    [];

  const createdAtRaw =
    (src as any)?.createdAt ??
    (src as any)?.result?.createdAt ??
    (src as any)?.data?.createdAt ??
    (src as any)?.data?.result?.createdAt;

  const createdAt =
    typeof createdAtRaw === "number"
      ? createdAtRaw
      : typeof createdAtRaw === "string"
      ? Date.parse(createdAtRaw)
      : Date.now();

  return {
    jobId: String(jobId),
    status,
    createdAt,

    url:
      (src as any)?.url ??
      (src as any)?.result?.url ??
      (src as any)?.data?.url ??
      (src as any)?.data?.result?.url,

    findings,

    completedAt:
      (src as any)?.completedAt ??
      (src as any)?.result?.completedAt ??
      (src as any)?.data?.completedAt ??
      (src as any)?.data?.result?.completedAt,

    score:
      (src as any)?.score ??
      (src as any)?.result?.score ??
      (src as any)?.data?.score ??
      (src as any)?.data?.result?.score,

    error:
      (src as any)?.error ??
      (src as any)?.message ??
      (src as any)?.data?.error ??
      (src as any)?.data?.message,

    // Versioned audit binding
    fetchedSha256: (src as any)?.fetchedSha256 ?? (src as any)?.fetched_sha256,
    publishedSha256: (src as any)?.publishedSha256 ?? (src as any)?.published_sha256,
    pageSlug: (src as any)?.pageSlug ?? (src as any)?.page_slug,
  };
}

/* ================= shell ================= */

function Shell({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const isMipPage = location.pathname === "/mip";
  const isAdPage = location.pathname.startsWith("/ads/") || location.pathname === "/get-indexed-by-ai" || location.pathname === "/how-chatgpt-recommends-businesses";
  const isLoginPage = location.pathname === "/login";
  const isDashboardPage = location.pathname === "/dashboard";
  const isClientPage = location.pathname === "/client";
  const isMinimalShell = isAdPage || isLoginPage;
  const [shellAuth, setShellAuth] = React.useState<"unknown" | "anon" | "authed">("unknown");
  React.useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((j) => { if (alive) setShellAuth(j?.client_id ? "authed" : "anon"); })
      .catch(() => { if (alive) setShellAuth("anon"); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-nav">Skip to content</a>
      <header className="header header--uxfix" data-testid="shell-header">
        <div className="container header-row header-row--uxfix">
          {isAdPage || isDashboardPage || isClientPage ? (
            <span className="brand brand--uxfix" data-testid="shell-logo" style={{ pointerEvents: "none", cursor: "default" }}>
              <img
                src="/logo.png"
                alt="AIPUSH logo"
                className="brand-logo"
                width={24}
                height={24}
              />
              <span className="brand-title--uxfix">AIPUSH</span>
            </span>
          ) : (
            <Link to="/" className="brand brand--uxfix" data-testid="shell-logo">
              <img
                src="/logo.png"
                alt="AIPUSH logo"
                className="brand-logo"
                width={24}
                height={24}
              />
              <span className="brand-title--uxfix">AIPUSH</span>
            </Link>
          )}

          {!isMinimalShell && (
            <nav className="header-actions header-actions--uxfix" aria-label="Main navigation">
              {isDashboardPage || isClientPage ? (
                <div className="header-nav--uxfix">
                  <button
                    className="btn btn-ghost header-link--uxfix"
                    style={{ fontSize: 13, opacity: 0.7 }}
                    onClick={() => {
                      fetch("/api/auth/logout", { method: "POST", credentials: "include" })
                        .finally(() => { window.location.href = "/"; });
                    }}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <div className="header-nav--uxfix header-nav-desktop">
                    <Link className="btn btn-ghost header-link--uxfix" to="/audit" data-testid="shell-nav-audit">
                      Audit
                    </Link>
                    <Link className="btn btn-ghost header-link--uxfix header-link-mip" to="/mip">
                      MIP <span className="header-new-badge">New</span>
                    </Link>

                    {shellAuth !== "authed" && (
                      <Link className="btn btn-ghost header-link--uxfix" to="/login" data-testid="shell-nav-login">
                        Login
                      </Link>
                    )}
                    {shellAuth !== "authed" && (
                      <Link className="btn header-cta--uxfix" to="/login" data-testid="shell-nav-getstarted">
                        Get Started
                      </Link>
                    )}
                    {shellAuth === "authed" && (
                      <Link className="btn btn-ghost header-link--uxfix" to="/client" data-testid="shell-nav-dashboard">
                        Dashboard
                      </Link>
                    )}
                  </div>

                  {/* Mobile hamburger */}
                  <MobileMenu shellAuth={shellAuth} />
                </>
              )}

              {/* THEME TOGGLE */}
              <button
                type="button"
                onClick={toggle}
                className="theme-toggle theme-toggle--uxfix"
                aria-label="Toggle theme"
                data-testid="shell-theme-toggle"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="theme-toggle-icon" aria-hidden="true">
                  {theme === "dark" ? "☀️" : "🌙"}
                </span>
              </button>
            </nav>
          )}
        </div>
      </header>

      <div className="app-content" id="main-content">{children}</div>

      {!isMinimalShell && (isDashboardPage || isClientPage) ? (
        <footer className="footer footer--uxfix" data-testid="shell-footer">
          <div className="container">
            <div className="footer-bottom--uxfix" style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
              <span>&copy; {new Date().getFullYear()} AIPUSH</span>
              <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>Privacy</a>
              <a href="/privacy#terms" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.7 }}>Terms of Service</a>
              <a href="mailto:support@aipush.app" style={{ opacity: 0.7 }}>Contact</a>
            </div>
          </div>
        </footer>
      ) : !isMinimalShell ? (
        <footer className="footer footer--uxfix" data-testid="shell-footer">
          <div className="container">
            <div className="footer-grid--uxfix">
              <div className="footer-col--uxfix">
                <div className="footer-brand--uxfix">
                  <img src="/logo.png" alt="AIPUSH" width={20} height={20} />
                  AIPUSH
                </div>
                <div className="footer-brand-desc--uxfix">
                  AI-optimized page distribution for traffic &amp; sales
                </div>
                <div className="footer-social--uxfix">
                  <a href="https://x.com/aipush_app" target="_blank" rel="noopener noreferrer" className="footer-x-link--uxfix" aria-label="X (Twitter)">
                    <svg className="footer-x-icon--uxfix" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://github.com/whiteknightonhorse/AIpush" target="_blank" rel="noopener noreferrer" className="footer-x-link--uxfix" aria-label="GitHub">
                    <svg className="footer-x-icon--uxfix" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  </a>
                </div>
              </div>
              <div className="footer-col--uxfix">
                <h4>Product</h4>
                <ul>
                  <li><Link to="/guide">How it works</Link></li>
                  <li><a href="/#pricing">Pricing</a></li>
                  <li><Link to="/mip">MIP Report</Link></li>
                  <li><Link to="/audit">Free Audit</Link></li>
                  <li><a href="/#guides">Guides</a></li>
                </ul>
              </div>
              <div className="footer-col--uxfix">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/privacy">Privacy</Link></li>
                  <li><Link to="/privacy#terms">Terms of Service</Link></li>
                  <li><a href="mailto:support@aipush.app">Contact</a></li>
                  <li><Link to="/agent-api">MCP Integration</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom--uxfix">
              &copy; {new Date().getFullYear()} AIPUSH
            </div>
          </div>
        </footer>
      ) : null}
    </div>
  );
}

/* ================= landing ================= */

const FAQ_ITEMS: Array<{ q: string; a: React.ReactNode }> = [
  /* 0. Can I try for free? */
  {
    q: "Can I try AIPUSH for free?",
    a: (
      <>
        <p>Yes. Run a free AI visibility audit — no account needed, results in 10-30 seconds. The audit shows exactly what blocks AI assistants from finding your business.</p>
        <p>When you are ready, activate Full Automation for $19.99/month with a 30-day money-back guarantee.</p>
      </>
    ),
  },
  /* 1. Does AIPUSH really work automatically? (was #1) */
  {
    q: "Does AIPUSH really work automatically?",
    a: (
      <>
        <p>Yes. AIPUSH is a fully autonomous authority-building system.</p>
        <p>Once activated, the system:</p>
        <ul>
          <li>Builds your Marketing Intelligence Profile (MIP)</li>
          <li>Maps your semantic territory into intent clusters</li>
          <li>Detects coverage gaps</li>
          <li>Publishes up to 20 audit-compliant pages per day</li>
          <li>Continuously monitors authority drift</li>
        </ul>
        <p>No manual content writing. No SEO editing. No server configuration. You activate — the system builds.</p>
      </>
    ),
  },
  /* 2. What makes AIPUSH different from traditional SEO? (was #8) */
  {
    q: "What makes AIPUSH different from traditional SEO?",
    a: (
      <>
        <p>Traditional SEO focuses on ranking pages, traffic acquisition, and keyword positioning.</p>
        <p>AIPUSH focuses on:</p>
        <ul>
          <li>Semantic territory ownership</li>
          <li>Structured AI-readable pages</li>
          <li>Authority validation</li>
          <li>Zero-click recommendation capture</li>
        </ul>
        <p>We do not chase traffic. We build semantic authority systems.</p>
      </>
    ),
  },
  /* 3. Where are the 20 pages published? (was #2) */
  {
    q: "Where are the 20 pages published?",
    a: (
      <>
        <p>Your pages are published under your own domain — not on ours.</p>
        <p>You connect a subdomain (for example: <strong>reference.yourdomain.com</strong>).</p>
        <p>We securely host and deliver the pages, but they appear under your brand. That means:</p>
        <ul>
          <li>Pages live on your domain</li>
          <li>SSL is automatically issued</li>
          <li>Hosted globally via Cloudflare</li>
          <li>Strengthens your domain authority</li>
          <li>Your main site remains untouched</li>
        </ul>
        <p>You do not need a new website.</p>
      </>
    ),
  },
  /* 4. Will this affect my existing website? (was #3) */
  {
    q: "Will this affect my existing website?",
    a: (
      <>
        <p>No. Your main website stays exactly as it is.</p>
        <p>We operate on a dedicated subdomain that is completely isolated from your core infrastructure.</p>
        <p>No code changes. No CMS edits. No deployment risk. AIPUSH is a separate semantic layer.</p>
      </>
    ),
  },
  /* 5. Do I need hosting or servers? (was #4) */
  {
    q: "Do I need hosting or servers?",
    a: (
      <>
        <p>No. AIPUSH handles:</p>
        <ul>
          <li>Global hosting</li>
          <li>Cloudflare edge delivery</li>
          <li>Automatic SSL</li>
          <li>Infrastructure scaling</li>
          <li>Ongoing maintenance</li>
        </ul>
        <p>You only add one DNS record.</p>
      </>
    ),
  },
  /* 6. Can I connect my own AI agent? (was #7) */
  {
    q: "Can I connect my own AI agent?",
    a: (
      <>
        <p>Yes. AIPUSH is integrated into <a href="https://apibase.pro" target="_blank" rel="noopener noreferrer">APIbase.pro</a> — an MCP server for AI agents. Your agent can:</p>
        <ul>
          <li>Set up websites for page generation</li>
          <li>Generate and publish AI-optimized pages</li>
          <li>Check website status and billing</li>
          <li>Run AI visibility analysis</li>
          <li>Browse published pages and profiles</li>
        </ul>
        <p>Connect via MCP with USDC micropayments. No API keys to manage.</p>
        <p>Learn more: <a href="/agent-api">MCP Integration Guide</a></p>
      </>
    ),
  },
  /* 7. Who issues the SSL certificate? (was #5) */
  {
    q: "Who issues the SSL certificate?",
    a: (
      <>
        <p>SSL certificates are automatically issued and managed through Cloudflare's secure edge infrastructure.</p>
        <p>You do not need to purchase certificates, install anything, or renew manually. Everything is automatic and included.</p>
      </>
    ),
  },
  /* 8. Why does the audit flag "AI"? (was #6, most niche) */
  {
    q: 'Why does the audit sometimes flag the word "AI"?',
    a: (
      <>
        <p>Nothing is broken. AIPUSH uses a strict global audit policy (SPEC1) to prevent AI-spam and keyword abuse.</p>
        <p>The term "AI" is globally monitored because it is frequently abused online.</p>
        <p>If your business genuinely operates in the AI industry, the system detects this during the MIP analysis stage and automatically assigns a compliant AI policy profile.</p>
        <ul>
          <li>The audit engine is never disabled</li>
          <li>High-risk terms remain protected</li>
          <li>Long-term indexability is prioritized</li>
        </ul>
        <p>If your AI business pages are blocked, simply re-run MIP from the dashboard.</p>
      </>
    ),
  },
  /* 9. How long until AI assistants recommend me? */
  {
    q: "How long until AI assistants start recommending my business?",
    a: (
      <>
        <p>Pages start publishing within 24 hours of setup. AI assistants typically pick up structured pages within 1–4 weeks, depending on the model's crawl cycle and your industry competitiveness.</p>
        <p>Some businesses see mentions within days, while comprehensive coverage builds over 2–4 weeks.</p>
      </>
    ),
  },
  {
    q: "What is the Market Intelligence Report (MIP)?",
    a: (
      <>
        <p>MIP is a standalone competitive intelligence report you can buy for a one-time fee — no subscription, no account needed.</p>
        <p>In 5 minutes, you get: your direct competitors (scored and ranked), keywords they target, market relationships, evidence with source links, and a downloadable PDF report.</p>
        <p>It uses the same AI engine that powers AIPUSH subscriptions, but as a single on-demand analysis. <a href="/mip" style={{ color: "var(--color-indigo)" }}>Get your report →</a></p>
      </>
    ),
  },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);
  const [viewed, setViewed] = React.useState<Set<number>>(() => new Set());

  const toggle = (idx: number) => {
    if (openIdx === idx) {
      setViewed((prev) => { const next = new Set(prev); next.add(idx); return next; });
      setOpenIdx(null);
    } else {
      if (openIdx !== null) {
        setViewed((prev) => { const next = new Set(prev); next.add(openIdx); return next; });
      }
      setOpenIdx(idx);
    }
  };

  return (
    <section className="aipush-faq">
      <div className="aipush-faq-inner">
        <div className="aipush-faq-header">
          <div className="aipush-faq-eyebrow">FAQ</div>
          <h2 className="aipush-faq-title">Frequently asked questions</h2>
          <p className="aipush-faq-desc">
            Common questions from business owners evaluating AIPUSH.
          </p>
        </div>

        <div className="aipush-faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIdx === i;
            const isViewed = viewed.has(i) && !isOpen;
            return (
              <div
                key={i}
                className={
                  "aipush-faq-item" +
                  (isOpen ? " aipush-faq-open" : "") +
                  (isViewed ? " aipush-faq-viewed" : "")
                }
              >
                <button
                  type="button"
                  className="aipush-faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="aipush-faq-qtext">{item.q}</span>
                  <span className="aipush-faq-toggle" aria-hidden="true">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                <div className="aipush-faq-answer">
                  <div className="aipush-faq-answerInner">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CountUp({ end, prefix = "", suffix = "", decimals = 0 }: {
  end: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState(0);
  const started = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1200;
        const startTime = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(eased * end);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-US");
  return <div ref={ref} className="aipush-proof-number">{prefix}{display}{suffix}</div>;
}

function Landing() {
  const nav = useNavigate();
  const [url, setUrl] = React.useState("");
  const [showSticky, setShowSticky] = React.useState(false);
  const [showVideo, setShowVideo] = React.useState(false);

  React.useEffect(() => {
    document.title = "AIPUSH — Get Recommended by ChatGPT & AI Assistants Automatically";
    // Schema.org structured data
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "landing-schemas";
    ld.textContent = JSON.stringify([
      { "@context": "https://schema.org", "@type": "Organization", "name": "AIPUSH", "url": "https://aipush.app", "logo": "https://aipush.app/logo.png", "sameAs": ["https://x.com/aipush_app", "https://github.com/whiteknightonhorse/AIpush"], "contactPoint": { "@type": "ContactPoint", "email": "support@aipush.app", "contactType": "customer support" } },
      { "@context": "https://schema.org", "@type": "WebSite", "name": "AIPUSH", "url": "https://aipush.app", "potentialAction": { "@type": "SearchAction", "target": "https://aipush.app/audit?url={search_term_string}", "query-input": "required name=search_term_string" } },
      { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "AIPUSH", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "url": "https://aipush.app", "offers": [{ "@type": "Offer", "price": "0", "priceCurrency": "USD", "name": "Free AI Audit" }, { "@type": "Offer", "price": "19.99", "priceCurrency": "USD", "name": "Full Automation", "billingIncrement": "P1M" }, { "@type": "Offer", "price": "29.99", "priceCurrency": "USD", "name": "Market Report" }] },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "Can I try AIPUSH for free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Run a free AI visibility audit — no account needed, results in 10-30 seconds. When ready, activate Full Automation for $19.99/month with a 30-day money-back guarantee." } },
        { "@type": "Question", "name": "Does AIPUSH really work automatically?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. AIPUSH is a fully autonomous authority-building system. Once activated, it builds your Marketing Intelligence Profile, maps semantic territory, detects coverage gaps, publishes up to 20 audit-compliant pages per day, and monitors authority drift. No manual work needed." } },
        { "@type": "Question", "name": "What makes AIPUSH different from traditional SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Traditional SEO focuses on ranking pages and keyword positioning. AIPUSH focuses on semantic territory ownership, structured AI-readable pages, authority validation, and zero-click recommendation capture." } },
        { "@type": "Question", "name": "Where are the 20 pages published?", "acceptedAnswer": { "@type": "Answer", "text": "Pages are published under your own domain via a subdomain like reference.yourdomain.com. SSL is automatically issued, hosted globally via Cloudflare, and your main site remains untouched." } },
        { "@type": "Question", "name": "Will this affect my existing website?", "acceptedAnswer": { "@type": "Answer", "text": "No. Your main website stays exactly as it is. AIPUSH operates on a dedicated subdomain completely isolated from your core infrastructure. No code changes, no CMS edits, no deployment risk." } },
        { "@type": "Question", "name": "Do I need hosting or servers?", "acceptedAnswer": { "@type": "Answer", "text": "No. AIPUSH handles global hosting, Cloudflare edge delivery, automatic SSL, infrastructure scaling, and ongoing maintenance. You only add one DNS record." } },
        { "@type": "Question", "name": "Can I connect my own AI agent?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. AIPUSH is integrated into APIbase.pro — an MCP server for AI agents. Your agent can set up websites, generate pages, check status, run visibility analysis, and browse published pages via MCP with USDC micropayments." } },
        { "@type": "Question", "name": "Who issues the SSL certificate?", "acceptedAnswer": { "@type": "Answer", "text": "SSL certificates are automatically issued and managed through Cloudflare's secure edge infrastructure. No purchase, installation, or manual renewal needed." } },
        { "@type": "Question", "name": "Why does the audit sometimes flag the word AI?", "acceptedAnswer": { "@type": "Answer", "text": "AIPUSH uses a strict global audit policy to prevent AI-spam and keyword abuse. If your business genuinely operates in the AI industry, the system detects this during MIP analysis and assigns a compliant policy profile automatically." } },
        { "@type": "Question", "name": "How long until AI assistants start recommending my business?", "acceptedAnswer": { "@type": "Answer", "text": "Pages start publishing within 24 hours of setup. AI assistants typically pick up structured pages within 1-4 weeks, depending on crawl cycles and industry competitiveness." } },
        { "@type": "Question", "name": "What is the Market Intelligence Report (MIP)?", "acceptedAnswer": { "@type": "Answer", "text": "MIP is a standalone competitive intelligence report for a one-time fee — no subscription needed. In 5 minutes, you get competitors scored and ranked, keywords, market relationships, evidence with source links, and a downloadable PDF." } },
      ] },
    ]);
    document.head.appendChild(ld);
    return () => { document.getElementById("landing-schemas")?.remove(); };
  }, []);

  /* Scroll-reveal animations */
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("reveal--visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.02, rootMargin: "0px 0px 50px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Sticky CTA bar on scroll */
  React.useEffect(() => {
    const handler = () => {
      const show = window.scrollY > 600;
      setShowSticky(show);
      document.body.classList.toggle("has-sticky-bar", show);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => { window.removeEventListener("scroll", handler); document.body.classList.remove("has-sticky-bar"); };
  }, []);

  /* Hash scroll handled by global ScrollToHash component */

  /* — viz1 animations (scroll reveal, typewriter, active step) — */
  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = document.querySelector(".aipush-viz1") as HTMLElement | null;
    if (!section) return;
    const cards = section.querySelectorAll(".aipush-viz1-card") as NodeListOf<HTMLElement>;
    if (!cards.length) return;

    /* If reduced motion: show everything immediately */
    if (prefersReduced) {
      cards.forEach((c) => { c.classList.add("aipush-viz1-card--visible"); c.querySelectorAll(".aipush-viz1-chip").forEach((ch) => (ch as HTMLElement).classList.add("aipush-viz1-chip--visible")); });
      return;
    }

    /* 1. Scroll-triggered reveal with stagger */
    let revealed = false;
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !revealed) {
          revealed = true;
          revealObs.disconnect();
          revealCards();
        }
      });
    }, { threshold: 0.2 });
    revealObs.observe(section);

    function revealCards() {
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("aipush-viz1-card--visible");
          /* 4. Typewriter on title */
          const titleEl = card.querySelector(".aipush-viz1-cardTitle") as HTMLElement | null;
          if (titleEl && !titleEl.dataset.typed) {
            titleEl.dataset.typed = "true";
            const fullText = titleEl.textContent || "";
            titleEl.textContent = "";
            titleEl.classList.add("aipush-viz1-cardTitle--typing");
            let ci = 0;
            function typeChar() {
              if (ci < fullText.length) {
                titleEl.textContent = fullText.slice(0, ci + 1);
                ci++;
                requestAnimationFrame(() => setTimeout(typeChar, 35));
              } else {
                setTimeout(() => titleEl.classList.remove("aipush-viz1-cardTitle--typing"), 1000);
                /* 5. Chips pop-in after typewriter */
                const chips = card.querySelectorAll(".aipush-viz1-chip") as NodeListOf<HTMLElement>;
                chips.forEach((ch, j) => {
                  setTimeout(() => ch.classList.add("aipush-viz1-chip--visible"), j * 80);
                });
              }
            }
            typeChar();
          }
        }, i * 120);
      });
    }

    /* 6. Active step indicator */
    function updateActive() {
      const sRect = section!.getBoundingClientRect();
      if (sRect.bottom < 0 || sRect.top > window.innerHeight) {
        cards.forEach((c) => { c.classList.remove("aipush-viz1-card--active", "aipush-viz1-card--dimmed"); });
        return;
      }
      const vCenter = window.innerHeight / 2;
      let closest = -1;
      let minDist = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const cCenter = r.top + r.height / 2;
        const d = Math.abs(cCenter - vCenter);
        if (d < minDist) { minDist = d; closest = i; }
      });
      cards.forEach((c, i) => {
        if (i === closest) { c.classList.add("aipush-viz1-card--active"); c.classList.remove("aipush-viz1-card--dimmed"); }
        else if (revealed) { c.classList.remove("aipush-viz1-card--active"); c.classList.add("aipush-viz1-card--dimmed"); }
      });
    }
    let ticking = false;
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { updateActive(); ticking = false; }); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* — cap section scroll reveal — */
  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const capHead = document.querySelector(".aipush-cap-head") as HTMLElement | null;
    const capCards = document.querySelectorAll(".aipush-cap-card") as NodeListOf<HTMLElement>;
    if (prefersReduced) {
      if (capHead) capHead.classList.add("aipush-cap-head--visible");
      capCards.forEach((c) => c.classList.add("aipush-cap-card--visible"));
      return;
    }
    const capObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (el.classList.contains("aipush-cap-head")) {
          el.classList.add("aipush-cap-head--visible");
        }
        if (el.classList.contains("aipush-cap-card")) {
          const idx = Array.from(capCards).indexOf(el);
          setTimeout(() => el.classList.add("aipush-cap-card--visible"), idx * 150);
        }
        capObs.unobserve(el);
      });
    }, { threshold: 0.15 });
    if (capHead) capObs.observe(capHead);
    capCards.forEach((c) => capObs.observe(c));
    return () => capObs.disconnect();
  }, []);

  /* — revenue + compare + validation scroll reveal — */
  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revFlow = document.querySelector(".aipush-revenue-flow") as HTMLElement | null;
    const cmpGrid = document.querySelector(".aipush-compare-grid") as HTMLElement | null;
    const valBlock = document.querySelector(".aipush-validation-chips") as HTMLElement | null;
    if (prefersReduced) {
      document.querySelectorAll(".aipush-revenue-step").forEach((s) => s.classList.add("aipush-revenue-step--visible"));
      document.querySelectorAll(".aipush-compare-row").forEach((r) => r.classList.add("aipush-compare-row--visible"));
      document.querySelectorAll(".aipush-validation-chips .aipush-cap-chip").forEach((c) => c.classList.add("aipush-cap-chip--visible"));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        /* Revenue: reveal all steps together, 30ms stagger */
        if (el.classList.contains("aipush-revenue-flow")) {
          el.querySelectorAll(".aipush-revenue-step").forEach((s, i) => {
            setTimeout(() => (s as HTMLElement).classList.add("aipush-revenue-step--visible"), i * 30);
          });
        }
        /* Compare: reveal paired rows (left+right) together, 40ms per pair */
        if (el.classList.contains("aipush-compare-grid")) {
          const othersRows = el.querySelectorAll(".aipush-compare-col--others .aipush-compare-row");
          const aipushRows = el.querySelectorAll(".aipush-compare-col--aipush .aipush-compare-row");
          const maxLen = Math.max(othersRows.length, aipushRows.length);
          for (let i = 0; i < maxLen; i++) {
            const delay = i * 40;
            if (othersRows[i]) setTimeout(() => (othersRows[i] as HTMLElement).classList.add("aipush-compare-row--visible"), delay);
            if (aipushRows[i]) setTimeout(() => (aipushRows[i] as HTMLElement).classList.add("aipush-compare-row--visible"), delay);
          }
        }
        /* Validation chips: stagger 100ms */
        if (el.classList.contains("aipush-validation-chips")) {
          el.querySelectorAll(".aipush-cap-chip").forEach((c, i) => {
            setTimeout(() => (c as HTMLElement).classList.add("aipush-cap-chip--visible"), i * 100);
          });
        }
        obs.unobserve(el);
      });
    }, { threshold: 0.15 });
    if (revFlow) obs.observe(revFlow);
    if (cmpGrid) obs.observe(cmpGrid);
    if (valBlock) obs.observe(valBlock);
    return () => obs.disconnect();
  }, []);

  const VALID_URL_RE = /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/;
  const BLOCKED_RE = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/i;
  const [urlError, setUrlError] = React.useState("");

  const isValidUrl = (v: string): boolean => {
    const t = v.trim();
    if (!t) return false;
    if (/^[a-zA-Z]+:\/\//i.test(t) && !/^https?:\/\//i.test(t)) return false;
    const host = t.replace(/^https?:\/\//i, "").split("/")[0].split(":")[0];
    if (BLOCKED_RE.test(host) || host === "localhost") return false;
    return VALID_URL_RE.test(t);
  };

  const goAudit = async () => {
    const raw = (url || "").trim();
    if (!raw) return;

    if (!isValidUrl(raw)) {
      setUrlError("Please enter a valid URL (e.g. example.com)");
      setTimeout(() => setUrlError(""), 5000);
      return;
    }
    setUrlError("");

    const normalized = /^https?:\/\//i.test(raw)
      ? raw
      : `https://${raw}`;

    try {
      const r = await startAudit(normalized);

      nav(`/audit?job=${encodeURIComponent(r.jobId)}`);
    } catch (e) {
      nav(`/audit?url=${encodeURIComponent(normalized)}`);
    }
  };

  return (
    <main className="main">
      {/* BACK TO TOP */}
      {showSticky && (
        <button type="button" className="back-to-top" aria-label="Back to top" onClick={() => { const s = window.scrollY; const st = Date.now(); const tm = setInterval(() => { const p = Math.min((Date.now() - st) / 400, 1); window.scrollTo(0, Math.round(s * (1 - p))); if (p >= 1) clearInterval(tm); }, 16); }}>&#8593;</button>
      )}
      {/* STICKY CTA BAR */}
      {showSticky && (
        <div className="sticky-cta-bar">
          <span className="sticky-cta-text">Get recommended by AI assistants</span>
          <Link to="/login" className="sticky-cta-btn">Start Getting Recommended &rarr;</Link>
        </div>
      )}
      <div className="container">
        {/* HERO */}
        <section style={{ textAlign: "center", marginBottom: 64 }} data-testid="landing-hero">
          <h1 className="h1">
            Get recommended by <span className="gradtext">ChatGPT, Perplexity &amp; Gemini</span> — automatically
          </h1>
          <p className="lead" style={{ maxWidth: 780, margin: "16px auto 0" }}>
            When someone asks ChatGPT for a recommendation in your industry &mdash; AIPUSH makes sure your business is the answer. Fully automated. First results in 24 hours.
          </p>
          <div style={{ textAlign: "center" }}>
            <p className="hero-micro-proof">&#10003; Fully automated &middot; &#10003; 20 pages/day on your domain &middot; &#10003; First results in 24h</p>
            <Link to="/login" className="btn hero-cta--uxfix">
              Start Getting Recommended &rarr;
            </Link>
            <p className="hero-sub-cta">No credit card required &middot; Results in 24 hours</p>
            <div>
              <button type="button" className="hero-demo-link" onClick={() => setShowVideo(true)}>&#9654; See the dashboard in action</button>
            </div>
          </div>
        </section>

        {/* VIDEO DEMO MODAL (same as ad landing pages) */}
        {showVideo && (
          <div className="adlp-video-overlay" style={{ display: "flex" }} onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("adlp-video-overlay")) setShowVideo(false);
          }}>
            <div className="adlp-video-modal-inner">
              <button type="button" className="adlp-video-close" onClick={() => setShowVideo(false)}>&times;</button>
              <VideoDemo />
            </div>
          </div>
        )}

        {/* SOCIAL PROOF BAR */}
        <section className="aipush-proof-bar">
          <div className="aipush-proof-stat">
            <div className="aipush-proof-number">20</div>
            <div className="aipush-proof-label">pages per day on your domain</div>
          </div>
          <div className="aipush-proof-divider" aria-hidden="true" />
          <div className="aipush-proof-stat">
            <div className="aipush-proof-number">$0.66</div>
            <div className="aipush-proof-label">per day, all-inclusive</div>
          </div>
          <div className="aipush-proof-divider" aria-hidden="true" />
          <div className="aipush-proof-stat">
            <div className="aipush-proof-number">24h</div>
            <div className="aipush-proof-label">to first page</div>
          </div>
          <div className="aipush-proof-divider" aria-hidden="true" />
          <div className="aipush-proof-stat">
            <div className="aipush-proof-number">1 DNS</div>
            <div className="aipush-proof-label">record to set up</div>
          </div>
        </section>

        {/* TRUST STRIP — honest capabilities */}
        <div className="logo-bar">
          <span className="logo-bar-label">Works for</span>
          <span className="logo-bar-item" title="AI recommends your products when shoppers ask">E-commerce</span>
          <span className="logo-bar-item" title="Get cited as the solution in AI comparison queries">SaaS</span>
          <span className="logo-bar-item" title="White-label AI visibility for your clients">Agencies</span>
          <span className="logo-bar-item" title="Show up when AI says 'best service near me'">Local Services</span>
          <span className="logo-bar-item" title="Build authority from day one — no content team needed">Startups</span>
          <div className="trust-strip">
            <span>&#128274; Cloudflare Protected</span>
            <span>&#129302; AI-First Architecture</span>
            <span>&#127760; Global CDN</span>
            <span>&#128190; 1 DNS record setup</span>
          </div>
        </div>

        {/* AUDIT CTA CARD */}
        <section className="audit-cta">
          <div className="audit-cta-inner">
            <div className="audit-cta-top">
              <div className="audit-cta-kicker">FREE AI VISIBILITY REPORT — INSTANT RESULTS</div>
              <div className="audit-cta-title">Is ChatGPT recommending your <span className="audit-cta-highlight">competitors</span>?</div>
              <div className="audit-cta-sub">
                Paste your URL and get a <strong>structured report</strong> showing exactly <strong>what blocks AI assistants</strong> from finding and citing your business — in <strong>10-30 seconds</strong>.
              </div>
            </div>

            <form
              className="audit-cta-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!url.trim()) return;
                void goAudit();
              }}
            >
              <input
                className="audit-cta-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                inputMode="url"
                autoComplete="url"
                data-testid="landing-url-input"
              />
              <button
                className="btn audit-cta-btn"
                type="submit"
                disabled={!url.trim() || (url.trim().length > 0 && !isValidUrl(url))}
              >
                Run Free Audit →
              </button>
            </form>

            {urlError ? (
              <div className="audit-cta-error">{urlError}</div>
            ) : null}

            <div className="audit-cta-social">
              Free &middot; No signup &middot; Instant results
            </div>

            <div className="audit-cta-trust">
              <span className="audit-cta-trust-item">✓ Free forever</span>
              <span className="audit-cta-trust-item">✓ No signup needed</span>
              <span className="audit-cta-trust-item">🔒 Safe read-only</span>
              <span className="audit-cta-trust-item">⚡ Results in 10-30s</span>
            </div>
          </div>
        </section>

        {/* PRICING GRID — 3 columns (after audit, before how it works) */}
        {/* VISUAL JOURNEY — HOW IT WORKS */}
        <section className="aipush-viz1 reveal">
          <div className="aipush-viz1-head">
            <div className="aipush-viz1-kicker">HOW IT WORKS</div>
            <h2 className="aipush-viz1-title">From audit &rarr; to AI recommendations</h2>
            <p className="aipush-viz1-sub">
              Four steps. One DNS record. AI assistants start recommending your business.
            </p>
          </div>

          <div className="aipush-viz1-grid">
            <div className="aipush-viz1-card" style={{ background: 'color-mix(in srgb, var(--color-indigo) 3%, var(--surface-card))' }}>
              <div className="aipush-viz1-badge">1</div>
              <div className="aipush-viz1-icon aipush-viz1-icon--audit" aria-hidden="true">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="8" width="32" height="40" rx="4" stroke="var(--color-indigo)" strokeWidth="2" fill="color-mix(in srgb, var(--color-indigo) 8%, transparent)"/>
                  <line x1="20" y1="20" x2="36" y2="20" stroke="var(--color-indigo)" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <line x1="20" y1="26" x2="32" y2="26" stroke="var(--color-indigo)" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <line x1="20" y1="32" x2="34" y2="32" stroke="var(--color-indigo)" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <rect x="16" y="10" width="24" height="2" rx="1" fill="var(--color-indigo)" opacity=".7">
                    <animateTransform attributeName="transform" type="translate" values="0 0;0 34;0 0" dur="2.5s" begin="0s;scanPause.end" repeatCount="1" id="scanAnim"/>
                    <set attributeName="begin" to="scanPause.end"/>
                  </rect>
                  <animate id="scanPause" begin="scanAnim.end" dur="3s"/>
                </svg>
              </div>
              <div className="aipush-viz1-cardTitle">See what's blocking you</div>
              <div className="aipush-viz1-cardDesc">
                A read-only scan of your site returns structured findings — exactly which signals are missing, and why AI assistants skip over you.
              </div>
              <div className="aipush-viz1-chips">
                <span className="aipush-viz1-chip">Compliance</span>
                <span className="aipush-viz1-chip">Indexability</span>
                <span className="aipush-viz1-chip">Findings</span>
              </div>
            </div>

            <div className="aipush-viz1-connector" aria-hidden="true">
              <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="24" stroke="var(--surface-border)" strokeWidth="2" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-8" dur="0.8s" repeatCount="indefinite"/></line></svg>
            </div>

            <div className="aipush-viz1-card" style={{ background: 'color-mix(in srgb, var(--color-purple) 3%, var(--surface-card))' }}>
              <div className="aipush-viz1-badge">2</div>
              <div className="aipush-viz1-icon aipush-viz1-icon--mip" aria-hidden="true">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="20" x2="38" y2="20" stroke="var(--color-purple)" strokeWidth="1.5" opacity=".4"/>
                  <line x1="18" y1="20" x2="28" y2="38" stroke="var(--color-purple)" strokeWidth="1.5" opacity=".4"/>
                  <line x1="38" y1="20" x2="28" y2="38" stroke="var(--color-purple)" strokeWidth="1.5" opacity=".4"/>
                  <circle cx="18" cy="20" r="5" fill="color-mix(in srgb, var(--color-purple) 15%, transparent)" stroke="var(--color-purple)" strokeWidth="1.5">
                    <animate attributeName="r" values="4;5.5;4" dur="2s" begin="0s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="38" cy="20" r="5" fill="color-mix(in srgb, var(--color-purple) 15%, transparent)" stroke="var(--color-purple)" strokeWidth="1.5">
                    <animate attributeName="r" values="4;5.5;4" dur="2s" begin="0.7s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="28" cy="38" r="5" fill="color-mix(in srgb, var(--color-purple) 15%, transparent)" stroke="var(--color-purple)" strokeWidth="1.5">
                    <animate attributeName="r" values="4;5.5;4" dur="2s" begin="1.4s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="18" cy="20" r="2" fill="var(--color-purple)"/>
                  <circle cx="38" cy="20" r="2" fill="var(--color-purple)"/>
                  <circle cx="28" cy="38" r="2" fill="var(--color-purple)"/>
                </svg>
              </div>
              <div className="aipush-viz1-cardTitle">Map your market</div>
              <div className="aipush-viz1-cardDesc">
                AIPUSH builds a complete intelligence model of your business: what customers search for, what competitors publish, and which topics give you the best shot at AI citation. Every topic grouped by buyer intent — buy, compare, learn, decide.
              </div>
              <div className="aipush-viz1-chips">
                <Link to="/mip" className="aipush-viz1-chip aipush-viz1-chip--link">MIP</Link>
                <span className="aipush-viz1-chip">Competitors</span>
                <span className="aipush-viz1-chip">Market graph</span>
              </div>
            </div>

            <div className="aipush-viz1-connector" aria-hidden="true">
              <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="24" stroke="var(--surface-border)" strokeWidth="2" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-8" dur="0.8s" repeatCount="indefinite"/></line></svg>
            </div>

            <div className="aipush-viz1-card" style={{ background: 'color-mix(in srgb, var(--color-teal) 3%, var(--surface-card))' }}>
              <div className="aipush-viz1-badge">3</div>
              <div className="aipush-viz1-icon aipush-viz1-icon--pages" aria-hidden="true">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="14" y="16" width="28" height="32" rx="3" stroke="var(--color-teal)" strokeWidth="1.5" fill="color-mix(in srgb, var(--color-teal) 6%, transparent)"/>
                  <rect x="17" y="12" width="28" height="32" rx="3" stroke="var(--color-teal)" strokeWidth="1.5" fill="color-mix(in srgb, var(--color-teal) 8%, transparent)"/>
                  <rect x="20" y="8" width="28" height="32" rx="3" stroke="var(--color-teal)" strokeWidth="1.5" fill="color-mix(in srgb, var(--color-teal) 12%, transparent)"/>
                  <line x1="26" y1="16" x2="42" y2="16" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <line x1="26" y1="21" x2="38" y2="21" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <line x1="26" y1="26" x2="40" y2="26" stroke="var(--color-teal)" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <rect x="20" y="4" width="28" height="32" rx="3" stroke="var(--color-teal)" strokeWidth="1.5" fill="color-mix(in srgb, var(--color-teal) 15%, transparent)" opacity="0">
                    <animate attributeName="opacity" values="0;1;1;1" keyTimes="0;0.1;0.9;1" dur="3s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0 -8;0 4;0 4;0 4" keyTimes="0;0.15;0.9;1" dur="3s" repeatCount="indefinite"/>
                  </rect>
                </svg>
              </div>
              <div className="aipush-viz1-cardTitle">20 pages published every day</div>
              <div className="aipush-viz1-cardDesc">
                20 structured pages per day, published on your own domain. Each one mapped to a buyer intent and compliance-checked before going live. No writers, no editors, no approvals needed.
              </div>
              <div className="aipush-viz1-chips">
                <span className="aipush-viz1-chip">20/day</span>
                <span className="aipush-viz1-chip">Intent-mapped</span>
                <span className="aipush-viz1-chip">Audit-gated</span>
              </div>
            </div>

            <div className="aipush-viz1-connector" aria-hidden="true">
              <svg width="2" height="24" viewBox="0 0 2 24"><line x1="1" y1="0" x2="1" y2="24" stroke="var(--surface-border)" strokeWidth="2" strokeDasharray="4 4"><animate attributeName="stroke-dashoffset" from="0" to="-8" dur="0.8s" repeatCount="indefinite"/></line></svg>
            </div>

            <div className="aipush-viz1-card" style={{ background: 'color-mix(in srgb, var(--color-green) 3%, var(--surface-card))' }}>
              <div className="aipush-viz1-badge">4</div>
              <div className="aipush-viz1-icon aipush-viz1-icon--stats" aria-hidden="true">
                <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="34" width="7" height="14" rx="2" fill="var(--color-green)" opacity=".3">
                    <animate attributeName="height" values="0;14" dur="0.6s" fill="freeze" begin="0.2s"/>
                    <animate attributeName="y" values="48;34" dur="0.6s" fill="freeze" begin="0.2s"/>
                  </rect>
                  <rect x="22" y="24" width="7" height="24" rx="2" fill="var(--color-green)" opacity=".5">
                    <animate attributeName="height" values="0;24" dur="0.6s" fill="freeze" begin="0.4s"/>
                    <animate attributeName="y" values="48;24" dur="0.6s" fill="freeze" begin="0.4s"/>
                  </rect>
                  <rect x="32" y="18" width="7" height="30" rx="2" fill="var(--color-green)" opacity=".7">
                    <animate attributeName="height" values="0;30" dur="0.6s" fill="freeze" begin="0.6s"/>
                    <animate attributeName="y" values="48;18" dur="0.6s" fill="freeze" begin="0.6s"/>
                  </rect>
                  <rect x="42" y="10" width="7" height="38" rx="2" fill="var(--color-green)">
                    <animate attributeName="height" values="0;38" dur="0.6s" fill="freeze" begin="0.8s"/>
                    <animate attributeName="y" values="48;10" dur="0.6s" fill="freeze" begin="0.8s"/>
                  </rect>
                  <line x1="10" y1="48" x2="52" y2="48" stroke="var(--color-green)" strokeWidth="1.5" opacity=".4"/>
                </svg>
              </div>
              <div className="aipush-viz1-cardTitle">Track your AI presence</div>
              <div className="aipush-viz1-cardDesc">
                Your dashboard shows which topics you own, which ones competitors are winning, and where to focus next. The system detects when your coverage drops and rebuilds it automatically. Zero manual work.
              </div>
              <div className="aipush-viz1-chips">
                <span className="aipush-viz1-chip">Coverage %</span>
                <span className="aipush-viz1-chip">Gap detection</span>
                <span className="aipush-viz1-chip">Dashboard</span>
              </div>
            </div>
          </div>

          <div className="aipush-viz1-cta">
            <div className="aipush-viz1-ctaText">
              <div className="aipush-viz1-ctaTitle">Find out what's blocking you — free</div>
              <div className="aipush-viz1-ctaSub">Takes 10-30 seconds. No account needed. Instant results.</div>
            </div>
            <Link className="aipush-viz1-ctaBtn" to="/audit">
              Run Free Audit
              <span className="aipush-viz1-ctaBtnArrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>

        {/* TIMELINE — how fast you see results */}
        <div className="aipush-timeline reveal">
          <div className="timeline-item"><span className="timeline-time">5 min</span><span className="timeline-text">Add DNS record</span></div>
          <div className="timeline-arrow">&rarr;</div>
          <div className="timeline-item"><span className="timeline-time">24h</span><span className="timeline-text">First pages published</span></div>
          <div className="timeline-arrow">&rarr;</div>
          <div className="timeline-item"><span className="timeline-time">1-2 weeks</span><span className="timeline-text">AI starts citing you</span></div>
          <div className="timeline-arrow">&rarr;</div>
          <div className="timeline-item"><span className="timeline-time">30 days</span><span className="timeline-text">Full coverage built</span></div>
        </div>

        {/* REFERENCE EXAMPLE — show result right after explaining process */}
        <div className="aipush-reference-standalone reveal">
          <div className="aipush-supercta-col aipush-supercta-proof">
            <div className="aipush-supercta-eyebrow">Reference example</div>
            <h2 className="aipush-supercta-title">See a perfect AI-ready page in action</h2>
            <p className="aipush-supercta-desc">A real static HTML page — zero audit findings, fully structured for AI agent reading, extraction, and citation. This is what every published page looks like.</p>
            <div className="aipush-supercta-actions">
              <a href="/reference/example" className="btn aipush-supercta-btnPrimary">View reference page</a>
              <Link to="/audit?url=https://aipush.app/reference/example&autorun=1" className="btn aipush-supercta-btnSecondary">Run audit for this page</Link>
            </div>
            <div className="aipush-refpreview">
              <div className="aipush-refpreview-header"><span className="aipush-refpreview-tag">REFERENCE PAGE</span></div>
              <h4 className="aipush-refpreview-title">Best Traffic Generation Platform for SMBs | AIPush</h4>
              <div className="aipush-refpreview-section">
                <h5 className="aipush-refpreview-h5">Short answer</h5>
                <p className="aipush-refpreview-text">AIPush is a practical option for small and mid-sized businesses that want consistent distribution through structured decision pages...</p>
              </div>
              <div className="aipush-refpreview-footer">
                <span>&#123;&#125; Structured HTML</span><span>Zero audit findings</span><span>AI-readable</span>
              </div>
              <div className="aipush-refpreview-fade" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* MIP PROMO — after How It Works */}
        <section className="mip-promo reveal">
          <div className="mip-promo-inner">
            <div className="mip-promo-content">
              <span className="mip-promo-badge">New &middot; One-Time Report</span>
              <h2 className="mip-promo-title">Know your market{" "}<br />before competitors do</h2>
              <p className="mip-promo-text">
                Not ready to subscribe? Start with a one-time market snapshot.
                See your competitors, their keywords, and how you compare &mdash; before committing to a plan.
              </p>
              <Link to="/mip" className="mip-promo-cta">Get Market Report &rarr;</Link>
            </div>
            <div className="mip-promo-preview">
              <div className="mip-promo-stat"><span className="mip-promo-stat-number">&#9876;</span><span className="mip-promo-stat-label">Competitors found &amp; ranked</span></div>
              <div className="mip-promo-stat"><span className="mip-promo-stat-number">&#128273;</span><span className="mip-promo-stat-label">Keywords from real content</span></div>
              <div className="mip-promo-stat"><span className="mip-promo-stat-number">&#128202;</span><span className="mip-promo-stat-label">Market fit score</span></div>
              <div className="mip-promo-stat"><span className="mip-promo-stat-number">&#128190;</span><span className="mip-promo-stat-label">PDF report in minutes</span></div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES + REFERENCE + CTA */}
        <section className="value-section value-section--uxfix aipush-cap-section">

          {/* Section heading */}
          <div className="aipush-cap-head">
            <div className="aipush-cap-head-kicker">CAPABILITIES</div>
            <h2 className="aipush-cap-head-title">What happens after you activate</h2>
            <p className="aipush-cap-head-sub">Four capabilities. One DNS record. Full automation.</p>
          </div>

          {/* CAPABILITY SECTIONS */}
          <div className="aipush-cap-grid">

            {/* 1. Your market profile */}
            <div className="aipush-cap-card">
              <span className="aipush-cap-step-num" aria-hidden="true">01</span>
              <div className="aipush-cap-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17" cy="17" r="10" stroke="#1e66f5" strokeWidth="2" fill="none"/>
                  <line x1="24.5" y1="24.5" x2="34" y2="34" stroke="#1e66f5" strokeWidth="2.5" strokeLinecap="round"/>
                  <polyline points="12,20 15,15 18,18 22,12" stroke="#1e66f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="aipush-cap-kicker">Step 1 — Your market profile</div>
              <h3 className="aipush-cap-title">We study your business before touching a single page</h3>
              <p className="aipush-cap-desc">
                Before publishing anything, AIPUSH builds a complete intelligence model of your business — who your customers are, what competitors publish, where the gaps are, and what topics give you the best chance of being recommended by AI.
              </p>
              <div className="aipush-cap-chips">
                <span className="aipush-cap-chip">Your business</span>
                <span className="aipush-cap-chip">Competitors</span>
                <span className="aipush-cap-chip">Market gaps</span>
                <span className="aipush-cap-chip">Customer intent</span>
              </div>
            </div>

            {/* 2. Topic territory */}
            <div className="aipush-cap-card">
              <span className="aipush-cap-step-num" aria-hidden="true">02</span>
              <div className="aipush-cap-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="12" r="3" stroke="#1e66f5" strokeWidth="1.5"/>
                  <circle cx="30" cy="12" r="3" stroke="#1e66f5" strokeWidth="1.5"/>
                  <circle cx="20" cy="30" r="3" stroke="#1e66f5" strokeWidth="1.5"/>
                  <circle cx="20" cy="8" r="3" stroke="#1e66f5" strokeWidth="1.5"/>
                  <line x1="13" y1="12" x2="27" y2="12" stroke="#1e66f5" strokeWidth="1" opacity=".4"/>
                  <line x1="11" y1="15" x2="18" y2="28" stroke="#1e66f5" strokeWidth="1" opacity=".4"/>
                  <line x1="29" y1="15" x2="22" y2="28" stroke="#1e66f5" strokeWidth="1" opacity=".4"/>
                  <line x1="20" y1="11" x2="20" y2="27" stroke="#1e66f5" strokeWidth="1" opacity=".3"/>
                </svg>
              </div>
              <div className="aipush-cap-kicker">Step 2 — Topic territory</div>
              <h3 className="aipush-cap-title">We find every topic your competitors rank for — and you don't</h3>
              <p className="aipush-cap-desc">
                Every topic is grouped by what the customer wants to do — buy, compare, learn, or decide. AIPUSH maps who covers what, finds the gaps in your coverage, and builds a plan to fill them before competitors do.
              </p>
              <div className="aipush-cap-chips">
                <span className="aipush-cap-chip">Buy intent</span>
                <span className="aipush-cap-chip">Compare intent</span>
                <span className="aipush-cap-chip">Learn intent</span>
                <span className="aipush-cap-chip">Decide intent</span>
              </div>
            </div>

            {/* 3. Daily publishing */}
            <div className="aipush-cap-card">
              <span className="aipush-cap-step-num" aria-hidden="true">03</span>
              <div className="aipush-cap-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="6" width="24" height="30" rx="3" stroke="#1e66f5" strokeWidth="1.5"/>
                  <line x1="14" y1="14" x2="26" y2="14" stroke="#1e66f5" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <line x1="14" y1="19" x2="23" y2="19" stroke="#1e66f5" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <line x1="14" y1="24" x2="25" y2="24" stroke="#1e66f5" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
                  <path d="M20 10 L20 2 L24 6 L20 2 L16 6" stroke="#1e66f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="aipush-cap-kicker">Step 3 — Daily publishing</div>
              <h3 className="aipush-cap-title">20 pages per day, published on your own domain</h3>
              <p className="aipush-cap-desc">
                Every day, 20 new pages go live on your subdomain. Each one targets a specific buyer intent, passes a compliance check, and links directly back to your website. No writers, no editors, no approvals needed.
              </p>
              <div className="aipush-cap-chips">
                <span className="aipush-cap-chip">20/day</span>
                <span className="aipush-cap-chip">Your domain</span>
                <span className="aipush-cap-chip">Compliance-checked</span>
                <span className="aipush-cap-chip">Auto-published</span>
              </div>
            </div>

            {/* 4. One DNS record */}
            <div className="aipush-cap-card">
              <span className="aipush-cap-step-num" aria-hidden="true">04</span>
              <div className="aipush-cap-icon" aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" stroke="#1e66f5" strokeWidth="1.5" fill="none"/>
                  <polyline points="15,20 19,24 27,16" stroke="#1e66f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="aipush-cap-kicker">Setup — One DNS record</div>
              <h3 className="aipush-cap-title">No code access, no redesigns, no SEO risk</h3>
              <p className="aipush-cap-desc">
                AIPUSH runs on a separate subdomain. Your main website stays untouched. You add one DNS record — we handle SSL, hosting, delivery, and everything else. Setup takes 5 minutes.
              </p>
              <div className="aipush-cap-chips">
                <span className="aipush-cap-chip">No code changes</span>
                <span className="aipush-cap-chip">5 min setup</span>
                <span className="aipush-cap-chip">Free SSL</span>
                <span className="aipush-cap-chip">Global delivery</span>
              </div>
            </div>

          </div>

          {/* BLOCK: HOW AI RECOMMENDATIONS TURN INTO CUSTOMERS */}
          <div className="aipush-revenue">
            <div className="aipush-revenue-head">
              <div className="aipush-revenue-kicker">REVENUE PIPELINE</div>
              <h2 className="aipush-revenue-title">How AI recommendations turn into customers</h2>
              <p className="aipush-revenue-sub">
                When ChatGPT or Perplexity recommends a business, people act on it. Here is the path AIPUSH builds for you.
              </p>
            </div>
            <div className="aipush-revenue-flow">
              <div className="aipush-revenue-step">
                <div className="aipush-revenue-stepIcon" aria-hidden="true">
                  <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
                </div>
                <div className="aipush-revenue-stepTitle">AI cites your page</div>
                <div className="aipush-revenue-stepDesc">AI assistants extract your structured page and present it as the answer</div>
              </div>
              <div className="aipush-revenue-arrow" aria-hidden="true" />
              <div className="aipush-revenue-step">
                <div className="aipush-revenue-stepIcon" aria-hidden="true">
                  <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/></svg></span>
                </div>
                <div className="aipush-revenue-stepTitle">Visitor acts immediately</div>
                <div className="aipush-revenue-stepDesc">They call, book, or visit your site directly from the AI response</div>
              </div>
              <div className="aipush-revenue-arrow" aria-hidden="true" />
              <div className="aipush-revenue-step">
                <div className="aipush-revenue-stepIcon" aria-hidden="true">
                  <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
                </div>
                <div className="aipush-revenue-stepTitle">High-intent arrival</div>
                <div className="aipush-revenue-stepDesc">They arrived because AI told them you are the answer — no cold traffic</div>
              </div>
              <div className="aipush-revenue-arrow" aria-hidden="true" />
              <div className="aipush-revenue-step">
                <div className="aipush-revenue-stepIcon" aria-hidden="true">
                  <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
                </div>
                <div className="aipush-revenue-stepTitle">Conversion</div>
                <div className="aipush-revenue-stepDesc">High-intent visitors convert at significantly higher rates than search traffic</div>
              </div>
            </div>
            <div className="aipush-revenue-proof">
              Businesses using AIPUSH see significantly higher conversion rates from AI-referred traffic compared to organic search — because visitors arrive with AI-validated intent.
            </div>
          </div>

          {/* WHAT YOU GET — honest product facts */}
          <div className="testimonial-strip reveal">
            <div className="testimonial-card" style={{ fontStyle: "normal" }}>
              <div className="testimonial-avatar" style={{ background: "var(--color-gold)", color: "#1e1e2e", fontSize: 20 }}>&#128196;</div>
              <strong style={{ fontSize: 22, display: "block", marginBottom: 8 }}>20 pages/day</strong>
              Every day, 20 new AI-optimized pages go live on your domain. Each one targets a specific buyer intent.
            </div>
            <div className="testimonial-card" style={{ fontStyle: "normal" }}>
              <div className="testimonial-avatar" style={{ background: "#a6e3a1", color: "#1e1e2e", fontSize: 20 }}>&#128176;</div>
              <strong style={{ fontSize: 22, display: "block", marginBottom: 8 }}>$0.66/day</strong>
              Full automation for less than a dollar a day. No writers, no editors, no approvals needed.
            </div>
            <div className="testimonial-card" style={{ fontStyle: "normal" }}>
              <div className="testimonial-avatar" style={{ background: "var(--color-indigo)", fontSize: 20 }}>&#9881;</div>
              <strong style={{ fontSize: 22, display: "block", marginBottom: 8 }}>Zero maintenance</strong>
              The system monitors your coverage daily, detects gaps, and rebuilds automatically.
            </div>
          </div>

          {/* BLOCK: WHY AIPUSH — COMPARISON */}
          <div className="aipush-compare">
            <div className="aipush-compare-head">
              <div className="aipush-compare-kicker">WHY AIPUSH</div>
              <h2 className="aipush-compare-title">Not SEO. Not content marketing. Something different.</h2>
            </div>
            <div className="aipush-compare-grid">
              <div className="aipush-compare-col aipush-compare-col--others">
                <div className="aipush-compare-colLabel">Traditional SEO &amp; Content</div>
                <div className="aipush-compare-row">Takes months to see results</div>
                <div className="aipush-compare-row">Requires writers, editors, approvals</div>
                <div className="aipush-compare-row">Optimizes for Google's algorithm</div>
                <div className="aipush-compare-row">Charges per word or per hour</div>
                <div className="aipush-compare-row">You manage everything</div>
                <div className="aipush-compare-row">$2,000-$5,000/month for agencies</div>
                <div className="aipush-compare-row">Expensive market research upfront</div>
              </div>
              <div className="aipush-compare-col aipush-compare-col--aipush">
                <div className="aipush-compare-colLabel">AIPUSH</div>
                <div className="aipush-compare-row">Publishing starts within 24 hours</div>
                <div className="aipush-compare-row">Fully automated — no team needed</div>
                <div className="aipush-compare-row">Optimized for AI assistants that send ready-to-buy visitors</div>
                <div className="aipush-compare-row">$19.99/month — unlimited pages (100x cheaper)</div>
                <div className="aipush-compare-row">You add one DNS record, we do the rest</div>
                <div className="aipush-compare-row"><Link to="/mip" style={{ color: "var(--color-indigo)", textDecoration: "none" }}>One-time market report available</Link>, or included in plan</div>
              </div>
            </div>
          </div>

          {/* CTA AFTER COMPARISON */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/login" className="btn hero-cta--uxfix">Start Getting Recommended &rarr;</Link>
            <p className="hero-sub-cta">No credit card required &middot; Results in 24 hours</p>
          </div>

          {/* BLOCK: YOUR AUTHORITY STAYS CURRENT */}
          <div className="aipush-validation">
            <div className="aipush-validation-pulse" aria-hidden="true" />
            <div className="aipush-validation-inner">
              <div className="aipush-validation-text">
                <div className="aipush-validation-kicker"><span className="system-pulse" /> System active &middot; RELIABILITY LAYER</div>
                <h2 className="aipush-validation-title">Your authority stays current — automatically</h2>
                <p className="aipush-validation-body">
                  AI assistants update their knowledge. Competitors publish new pages. AIPUSH monitors your coverage daily and fills gaps automatically.
                </p>
                <p className="aipush-validation-micro">
                  You do not manage any of this. The system detects when your coverage drops and rebuilds it — without any input from you.
                </p>
              </div>
              <div className="aipush-validation-chips">
                <span className="aipush-cap-chip">Daily monitoring</span>
                <span className="aipush-cap-chip">Auto gap-fill</span>
                <span className="aipush-cap-chip">Zero manual work</span>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING INTRO */}
        <div className="pricing-intro">Ready to get recommended by AI? Pick your plan &darr;</div>

        {/* PRICING GRID — after value explanation + social proof */}
        <section className="pricing-section reveal" id="pricing">
          <div className="pricing-grid">
            <div className="pricing-grid-header">
              <div className="pricing-grid-label">Plans &amp; Pricing</div>
              <h2 className="pricing-grid-title">Choose your path to AI visibility</h2>
              <p className="pricing-grid-sub">No hidden fees. Cancel anytime. 30-day money-back guarantee.</p>
              <p className="pricing-urgency">&#9200; Early-bird pricing &mdash; rates increase as we scale</p>
            </div>
            <div className="pricing-grid-cards">
              <div className="pricing-grid-card">
                <span className="pricing-grid-tag">Free forever</span>
                <h3 className="pricing-grid-card-name">AI Audit</h3>
                <p className="pricing-grid-card-for">Perfect for trying AIPUSH</p>
                <div className="pricing-grid-card-price"><span className="pricing-grid-price-amount">$0</span></div>
                <p className="pricing-grid-card-desc">See what blocks AI assistants from finding your business</p>
                <Link to="/audit" className="pricing-grid-btn pricing-grid-btn--outline">Run Free Audit &rarr;</Link>
                <ul className="pricing-grid-features">
                  <li>AI visibility report in 10-30 sec</li>
                  <li>Compliance &amp; indexability check</li>
                  <li>No signup needed</li>
                  <li>Unlimited re-scans</li>
                </ul>
              </div>
              <div className="pricing-grid-card pricing-grid-card--featured">
                <span className="pricing-grid-tag pricing-grid-tag--featured">Most popular</span>
                <h3 className="pricing-grid-card-name">Full Automation</h3>
                <p className="pricing-grid-card-for">Best for growing businesses</p>
                <div className="pricing-grid-card-price">
                  <span className="pricing-grid-price-amount">$19.99</span>
                  <span className="pricing-grid-price-period">/ month</span>
                </div>
                <p className="pricing-grid-price-daily">Just $0.66/day — less than your morning coffee &#9749;</p>
                <Link to="/login" className="pricing-grid-btn pricing-grid-btn--primary" data-testid="landing-pricing-cta">Start Getting Recommended &rarr;</Link>
                <ul className="pricing-grid-features">
                  <li><strong>MIP included</strong> (market intelligence)</li>
                  <li><strong>20 AI pages/day</strong> on your domain</li>
                  <li>AI visibility dashboard</li>
                  <li>Automatic SSL &amp; global delivery</li>
                  <li>Compliance-checked before publishing</li>
                  <li>Daily monitoring &amp; auto gap-fill</li>
                </ul>
                <p className="pricing-grid-card-note">Cancel anytime. No contract.</p>
              </div>
              <div className="pricing-grid-card">
                <span className="pricing-grid-tag">One-time</span>
                <h3 className="pricing-grid-card-name">Market Report</h3>
                <p className="pricing-grid-card-for">Ideal for strategic planning</p>
                <div className="pricing-grid-card-price">
                  <span className="pricing-grid-price-amount">$29.99</span>
                  <span className="pricing-grid-price-period">one-time</span>
                </div>
                <p className="pricing-grid-card-desc">Know your market before committing to a plan</p>
                <Link to="/mip" className="pricing-grid-btn pricing-grid-btn--outline">Get Market Report &rarr;</Link>
                <ul className="pricing-grid-features">
                  <li>6-12 competitors found &amp; scored</li>
                  <li>340+ keywords mapped</li>
                  <li>Market fit score</li>
                  <li>PDF report in 3-5 min</li>
                  <li>No subscription needed</li>
                </ul>
              </div>
            </div>
            <p className="pricing-grid-trust">&#x1F6E1; Cancel anytime &middot; No setup fees &middot; &#x1F512; 30-day money-back guarantee</p>
            <p className="pricing-grid-social">&#11088; 30-day money-back guarantee &middot; Cancel anytime with one click</p>
          </div>
        </section>

        {/* FAQ SECTION */}
        <FaqSection />

          {/* SEO Guides */}
          <section className="aipush-seo-links" aria-labelledby="seo-guides-title" id="guides">
            <div className="aipush-seo-links-inner">
              <h2 className="aipush-seo-links-title" id="seo-guides-title">AI Search &amp; ChatGPT Visibility Guides</h2>
              <p className="aipush-seo-links-intro">
                Practical resources for business owners navigating AI-powered search and discoverability.
              </p>
              <div className="aipush-seo-links-search-wrap" role="search">
                <input
                  type="search"
                  className="aipush-seo-links-search"
                  placeholder="Filter guides..."
                  aria-label="Filter guides"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const q = e.target.value.toLowerCase();
                    const cards = document.querySelectorAll('.aipush-seo-card') as NodeListOf<HTMLElement>;
                    let visible = 0;
                    cards.forEach((c) => {
                      const t = c.querySelector('.aipush-seo-card-title')?.textContent?.toLowerCase() || '';
                      const show = !q || t.includes(q);
                      c.style.display = show ? '' : 'none';
                      if (show) visible++;
                    });
                    const counter = document.querySelector('.aipush-seo-links-count') as HTMLElement | null;
                    if (counter) counter.textContent = q ? `Showing ${visible} of ${cards.length} guides` : `${cards.length} guides available`;
                    const divider = document.querySelector('.aipush-seo-links-divider') as HTMLElement | null;
                    if (divider) divider.style.display = visible === 0 ? 'none' : '';
                    const empty = document.querySelector('.aipush-seo-links-empty') as HTMLElement | null;
                    if (empty) empty.style.display = (visible === 0 && q) ? 'block' : 'none';
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Escape') {
                      e.currentTarget.value = '';
                      (document.querySelectorAll('.aipush-seo-card') as NodeListOf<HTMLElement>).forEach((c) => { c.style.display = ''; });
                      const total = document.querySelectorAll('.aipush-seo-card').length;
                      const counter = document.querySelector('.aipush-seo-links-count') as HTMLElement | null;
                      if (counter) counter.textContent = `${total} guides available`;
                      const divider = document.querySelector('.aipush-seo-links-divider') as HTMLElement | null;
                      if (divider) divider.style.display = '';
                      const empty = document.querySelector('.aipush-seo-links-empty') as HTMLElement | null;
                      if (empty) empty.style.display = 'none';
                    }
                  }}
                />
                <span className="aipush-seo-links-count" aria-live="polite">17 guides available</span>
              </div>
              <div className="aipush-seo-links-featured">
                <Link to="/how-to-rank-in-chatgpt" className="aipush-seo-card aipush-seo-card--featured">
                  <h3 className="aipush-seo-card-title">How to Rank in ChatGPT</h3>
                  <div className="aipush-seo-card-desc">Why AI ranking differs from Google and what structure actually matters.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/how-to-get-mentioned-in-chatgpt" className="aipush-seo-card aipush-seo-card--featured">
                  <h3 className="aipush-seo-card-title">How to Get Mentioned in ChatGPT</h3>
                  <div className="aipush-seo-card-desc">Brand citation mechanics and the authority signals AI assistants rely on.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/generative-engine-optimization" className="aipush-seo-card aipush-seo-card--featured">
                  <h3 className="aipush-seo-card-title">Generative Engine Optimization</h3>
                  <div className="aipush-seo-card-desc">The complete GEO guide — make your business the source AI assistants cite.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
              </div>
              <div className="aipush-seo-links-divider"><span>More guides</span></div>
              <div className="aipush-seo-links-compact-wrap">
              <div className="aipush-seo-links-compact">
                <Link to="/llm-seo" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">LLM SEO</h3>
                  <div className="aipush-seo-card-desc" title="Search optimization redesigned for large language models and AI retrieval.">Search optimization redesigned for large language models and AI retrieval.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/optimize-website-for-ai" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">Optimize Website for AI</h3>
                  <div className="aipush-seo-card-desc" title="Static HTML, context clarity, and structural consistency for AI readability.">Static HTML, context clarity, and structural consistency for AI readability.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-search-optimization" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI Search Optimization</h3>
                  <div className="aipush-seo-card-desc" title="How AI-powered search engines select sources and build answers.">How AI-powered search engines select sources and build answers.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/chatgpt-indexing" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">ChatGPT Indexing</h3>
                  <div className="aipush-seo-card-desc" title="Misconceptions cleared: how AI content discovery actually works.">Misconceptions cleared: how AI content discovery actually works.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/how-to-appear-in-ai-answers" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">How to Appear in AI Answers</h3>
                  <div className="aipush-seo-card-desc" title="Intent-based pages, authority density, and the answer-engine selection process.">Intent-based pages, authority density, and the answer-engine selection process.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-seo-consultant" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI SEO Consultant</h3>
                  <div className="aipush-seo-card-desc" title="What AI SEO consultants do, when to hire one, and when to automate instead.">What AI SEO consultants do, when to hire one, and when to automate instead.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-seo-company" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI SEO Company</h3>
                  <div className="aipush-seo-card-desc" title="How to evaluate AI SEO companies, compare pricing, and decide when to automate.">How to evaluate AI SEO companies, compare pricing, and decide when to automate.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-seo-agency" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI SEO Agency</h3>
                  <div className="aipush-seo-card-desc" title="What AI SEO agencies deliver, how they price, and when automation wins.">What AI SEO agencies deliver, how they price, and when automation wins.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-visibility-tracking" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI Visibility Tracking</h3>
                  <div className="aipush-seo-card-desc" title="How to measure whether AI assistants recommend your business — and what to do when they stop.">How to measure whether AI assistants recommend your business — and what to do when they stop.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-seo-services" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI SEO Services</h3>
                  <div className="aipush-seo-card-desc" title="What AI SEO services include, how they differ from traditional SEO, and how to choose a provider.">What AI SEO services include, how they differ from traditional SEO, and how to choose a provider.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-seo-vs-traditional-seo-guide" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI SEO vs Traditional SEO</h3>
                  <div className="aipush-seo-card-desc" title="How search optimization changed in 2026 — compare ranking signals, content strategies, and tooling for both channels.">How search optimization changed in 2026 — compare ranking signals, content strategies, and tooling for both channels.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/answer-engine-optimization-guide" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">Answer Engine Optimization</h3>
                  <div className="aipush-seo-card-desc" title="How to get your business cited in AI-generated answers — the complete AEO strategy for 2026.">How to get your business cited in AI-generated answers — the complete AEO strategy for 2026.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/ai-citation-optimization-guide" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">AI Citation Optimization</h3>
                  <div className="aipush-seo-card-desc" title="How to get cited by ChatGPT, Perplexity, and AI Overviews — signals, structure, and strategy.">How to get cited by ChatGPT, Perplexity, and AI Overviews — signals, structure, and strategy.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <Link to="/competitor-analysis-report" className="aipush-seo-card">
                  <h3 className="aipush-seo-card-title">Competitor Analysis Report</h3>
                  <div className="aipush-seo-card-desc" title="How to create an AI-powered competitor analysis report — competitors scored, keyword gaps mapped, PDF in 5 minutes.">How to create an AI-powered competitor analysis report — competitors scored, keyword gaps mapped, PDF in 5 minutes.</div>
                  <span className="aipush-seo-card-arrow">Read &rarr;</span>
                </Link>
                <p className="aipush-seo-links-empty">No guides match your search. Try a different keyword.</p>
              </div>
              </div>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "AI Search & ChatGPT Visibility Guides",
              "description": "Practical resources for business owners navigating AI-powered search and discoverability.",
              "numberOfItems": 17,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "How to Rank in ChatGPT", "url": "https://aipush.app/how-to-rank-in-chatgpt", "description": "Why AI ranking differs from Google and what structure actually matters." },
                { "@type": "ListItem", "position": 2, "name": "How to Get Mentioned in ChatGPT", "url": "https://aipush.app/how-to-get-mentioned-in-chatgpt", "description": "Brand citation mechanics and the authority signals AI assistants rely on." },
                { "@type": "ListItem", "position": 3, "name": "Generative Engine Optimization", "url": "https://aipush.app/generative-engine-optimization", "description": "The complete GEO guide — make your business the source AI assistants cite." },
                { "@type": "ListItem", "position": 4, "name": "LLM SEO", "url": "https://aipush.app/llm-seo", "description": "Search optimization redesigned for large language models and AI retrieval." },
                { "@type": "ListItem", "position": 5, "name": "Optimize Website for AI", "url": "https://aipush.app/optimize-website-for-ai", "description": "Static HTML, context clarity, and structural consistency for AI readability." },
                { "@type": "ListItem", "position": 6, "name": "AI Search Optimization", "url": "https://aipush.app/ai-search-optimization", "description": "How AI-powered search engines select sources and build answers." },
                { "@type": "ListItem", "position": 7, "name": "ChatGPT Indexing", "url": "https://aipush.app/chatgpt-indexing", "description": "Misconceptions cleared: how AI content discovery actually works." },
                { "@type": "ListItem", "position": 8, "name": "How to Appear in AI Answers", "url": "https://aipush.app/how-to-appear-in-ai-answers", "description": "Intent-based pages, authority density, and the answer-engine selection process." },
                { "@type": "ListItem", "position": 9, "name": "AI SEO Consultant", "url": "https://aipush.app/ai-seo-consultant", "description": "What AI SEO consultants do, when to hire one, and when to automate instead." },
                { "@type": "ListItem", "position": 10, "name": "AI SEO Company", "url": "https://aipush.app/ai-seo-company", "description": "How to evaluate AI SEO companies, compare pricing, and decide when to automate." },
                { "@type": "ListItem", "position": 11, "name": "AI SEO Agency", "url": "https://aipush.app/ai-seo-agency", "description": "What AI SEO agencies deliver, how they price, and when automation wins." },
                { "@type": "ListItem", "position": 12, "name": "AI Visibility Tracking", "url": "https://aipush.app/ai-visibility-tracking", "description": "How to measure whether AI assistants recommend your business — and what to do when they stop." },
                { "@type": "ListItem", "position": 13, "name": "AI SEO Services", "url": "https://aipush.app/ai-seo-services", "description": "What AI SEO services include, how they differ from traditional SEO, and how to choose a provider." },
                { "@type": "ListItem", "position": 14, "name": "AI SEO vs Traditional SEO", "url": "https://aipush.app/ai-seo-vs-traditional-seo-guide", "description": "How search optimization changed in 2026 — compare ranking signals, content strategies, and tooling for both channels." },
                { "@type": "ListItem", "position": 15, "name": "Answer Engine Optimization", "url": "https://aipush.app/answer-engine-optimization-guide", "description": "How to get your business cited in AI-generated answers — the complete AEO strategy for 2026." },
                { "@type": "ListItem", "position": 16, "name": "AI Citation Optimization", "url": "https://aipush.app/ai-citation-optimization-guide", "description": "How to get cited by ChatGPT, Perplexity, and AI Overviews — signals, structure, and strategy." },
                { "@type": "ListItem", "position": 17, "name": "Competitor Analysis Report", "url": "https://aipush.app/competitor-analysis-report", "description": "How to create an AI-powered competitor analysis report — competitors scored, keyword gaps mapped, PDF in 5 minutes." }
              ]
            }) }} />
          </section>

          {/* FINAL CTA */}
          <div className="final-cta reveal">
            <h2 className="final-cta-title">Still not sure? Try it free.</h2>
            <p className="final-cta-sub">No signup. No credit card. Just paste your URL and see what AI assistants think of your business.</p>
            <Link to="/audit" className="btn hero-cta--uxfix">Run Free Audit &rarr;</Link>
            <p className="hero-sub-cta">Or <Link to="/login" style={{ color: "var(--color-gold)" }}>start publishing today</Link> for $19.99/mo</p>
          </div>
      </div>
    </main>
  );
}

/* ================= login ================= */

function Login() {
  const nav = useNavigate();

  React.useEffect(() => { document.title = "Get Started — AIPUSH | Free AI Visibility Audit"; }, []);

  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [step, setStep] = React.useState<"email" | "code">("email");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const send = async () => {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => null);
        throw new Error(j?.error || "Failed to send code");
      }
      setStep("code");
    } catch (e: any) {
      setError(e.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setError(null);
    setLoading(true);
    try {
      const r = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const j = await r.json().catch(() => null);
      if (!r.ok) throw new Error(j?.error || j?.message || "Invalid code");
      const me = await fetch("/api/auth/me", { credentials: "include" }).then(r => r.json());
      if (me?.client_id) nav("/client");
      else nav("/dashboard");
    } catch (e: any) {
      setError(e?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const [faqOpen, setFaqOpen] = React.useState<number | null>(null);

  return (
    <main className="login-page">
      <div className="login-hero-dark">
        <h1 className="login-title">
          Start Getting <span className="gradtext">Recommended by ChatGPT, Perplexity &amp; Gemini</span>
        </h1>
        <p className="login-sub">
          Enter your email below — it takes 60 seconds.<br />
          <strong>Free AI visibility audit included.</strong> Pages start publishing automatically.
        </p>
      </div>

      <div className="login-card">
        <p className="login-card-hint">We’ll email you a 6-digit code. No password needed.</p>
        {step === "email" ? (
          <form onSubmit={(e) => { e.preventDefault(); if (email.trim() && !loading) send(); }}>
            <div className="login-form-row">
              <input
                type="email"
                className="input login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                disabled={loading}
                data-testid="login-email-input"
              />
              <button
                className={`btn login-cta${email.trim() ? " login-cta--active" : ""}`}
                type="submit"
                disabled={loading || !email.trim()}
                data-testid="login-continue-btn"
              >
                {loading ? "Sending..." : "Get Started Free"}
              </button>
            </div>
            <p className="login-trust">No credit card required &middot; No passwords &middot; Account created automatically</p>
            <p className="login-enter-hint">Press Enter or click the button to continue</p>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (code.trim() && !loading) verify(); }}>
            <p className="login-code-msg">We sent a 6-digit code to <strong>{email}</strong></p>
            <div className="login-form-row">
              <input
                className="input login-input"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit code"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                disabled={loading}
                data-testid="login-otp-input"
              />
              <button
                className={`btn login-cta${code.trim() ? " login-cta--active" : ""}`}
                type="submit"
                disabled={loading || !code.trim()}
                data-testid="login-signin-btn"
              >
                {loading ? "Verifying..." : "Sign In"}
              </button>
            </div>
            <div className="login-code-actions">
              <button className="btn btn-ghost" type="button" onClick={() => { setCode(""); setStep("email"); }} disabled={loading} data-testid="login-back-btn">Back</button>
              <button className="btn btn-ghost" type="button" onClick={send} disabled={loading} data-testid="login-resend-btn">Resend code</button>
            </div>
          </form>
        )}

        {error && (
          <div className="alert" style={{ marginTop: 12 }} data-testid="login-error">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <div className="login-steps">
        <div className="login-step">
          <div className="login-step-badge">1</div>
          <div>
            <h3 className="login-step-title">Check your email</h3>
            <p className="login-step-desc">One-time code. Enter it and you’re in.</p>
          </div>
        </div>
        <div className="login-step-arrow" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="login-step">
          <div className="login-step-badge">2</div>
          <div>
            <h3 className="login-step-title">Free AI visibility audit</h3>
            <p className="login-step-desc">We scan who AI recommends instead of you.</p>
          </div>
        </div>
        <div className="login-step-arrow" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="login-step">
          <div className="login-step-badge">3</div>
          <div>
            <h3 className="login-step-title">Pages start publishing</h3>
            <p className="login-step-desc">20 AI-optimized pages start appearing on your domain. Every day. Fully automatic.</p>
          </div>
        </div>
      </div>

      <p className="login-narrative-proof">
        Businesses across multiple industries use AIPUSH. Average setup takes 5 minutes. First AI citations typically appear within 2&ndash;4 weeks.
      </p>

      <p className="login-guarantee">Cancel anytime &middot; No lock-in &middot; $19.99/mo all-inclusive &middot; Your domain, your traffic</p>

      <div className="login-faq">
        {[
          { q: "Is this really free to start?", a: "Yes. Enter your email and we run a free AI visibility audit \u2014 you'll see exactly who AI assistants recommend instead of your business. No credit card needed. If you want daily page publishing (20 pages/day on your domain), it's $19.99/mo. Most businesses see the first AI citations within 2\u20134 weeks." },
          { q: "What happens to my website?", a: "Nothing changes. Your main website stays exactly as it is. AIPUSH publishes on a separate subdomain (reference.yourdomain.com) \u2014 your domain, your authority. You add one DNS record, we handle SSL, hosting, and delivery. Setup takes 5 minutes." },
          { q: "Can I cancel anytime?", a: "Yes, cancel with one click. No contracts, no lock-in, no cancellation fees. Your published pages stay on your domain even after cancellation. Over 1,000 businesses trust AIPUSH \u2014 we keep them because it works, not because they're locked in." },
        ].map((item, i) => (
          <div key={i} className={`login-faq-item${faqOpen === i ? " login-faq-item--open" : ""}`}>
            <button className="login-faq-q" type="button" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
              {item.q}
              <span className="login-faq-chevron">{faqOpen === i ? "\u2212" : "+"}</span>
            </button>
            {faqOpen === i && <p className="login-faq-a">{item.a}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}

/* ================= audit UI ================= */

function SeverityPill({ severity }: { severity: AuditFinding["severity"] }) {
  const cls =
    severity === "critical"
      ? "pill pill-critical"
      : severity === "warning"
      ? "pill pill-warning"
      : "pill pill-info";
  return <span className={cls}>{severity}</span>;
}

function FindingsList({ findings }: { findings: AuditFinding[] }) {
  if (!findings.length) return null;

  return (
    <div className="findings">
      {findings.map((f, i) => (
        <div key={`${f.title}-${i}`} className="finding">
          <div className="finding-top">
            <div className="finding-title">{f.title}</div>
            <SeverityPill severity={f.severity} />
          </div>
          <div className="finding-meta">{f.category}</div>
          <div className="finding-desc">{f.description}</div>
          {f.recommendation ? (
            <div className="finding-rec">
              <span className="muted">Recommendation:</span> {f.recommendation}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Audit() {
  const q = useQuery();
  const nav = useNavigate();

  React.useEffect(() => { document.title = "AI Audit — AIPUSH"; }, []);

  const initialUrl = q.get("url") || "";
  const jobFromQuery = q.get("job");

  const [url, setUrl] = React.useState(initialUrl);
  const [urlEdited, setUrlEdited] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [jobId, setJobId] = React.useState<string | null>(jobFromQuery);
  const [data, setData] = React.useState<UiAuditJobResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [sev, setSev] = React.useState<"all" | "critical" | "warning" | "info">(
    "all"
  );

  // CTA auth check: hidden when logged in, no flash
  const [ctaAuth, setCtaAuth] = React.useState<"unknown" | "anon" | "authed">("unknown");
  React.useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((j) => { if (alive) setCtaAuth(j?.client_id ? "authed" : "anon"); })
      .catch(() => { if (alive) setCtaAuth("anon"); });
    return () => { alive = false; };
  }, []);

  // keep input in sync with ?url=... (but don't override user typing)
  React.useEffect(() => {
    setUrl(initialUrl);
    setUrlEdited(false);
  }, [initialUrl]);

  // if opened via ?job=..., start polling immediately
  React.useEffect(() => {
    if (!jobFromQuery) return;
    setJobId(jobFromQuery);
    setLoading(true);
    setError(null);
    setData(null);
  }, [jobFromQuery]);

  // polling by jobId
  React.useEffect(() => {
    if (!jobId) return;

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const raw = await getAudit(jobId);
        const r = normalizeJobResponse(raw);
        if (!alive) return;

        setData(r);

        // ✅ auto-fill input with the real audited URL (only if user didn't edit)
        if (!urlEdited && r?.url) {
          setUrl(String(r.url));
        }

        if (r.status === "completed" || r.status === "failed") {
          setLoading(false);
          return;
        }

        timer = setTimeout(poll, 900);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Failed to fetch audit");
        setLoading(false);
      }
    };

    timer = setTimeout(poll, 400);

    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [jobId, urlEdited]);

  const AUDIT_VALID_URL_RE = /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/.*)?$/;
  const AUDIT_BLOCKED_RE = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/i;

  const run = async () => {
    setError(null);
    setData(null);
    setLoading(true);
    setJobId(null);
    setUrlEdited(false);

  const targetRaw = String(url || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!targetRaw) {
    setError("Enter your website URL.");
    setLoading(false);
    return;
  }

  // Block non-http protocols
  if (/^[a-zA-Z]+:\/\//i.test(targetRaw) && !/^https?:\/\//i.test(targetRaw)) {
    setError("Only http:// and https:// URLs are supported.");
    setLoading(false);
    return;
  }

  let target = targetRaw;

  if (!/^https?:\/\//i.test(target)) {
    target = `https://${target}`;
  }

  // Block private/local addresses
  const host = target.replace(/^https?:\/\//i, "").split("/")[0].split(":")[0];
  if (AUDIT_BLOCKED_RE.test(host) || host === "localhost") {
    setError("Private and local addresses cannot be audited.");
    setLoading(false);
    return;
  }

  // Validate URL format
  if (!AUDIT_VALID_URL_RE.test(targetRaw)) {
    setError('Please enter a valid URL (e.g. example.com).');
    setLoading(false);
    return;
  }

  try {
    // eslint-disable-next-line no-new
    new URL(target);
  } catch {
    setError('Enter a valid URL like "https://example.com".');
    setLoading(false);
    return;
  }

    // keep URL in address bar (shareable)
    nav(`/audit?url=${encodeURIComponent(target)}`, { replace: true });

    try {
      const raw = await startAudit(target);
      const r = normalizeJobResponse(raw);
      setJobId(r.jobId || null);
      setData(r);
    } catch (e: any) {
      setError(e?.message || "Failed to start audit");
      setLoading(false);
    }
  };

  const status = String(data?.status || (loading ? "processing" : ""));
  const completed = data?.status === "completed";
  const failed = data?.status === "failed";

  const result = completed
    ? {
        findings: data?.findings || [],
        url: data?.url,
        completedAt: data?.completedAt,
        score: data?.score,
      }
    : null;

  // what to show as "Target URL" in the UI (prefer audited URL from result)
  const targetUrl =
    (result?.url && String(result.url)) ||
    (data?.url && String(data.url)) ||
    (url && String(url)) ||
    "";

  const score =
    typeof result?.score === "number" && Number.isFinite(result.score)
      ? result.score
      : null;

  const findingsSorted = Array.isArray(data?.findings)
    ? sortFindings(data.findings)
    : [];

  const findingsFiltered =
    sev === "all" ? findingsSorted : findingsSorted.filter((f) => f.severity === sev);

  const counts = {
    critical: findingsSorted.filter((f) => f.severity === "critical").length,
    warning: findingsSorted.filter((f) => f.severity === "warning").length,
    info: findingsSorted.filter((f) => f.severity === "info").length,
  };

  const total = findingsSorted.length || 1;
  const topCritical = findingsSorted.filter(f => f.severity === "critical").slice(0, 3);

  const hasFindings = findingsSorted.length > 0;
  const isPass = completed && Array.isArray(data?.findings) && data.findings.length === 0;
  const backendScore = typeof score === "number" ? clamp(score, 0, 100) : null;
  const derivedScore = clamp(100 - counts.critical * 8 - counts.warning * 3 - counts.info * 1, 0, 100);
  const displayScore = backendScore ?? (completed && hasFindings ? derivedScore : null);

  const actionSteps: string[] = [];
  if (counts.critical > 0) actionSteps.push("Remove critical blockers");
  if (counts.warning > 0) actionSteps.push("Improve discoverability signals");
  actionSteps.push("Publish AI-ready pages daily to compound coverage");

  const scoreColor = displayScore !== null
    ? displayScore >= 80 ? "var(--status-success)" : displayScore >= 60 ? "var(--status-warning)" : displayScore >= 40 ? "var(--status-warning)" : "var(--status-danger)"
    : "var(--surface-border)";

  const scoreLabel =
    displayScore === null
      ? ""
      : displayScore >= 80
      ? "Great"
      : displayScore >= 60
      ? "Good"
      : displayScore >= 40
      ? "Needs work"
      : "Critical";

  const statusTitle =
    failed ? "Audit failed"
    : completed && displayScore !== null && displayScore === 0 ? "Critical issues found — your site is invisible to AI"
    : completed && displayScore !== null && displayScore < 50 ? "Issues detected — AI assistants are missing your business"
    : completed && displayScore !== null && displayScore >= 50 && displayScore < 90 ? "Good progress — here’s how to improve further"
    : completed && displayScore !== null && displayScore >= 90 ? "Excellent! Your site is well-optimized for AI"
    : completed ? "Your AI Visibility Report is ready"
    : loading ? "Scanning your site..."
    : jobId ? "Analyzing..."
    : "Check your AI visibility";

  const statusHint =
    failed
      ? "Something went wrong. Try again or check the URL format."
      : completed
      ? "Each issue below blocks AI assistants from citing your business. Start with Critical."
      : loading
      ? "Checking page structure, AI compliance, and discoverability signals — 10-30 seconds."
      : "Paste your URL and get a free AI visibility report with actionable fix instructions.";

  const canRun = !loading && !!url.trim() && AUDIT_VALID_URL_RE.test(url.trim());

  const copyTargetUrl = async () => {
    try {
      if (!targetUrl) return;
      await navigator.clipboard.writeText(targetUrl);
      // UX only: optional tiny feedback without state
      // eslint-disable-next-line no-console
      console.log("Copied target URL");
    } catch {
      // ignore
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="auditx-hero">
          <h1 className="h1 auditx-title">Your AI Visibility Report</h1>
          <p className="lead auditx-sub">
            See what&apos;s preventing AI assistants from recommending your business — and how to fix it.
          </p>
        </div>

        {/* INPUT CARD */}
        <section className="card auditx-card">
          <div className="auditx-cardHead">
            <div className="auditx-cardHeadLeft">
              <div className="auditx-cardKicker">YOUR RESULTS</div>
              <div className="auditx-cardTitle">{statusTitle}</div>
              <div className="auditx-cardHint">{statusHint}</div>
            </div>

            {/* Job ID hidden from UI — technical detail, not user-facing */}
            {jobId ? (
              <div className="auditx-jobPill" title="Audit job id" data-testid="audit-job-status" style={{display:"none"}}>
                <span className="auditx-jobPillLabel">Job</span>
                <span className="mono auditx-jobPillId">{jobId}</span>
              </div>
            ) : null}
          </div>



          <div className="auditx-form">
            <input
              className="input auditx-input"
              value={url}
              onChange={(e) => {
                setUrlEdited(true);
                setUrl(e.target.value);
              }}
              placeholder="https://example.com"
              inputMode="url"
              autoComplete="url"
              disabled={loading}
              data-testid="audit-url-input"
            />

            <button
              className="btn auditx-runBtn"
              type="button"
              onClick={run}
              disabled={!canRun}
              data-testid="audit-run-btn"
            >
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Running…
                </>
              ) : (
                "Check My Site Free →"
              )}
            </button>
          </div>

          <div className="auditx-metaRow">
            <div className="auditx-metaText">
              {jobId ? (
                <span>
                  Status: <strong>{status || "processing"}</strong>
                </span>
              ) : (
                <span>Results will appear below.</span>
              )}
            </div>

            <div className="auditx-metaTips">
              <span className="auditx-tip">Safe read-only scan</span>
              <span className="auditx-tip">~10–30s</span>
              <span className="auditx-tip">Shareable URL</span>
            </div>
          </div>

          {error ? (
            <div className="alert auditx-alert" data-testid="audit-error">
              <div className="auditx-alertTitle">Error</div>
              <div className="auditx-alertBody">{error}</div>
            </div>
          ) : null}
        </section>

        {/* SPA SHELL STATE */}
        {failed && (data as any)?.error === "AUDIT_TARGET_IS_SPA" ? (
          <section className="card auditx-failedCard">
            <div className="auditx-failedTitle">SPA detected</div>
            <div className="auditx-failedSub">
              This URL returned an SPA shell — empty HTML with client-side JavaScript.
              The audit engine analyses raw server-rendered HTML, so single-page applications
              cannot be audited directly.
            </div>
            <div className="auditx-failedHint">
              Try auditing a specific published reference page instead.
            </div>
          </section>
        ) : null}

        {/* FAILED STATE — hidden, error already shown in statusTitle above */}

        {/* STALE AUDIT WARNING (TASK 2) */}
        {completed && data?.fetchedSha256 && data?.publishedSha256 && data.fetchedSha256 !== data.publishedSha256 ? (
          <section className="card card-static aipush-main-stale" style={{ marginTop: 16, padding: "16px 20px" }}>
            <div className="aipush-main-staleTitle">Outdated audit result</div>
            <div className="aipush-main-staleSub">
              This audit result is outdated and does not apply to the currently published page.
              The page has been republished since this audit ran. Run a new audit to get current findings.
            </div>
          </section>
        ) : null}

        {/* EXECUTIVE SUMMARY + ACTION */}
        {completed && !isPass && (
          <section className="auditpro-summary">
            <div className="auditpro-header">
              <div className="auditpro-headerTitle">AI Visibility Summary</div>
              {targetUrl && (
                <div className="auditpro-headerUrl" title={targetUrl}>
                  {targetUrl.length > 60 ? targetUrl.slice(0, 60) + "..." : targetUrl}
                </div>
              )}
            </div>

            <div className="auditpro-grid">
              {/* LEFT: Big score */}
              <div className="auditpro-zone auditpro-zoneScore">
                <div className="auditpro-bigScore" style={{ color: scoreColor }} data-testid="audit-score">
                  {displayScore !== null ? displayScore : "\u2014"}
                </div>
                <div className="auditpro-bigLabel">Visibility score</div>
                <div className="auditpro-bigHint">
                  {counts.critical > 0
                    ? "Critical issues block visibility. Fix these first."
                    : "No critical blockers. Improve warnings for higher visibility."}
                </div>
                <div className="auditpro-badgeRow">
                  <span className="auditpro-badge auditpro-badge--critical">{counts.critical} critical</span>
                  <span className="auditpro-badge auditpro-badge--warning">{counts.warning} warning</span>
                  <span className="auditpro-badge auditpro-badge--info">{counts.info} info</span>
                </div>
              </div>

              {/* MIDDLE: Charts */}
              <div className="auditpro-zone auditpro-zoneCharts">
                {/* Severity Distribution */}
                <div className="auditpro-chartBlock">
                  <div className="auditpro-chartLabel">Severity Distribution</div>
                  <div className="auditpro-sevBar">
                    {counts.critical > 0 && (
                      <div
                        className="auditpro-sevSeg auditpro-sevSeg--critical"
                        style={{ width: `${(counts.critical / total) * 100}%` }}
                        title={`${counts.critical} critical`}
                      />
                    )}
                    {counts.warning > 0 && (
                      <div
                        className="auditpro-sevSeg auditpro-sevSeg--warning"
                        style={{ width: `${(counts.warning / total) * 100}%` }}
                        title={`${counts.warning} warning`}
                      />
                    )}
                    {counts.info > 0 && (
                      <div
                        className="auditpro-sevSeg auditpro-sevSeg--info"
                        style={{ width: `${(counts.info / total) * 100}%` }}
                        title={`${counts.info} info`}
                      />
                    )}
                    {findingsSorted.length === 0 && (
                      <div className="auditpro-sevSeg auditpro-sevSeg--empty" style={{ width: "100%" }} />
                    )}
                  </div>
                  <div className="auditpro-sevLegend">
                    <span className="auditpro-legendItem"><span className="auditpro-dot auditpro-dot--critical" />Critical</span>
                    <span className="auditpro-legendItem"><span className="auditpro-dot auditpro-dot--warning" />Warning</span>
                    <span className="auditpro-legendItem"><span className="auditpro-dot auditpro-dot--info" />Info</span>
                  </div>
                  <div className="auditpro-sevMeta">
                    {(() => {
                      const pC = total > 0 ? Math.round(counts.critical / total * 100) : 0;
                      const pW = total > 0 ? Math.round(counts.warning / total * 100) : 0;
                      const pI = total > 0 ? Math.round(counts.info / total * 100) : 0;
                      return (
                        <>
                          <span>Total issues: {total}</span>
                          {total > 0 && (
                            <span className="auditpro-sevMetaCounts">
                              Critical {counts.critical} ({pC}%) &middot; Warning {counts.warning} ({pW}%) &middot; Info {counts.info} ({pI}%)
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  {total > 0 && counts.critical === total && (
                    <div className="auditpro-sevHint">
                      All detected issues are Critical{total === 1 ? " (1/1)" : ""}.
                    </div>
                  )}
                </div>

                {/* Gauge Ring */}
                <div className="auditpro-chartBlock">
                  <div className="auditpro-chartLabel">Score Gauge</div>
                  <div className="auditpro-gaugeWrap">
                    <div
                      className="auditpro-gauge"
                      style={{
                        background: displayScore !== null
                          ? `conic-gradient(${scoreColor} ${displayScore * 3.6}deg, var(--surface-border) ${displayScore * 3.6}deg 360deg)`
                          : "var(--surface-border)",
                      }}
                    >
                      <div className="auditpro-gaugeInner">
                        <span className="auditpro-gaugeVal">{displayScore ?? "\u2014"}</span>
                      </div>
                    </div>
                    <div className="auditpro-gaugeLabel">{scoreLabel || "N/A"}</div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Action Plan + CTA */}
              <div className="auditpro-zone auditpro-zoneAction">
                <div className="auditpro-stepsTitle">Action Plan</div>
                <div className="auditpro-steps">
                  {actionSteps.map((step, i) => (
                    <div key={i} className="auditpro-step">
                      <span className="auditpro-stepNum">{i + 1}</span>
                      <span className="auditpro-stepText">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="auditpro-ctaCopy">
                  We build a <strong>Marketing Intelligence Profile (MIP)</strong> automatically
                  &mdash; analyzing your site, market, and competitors.
                  Based on it, we publish up to <strong>20 pages/day</strong> on a separate
                  subdomain layer linking to your Target URL.
                  No changes to your website. Fully automated. <strong>$19.99/month.</strong>
                </div>
                <div className="auditpro-ctaDisclaimer">
                  We don't guarantee rankings; we publish content structured for AI agents to read, cite, and link.
                </div>

                <a className="auditpro-ctaBtn" href="https://aipush.app/login">
                  Start publishing 20 pages/day &mdash; $19.99/mo
                </a>

                <button
                  type="button"
                  className="auditpro-secondaryBtn"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Run audit again
                </button>
              </div>
            </div>

            {/* Top blockers */}
            {topCritical.length > 0 && (
              <div className="auditpro-topBlockers">
                <div className="auditpro-topBlockersTitle">Top blockers</div>
                {topCritical.map((f, i) => (
                  <button
                    key={`topb-${i}`}
                    type="button"
                    className="auditpro-blockerRow"
                    onClick={() => document.getElementById("audit-findings")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span className="auditpro-blockerText">{f.title}</span>
                    <span className="pill pill-critical">{f.severity}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* SCORE SUMMARY — hidden, info already shown in auditpro-grid above */}
        {completed && !isPass && displayScore !== null ? (
          <details className="audit-summary auditx-summary" style={{display:"none"}}>
            <div className="audit-summary-left">
              <div className="audit-summary-label">Visibility Score</div>

              <div className="audit-summary-scoreRow">
                <div className="audit-summary-score">{displayScore}</div>
                <div
                  className={`audit-summary-pill audit-summary-pill-${
                    displayScore >= 80
                      ? "good"
                      : displayScore >= 60
                      ? "ok"
                      : displayScore >= 40
                      ? "warn"
                      : "bad"
                  }`}
                >
                  {scoreLabel}
                </div>
              </div>

              <div className="audit-summary-sub">
                {counts.critical > 0 ? (
                  <>
                    Fix <strong>Critical</strong> issues first — they block visibility the most.
                  </>
                ) : (
                  <>Score reflects overall compliance & discoverability.</>
                )}
              </div>

              <div className="auditx-summaryBadges">
                <span className="auditx-sBadge auditx-sBadge-critical">
                  Critical: <strong>{counts.critical}</strong>
                </span>
                <span className="auditx-sBadge auditx-sBadge-warning">
                  Warning: <strong>{counts.warning}</strong>
                </span>
                <span className="auditx-sBadge auditx-sBadge-info">
                  Info: <strong>{counts.info}</strong>
                </span>
              </div>
            </div>

            <div className="audit-summary-right">
              <div className="audit-summary-meta">
                <div className="audit-summary-metaKey">Job</div>
                <div className="mono">{jobId || data?.jobId}</div>
              </div>

              <div className="audit-summary-meta">
                <div className="audit-summary-metaKey">Status</div>
                <div className="audit-summary-status">
                  {String(data?.status || "").toUpperCase()}
                </div>
              </div>

              <div className="audit-summary-meta">
                <div className="audit-summary-metaKey">Completed</div>
                <div>{result?.completedAt ?? "—"}</div>
              </div>
            </div>
          </details>
        ) : null}

        {/* FINDINGS */}
        {completed && !isPass ? (
          <section className="auditx-findingsWrap" id="audit-findings" data-testid="audit-findings">
            <div className="auditx-findingsHead">
              <div>
                <div className="auditx-findingsTitle">Detailed Issues &amp; Recommendations</div>
                <div className="auditx-findingsSub">
                  Each issue blocks AI assistants from citing your business. Click to see details and fix instructions.
                </div>
              </div>

              <div
                className="auditx-filters"
                role="tablist"
                aria-label="Filter findings by severity"
              >
                <button
                  type="button"
                  className={`auditx-chip ${sev === "all" ? "auditx-chip--active" : ""}`}
                  onClick={() => setSev("all")}
                  role="tab"
                  aria-selected={sev === "all"}
                  data-testid="audit-filter-all"
                >
                  All <span className="auditx-chipCount">{findingsSorted.length}</span>
                </button>

                <button
                  type="button"
                  className={`auditx-chip auditx-chip--critical ${
                    sev === "critical" ? "auditx-chip--active" : ""
                  }`}
                  onClick={() => setSev("critical")}
                  role="tab"
                  aria-selected={sev === "critical"}
                  data-testid="audit-filter-critical"
                >
                  Critical <span className="auditx-chipCount">{counts.critical}</span>
                </button>

                <button
                  type="button"
                  className={`auditx-chip auditx-chip--warning ${
                    sev === "warning" ? "auditx-chip--active" : ""
                  }`}
                  onClick={() => setSev("warning")}
                  role="tab"
                  aria-selected={sev === "warning"}
                  data-testid="audit-filter-warning"
                >
                  Warning <span className="auditx-chipCount">{counts.warning}</span>
                </button>

                <button
                  type="button"
                  className={`auditx-chip auditx-chip--info ${
                    sev === "info" ? "auditx-chip--active" : ""
                  }`}
                  onClick={() => setSev("info")}
                  role="tab"
                  aria-selected={sev === "info"}
                  data-testid="audit-filter-info"
                >
                  Info <span className="auditx-chipCount">{counts.info}</span>
                </button>
              </div>
            </div>

            {findingsFiltered.length ? (
              <div className="auditx-grid">
                {findingsFiltered.map((f, i) => (
                  <details
                    key={`${f.title}-${i}`}
                    className={`auditx-fcard auditx-fcard--${f.severity}`}
                  >
                    <summary className="auditx-fcardTop">
                      <div className="auditx-fcardLeft">
                        <div className="auditx-fcardTitle">{f.title}</div>
                        <div className="auditx-fcardMeta">{f.category}</div>
                      </div>

                      <div className="auditx-fcardRight">
                        <span className={`pill pill-${f.severity}`}>{f.severity}</span>
                        <span className="auditx-chevron" aria-hidden="true">⌄</span>
                      </div>
                    </summary>

                    <div className="auditx-fcardBody">
                      <div className="auditx-block">
                        <div className="auditx-blockLabel">What we found</div>
                        <div className="auditx-blockText">{f.description}</div>
                      </div>

                      {f.recommendation ? (
                        <div className="auditx-block auditx-block--rec">
                          <div className="auditx-blockLabel">Recommended fix</div>
                          <div className="auditx-blockText">{f.recommendation}</div>
                        </div>
                      ) : null}
                      <div className="auditx-fcardCta">
                        <Link to="/login" className="auditx-fcardCtaBtn">Fix this automatically with AIPUSH →</Link>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="card auditx-empty">
                <div className="auditx-emptyTitle">No findings in this filter</div>
                <div className="auditx-emptySub">
                  Switch to “All” or another severity.
                </div>
              </div>
            )}

          </section>
        ) : null}

        {/* Final CTA block after findings */}
        {completed && hasFindings ? (
          <section className="audit-final-cta">
            <div className="audit-final-cta-inner">
              <div className="audit-final-cta-icon">🎯</div>
              <h2 className="audit-final-cta-title">Ready to fix these issues?</h2>
              <p className="audit-final-cta-sub">AIPUSH automatically resolves AI visibility problems by publishing 20 optimized pages daily on your domain. No code changes. No manual work.</p>
              <Link to="/login" className="audit-final-cta-btn">Start Getting Recommended — $19.99/mo</Link>
              <p className="audit-final-cta-guarantee">🔒 30-day money-back guarantee · Cancel anytime</p>
            </div>
          </section>
        ) : null}

            {completed && Array.isArray(data?.findings) && data.findings.length === 0 ? (
              <section className="aipush-auditpass" data-testid="audit-perfect">
                <div className="aipush-auditpass-inner">
                  <div className="aipush-auditpass-top">
                    <div className="aipush-auditpass-badge" aria-hidden="true">
                      <span className="aipush-auditpass-check">✓</span>
                    </div>

                    <div className="aipush-auditpass-text">
                      <div className="aipush-auditpass-title">Perfect page</div>
                      <div className="aipush-auditpass-sub">
                        Zero findings. This document is fully compliant and optimized for AI agent reading, extraction, and citation.
                      </div>
                    </div>
                  </div>

                  <div className="aipush-auditpass-meta">
                    <div className="aipush-auditpass-pill">Spec: SPEC1</div>
                    <div className="aipush-auditpass-pill">Status: PASS</div>
                    <div className="aipush-auditpass-pill">Findings: 0</div>
                  </div>
                </div>
              </section>
            ) : null}
                {/* CTA — visible only for anonymous users */}
                {ctaAuth === "anon" && (
                <div className="auditx-ctaWrap">
                  <div className="auditx-ctaCard">
                    <div className="auditx-ctaLeft">
                      <div className="auditx-ctaTitle">Activate AIPUSH and start building AI authority</div>
                      <div className="auditx-ctaSub">
                        <strong>$19.99/month.</strong> We publish up to 20 audit-gated pages/day on a separate
                        subdomain — structured for AI reading, citation, and deep links to your Target URL.
                      </div>

                      <div className="auditx-ctaBullets">
                        <span className="auditx-ctaBullet">No changes to your website</span>
                        <span className="auditx-ctaBullet">MIP → intent clusters → gap coverage</span>
                        <span className="auditx-ctaBullet">Fail-closed compliance (SPEC1)</span>
                      </div>
                    </div>

                    <div className="auditx-ctaRight">
                      <a className="auditx-ctaBtn" href="/login">
                        Sign in to Activate
                        <span className="auditx-ctaBtnIcon" aria-hidden="true">→</span>
                      </a>
                      <div className="auditx-ctaNote">Cancel anytime. Publishing pauses if inactive.</div>
                    </div>
                  </div>
                </div>
                )}
      </div>
    </main>
  );
}

const DASHBRO_PATH = import.meta.env.VITE_DASHBRO_PATH || "";

function RequireAdminAuth({ children }: { children: React.ReactElement }) {
  const [state, setState] = React.useState<"loading" | "ok" | "denied">("loading");
  React.useEffect(() => {
    if (!DASHBRO_PATH) { setState("denied"); return; }
    fetch(`/api/${DASHBRO_PATH}/ping`, { credentials: "include" })
      .then((r) => setState(r.ok ? "ok" : "denied"))
      .catch(() => setState("denied"));
  }, []);
  if (state === "loading") return null;
  if (state === "denied") { window.location.assign("/login"); return null; }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {DASHBRO_PATH && (
        <Route path={`/${DASHBRO_PATH}`} element={<RequireAdminAuth><DashBro /></RequireAdminAuth>} />
      )}
      <Route path="*" element={<ShellRoutes />} />
    </Routes>
  );
}

function ScrollToHash() {
  const location = useLocation();
  const scrollTo = React.useCallback(() => {
    const hash = window.location.hash;
    if (!hash) return false;
    const el = document.getElementById(hash.slice(1));
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; document.documentElement.scrollTo({ top }); return true; }
    return false;
  }, []);
  React.useEffect(() => {
    if (location.hash) {
      if (!scrollTo()) { const t = setTimeout(scrollTo, 350); return () => clearTimeout(t); }
    }
  }, [location.hash, location.pathname, scrollTo]);
  React.useEffect(() => {
    const handler = () => scrollTo();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, [scrollTo]);
  return null;
}

function CanonicalUpdater() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const url = "https://aipush.app" + pathname;
    const canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canon) canon.href = url;
    const og = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (og) og.content = url;
  }, [pathname]);
  return null;
}

function ShellRoutes() {
  return (
    <Shell>
      <ScrollToHash />
      <CanonicalUpdater />
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/*" element={<Navigate to="/guide" replace />} />
          <Route path="/mip" element={<MipReport />} />
          <Route path="/how-to-rank-in-chatgpt" element={<HowToRankInChatgpt />} />
          <Route path="/how-to-get-mentioned-in-chatgpt" element={<HowToGetMentionedInChatgpt />} />
          <Route path="/llm-seo" element={<LlmSeo />} />
          <Route path="/optimize-website-for-ai" element={<OptimizeWebsiteForAi />} />
          <Route path="/ai-search-optimization" element={<AiSearchOptimization />} />
          <Route path="/chatgpt-indexing" element={<ChatgptIndexing />} />
          <Route path="/how-to-appear-in-ai-answers" element={<HowToAppearInAiAnswers />} />
          <Route path="/ai-seo-consultant" element={<AiSeoConsultant />} />
          <Route path="/ai-seo-company" element={<AiSeoCompany />} />
          <Route path="/ai-seo-agency" element={<AiSeoAgency />} />
          <Route path="/ai-visibility-tracking" element={<AiVisibilityTracking />} />
          <Route path="/generative-engine-optimization" element={<GenerativeEngineOptimizationGuide />} />
          <Route path="/ai-seo-services" element={<AiSeoServices />} />
          <Route path="/ai-citation-optimization-guide" element={<AiCitationOptimizationGuide />} />
          <Route path="/answer-engine-optimization-guide" element={<AnswerEngineOptimizationGuide />} />
          <Route path="/ai-seo-vs-traditional-seo" element={<AiSeoVsTraditionalSeo />} />
          <Route path="/ai-seo-vs-traditional-seo-guide" element={<AiSeoVsTraditionalSeoGuide />} />
          <Route path="/competitor-analysis-report" element={<CompetitorAnalysisReport />} />
          <Route path="/how-chatgpt-recommends-businesses" element={<HowChatgptRecommendsBusiness />} />
          <Route path="/get-indexed-by-ai" element={<GetIndexedByAi />} />
          <Route path="/agent-api" element={<AgentApi />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Navigate to="/privacy#terms" replace />} />
          <Route path="/contact" element={<ContactRedirect />} />
          <Route path="/mcp" element={<Navigate to="/agent-api" replace />} />
          <Route path="/ads/get-my-business-on-chatgpt" element={<GetMyBusinessOnChatgpt />} />
          <Route path="/ads/ai-seo-tools-for-small-business" element={<AiSeoToolsForSmallBusiness />} />
          <Route path="/ads/rank-on-perplexity-ai-business" element={<RankOnPerplexityAiBusiness />} />
          <Route path="/ads/chatgpt-business-recommendations-automation" element={<ChatgptBusinessRecommendationsAutomation />} />
          <Route path="/ads/ai-content-pages-for-seo" element={<AiContentPagesForSeo />} />
          <Route path="/ads/automated-ai-page-generation-seo" element={<AutomatedAiPageGenerationSeo />} />
          <Route path="/ads/make-my-website-appear-in-ai-search" element={<MakeMyWebsiteAppearInAiSearch />} />
          <Route path="/ads/ai-visibility-tool-for-business-owners" element={<AiVisibilityToolForBusinessOwners />} />
          <Route path="/ads/how-to-rank-in-chatgpt" element={<HowToRankInChatgptAd />} />
          <Route path="/ads/how-to-get-mentioned-in-chatgpt" element={<HowToGetMentionedInChatgptAd />} />
          <Route path="/ads/llm-seo" element={<LlmSeoAd />} />
          <Route path="/ads/optimize-website-for-ai" element={<OptimizeWebsiteForAiAd />} />
          <Route path="/ads/ai-search-optimization" element={<AiSearchOptimizationAd />} />
          <Route path="/ads/chatgpt-indexing" element={<ChatgptIndexingAd />} />
          <Route path="/ads/how-to-appear-in-ai-answers" element={<HowToAppearInAiAnswersAd />} />
          <Route path="/ads/my-business-not-showing-in-ai-search" element={<MyBusinessNotShowingInAiSearch />} />
          <Route path="/ads/business-not-appearing-in-ai-search" element={<BusinessNotAppearingInAiSearch />} />
          <Route path="/ads/show-up-in-perplexity-ai" element={<ShowUpInPerplexityAi />} />
          <Route path="/ads/get-cited-by-ai" element={<GetCitedByAi />} />
          <Route path="/ads/ai-visibility-service" element={<AiVisibilityService />} />
          <Route path="/ads/generative-engine-optimization" element={<GenerativeEngineOptimization />} />
          <Route path="/ads/answer-engine-optimization" element={<AnswerEngineOptimization />} />
          <Route path="/ads/ai-citation-optimization" element={<AiCitationOptimization />} />
          <Route path="/ads/llm-optimization-service" element={<LlmOptimizationService />} />
          <Route path="/ads/ai-search-presence" element={<AiSearchPresence />} />
          <Route path="/ads/brand-mentions-in-ai-answers" element={<BrandMentionsInAiAnswers />} />
          <Route path="/ads/ai-answer-optimization" element={<AiAnswerOptimization />} />
          <Route path="/ads/ai-seo-vs-traditional-seo" element={<AiSeoVsTraditionalSeo />} />
          <Route path="/ads/seo-for-ai-era" element={<SeoForAiEra />} />
          <Route path="/ads/ai-first-seo-strategy" element={<AiFirstSeoStrategy />} />
          <Route path="/ads/writesonic-alternative" element={<WritesonicAlternative />} />
          <Route path="/ads/profound-alternative" element={<ProfoundAlternative />} />
          <Route path="/ads/ai-visibility-tool" element={<AiVisibilityTool />} />
          <Route path="/ads/geo-tools" element={<GeoTools />} />
          <Route path="/ads/ai-citation-tracking" element={<AiCitationTracking />} />
          <Route path="/ads/ai-seo-tools" element={<AiSeoToolsPage />} />
          <Route path="/ads/ai-seo-software" element={<AiSeoSoftware />} />
          <Route path="/ads/ai-seo-platform" element={<AiSeoPlatform />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/client"
            element={
              <RequireAuth>
                <ClientDashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
  );
}

function NotFound() {
  React.useEffect(() => {
    document.title = "Page Not Found — AIPUSH";
    const robots = document.querySelector('meta[name="robots"]');
    const prev = robots?.getAttribute("content") ?? "";
    if (robots) robots.setAttribute("content", "noindex");
    return () => { if (robots) robots.setAttribute("content", prev); };
  }, []);

  return (
    <main className="aipush-seo-page" style={{ textAlign: "center", paddingTop: 80 }}>
      <h1 className="aipush-seo-heroTitle">Page Not Found</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: 16, margin: "16px 0 32px", lineHeight: 1.6 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn hero-cta--uxfix" style={{ marginTop: 0 }}>&larr; Back to Home</Link>
        <Link to="/audit" className="pricing-grid-btn pricing-grid-btn--outline" style={{ width: "auto", display: "inline-flex", padding: "12px 24px" }}>Run Free Audit &rarr;</Link>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);