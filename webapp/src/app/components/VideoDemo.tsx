import React, { useRef, useState, useEffect, useCallback } from "react";

const SLIDES = [
  { t: 0,    end: 8,  text: "20 fresh pages every day — on YOUR domain, not ours" },
  { t: 8,    end: 15, text: "AI builds your competitive positioning automatically" },
  { t: 15,   end: 22, text: "989 pages live — every one AI-compliance verified" },
  { t: 22,   end: 29, text: "We find gaps your competitors haven't covered" },
  { t: 29,   end: 36, text: "Track your AI visibility across ChatGPT, Perplexity & Gemini" },
  { t: 36,   end: 43, text: "100% automated — from intelligence to publishing" },
  { t: 43,   end: 50, text: "Set up in 5 minutes — we handle everything else" },
];

const CTA_THRESHOLD = 48;

export function VideoDemo(): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [captionIdx, setCaptionIdx] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [showCta, setShowCta] = useState(false);
  const [paused, setPaused] = useState(false);

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const t = v.currentTime;

    setGlobalProgress(t / v.duration);

    if (t >= CTA_THRESHOLD) {
      setShowCta(true);
      setCaptionIdx(SLIDES.length - 1);
      return;
    }
    setShowCta(false);

    let idx = 0;
    for (let i = SLIDES.length - 1; i >= 0; i--) {
      if (t >= SLIDES[i].t) { idx = i; break; }
    }
    setCaptionIdx(idx);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.addEventListener("timeupdate", onTimeUpdate);
    const startPlay = () => v.play().catch(() => {});
    if (v.readyState >= 3) startPlay();
    else v.addEventListener("canplay", startPlay, { once: true });
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("canplay", startPlay);
    };
  }, [onTimeUpdate]);

  const seekTo = (time: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = time;
    if (v.paused) { v.play().catch(() => {}); setPaused(false); }
  };

  const goPrev = () => {
    const idx = captionIdx > 0 ? captionIdx - 1 : SLIDES.length - 1;
    seekTo(SLIDES[idx].t);
  };

  const goNext = () => {
    const idx = captionIdx < SLIDES.length - 1 ? captionIdx + 1 : 0;
    seekTo(SLIDES[idx].t);
  };

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  const seekBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(ratio * v.duration);
  };

  const seekDot = (i: number) => seekTo(SLIDES[i].t);

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        src="/product-demo.mp4"
        muted
        loop
        playsInline
        preload="auto"
        poster="/product-demo-poster.webp"
        style={{ width: "100%", borderRadius: "12px", display: "block" }}
      />

      {showCta ? (
        <div className="adlp-video-cta-overlay">
          <div className="adlp-video-cta-logo">AIPUSH</div>
          <div className="adlp-video-cta-headline">Start your free AI visibility audit</div>
          <a href="/audit" className="adlp-video-cta-btn">
            Check My AI Visibility
          </a>
          <div className="adlp-video-cta-sub">No credit card &middot; 5 min setup &middot; Results in 7 days</div>
        </div>
      ) : (
        <div className="vd-controls">
          <div className="vd-bar-track" ref={barRef} onClick={seekBar}>
            <div className="vd-bar-fill" style={{ width: `${globalProgress * 100}%` }} />
          </div>

          <div className="vd-buttons">
            <button type="button" className="vd-btn" onClick={goPrev}>&#9664; Prev</button>
            <button type="button" className="vd-btn vd-btn--primary" onClick={togglePause}>
              {paused ? "\u25B6 Play" : "\u23F8 Pause"}
            </button>
            <span className="vd-counter">{captionIdx + 1} / {SLIDES.length}</span>
            <button type="button" className="vd-btn" onClick={goNext}>Next &#9654;</button>
          </div>

          <div className="vd-dots">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`vd-dot${i === captionIdx ? " vd-dot--active" : ""}`}
                onClick={() => seekDot(i)}
              />
            ))}
          </div>

          <div className="vd-caption">{SLIDES[captionIdx]?.text}</div>
        </div>
      )}
    </div>
  );
}
