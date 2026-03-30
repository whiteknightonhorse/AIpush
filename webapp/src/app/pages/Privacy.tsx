import React from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "controller", label: "Data Controller" },
  { id: "collect", label: "Data We Collect" },
  { id: "use", label: "How We Use Data" },
  { id: "legal-bases", label: "Legal Bases" },
  { id: "sharing", label: "Sharing" },
  { id: "oauth", label: "OAuth Compliance" },
  { id: "retention", label: "Data Retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your Rights" },
  { id: "deletion", label: "Delete My Data" },
  { id: "transfers", label: "International Transfers" },
  { id: "cookies", label: "Cookies" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes" },
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
    document.title = "Privacy Policy — AIPUSH";
    const mDesc = document.querySelector('meta[name="description"]');
    const prev = mDesc?.getAttribute("content") ?? "";
    if (mDesc)
      mDesc.setAttribute(
        "content",
        "AIPUSH Privacy Policy — how we collect, use, store, and protect your data across our AI marketing automation platform."
      );
    return () => {
      if (mDesc) mDesc.setAttribute("content", prev);
    };
  }, []);

  return (
    <main className="aipush-seo-page">
      <section className="aipush-seo-hero">
        <h1 className="aipush-seo-heroTitle">Privacy Policy</h1>
        <p className="aipush-seo-heroSub">
          How AIPUSH collects, uses, and protects your information.
        </p>
      </section>

      <div className="aipush-privacy-meta">
        <p>Effective Date: January 1, 2026</p>
        <p>Last Updated: January 1, 2026</p>
      </div>

      <nav className="aipush-privacy-nav" aria-label="Policy sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="aipush-privacy-navLink">
            {s.label}
          </a>
        ))}
      </nav>

      <article className="aipush-seo-content aipush-privacy">
        {/* 1. Overview */}
        <h2 id="overview">1. Overview</h2>
        <p>
          AIPUSH (&ldquo;AIPUSH&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an
          AI-powered marketing and traffic automation platform designed to help businesses, creators, and operators
          publish, manage, and optimize digital content across supported platforms.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, process, store, and protect information when you use
          AIPUSH, connect third-party accounts (such as Facebook, Instagram, or TikTok), or interact with our
          services at{" "}
          <a href="https://aipush.app" target="_blank" rel="noopener noreferrer">
            https://aipush.app
          </a>
          .
        </p>
        <p>By using AIPUSH, you agree to the practices described in this Privacy Policy.</p>

        {/* 2. Data Controller */}
        <h2 id="controller">2. Data Controller &amp; Contact Information</h2>
        <ul className="aipush-privacy-list">
          <li>
            <strong>Service Name:</strong> AIPUSH
          </li>
          <li>
            <strong>Website:</strong>{" "}
            <a href="https://aipush.app" target="_blank" rel="noopener noreferrer">
              https://aipush.app
            </a>
          </li>
          <li>
            <strong>Contact Email:</strong>{" "}
            <a href="mailto:support@aipush.app">support@aipush.app</a>
          </li>
        </ul>
        <p>
          For privacy-related inquiries, data access requests, or deletion requests, please contact us at the email
          above.
        </p>

        {/* 3. Data We Collect */}
        <h2 id="collect">3. Information We Collect</h2>

        <h3>3.1 Account &amp; Identity Information</h3>
        <p>When you create or use an AIPUSH account, we may collect:</p>
        <ul className="aipush-privacy-list">
          <li>Email address</li>
          <li>Display name (if provided)</li>
          <li>Internal user identifiers</li>
          <li>Authentication metadata</li>
        </ul>
        <p>We do not collect passwords for third-party platforms connected via OAuth.</p>

        <h3>3.2 Connected Social Platform Data</h3>
        <p>When you connect third-party accounts through OAuth authorization, we may receive:</p>

        <h4>Facebook / Instagram (Meta Platforms)</h4>
        <ul className="aipush-privacy-list">
          <li>Page ID</li>
          <li>Instagram Business Account ID</li>
          <li>Page name</li>
          <li>Permissions granted</li>
          <li>Access tokens</li>
          <li>Token expiration metadata</li>
        </ul>

        <h4>TikTok</h4>
        <ul className="aipush-privacy-list">
          <li>TikTok Business account ID</li>
          <li>Permissions granted</li>
          <li>Access tokens</li>
          <li>Token expiration metadata</li>
        </ul>
        <p>
          Access tokens are stored securely and used solely for providing publishing and automation services. Users
          may revoke access at any time directly in Facebook, Instagram, or TikTok account settings.
        </p>

        <h3>3.3 Content &amp; Publishing Data</h3>
        <p>To operate the platform, we may process:</p>
        <ul className="aipush-privacy-list">
          <li>Post titles and captions</li>
          <li>Publishing schedules</li>
          <li>Video metadata</li>
          <li>Status of publishing actions</li>
          <li>System-generated content (if applicable)</li>
        </ul>
        <p>Media files may be temporarily processed to perform publishing or automation functions.</p>

        <h3>3.4 Technical &amp; Log Information</h3>
        <p>For security and operational purposes, we may collect:</p>
        <ul className="aipush-privacy-list">
          <li>IP address</li>
          <li>Device type</li>
          <li>Browser type</li>
          <li>Access timestamps</li>
          <li>Server logs</li>
          <li>Error logs</li>
          <li>System audit records</li>
        </ul>
        <p>
          We use this information to maintain platform integrity, prevent abuse, detect fraud, and ensure compliance.
        </p>

        <h3>3.5 Payment Information</h3>
        <p>If payment features are used:</p>
        <ul className="aipush-privacy-list">
          <li>We may store transaction identifiers and payment status.</li>
          <li>We do not store full credit card numbers.</li>
          <li>Payment processing may occur through third-party providers.</li>
          <li>
            Cryptocurrency transactions (if applicable) are recorded as transaction references only.
          </li>
        </ul>

        {/* 4. How We Use Data */}
        <h2 id="use">4. How We Use Information</h2>
        <p>We use collected data to:</p>
        <ul className="aipush-privacy-list">
          <li>Provide and operate AIPUSH services</li>
          <li>Connect and manage third-party accounts via OAuth</li>
          <li>Publish and automate content</li>
          <li>Monitor performance and analytics</li>
          <li>Improve platform functionality</li>
          <li>Provide customer support</li>
          <li>Prevent fraud and abuse</li>
          <li>Enforce legal rights</li>
          <li>Comply with applicable laws</li>
        </ul>
        <p>We do not sell personal data to third parties.</p>

        {/* 5. Legal Bases */}
        <h2 id="legal-bases">5. Legal Bases for Processing</h2>
        <p>Depending on jurisdiction, we may process data under:</p>
        <ul className="aipush-privacy-list">
          <li>
            <strong>Performance of a contract</strong> — to provide the services you have requested
          </li>
          <li>
            <strong>Legitimate interests</strong> — service operation, security, and fraud prevention
          </li>
          <li>
            <strong>User consent</strong> — where explicitly provided
          </li>
          <li>
            <strong>Compliance with legal obligations</strong> — as required by applicable laws
          </li>
        </ul>

        {/* 6. Sharing */}
        <h2 id="sharing">6. Sharing of Information</h2>
        <p>We may share limited data with:</p>
        <ul className="aipush-privacy-list">
          <li>
            <strong>Meta Platforms</strong> — Facebook &amp; Instagram APIs, for publishing and account management
          </li>
          <li>
            <strong>TikTok</strong> — Content Posting API, for publishing and account management
          </li>
          <li>
            <strong>Email service providers</strong> — for transactional email delivery
          </li>
          <li>
            <strong>Hosting and infrastructure providers</strong> — to operate the platform
          </li>
          <li>
            <strong>Logging and monitoring providers</strong> — for operational reliability
          </li>
        </ul>
        <p>We share only the minimum data necessary to deliver the service. We do not sell personal data.</p>

        {/* 7. OAuth */}
        <h2 id="oauth">7. OAuth &amp; Platform Compliance</h2>
        <p>AIPUSH uses official OAuth mechanisms provided by supported platforms.</p>
        <p>Users explicitly grant permissions during the connection process. Users may:</p>
        <ul className="aipush-privacy-list">
          <li>Revoke permissions in Facebook settings</li>
          <li>Revoke permissions in TikTok settings</li>
          <li>Disconnect accounts within AIPUSH</li>
        </ul>
        <p>
          We comply with platform policies, API rate limits, and developer terms. Publishing limits are
          platform-defined and enforced by AIPUSH.
        </p>

        {/* 8. Retention */}
        <h2 id="retention">8. Data Retention</h2>
        <p>We retain data:</p>
        <ul className="aipush-privacy-list">
          <li>As long as necessary to provide the service</li>
          <li>Until the user disconnects third-party accounts</li>
          <li>Until account deletion is requested</li>
          <li>As required by legal or regulatory obligations</li>
        </ul>
        <p>
          Access tokens are stored only while active and valid. Audit logs may be retained for security and
          compliance purposes.
        </p>

        {/* 9. Security */}
        <h2 id="security">9. Data Security</h2>
        <p>We implement appropriate technical and organizational measures including:</p>
        <ul className="aipush-privacy-list">
          <li>Encryption in transit (TLS)</li>
          <li>Encryption at rest for sensitive credentials</li>
          <li>Restricted internal access controls and least privilege</li>
          <li>Secure secret storage</li>
          <li>Audit logging</li>
          <li>Infrastructure-level protections</li>
          <li>Incident response procedures</li>
        </ul>
        <p>
          No system is completely immune to risk, but we take reasonable measures to protect your data.
        </p>

        {/* 10. User Rights */}
        <h2 id="rights">10. User Rights</h2>
        <p>Depending on jurisdiction, users may have the right to:</p>
        <ul className="aipush-privacy-list">
          <li>Request access to personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of personal data</li>
          <li>Request data portability (where applicable)</li>
          <li>Object to certain processing</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge a complaint with a supervisory authority</li>
        </ul>
        <p>
          Requests may be submitted to{" "}
          <a href="mailto:support@aipush.app">support@aipush.app</a>.
        </p>

        {/* 11. Data Deletion */}
        <h2 id="deletion">11. Data Deletion Instructions</h2>
        <p>To request deletion of your data:</p>
        <ol className="aipush-privacy-list aipush-privacy-list--ordered">
          <li>
            Send an email to{" "}
            <a href="mailto:support@aipush.app">support@aipush.app</a>
          </li>
          <li>
            Include:
            <ul className="aipush-privacy-list">
              <li>Your account email</li>
              <li>Connected Page or Account ID (if applicable)</li>
              <li>Description of your request</li>
            </ul>
          </li>
        </ol>
        <p>
          We will process deletion requests within a reasonable timeframe, unless legal retention requirements apply.
        </p>
        <p>
          Users may also revoke permissions directly from Facebook or TikTok account settings at any time.
        </p>

        {/* 12. International Transfers */}
        <h2 id="transfers">12. International Data Transfers</h2>
        <p>
          AIPUSH may process data in multiple jurisdictions depending on infrastructure providers. We implement
          appropriate safeguards to protect personal data in cross-border transfers, in accordance with applicable
          data protection regulations.
        </p>

        {/* 13. Cookies */}
        <h2 id="cookies">13. Cookies &amp; Local Storage</h2>
        <p>We may use essential cookies and local storage for:</p>
        <ul className="aipush-privacy-list">
          <li>Authentication and session management</li>
          <li>Security protections</li>
          <li>Theme preferences (light/dark mode)</li>
        </ul>
        <p>
          We do not use advertising tracking cookies. We do not use third-party analytics cookies.
        </p>

        {/* 14. Children */}
        <h2 id="children">14. Children&apos;s Privacy</h2>
        <p>
          AIPUSH is not directed to children under 18. We do not knowingly collect personal data from minors. If we
          become aware that we have collected data from a child, we will take steps to delete it promptly.
        </p>

        {/* 15. Changes */}
        <h2 id="changes">15. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. The &ldquo;Last Updated&rdquo; date at the top of this
          page reflects the most recent revision. Continued use of AIPUSH after updates constitutes acceptance of
          changes.
        </p>

        <div className="aipush-privacy-contact">
          <p>
            If you have questions regarding this Privacy Policy, contact:{" "}
            <a href="mailto:support@aipush.app">support@aipush.app</a>
          </p>
        </div>

        <hr style={{margin: "3rem 0", borderColor: "var(--surface-border)"}} />

        <h2 id="terms" style={{marginTop: "2rem", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700}}>Terms of Service</h2>
        <p className="aipush-privacy-date">Effective: March 24, 2026</p>

        <h2>1. Service Description</h2>
        <p>
          AIPUSH provides an automated AI-optimized page generation and publishing service. We analyze your business,
          generate structured content pages, verify them through automated audit gates, and publish them on your
          designated subdomain. The service operates at aipush.app.
        </p>

        <h2>2. Account and Eligibility</h2>
        <p>
          You must be at least 18 years old to use AIPUSH. By creating an account, you confirm that the information
          you provide is accurate. You are responsible for maintaining the security of your account credentials.
          One account per person or business entity.
        </p>

        <h2>3. Subscription and Payment</h2>
        <p>
          AIPUSH is a paid subscription service at $19.99 per month. Payment is accepted exclusively in cryptocurrency
          (USDT or USDC on Ethereum mainnet). Subscriptions renew monthly. There is no automatic billing — each
          renewal requires a new payment transaction. A 30-day money-back guarantee applies to first-time subscribers.
        </p>

        <h2>4. Content and Publishing</h2>
        <p>
          AIPUSH generates content based on your business profile and publishes it on a subdomain you configure via
          DNS. You retain ownership of your business data. Generated content is created for your use and published
          on your domain. You are responsible for ensuring your business information is accurate. AIPUSH reserves
          the right to refuse service to businesses in prohibited categories (illegal activities, controlled substances,
          weapons, terrorism-related content, or content exploiting minors).
        </p>

        <h2>5. DNS and Domain Requirements</h2>
        <p>
          You must configure a CNAME DNS record pointing a subdomain (e.g., reference.yourdomain.com) to
          cname.aipush.app. AIPUSH provisions SSL certificates automatically via Cloudflare. You must own or
          have authorization to modify DNS for the domain you connect.
        </p>

        <h2>6. Service Availability</h2>
        <p>
          AIPUSH targets 20 pages per day per active subscription. Actual page count may vary based on AI provider
          availability, content audit results, and system capacity. We do not guarantee specific traffic,
          ranking, or citation outcomes — we provide the infrastructure and content, results depend on market
          conditions and search engine behavior.
        </p>

        <h2>7. Prohibited Use</h2>
        <ul className="aipush-privacy-list">
          <li>Using AIPUSH to generate misleading, fraudulent, or deceptive content</li>
          <li>Connecting domains you do not own or control</li>
          <li>Attempting to circumvent billing, audit gates, or compliance checks</li>
          <li>Reverse engineering, scraping, or extracting AIPUSH system components</li>
          <li>Using the service for any illegal purpose</li>
        </ul>

        <h2>8. Termination</h2>
        <p>
          Either party may terminate the subscription at any time. Upon cancellation, page generation stops
          immediately. Previously published pages remain on your subdomain until you remove the DNS record.
          AIPUSH may terminate accounts that violate these terms without notice.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          AIPUSH is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for indirect,
          incidental, or consequential damages. Our total liability is limited to the amount you paid in the
          preceding 12 months. We do not guarantee search engine rankings, AI citations, or traffic outcomes.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. Continued use of AIPUSH after changes constitutes
          acceptance. Material changes will be communicated via email to registered users.
        </p>

        <div className="aipush-privacy-contact">
          <p>
            Questions about these Terms? Contact:{" "}
            <a href="mailto:support@aipush.app">support@aipush.app</a>
          </p>
          <p>
            Follow us on X:{" "}
            <a href="https://x.com/aipush_app" target="_blank" rel="noopener noreferrer">@aipush_app</a>
          </p>
        </div>
      </article>
    </main>
  );
}
