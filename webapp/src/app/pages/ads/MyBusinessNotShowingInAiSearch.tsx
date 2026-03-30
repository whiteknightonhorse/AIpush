import React from "react";
import { InlineSignup } from "../../components/InlineSignup";
import { VideoDemo } from "../../components/VideoDemo";

function useKw(fallback: string): string {
  const params = new URLSearchParams(window.location.search);
  const kw = params.get("kw");
  if (!kw) return fallback;
  const decoded = decodeURIComponent(kw).trim();
  const clean = decoded.replace(/<[^>]*>/g, "").slice(0, 80);
  return clean || fallback;
}

function captureGclid(): void {
  const params = new URLSearchParams(window.location.search);
  const gclid = params.get("gclid");
  if (gclid) sessionStorage.setItem("gclid", gclid);
  const kw = params.get("kw");
  if (kw) sessionStorage.setItem("ads_keyword", kw);
}

function trackOnce(eventName: string, params: Record<string, string | number>) {
  const key = `adlp_${eventName}`;
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...params,
      transaction_id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    });
  }
}

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const SLUG = "my-business-not-showing-in-ai-search";
const CTA_TEXT = "Check My AI Visibility";
const FALLBACK_KW = "My Business Not Showing in AI Search";

export function MyBusinessNotShowingInAiSearch() {
  const keyword = useKw(FALLBACK_KW);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    captureGclid();
    document.title = `${keyword} — AIPUSH | AI Visibility`;
    const mDesc = document.querySelector('meta[name="description"]');
    const prev = mDesc?.getAttribute("content") ?? "";
    if (mDesc)
      mDesc.setAttribute(
        "content",
        "Not showing in AI search? AIPUSH publishes 20 AI-optimized pages daily on your domain. $19.99/mo. 5-minute setup."
      );
    trackOnce("ads_landing_view", { page_slug: SLUG, keyword });
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");
const fadeSections = document.querySelectorAll(".adlp-features, .adlp-audience, .adlp-steps, .adlp-day1, .adlp-pricing, .adlp-final");
    const fadeObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); fadeObs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    fadeSections.forEach((s) => fadeObs.observe(s));
    return () => {
      fadeObs.disconnect();
      if (mDesc) mDesc.setAttribute("content", prev);
      if (robotsMeta) robotsMeta.setAttribute("content", "index, follow");
    };
  }, [keyword]);

  const fireCta = (location: string) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "ads_cta_click", {
        page_slug: SLUG,
        cta_location: location,
      });
    }
  };

  return (
    <div className="adlp-page">
      <nav className="adlp-nav">
        <a href="/" className="adlp-nav-logo">AIPUSH</a>
        <div className="adlp-nav-links">
          <a href="/guide" className="adlp-nav-link">How it works</a>
          <a href="/#pricing" className="adlp-nav-link">Pricing</a>
          <a href="/audit" className="adlp-nav-link">Free Audit</a>
          <a href="/login" className="adlp-nav-cta">Get Started</a>
        </div>
      </nav>
      <section className="adlp-hero">
        <div className="adlp-hero-inner">
          <h1 className="adlp-hero-h1">
            <span className="gradtext">{keyword}</span> — Are You Missing Out?
          </h1>
          <p className="adlp-hero-sub">
            If your business isn't showing up in AI search, you're losing customers to competitors who are. AIPUSH publishes 20 AI-optimized pages daily on your domain so AI assistants start recommending you instead.
          </p>
          <InlineSignup pageSlug={SLUG} ctaText={CTA_TEXT} ctaLocation="hero" onCtaFire={() => fireCta("hero")} variant="dark" />
          <p className="adlp-hero-social">Results in 7 days · 600 pages/mo · $0.66/day</p>
          <p className="adlp-hero-urgency">Free AI visibility audit &middot; No credit card &middot; Setup in 5 min</p>
          <a href="/guide" className="adlp-hero-demo-link">See how it works &#8594;</a>
        </div>
        <div className="adlp-hero-visual">
          <div className="adlp-mockup">
            <div className="adlp-mockup-header">AI Visibility Dashboard</div>
            <div className="adlp-mockup-score">
              <div className="adlp-mockup-gauge"><span className="adlp-mockup-gauge-num">67%</span></div>
              <div>
                <div className="adlp-mockup-gauge-label">Visibility Score</div>
                <div className="adlp-mockup-gauge-change">+55% this month</div>
              </div>
            </div>
            <div className="adlp-mockup-citations">
              <div className="adlp-mockup-cite-row"><span>ChatGPT</span><span className="adlp-mockup-cite-status adlp-mockup-cite-status--cited">Cited</span></div>
              <div className="adlp-mockup-cite-row"><span>Perplexity</span><span className="adlp-mockup-cite-status adlp-mockup-cite-status--cited">Cited</span></div>
              <div className="adlp-mockup-cite-row"><span>Gemini</span><span className="adlp-mockup-cite-status adlp-mockup-cite-status--cited">Cited</span></div>
              <div className="adlp-mockup-cite-row"><span>Claude</span><span className="adlp-mockup-cite-status adlp-mockup-cite-status--pending">3d left</span></div>
            </div>
          <button type="button" className="adlp-demo-link" onClick={() => { const m = document.getElementById("adlp-video-modal"); if (m) m.style.display = "flex"; }}>▶ Watch Full Demo</button>
          </div>
        </div>
      </section>

      <div className="adlp-proof">
        <div className="adlp-proof-stat">
          <span className="adlp-proof-num">20</span>
          <span className="adlp-proof-label">pages per day on your domain</span>
        </div>
        <div className="adlp-proof-div" />
        <div className="adlp-proof-stat">
          <span className="adlp-proof-num">24h</span>
          <span className="adlp-proof-label">to first results</span>
        </div>
        <div className="adlp-proof-div" />
        <div className="adlp-proof-stat">
          <span className="adlp-proof-num">$19.99</span>
          <span className="adlp-proof-label">per month — everything included</span>
        </div>
        <div className="adlp-proof-div" />
        <div className="adlp-proof-stat">
          <span className="adlp-proof-num">5 min</span>
          <span className="adlp-proof-label">to go live</span>
        </div>
      </div>

      <div className="adlp-ticker">
        <span>Results in 7 days · 600 pages/mo · $0.66/day</span>
      </div>

      <section className="adlp-testimonial">
        <div className="adlp-testimonial-inner">
          <p className="adlp-testimonial-quote">AIPUSH publishes 20 AI-optimized pages daily on your domain. Each page is compliance-verified, uniqueness-checked, and designed to get cited by ChatGPT, Perplexity &amp; Gemini.</p>
          <div className="adlp-testimonial-author">
            <div>
              <div className="adlp-testimonial-name">How it works</div>
              <div className="adlp-testimonial-role">Fully automated &middot; No code changes &middot; Your domain</div>
            </div>
          </div>
        </div>
      </section>

      <section className="adlp-features">
        <div className="adlp-features-grid">
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#127919;</div>
            <p className="adlp-features-text">AI assistants recommend your business</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128196;</div>
            <p className="adlp-features-text">20 pages published on your domain daily</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128737;</div>
            <p className="adlp-features-text">Every page verified before going live</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128200;</div>
            <p className="adlp-features-text">Track your AI visibility score</p>
          </div>
        </div>
      </section>

      <section className="adlp-audience">
        <h2 className="adlp-audience-title">Built for business owners, not SEO experts</h2>
        <div className="adlp-audience-grid">
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>Local businesses losing traffic to AI answers</span>
          </div>
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>E-commerce stores invisible to AI assistants</span>
          </div>
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>B2B companies not cited in AI recommendations</span>
          </div>
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>Anyone paying $2,000+/mo for SEO with no AI visibility</span>
          </div>
          <div className="adlp-audience-item adlp-audience-not">
            <span className="adlp-audience-check adlp-audience-x">&#10007;</span>
            <span>&ldquo;We don&apos;t need AI visibility&rdquo; &mdash; said no growing business in 2026</span>
          </div>
          <div className="adlp-audience-item adlp-audience-not">
            <span className="adlp-audience-check adlp-audience-x">&#10007;</span>
            <span>&ldquo;Our competitors aren&apos;t using this&rdquo; &mdash; they are, you just don&apos;t see it yet</span>
          </div>
        </div>
      </section>

      <section className="adlp-steps">
        <h2 className="adlp-steps-title">How it works</h2>
        <div className="adlp-steps-grid">
          <div className="adlp-steps-item">
            <span className="adlp-steps-num">1</span>
            <h3 className="adlp-steps-heading">Add one DNS record</h3>
            <p className="adlp-steps-desc">
              Point a subdomain to AIPUSH. Takes 5 minutes, no code changes needed.
            </p>
          </div>
          <div className="adlp-steps-item">
            <span className="adlp-steps-num">2</span>
            <h3 className="adlp-steps-heading">We publish 20 pages daily</h3>
            <p className="adlp-steps-desc">
              AI-optimized pages appear on your domain, verified for compliance before going live.
            </p>
          </div>
          <div className="adlp-steps-item">
            <span className="adlp-steps-num">3</span>
            <h3 className="adlp-steps-heading">AI search engines start recommending you</h3>
            <p className="adlp-steps-desc">
              Perplexity, Gemini, and other AI assistants cite your pages when users ask for recommendations.
            </p>
          </div>
        </div>
      </section>

      <section className="adlp-day1">
        <h2 className="adlp-day1-title">What happens after you sign up</h2>
        <div className="adlp-day1-timeline">
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Minute 1</span>
            <span className="adlp-day1-desc">Full market intelligence audit of your business</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Minute 5</span>
            <span className="adlp-day1-desc">DNS configured, your subdomain is live</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Hour 1</span>
            <span className="adlp-day1-desc">First 20 AI-optimized pages published on your domain</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Week 1</span>
            <span className="adlp-day1-desc">140 pages live, AI assistants begin citing your business</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Month 1</span>
            <span className="adlp-day1-desc">600+ pages published, measurable AI visibility score in your dashboard</span>
          </div>
        </div>
      </section>

      <section className="adlp-pricing">
        <div className="adlp-pricing-card">
          <span className="adlp-pricing-badge">Most popular</span>
          <p className="adlp-pricing-eyebrow">Everything included</p>
          <p className="adlp-pricing-amount">
            <span className="adlp-pricing-dollar">$19.99</span>
            <span className="adlp-pricing-period"> / month</span>
          </p>
          <p className="adlp-pricing-compare">
            <span className="adlp-pricing-old">Agencies charge $2,000+/mo</span>
          </p>
          <div className="adlp-perday-wrap" data-tooltip="Based on $19.99/mo ÷ 30 days">
            <p className="adlp-pricing-perday">Just <strong>$0.66</strong>/day</p>
          </div>
          <p className="adlp-pricing-anchor">
            That&apos;s less than a cup of coffee — for 20 AI pages published daily on your domain.
          </p>
          <ul className="adlp-pricing-list">
            <li>Full market intelligence analysis of your business</li>
            <li className="adlp-pricing-highlight">20 AI-optimized pages published daily on your domain</li>
            <li>Automatic SSL certificate and global delivery</li>
            <li>Every page verified for AI compliance before publishing</li>
            <li>AI visibility tracking dashboard included</li>
          </ul>
          <InlineSignup pageSlug={SLUG} ctaText={CTA_TEXT} ctaLocation="pricing" onCtaFire={() => fireCta("pricing")} variant="light" />
          <div className="adlp-pricing-guarantee-box">
            <span className="adlp-pricing-shield">&#128737;</span>
            <span>Cancel anytime. No contract. No setup fees. No risk.</span>
          </div>
          <p className="adlp-guarantee-badge">&#128274; 30-day money-back guarantee</p>
        </div>
      </section>

      <section className="adlp-final">
        <h2 className="adlp-final-title">
          Your competitors are already visible in AI search. Are you?
        </h2>
        <p className="adlp-final-sub">
          No credit card to start. Cancel with one click. Setup takes 5 minutes.
        </p>
        <p className="adlp-final-guarantee">Start your free AI visibility audit — results in 24 hours</p>
        <InlineSignup pageSlug={SLUG} ctaText={CTA_TEXT} ctaLocation="final" onCtaFire={() => fireCta("final")} variant="light" />
      </section>

      <footer className="adlp-footer">
        <p className="adlp-footer-brand">AIPUSH</p>
        <p className="adlp-footer-legal">
          &copy; {new Date().getFullYear()} AIPUSH. All rights reserved.
        </p>
      </footer>

      <div id="adlp-video-modal" className="adlp-video-overlay" style={{display:"none"}} onClick={(e) => { if ((e.target as HTMLElement).classList.contains("adlp-video-overlay")) { (e.target as HTMLElement).style.display = "none"; const v = (e.target as HTMLElement).querySelector("video"); if (v) (v as HTMLVideoElement).pause(); } }}>
        <div className="adlp-video-modal-inner">
          <button type="button" className="adlp-video-close" onClick={() => { const m = document.getElementById("adlp-video-modal"); if (m) { m.style.display = "none"; const v = m.querySelector("video"); if (v) (v as HTMLVideoElement).pause(); } }}>&times;</button>
          <VideoDemo />
        </div>
      </div>
      <div className="adlp-sticky">
        <span className="adlp-sticky-meta">Free AI Visibility Check &middot; No signup</span>
        <button className="btn adlp-hero-cta" onClick={() => { fireCta("sticky"); window.location.href = "/audit"; }}>{CTA_TEXT}</button>
      </div>
    </div>
  );
}
