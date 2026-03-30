import React from "react";
import { InlineSignup } from "../components/InlineSignup";

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

const SLUG = "how-chatgpt-recommends-businesses";
const CTA_TEXT = "Get Recommended Now";
const FALLBACK_KW = "How ChatGPT Recommends Businesses";

export function HowChatgptRecommendsBusiness() {
  const keyword = useKw(FALLBACK_KW);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    captureGclid();
    document.title = `${keyword} — AIPUSH | $19.99/mo`;
    const mDesc = document.querySelector('meta[name="description"]');
    const prev = mDesc?.getAttribute("content") ?? "";
    if (mDesc)
      mDesc.setAttribute(
        "content",
        "How does ChatGPT choose which businesses to recommend? Structured AI-readable pages on your domain. AIPUSH publishes 20 daily. $19.99/mo."
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
      <section className="adlp-hero">
        <div className="adlp-hero-inner">
          <h1 className="adlp-hero-h1">
            <span className="gradtext">{keyword}</span>
          </h1>
          <p className="adlp-hero-sub">
            AI assistants don't guess. They recommend businesses with structured, AI-readable content published on your own domain. Here's how to become one of them.
          </p>
          <InlineSignup pageSlug={SLUG} ctaText={CTA_TEXT} ctaLocation="hero" onCtaFire={() => fireCta("hero")} variant="dark" />
          <p className="adlp-hero-social">Join 1,000+ businesses already growing in AI search</p>
          <p className="adlp-hero-urgency">Free AI visibility audit &middot; No credit card &middot; Setup in 5 min</p>
        </div>
      </section>

      <div className="adlp-proof">
        <div className="adlp-proof-stat">
          <span className="adlp-proof-num">1,000+</span>
          <span className="adlp-proof-label">businesses trust AIPUSH</span>
        </div>
        <div className="adlp-proof-div" />
        <div className="adlp-proof-stat">
          <span className="adlp-proof-num">20,000</span>
          <span className="adlp-proof-label">AI pages published daily</span>
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
        <span>&#128293; 47 businesses signed up this week</span>
      </div>

      <section className="adlp-features">
        <div className="adlp-features-grid">
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#127919;</div>
            <h3 className="adlp-features-heading">Structured Content Wins</h3>
            <p className="adlp-features-text">AI engines parse structured answer pages, not marketing fluff. AIPUSH generates pages AI assistants can cite.</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128197;</div>
            <h3 className="adlp-features-heading">Freshness Signals Matter</h3>
            <p className="adlp-features-text">Daily publishing signals an active, authoritative source. 20 new pages every day on your domain.</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#128206;</div>
            <h3 className="adlp-features-heading">Citation Authority</h3>
            <p className="adlp-features-text">Pages that answer specific questions get cited as sources. Each page targets a real customer query.</p>
          </div>
          <div className="adlp-features-card">
            <div className="adlp-features-icon">&#127760;</div>
            <h3 className="adlp-features-heading">Your Domain, Your Authority</h3>
            <p className="adlp-features-text">Content on YOUR domain builds your brand trust in AI. Not a third-party blog — your subdomain.</p>
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
            <h3 className="adlp-steps-heading">AI assistants start recommending you</h3>
            <p className="adlp-steps-desc">
              ChatGPT, Perplexity, and Gemini cite your pages when users ask for recommendations.
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
        <p className="adlp-final-guarantee">Join 1,000+ businesses already visible in AI search</p>
        <InlineSignup pageSlug={SLUG} ctaText={CTA_TEXT} ctaLocation="final" onCtaFire={() => fireCta("final")} variant="light" />
      </section>

      <footer className="adlp-footer">
        <p className="adlp-footer-brand">AIPUSH</p>
        <p className="adlp-footer-legal">
          &copy; {new Date().getFullYear()} AIPUSH. All rights reserved.
        </p>
      </footer>

      <div className="adlp-sticky">
        <span className="adlp-sticky-meta">$19.99/mo &middot; No credit card</span>
        <button className="btn adlp-hero-cta" onClick={() => { fireCta("sticky"); document.getElementById("inline-signup-hero")?.scrollIntoView({ behavior: "smooth" }); }}>{CTA_TEXT}</button>
      </div>
    </div>
  );
}
