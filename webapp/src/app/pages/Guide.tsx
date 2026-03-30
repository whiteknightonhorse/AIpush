import React from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  AIPUSH Product Guide — public page                                */
/*  UI/content only. No business logic, no API calls, no auth.        */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "audit", label: "1. Audit" },
  { id: "signup", label: "2. Sign Up" },
  { id: "company", label: "3. Create Company" },
  { id: "terms", label: "4. Accept Terms" },
  { id: "payment", label: "5. Payment" },
  { id: "mip", label: "6. Intelligence Profile" },
  { id: "generation", label: "7. Daily Pages" },
  { id: "dashboard", label: "8. Dashboard" },
  { id: "security", label: "9. Security & 2FA" },
  { id: "target-url", label: "10. Target URL" },
  { id: "visibility", label: "11. AI Visibility" },
] as const;

export function Guide() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "How It Works — AIPUSH";
    /* Dynamic meta for this page only */
    const mDesc = document.querySelector('meta[name="description"]');
    const mKeys = document.querySelector('meta[name="keywords"]');
    const prevDesc = mDesc?.getAttribute("content") ?? "";
    const prevKeys = mKeys?.getAttribute("content") ?? "";

    if (mDesc) mDesc.setAttribute("content", "Step-by-step guide to AIPUSH: how to set up your AI-optimized pages, connect your domain, manage payments, and grow traffic from ChatGPT and AI search engines.");
    if (mKeys) mKeys.setAttribute("content", "AIPUSH guide, how it works, AI traffic, AI pages, setup guide, crypto payments, domain verification, AI SEO");

    return () => {
      if (mDesc) mDesc.setAttribute("content", prevDesc);
      if (mKeys) mKeys.setAttribute("content", prevKeys);
    };
  }, []);

  return (
    <main className="aipush-guide">
      {/* ---- Hero ---- */}
      <section className="aipush-guide-hero">
        <h1 className="aipush-guide-heroTitle">How AIPUSH Works</h1>
        <p className="aipush-guide-heroSub">
          From first visit to 20 AI-optimized pages per day — a complete walkthrough.
        </p>
      </section>

      {/* ---- Mini-nav ---- */}
      <nav className="aipush-guide-nav" aria-label="Guide sections">
        {SECTIONS.map((s) => (
          <a key={s.id} className="aipush-guide-navLink" href={`#${s.id}`} onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(s.id);
            if (el) {
              const target = el.getBoundingClientRect().top + window.scrollY - 80;
              const start = document.documentElement.scrollTop;
              const distance = target - start;
              const startTime = performance.now();
              const duration = 400;
              const step = (t: number) => {
                const p = Math.min((t - startTime) / duration, 1);
                const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
                document.documentElement.scrollTop = start + distance * ease;
                if (p < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            }
            window.history.replaceState(null, "", `#${s.id}`);
          }}>
            {s.label}
          </a>
        ))}
      </nav>

      {/* ---- Summary card ---- */}
      <section className="aipush-guide-summary" id="overview">
        <h2 className="aipush-guide-summaryTitle">Quick Overview</h2>
        <ol className="aipush-guide-summaryList">
          <li><strong>Run a free audit</strong> to see how your site performs with AI assistants.</li>
          <li><strong>Create an account</strong> with just your email — no password needed.</li>
          <li><strong>Set up your company</strong> by entering your domain, target URL, and verifying DNS.</li>
          <li><strong>Accept the Terms of Service</strong> and launch your campaign.</li>
          <li><strong>Pay $19.99/month</strong> with USDT or USDC on Ethereum — subscription activates automatically after 3 block confirmations.</li>
          <li><strong>AIPUSH builds your Marketing Intelligence Profile</strong> — analyzes your business, competitors, and market gaps automatically.</li>
          <li><strong>20 AI-optimized pages are generated daily</strong> on your verified subdomain with automatic SSL and global CDN delivery.</li>
          <li><strong>Monitor everything from your dashboard</strong> — pipeline status, published pages, AI coverage, semantic coverage, and activity log.</li>
          <li><strong>Secure your account with 2FA</strong> (TOTP) for extra protection.</li>
          <li><strong>Update your target URL</strong> once every 30 days if your business needs change.</li>
          <li><strong>Run an AI Visibility Check</strong> to see if ChatGPT, Perplexity, and other AI assistants already mention your brand.</li>
        </ol>
      </section>

      {/* ---- Steps ---- */}
      <div className="aipush-guide-steps">

        {/* Step 1 — Audit */}
        <article className="aipush-guide-step" id="audit">
          <div className="aipush-guide-stepBadge">1</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Run a Free Audit</h2>
            <p className="aipush-guide-stepText">
              Before signing up, you can test how your website performs with AI assistants.
              Enter any URL on the <Link to="/audit" className="aipush-guide-link">Audit page</Link> and
              AIPUSH will analyze your site against a set of quality rules — covering structure,
              readability, metadata, and AI-friendliness.
            </p>
            <p className="aipush-guide-stepText">
              You will receive a score from 0 to 100 along with specific findings and recommendations.
              The audit is completely free and does not require an account.
            </p>
            <div className="aipush-guide-tip">
              <strong>Tip:</strong> Share the audit results link with your team — the URL is bookmarkable.
            </div>
          </div>
        </article>

        {/* Step 2 — Sign up */}
        <article className="aipush-guide-step" id="signup">
          <div className="aipush-guide-stepBadge">2</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Create Your Account</h2>
            <p className="aipush-guide-stepText">
              AIPUSH uses passwordless authentication. On the{" "}
              <Link to="/login" className="aipush-guide-link">Login page</Link>, enter your email
              address and you will receive a one-time code. Enter the code to access your account.
            </p>
            <p className="aipush-guide-stepText">
              No password to remember, no social logins. Your session stays active for 7 days
              before you need to log in again.
            </p>
          </div>
        </article>

        {/* Step 3 — Company creation */}
        <article className="aipush-guide-step" id="company">
          <div className="aipush-guide-stepBadge">3</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Set Up Your Company</h2>
            <p className="aipush-guide-stepText">
              After logging in, the Dashboard guides you through three setup steps:
            </p>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">Step A — Website Domain</h3>
              <p className="aipush-guide-stepText">
                Enter the domain you own (e.g., <code className="aipush-guide-code">yourcompany.com</code>).
                The system validates the format and checks that it is a real domain.
              </p>
            </div>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">Step B — Target URL</h3>
              <p className="aipush-guide-stepText">
                Specify the exact page where you want visitors to land (e.g.,{" "}
                <code className="aipush-guide-code">https://yourcompany.com/contact</code>).
                This is the single link that will appear on all your generated pages.
                It must be on the same domain as your website.
              </p>
            </div>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">Step C — DNS Verification</h3>
              <p className="aipush-guide-stepText">
                Add a CNAME record at your DNS provider to verify domain ownership:
              </p>
              <div className="aipush-guide-dns">
                <div className="aipush-guide-dnsRow">
                  <span className="aipush-guide-dnsLabel">Type</span>
                  <span className="aipush-guide-dnsValue">CNAME</span>
                </div>
                <div className="aipush-guide-dnsRow">
                  <span className="aipush-guide-dnsLabel">Name</span>
                  <span className="aipush-guide-dnsValue">reference</span>
                </div>
                <div className="aipush-guide-dnsRow">
                  <span className="aipush-guide-dnsLabel">Target</span>
                  <span className="aipush-guide-dnsValue">cname.aipush.app</span>
                </div>
              </div>
              <p className="aipush-guide-stepText">
                Click <strong>Verify DNS</strong> to check. The system also auto-checks every
                15 seconds for up to 10 minutes. DNS propagation usually takes a few minutes but
                can take up to 48 hours depending on your provider.
              </p>
            </div>
          </div>
        </article>

        {/* Step 4 — Terms */}
        <article className="aipush-guide-step" id="terms">
          <div className="aipush-guide-stepBadge">4</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Accept Terms of Service</h2>
            <p className="aipush-guide-stepText">
              Before launching, you must accept the AIPUSH Terms of Service. The full text is
              displayed inline — covering acceptable use, your responsibilities, no-warranties
              disclaimer, liability limitations, and required service emails.
            </p>
            <p className="aipush-guide-stepText">
              Once all three steps are green and the Terms checkbox is checked, the{" "}
              <strong>Launch campaign</strong> button becomes active.
            </p>
          </div>
        </article>

        {/* Step 5 — Payment */}
        <article className="aipush-guide-step" id="payment">
          <div className="aipush-guide-stepBadge">5</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Pay $19.99/Month with Crypto</h2>
            <p className="aipush-guide-stepText">
              AIPUSH accepts payments in <strong>USDT</strong> or <strong>USDC</strong> on the
              Ethereum mainnet. No credit card required. After launching your campaign, open the
              payment panel from your Client Dashboard.
            </p>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">Payment Options</h3>
              <ul className="aipush-guide-list">
                <li><strong>Monthly:</strong> $19.99 — 30 days of service</li>
                <li><strong>Yearly:</strong> $232.68 — 365 days (3% discount)</li>
                <li><strong>Custom top-up:</strong> Any amount from $19.99 to $2,000 — days are calculated proportionally</li>
              </ul>
            </div>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">How Payment Works</h3>
              <ol className="aipush-guide-list aipush-guide-list--ordered">
                <li>Select your token (USDT or USDC) and payment amount.</li>
                <li>Click <strong>Generate new invoice</strong> — you receive a unique Ethereum deposit address and a QR code.</li>
                <li>Send the exact amount from any Ethereum wallet (MetaMask, Coinbase, Trust Wallet, etc.).</li>
                <li>The system detects your transfer on-chain automatically.</li>
                <li>After 3 block confirmations (~1 minute), your subscription activates and page generation begins.</li>
              </ol>
            </div>

            <div className="aipush-guide-tip">
              <strong>Note:</strong> Each invoice is valid for 24 hours. If it expires, generate a new one — no penalty.
              The system accepts a tolerance of ±$5 to account for minor rounding or gas differences.
            </div>
          </div>
        </article>

        {/* Step 6 — MIP */}
        <article className="aipush-guide-step" id="mip">
          <div className="aipush-guide-stepBadge">6</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Marketing Intelligence Profile (MIP)</h2>
            <p className="aipush-guide-stepText">
              Immediately after your first payment, AIPUSH automatically builds a{" "}
              <strong>Marketing Intelligence Profile</strong> for your business.
              The system crawls your website, analyzes your competitors, identifies market gaps,
              and maps which topics give you the best chance of being recommended by AI assistants.
            </p>
            <p className="aipush-guide-stepText">
              You can track MIP progress in your dashboard. The status will show as{" "}
              <strong>Building</strong> and then switch to <strong>Ready</strong> once complete.
              This typically takes a few minutes. No action needed on your part.
            </p>
            <p className="aipush-guide-stepText">
              Once the MIP is ready, daily page generation begins automatically.
              If you later change your target URL, the MIP rebuilds itself to match the new destination.
            </p>
            <div className="aipush-guide-tip">
              <strong>Good to know:</strong> MIP includes an automated compliance check.
              If your content falls into a restricted category, you will see a clear explanation
              in your dashboard and generation will not start until the issue is resolved.
            </div>
          </div>
        </article>

        {/* Step 7 — Daily generation */}
        <article className="aipush-guide-step" id="generation">
          <div className="aipush-guide-stepBadge">7</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">20 Pages Generated Daily</h2>
            <p className="aipush-guide-stepText">
              Once your MIP is ready and your subscription is active, the system generates
              up to <strong>20 AI-optimized pages every day</strong> — automatically published
              to your verified subdomain.
            </p>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">What Each Page Contains</h3>
              <ul className="aipush-guide-list">
                <li>Clear headline optimized for AI readability</li>
                <li>Direct answer section for AI assistants</li>
                <li>Decision criteria and comparisons</li>
                <li>Pricing context (when relevant)</li>
                <li>FAQ section with structured data</li>
                <li>Call-to-action linking to your target URL</li>
              </ul>
            </div>

            <p className="aipush-guide-stepText">
              Every page passes through an automated quality audit before publication.
              Pages that do not meet quality standards are regenerated — only content that passes
              all compliance and quality checks goes live.
            </p>
            <p className="aipush-guide-stepText">
              Published pages appear at URLs like{" "}
              <code className="aipush-guide-code">https://reference.yourcompany.com/page-title</code>.
              AIPUSH automatically generates and serves your{" "}
              <code className="aipush-guide-code">robots.txt</code>,{" "}
              <code className="aipush-guide-code">sitemap.xml</code>, and{" "}
              <code className="aipush-guide-code">ai.txt</code>{" "}
              files so AI crawlers and search engines can discover your pages immediately.
              SSL certificates and global CDN delivery are included at no extra cost.
            </p>
          </div>
        </article>

        {/* Step 8 — Dashboard */}
        <article className="aipush-guide-step" id="dashboard">
          <div className="aipush-guide-stepBadge">8</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Your Dashboard</h2>
            <p className="aipush-guide-stepText">
              The Client Dashboard is your control center. Here is what you can monitor and manage:
            </p>

            <div className="aipush-guide-grid">
              <div className="aipush-guide-gridItem">
                <h3 className="aipush-guide-gridTitle">Pipeline Status</h3>
                <p className="aipush-guide-gridText">
                  Real-time indicators for billing, MIP, generation, audit, and publication — all in one view.
                </p>
              </div>
              <div className="aipush-guide-gridItem">
                <h3 className="aipush-guide-gridTitle">Subscription &amp; Payments</h3>
                <p className="aipush-guide-gridText">
                  Current status, expiration date, payment history, and option to extend or top up.
                </p>
              </div>
              <div className="aipush-guide-gridItem">
                <h3 className="aipush-guide-gridTitle">Published Pages</h3>
                <p className="aipush-guide-gridText">
                  Browse all live pages with direct links. Filter by date. See canonical URLs and publication history.
                </p>
              </div>
              <div className="aipush-guide-gridItem">
                <h3 className="aipush-guide-gridTitle">AI Coverage &amp; Indexability</h3>
                <p className="aipush-guide-gridText">
                  See how many of your pages are indexed by AI assistants and what percentage of your target topics are covered.
                </p>
              </div>
              <div className="aipush-guide-gridItem">
                <h3 className="aipush-guide-gridTitle">Semantic Coverage</h3>
                <p className="aipush-guide-gridText">
                  Topic-by-topic breakdown across four buyer intents (buy, compare, learn, decide) with coverage percentages.
                </p>
              </div>
              <div className="aipush-guide-gridItem">
                <h3 className="aipush-guide-gridTitle">Activity Log</h3>
                <p className="aipush-guide-gridText">
                  Timestamped events — payment confirmations, MIP progress, page publications, and system notifications.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Step 9 — 2FA */}
        <article className="aipush-guide-step" id="security">
          <div className="aipush-guide-stepBadge">9</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Security &amp; Two-Factor Authentication</h2>
            <p className="aipush-guide-stepText">
              AIPUSH supports <strong>TOTP-based two-factor authentication</strong> for an extra
              layer of account protection. You can enable it from the Security section of your
              Client Dashboard.
            </p>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">How to Enable 2FA</h3>
              <ol className="aipush-guide-list aipush-guide-list--ordered">
                <li>Go to the <strong>Two-Factor Authentication</strong> section in your dashboard.</li>
                <li>Click <strong>Enable 2FA</strong> — a QR code and a secret key will appear.</li>
                <li>Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.).</li>
                <li>Enter the 6-digit code from the app to confirm setup.</li>
              </ol>
            </div>

            <p className="aipush-guide-stepText">
              Once enabled, you will need to enter a 6-digit TOTP code every time you log in,
              in addition to the email OTP. This protects your account even if your email is compromised.
            </p>
            <div className="aipush-guide-tip">
              <strong>Important:</strong> Save your recovery codes in a safe place. If you lose
              access to your authenticator app, you will need them to regain access to your account.
            </div>
          </div>
        </article>

        {/* Step 10 — Target URL change */}
        <article className="aipush-guide-step" id="target-url">
          <div className="aipush-guide-stepBadge">10</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">Changing Your Target URL</h2>
            <p className="aipush-guide-stepText">
              Your target URL is the single link that appears on every generated page. If your
              business needs change — for example, you launch a new landing page — you can update
              it from the <strong>Target URL</strong> section in your dashboard.
            </p>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">Rules</h3>
              <ul className="aipush-guide-list">
                <li>The new URL must be on the <strong>same domain</strong> as your website.</li>
                <li>After a change, the target URL is <strong>locked for 30 days</strong>.</li>
                <li>Your dashboard shows the exact date when the next change is available.</li>
              </ul>
            </div>

            <p className="aipush-guide-stepText">
              When you update your target URL, the system automatically rebuilds your
              Marketing Intelligence Profile to reflect the new destination. New pages
              generated after the rebuild will link to the updated URL.
            </p>
          </div>
        </article>

        {/* Step 11 — AI Visibility Check */}
        <article className="aipush-guide-step" id="visibility">
          <div className="aipush-guide-stepBadge">11</div>
          <div className="aipush-guide-stepBody">
            <h2 className="aipush-guide-stepTitle">AI Visibility Check</h2>
            <p className="aipush-guide-stepText">
              Once your subscription is active, you can run an{" "}
              <strong>AI Visibility Check</strong> from your Client Dashboard.
              The system sends 5 structured prompts to an AI model and checks
              whether AI assistants like ChatGPT and Perplexity mention your brand, your website, or your published pages.
            </p>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">What It Checks</h3>
              <ul className="aipush-guide-list">
                <li><strong>Brand Awareness</strong> — Does the AI know your brand?</li>
                <li><strong>Page Recognition</strong> — Does the AI reference pages from your domain?</li>
                <li><strong>Topical Association</strong> — Does the AI associate your URL with its topics?</li>
                <li><strong>Competitive Context</strong> — Does your URL appear alongside competitors?</li>
                <li><strong>Knowledge Consistency</strong> — Does the AI give consistent info about your brand?</li>
              </ul>
            </div>

            <div className="aipush-guide-substep">
              <h3 className="aipush-guide-substepTitle">How It Works</h3>
              <ol className="aipush-guide-list aipush-guide-list--ordered">
                <li>Click <strong>Run AI Visibility Check</strong> in your dashboard.</li>
                <li>The system queries the AI model with 5 prompts (takes up to a minute).</li>
                <li>Results appear as cards showing detected/not detected status, confidence level, and referenced pages.</li>
                <li>If you have a previous run, a diff shows what changed since last time.</li>
              </ol>
            </div>

            <p className="aipush-guide-stepText">
              The check is available <strong>once every 24 hours</strong>. Your dashboard shows
              when the next check becomes available. This is not an SEO metric — it measures
              whether AI assistants are aware of your brand at a specific moment in time.
            </p>
          </div>
        </article>

      </div>

      {/* ---- CTA ---- */}
      <section className="aipush-guide-cta">
        <h2 className="aipush-guide-ctaTitle">Ready to get started?</h2>
        <p className="aipush-guide-ctaText">
          Run a free audit or create your account — it takes less than 5 minutes.
        </p>
        <div className="aipush-guide-ctaActions">
          <Link to="/audit" className="aipush-guide-ctaBtn aipush-guide-ctaBtn--primary">
            Run Free Audit
          </Link>
          <Link to="/login" className="aipush-guide-ctaBtn aipush-guide-ctaBtn--secondary">
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  );
}
