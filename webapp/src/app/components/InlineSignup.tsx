import React from "react";
import { useNavigate } from "react-router-dom";
import "./inlineSignup.css";

// Marketing-page CTA. Post-pivot this drives the FREE AEO analyzer instead of
// the old OTP login: the visitor enters their website URL and is taken to
// /analyzer?url=… which auto-runs the scan. The email lead is captured later,
// at the analyzer's results gate. The Google Ads conversion event still fires
// on submit so campaign tracking is unchanged.

interface InlineSignupProps {
  pageSlug: string;
  ctaText: string;
  ctaLocation: string;
  onCtaFire: () => void;
  variant?: "dark" | "light" | "theme";
}

// Accepts bare domains or full URLs.
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

function getTrustText(loc: string): string {
  if (loc === "pricing") return "Free · No account · Instant results";
  if (loc === "final") return "Free · No credit card · Copy-ready fixes for your AI agent";
  return "Free · No account needed · Results in seconds";
}

export function InlineSignup({
  pageSlug,
  ctaText,
  ctaLocation,
  onCtaFire,
  variant = "dark",
}: InlineSignupProps) {
  const nav = useNavigate();
  const [site, setSite] = React.useState("");
  const [error, setError] = React.useState("");
  const [inputError, setInputError] = React.useState(false);
  const siteRef = React.useRef("");
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (val: string) => {
    setSite(val);
    siteRef.current = val;
    if (inputError) {
      setInputError(false);
      setError("");
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const go = () => {
    const trimmed = siteRef.current.trim();
    if (!trimmed) {
      setInputError(true);
      setError("Enter your website to start");
      timerRef.current = setTimeout(() => {
        setInputError(false);
        setError("");
      }, 5000);
      return;
    }
    if (!URL_RE.test(trimmed)) {
      setInputError(true);
      setError("Please enter a valid website address");
      timerRef.current = setTimeout(() => {
        setInputError(false);
        setError("");
      }, 5000);
      return;
    }

    setError("");
    setInputError(false);
    onCtaFire();

    // Google Ads conversion: analysis started (lead intent).
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-18018973770/iAAhCJ66tIkcEMrwjpBD",
      });
    }

    nav(`/analyzer?url=${encodeURIComponent(trimmed)}`);
  };

  const wrapClass = `isf-wrap isf-${variant}`;
  const trustText = getTrustText(ctaLocation);

  return (
    <div
      className={wrapClass}
      id={ctaLocation === "hero" ? "inline-signup-hero" : undefined}
      data-slug={pageSlug}
    >
      <form
        className="isf-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <div className="isf-row">
          <input
            type="text"
            inputMode="url"
            className={`isf-input${inputError ? " isf-error" : ""}`}
            value={site}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="yourwebsite.com"
            autoComplete="url"
          />
          <button
            className={`btn isf-btn${site.trim() ? " isf-btn--active" : ""}`}
            type="submit"
          >
            {ctaText}
          </button>
        </div>
        {error.length > 0 && <p className="isf-error">{error}</p>}
        <p className="isf-trust">{trustText}</p>
      </form>
    </div>
  );
}
