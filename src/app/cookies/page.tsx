import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/layout';

export default function CookiePolicyPage() {
  return (
    <section className="section">
      <Container size="md">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Page header */}
        <div className="mb-12">
          <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm text-text-muted">Last updated: March 25, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* 1. What Are Cookies */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              1. What Are Cookies
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Cookies are small text files stored on your device when you visit a website. They
                help the site remember your preferences, understand how you use it, and improve your
                experience.
              </p>
            </div>
          </div>

          {/* 2. How We Use Cookies */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              2. How We Use Cookies
            </h2>
            <div className="space-y-6 text-sm leading-relaxed text-text-secondary md:text-base">
              {/* Essential Cookies */}
              <div>
                <p className="mb-2 font-semibold text-text-primary">
                  Essential Cookies (Always Active)
                </p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>Session management (keeping you logged in)</li>
                  <li>Security tokens (CSRF protection)</li>
                  <li>Load balancing</li>
                </ul>
                <p className="mt-2">
                  These cookies are necessary for the platform to function. They cannot be disabled.
                </p>
              </div>

              {/* Functional Cookies */}
              <div>
                <p className="mb-2 font-semibold text-text-primary">Functional Cookies</p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>Remembering your preferred area (Yaba, Surulere)</li>
                  <li>Remembering your user type selection (tenant/landlord)</li>
                  <li>Language and display preferences</li>
                </ul>
                <p className="mt-2">
                  These cookies improve your experience but are not strictly necessary.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div>
                <p className="mb-2 font-semibold text-text-primary">Analytics Cookies</p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>Understanding which pages are most visited</li>
                  <li>Measuring how users navigate between pages</li>
                  <li>Identifying technical issues (page load times, errors)</li>
                </ul>
                <p className="mt-2">
                  We use anonymized analytics to improve the platform. No personally identifiable
                  information is collected through analytics cookies.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div>
                <p className="mb-2 font-semibold text-text-primary">Marketing Cookies</p>
                <p>
                  We do not currently use marketing or advertising cookies. If this changes, we will
                  update this policy and request your consent.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Third-Party Cookies */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              3. Third-Party Cookies
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>Some cookies may be set by third-party services we use:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>Paystack (payment processing)</li>
                <li>Google Analytics (if enabled — anonymized)</li>
                <li>Vercel Analytics (performance monitoring)</li>
              </ul>
              <p>
                These third parties have their own cookie policies. We encourage you to review them.
              </p>
            </div>
          </div>

          {/* 4. Managing Cookies */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              4. Managing Cookies
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                You can control cookies through your browser settings. Most browsers allow you to
                block or delete cookies.
              </p>
              <p>
                Note: blocking essential cookies may prevent Directrent.ng from functioning properly.
              </p>
              <p>To manage cookies in your browser:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  In Chrome: Settings &rarr; Privacy and Security &rarr; Cookies
                </li>
                <li>In Safari: Preferences &rarr; Privacy</li>
                <li>
                  In Firefox: Settings &rarr; Privacy & Security &rarr; Cookies
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Cookie Retention */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              5. Cookie Retention
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Essential cookies: expire when you close your browser (session) or after 30 days
                  (persistent)
                </li>
                <li>Functional cookies: 12 months</li>
                <li>Analytics cookies: 26 months</li>
              </ul>
              <p>You can clear all cookies at any time through your browser settings.</p>
            </div>
          </div>

          {/* 6. Changes to This Policy */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              6. Changes to This Policy
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                We may update this Cookie Policy from time to time. Material changes will be
                communicated via a prominent notice on the platform. Continued use after changes
                constitutes acceptance.
              </p>
            </div>
          </div>

          {/* 7. Contact */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              7. Contact
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                For questions about our use of cookies, contact us at hello@directrent.ng.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
