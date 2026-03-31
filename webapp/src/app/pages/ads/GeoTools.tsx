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

const SLUG = "geo-tools";
const CTA_TEXT = "Check My AI Visibility";
const FALLBACK_KW = "GEO Tools";

export function GeoTools() {
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
        "GEO tools for generative engine optimization. AIPUSH automates the entire GEO pipeline — 20 audit-verified pages daily on your domain for $19.99/mo."
      );
    trackOnce("ads_landing_view", { page_slug: SLUG, keyword });
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "noindex, nofollow");
    const prevTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "light");
    const fadeSections = document.querySelectorAll(".adlp-features, .adlp-audience, .adlp-steps, .adlp-day1, .adlp-pricing, .adlp-final");
    const fadeObs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); fadeObs.unobserve(e.target); } }); }, { threshold: 0.15 });
    fadeSections.forEach((s) => fadeObs.observe(s));
    return () => {
      if (mDesc) mDesc.setAttribute("content", prev);
      if (robotsMeta) robotsMeta.setAttribute("content", "index, follow");
      fadeObs.disconnect(); if (prevTheme) document.documentElement.setAttribute("data-theme", prevTheme); else document.documentElement.removeAttribute("data-theme");
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
            Generative Engine Optimization requires structured content at scale. AIPUSH automates the entire GEO pipeline — 20 audit-verified pages daily on your domain for $19.99/mo.
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
            <div className="adlp-features-icon">&#9881;</div>
            <p className="adlp-features-text">Fully automated GEO pipeline — no manual content work</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128737;</div>
            <p className="adlp-features-text">Every page audit-verified before going live</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128196;</div>
            <p className="adlp-features-text">Scale that manual GEO tools simply cannot match</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128200;</div>
            <p className="adlp-features-text">20 pages per day, 600+ per month, on your own domain</p>
          </div>
        </div>
      </section>

      <section className="adlp-audience">
        <h2 className="adlp-audience-title">Built for businesses serious about GEO</h2>
        <div className="adlp-audience-grid">
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>Businesses that need structured GEO content at scale</span>
          </div>
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>Teams who want GEO automated, not manually managed</span>
          </div>
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>Companies tired of GEO tools that require constant manual input</span>
          </div>
          <div className="adlp-audience-item">
            <span className="adlp-audience-check">&#10003;</span>
            <span>Anyone who wants audit-verified GEO pages on their own domain</span>
          </div>
          <div className="adlp-audience-item adlp-audience-not">
            <span className="adlp-audience-check adlp-audience-x">&#10007;</span>
            <span>&ldquo;We publish 2-3 pages per week manually&rdquo; &mdash; AI competitors publish 20 per day</span>
          </div>
          <div className="adlp-audience-item adlp-audience-not">
            <span className="adlp-audience-check adlp-audience-x">&#10007;</span>
            <span>&ldquo;GEO is too complex&rdquo; &mdash; AIPUSH automates the entire pipeline for $19.99/mo</span>
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
            <h3 className="adlp-steps-heading">We run the GEO pipeline daily</h3>
            <p className="adlp-steps-desc">
              Structured, audit-verified GEO pages appear on your domain automatically every day.
            </p>
          </div>
          <div className="adlp-steps-item">
            <span className="adlp-steps-num">3</span>
            <h3 className="adlp-steps-heading">AI assistants start recommending you</h3>
            <p className="adlp-steps-desc">
              ChatGPT, Perplexity, and Gemini surface your structured GEO pages in their answers.
            </p>
          </div>
        </div>
      </section>

      <section className="adlp-day1">
        <h2 className="adlp-day1-title">What happens after you sign up</h2>
        <div className="adlp-day1-timeline">
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Minute 1</span>
            <span className="adlp-day1-desc">Full market intelligence and GEO opportunity analysis</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Minute 5</span>
            <span className="adlp-day1-desc">DNS configured, your subdomain is live</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Hour 1</span>
            <span className="adlp-day1-desc">First 20 audit-verified GEO pages published on your domain</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Week 1</span>
            <span className="adlp-day1-desc">140 GEO pages live, AI assistants begin citing your business</span>
          </div>
          <div className="adlp-day1-item">
            <span className="adlp-day1-time">Month 1</span>
            <span className="adlp-day1-desc">600+ GEO pages published, measurable AI visibility score in your dashboard</span>
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
            <span className="adlp-pricing-old">Agencies charge $2,000+/mo for GEO</span>
          </p>
          <div className="adlp-perday-wrap" data-tooltip="Based on $19.99/mo ÷ 30 days">
            <p className="adlp-pricing-perday">Just <strong>$0.66</strong>/day</p>
          </div>
          <p className="adlp-pricing-anchor">
            That&apos;s the full automated GEO pipeline — 20 audit-verified pages daily on your domain.
          </p>
          <ul className="adlp-pricing-list">
            <li>Full market intelligence and GEO opportunity analysis</li>
            <li className="adlp-pricing-highlight">20 audit-verified GEO pages published daily on your domain</li>
            <li>Automatic SSL certificate and global delivery</li>
            <li>Every page verified for AI compliance before publishing</li>
            <li>GEO performance tracking dashboard included</li>
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
          Your competitors are already doing GEO at scale. Are you?
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
