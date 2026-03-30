import React from "react";
import { useNavigate } from "react-router-dom";
import "./inlineSignup.css";

interface InlineSignupProps {
  pageSlug: string;
  ctaText: string;
  ctaLocation: string;
  onCtaFire: () => void;
  variant?: "dark" | "light" | "theme";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTrustText(loc: string): string {
  if (loc === "pricing") return "Cancel anytime \u00b7 No lock-in \u00b7 Start free";
  if (loc === "final") return "No credit card required \u00b7 Cancel anytime \u00b7 Results in 24h";
  return "No credit card \u00b7 No password \u00b7 60-second signup";
}

export function InlineSignup({
  pageSlug,
  ctaText,
  ctaLocation,
  onCtaFire,
  variant = "dark",
}: InlineSignupProps) {
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [step, setStep] = React.useState<"email" | "code" | "sent">("email");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [inputError, setInputError] = React.useState(false);

  const emailRef = React.useRef("");
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    emailRef.current = val;
    if (inputError) {
      setInputError(false);
      setError("");
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    }
  };

  const send = async () => {
    const trimmed = emailRef.current.trim();

    if (!trimmed) {
      setInputError(true);
      setError("Enter your email to get started");
      timerRef.current = setTimeout(() => { setInputError(false); setError(""); }, 5000);
      return;
    }

    if (!EMAIL_RE.test(trimmed)) {
      setInputError(true);
      setError("Please enter a valid email address");
      timerRef.current = setTimeout(() => { setInputError(false); setError(""); }, 5000);
      return;
    }

    setError("");
    setInputError(false);
    setLoading(true);
    onCtaFire();
    try {
      const r = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: trimmed }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => null);
        throw new Error(j?.error || "Failed to send code");
      }
      setStep("sent");
      setTimeout(() => setStep("code"), 1500);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to send code";
      setInputError(true);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setError("");
    setInputError(false);
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
      const me = await fetch("/api/auth/me", { credentials: "include" }).then(
        (res) => res.json(),
      );
      if (me?.client_id) nav("/client");
      else nav("/dashboard");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid code";
      setInputError(true);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const wrapClass = `isf-wrap isf-${variant}`;
  const trustText = getTrustText(ctaLocation);

  return (
    <div
      className={wrapClass}
      id={ctaLocation === "hero" ? "inline-signup-hero" : undefined}
      data-slug={pageSlug}
    >
      {step === "email" ? (
        <form
          className="isf-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) send();
          }}
        >
          <div className="isf-row">
            <input
              type="email"
              className={`isf-input${inputError ? " isf-error" : ""}`}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={loading}
            />
            <button
              className={`btn isf-btn${email.trim() ? " isf-btn--active" : ""}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : ctaText}
            </button>
          </div>
          {error.length > 0 && <p className="isf-error">{error}</p>}
          <p className="isf-trust">{trustText}</p>
        </form>
      ) : step === "sent" ? (
        <p className="isf-success">Check your email for the login code</p>
      ) : (
        <form
          className="isf-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim() && !loading) verify();
          }}
        >
          <p className="isf-code-msg">
            Code sent to <strong>{email}</strong>
          </p>
          <div className="isf-row">
            <input
              className="isf-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              disabled={loading}
            />
            <button
              className={`btn isf-btn${code.trim() ? " isf-btn--active" : ""}`}
              type="submit"
              disabled={loading || !code.trim()}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </div>
          {error.length > 0 && <p className="isf-error">{error}</p>}
          <div className="isf-code-actions">
            <button
              type="button"
              className="isf-link"
              onClick={() => {
                setStep("email");
                setCode("");
                setError("");
                setInputError(false);
              }}
            >
              Back
            </button>
            <button
              type="button"
              className="isf-link"
              disabled={loading}
              onClick={() => send()}
            >
              Resend code
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
