import React from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "controller", label: "Who We Are" },
  { id: "collect", label: "Data We Collect" },
  { id: "use", label: "How We Use Data" },
  { id: "legal-bases", label: "Legal Bases" },
  { id: "cookies", label: "Cookies & Analytics" },
  { id: "sharing", label: "Sharing" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your Rights" },
  { id: "email", label: "Email & Unsubscribe" },
  { id: "transfers", label: "International Transfers" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
  { id: "terms", label: "Terms of Service" },
];

export function Privacy() {
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    document.title = "Privacy Policy & Terms — AIPUSH";
    const mDesc = document.querySelector('meta[name="description"]');
    const prev = mDesc?.getAttribute("content") ?? "";
    if (mDesc)
      mDesc.setAttribute(
        "content",
        "AIPUSH Privacy Policy & Terms of Service — how our free AEO analyzer collects, uses, and protects your data, and the terms for using the service."
      );
    return () => {
      if (mDesc) mDesc.setAttribute("content", prev);
    };
  }, []);

  return (
    <main className="aipush-seo-page">
      <section className="aipush-seo-hero">
        <h1 className="aipush-seo-heroTitle">Privacy Policy &amp; Terms</h1>
        <p className="aipush-seo-heroSub">
          How AIPUSH collects, uses, and protects your information — and the terms for using our free AEO analyzer.
        </p>
      </section>

      <div className="aipush-privacy-meta">
        <p>Effective Date: June 6, 2026</p>
        <p>Last Updated: June 6, 2026</p>
      </div>

      <nav className="aipush-privacy-nav" aria-label="Policy sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="aipush-privacy-navLink">
            {s.label}
          </a>
        ))}
      </nav>

      <article className="aipush-seo-content aipush-privacy">
        <h2 id="overview">1. Overview</h2>
        <p>
          AIPUSH operates <strong>aipush.app</strong>, a free Answer Engine Optimization (AEO) analyzer.
          You enter a website URL and we scan its public resources to measure how ready it is for AI agents
          and answer engines, returning a 0–100 score and concrete fixes. We also publish daily analysis
          articles at <strong>/analysis</strong>. This policy explains what data we collect, why, and your rights.
          It applies to everyone who uses aipush.app. We follow a privacy-by-default, data-minimization approach.
        </p>

        <h2 id="controller">2. Who We Are &amp; Contact</h2>
        <p>
          AIPUSH is the data controller for personal data processed through aipush.app. For any privacy
          request — access, correction, deletion, or questions — contact us at{" "}
          <a href="mailto:support@aipush.app">support@aipush.app</a>. We respond to verified requests within 30 days.
        </p>

        <h2 id="collect">3. Information We Collect</h2>
        <p>We collect only what the service needs to function:</p>
        <ul>
          <li>
            <strong>URLs you analyze.</strong> The website address you submit to the analyzer, the scan result,
            and the requester IP address (for rate-limiting and abuse prevention). We do not require an account to scan.
          </li>
          <li>
            <strong>Email address (only if you choose to subscribe).</strong> To unlock the full report or receive
            updates, you may submit your email with explicit consent. We record your email, the exact consent text and
            version you agreed to, and the IP address and browser user-agent at sign-up and at confirmation — this is
            our proof of consent for a double opt-in.
          </li>
          <li>
            <strong>Technical &amp; usage data.</strong> Standard server logs, your light/dark theme preference,
            and analytics events (see Cookies &amp; Analytics).
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell personal data, and we do not collect special-category (sensitive) data.
          The websites we analyze are scanned via their <em>public</em> resources only (homepage, robots.txt,
          sitemaps, and <code>/.well-known/*</code>); we do not log in to, modify, or alter any analyzed site.
        </p>

        <h2 id="use">4. How We Use Information</h2>
        <ul>
          <li>Run the analyzer and return your AEO score, breakdown, and fixes.</li>
          <li>With your consent: send the double opt-in confirmation, deliver the full report, and send occasional product updates.</li>
          <li>Prevent abuse, rate-limit, debug, and keep the service secure and reliable.</li>
          <li>Measure aggregate usage to improve the product.</li>
        </ul>

        <h2 id="legal-bases">5. Legal Bases for Processing (GDPR)</h2>
        <ul>
          <li><strong>Consent</strong> — email subscription, marketing email, and non-essential analytics/advertising cookies.</li>
          <li><strong>Legitimate interests</strong> — running a scan you requested, securing the service, and preventing abuse.</li>
          <li><strong>Legal obligation</strong> — retaining consent records where required.</li>
        </ul>

        <h2 id="cookies">6. Cookies &amp; Analytics</h2>
        <p>We keep cookies minimal:</p>
        <ul>
          <li><strong>Essential:</strong> a confirmed-access cookie (<code>aeo_access</code>) that unlocks the full report after you confirm your email; your theme preference is stored locally in your browser.</li>
          <li><strong>Analytics &amp; advertising (consent-based):</strong> Google Analytics 4 and Google Ads, and Microsoft Clarity, to understand usage. We use Google Consent Mode v2 — in the EU/EEA/UK these are <strong>denied by default</strong> until you consent. Analysis article pages also embed YouTube videos via the privacy-enhanced <code>youtube-nocookie.com</code> domain.</li>
        </ul>
        <p>You can control cookies through your browser and any on-site consent control.</p>

        <h2 id="sharing">7. Sharing of Information (Processors)</h2>
        <p>We share data only with service providers that help us operate, under data-processing terms:</p>
        <ul>
          <li><strong>Resend</strong> — sending confirmation and update emails.</li>
          <li><strong>Google</strong> (Analytics, Ads) and <strong>Microsoft</strong> (Clarity) — analytics, subject to your consent.</li>
          <li><strong>YouTube/Google</strong> — embedded videos on analysis pages (loaded only when you click play).</li>
          <li>Infrastructure/hosting providers that run our servers.</li>
        </ul>
        <p>We may disclose data if required by law. We never sell your data.</p>

        <h2 id="retention">8. Data Retention</h2>
        <ul>
          <li><strong>Scan records:</strong> retained to serve your results and shareable links; abuse/IP logs are kept for a limited period then purged.</li>
          <li><strong>Subscriber data &amp; consent records:</strong> kept while you remain subscribed and for a reasonable period after unsubscribe to evidence consent and honor opt-outs, then deleted.</li>
          <li><strong>Analytics:</strong> retained per the provider's standard windows in aggregated form.</li>
        </ul>

        <h2 id="security">9. Data Security</h2>
        <p>
          We use HTTPS everywhere, restrict access on a need-to-know basis, hash sensitive tokens (e.g. access and
          unsubscribe tokens), and follow fail-closed defaults. No method of transmission or storage is 100% secure,
          but we work to protect your data and limit what we collect.
        </p>

        <h2 id="rights">10. Your Rights</h2>
        <p>Depending on your location (e.g. GDPR/UK GDPR, CCPA), you may have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal data.</li>
          <li>Withdraw consent at any time (including unsubscribing from email).</li>
          <li>Object to or restrict processing, and request data portability.</li>
          <li>Lodge a complaint with your data protection authority.</li>
        </ul>
        <p>To exercise any right, email <a href="mailto:support@aipush.app">support@aipush.app</a>.</p>

        <h2 id="email">11. Email &amp; Unsubscribe</h2>
        <p>
          Email is double opt-in: you confirm via a link before we send anything else. Every email includes a
          one-click unsubscribe link and a <code>List-Unsubscribe</code> header. Unsubscribing stops all marketing
          email and revokes report access tied to that subscription. You can also email{" "}
          <a href="mailto:support@aipush.app">support@aipush.app</a>.
        </p>

        <h2 id="transfers">12. International Transfers</h2>
        <p>
          Our providers may process data in countries outside your own, including the United States. Where required,
          such transfers rely on appropriate safeguards (e.g. Standard Contractual Clauses).
        </p>

        <h2 id="children">13. Children</h2>
        <p>
          aipush.app is not directed to children under 16, and we do not knowingly collect their personal data.
          If you believe a child provided us data, contact us and we will delete it.
        </p>

        <h2 id="changes">14. Changes to This Policy</h2>
        <p>
          We may update this policy as the product evolves. Material changes will be reflected by the "Last Updated"
          date above. Continued use after an update means you accept the revised policy.
        </p>

        <h2 id="terms">15. Terms of Service</h2>
        <p>
          By using aipush.app you agree to these terms. If you do not agree, do not use the service.
        </p>
        <ul>
          <li>
            <strong>The service.</strong> AIPUSH provides a free, automated AEO analysis of publicly accessible
            website resources, plus informational analysis articles. Results are automated estimates for
            informational purposes and are provided "as is", without warranties of any kind.
          </li>
          <li>
            <strong>Third-party websites.</strong> Analyses and articles describe publicly available information
            about third-party websites and may include screenshots of public pages. AIPUSH is not affiliated with,
            endorsed by, or sponsored by those sites, and does not modify them. Brand names and trademarks belong to
            their respective owners and are used descriptively (nominative fair use). If you own an analyzed site and
            want a page removed, email <a href="mailto:support@aipush.app">support@aipush.app</a>.
          </li>
          <li>
            <strong>Acceptable use.</strong> Do not abuse, overload, scrape at scale, reverse-engineer, or use the
            service to break the law or analyze sites you are not permitted to test. We may rate-limit or block abuse.
          </li>
          <li>
            <strong>Intellectual property.</strong> Our content, scores, and software are owned by AIPUSH. You may
            use the fixes and reports for your own websites.
          </li>
          <li>
            <strong>Limitation of liability.</strong> To the maximum extent permitted by law, AIPUSH is not liable
            for any indirect, incidental, or consequential damages, or for decisions made based on the analysis.
          </li>
          <li>
            <strong>Changes.</strong> We may modify or discontinue features at any time. These terms may be updated;
            the "Last Updated" date reflects the current version.
          </li>
        </ul>

        <p style={{ marginTop: 28, opacity: 0.8 }}>
          Questions about privacy or these terms? Contact <a href="mailto:support@aipush.app">support@aipush.app</a>.
        </p>
      </article>
    </main>
  );
}
