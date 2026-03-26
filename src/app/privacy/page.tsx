import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/layout';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-text-muted">Last updated: March 25, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              1. Introduction
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Directrent.ng (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the
                Platform&rdquo;) is committed to protecting the privacy and personal data of all
                users — tenants, landlords, and visitors — in accordance with the Nigeria Data
                Protection Regulation (NDPR) 2019 and the Nigeria Data Protection Act (NDPA) 2023.
              </p>
              <p>
                This Privacy Policy explains what data we collect, how we use it, how we protect it,
                and your rights as a data subject under Nigerian law.
              </p>
              <p>
                By using directrent.ng, you consent to the practices described in this policy.
              </p>
            </div>
          </div>

          {/* 2. Data We Collect */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              2. Data We Collect
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-text-secondary md:text-base">
              <p className="font-semibold text-text-primary">
                Information you provide directly:
              </p>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Full name, email address, phone number (during registration and waitlist signup)
                </li>
                <li>
                  BVN (Bank Verification Number) or NIN (National Identification Number) for
                  identity verification
                </li>
                <li>
                  Property details, photos, and descriptions (for landlords listing properties)
                </li>
                <li>Messages sent through the in-app chat system</li>
                <li>
                  Payment information processed through our payment partner (Paystack)
                </li>
              </ul>

              <p className="font-semibold text-text-primary">
                Information collected automatically:
              </p>
              <ul className="ml-4 list-disc space-y-2">
                <li>Device type, browser type, operating system</li>
                <li>IP address and approximate location (city-level)</li>
                <li>Pages visited, features used, and time spent on the platform</li>
                <li>Referral source (how you found Directrent.ng)</li>
              </ul>

              <p className="font-semibold text-text-primary">
                Information from third parties:
              </p>
              <ul className="ml-4 list-disc space-y-2">
                <li>Identity verification results from BVN/NIN verification partners</li>
                <li>Payment confirmation data from Paystack</li>
              </ul>
            </div>
          </div>

          {/* 3. How We Use Your Data */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              3. How We Use Your Data
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>We use the data we collect for the following purposes:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>To create and manage your account</li>
                <li>
                  To verify your identity through BVN/NIN checks (required for all landlords and
                  tenants)
                </li>
                <li>
                  To connect tenants with landlords through our direct matching system
                </li>
                <li>To process rental payments securely through Paystack escrow</li>
                <li>
                  To generate digital lease agreements compliant with Lagos State Tenancy Law 2011
                </li>
                <li>
                  To send you notifications about your listings, applications, and payments
                </li>
                <li>
                  To send marketing communications (only with your explicit consent; you can opt out
                  at any time)
                </li>
                <li>
                  To improve our platform through anonymized, aggregated usage analytics
                </li>
                <li>
                  To comply with legal obligations, including LASRERA regulations and CBN payment
                  guidelines
                </li>
              </ul>
            </div>
          </div>

          {/* 4. BVN/NIN Verification & Sensitive Data */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              4. BVN/NIN Verification & Sensitive Data
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                We collect your BVN or NIN solely for identity verification purposes. This data is
                processed through accredited verification partners and is never stored in raw form
                on our servers.
              </p>
              <p>
                Verification results (confirmed/not confirmed) are stored. The underlying BVN/NIN
                number is encrypted at rest using AES-256 encryption and is never shared with other
                users, landlords, tenants, or any third party.
              </p>
              <p>
                You have the right to request deletion of your verification data at any time by
                contacting us at hello@directrent.ng.
              </p>
            </div>
          </div>

          {/* 5. Data Sharing */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              5. Data Sharing
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>We do not sell your personal data to any third party.</p>
              <p>We share data only with:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Paystack (payment processing — governed by their own privacy policy and CBN
                  regulations)
                </li>
                <li>BVN/NIN verification partners (identity confirmation only)</li>
                <li>
                  Lagos State authorities if required by law (e.g., LASRERA compliance inquiries)
                </li>
                <li>Law enforcement agencies when compelled by valid legal process</li>
              </ul>
            </div>
          </div>

          {/* 6. Data Storage & Security */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              6. Data Storage & Security
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Your data is stored on secure cloud infrastructure with encryption at rest and in
                transit.
              </p>
              <p>
                We implement industry-standard security measures including AES-256 encryption,
                role-based access controls, regular security audits, and secure API authentication.
              </p>
              <p>
                Despite these measures, no system is 100% secure. If a data breach occurs, we will
                notify affected users within 72 hours as required by the NDPR.
              </p>
            </div>
          </div>

          {/* 7. Your Rights Under the NDPR */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              7. Your Rights Under the NDPR
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>As a data subject under the NDPR, you have the following rights:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate data</li>
                <li>
                  Right to request deletion of your data (&ldquo;right to be forgotten&rdquo;)
                </li>
                <li>Right to restrict or object to processing</li>
                <li>
                  Right to data portability (receive your data in a structured format)
                </li>
                <li>Right to withdraw consent at any time</li>
                <li>
                  Right to lodge a complaint with the National Information Technology Development
                  Agency (NITDA)
                </li>
              </ul>
              <p>
                To exercise any of these rights, email us at hello@directrent.ng. We will respond
                within 30 days.
              </p>
            </div>
          </div>

          {/* 8. Data Retention */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              8. Data Retention
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Active account data: retained while your account is active and for 12 months after
                  deletion
                </li>
                <li>
                  Transaction records: retained for 6 years (CBN financial record-keeping
                  requirements)
                </li>
                <li>
                  Chat messages: retained for 12 months after the related tenancy ends
                </li>
                <li>
                  Waitlist data: retained until you unsubscribe or the waitlist closes
                </li>
              </ul>
            </div>
          </div>

          {/* 9. Children's Privacy */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              9. Children&apos;s Privacy
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Directrent.ng is not intended for use by anyone under 18 years of age. We do not
                knowingly collect data from minors.
              </p>
            </div>
          </div>

          {/* 10. Changes to This Policy */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              10. Changes to This Policy
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                We may update this Privacy Policy from time to time. Material changes will be
                communicated via email and a prominent notice on the platform. Continued use after
                changes constitutes acceptance.
              </p>
            </div>
          </div>

          {/* 11. Contact Us */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              11. Contact Us
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>For privacy-related inquiries or to exercise your data rights:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>Email: hello@directrent.ng</li>
                <li>Address: Lagos, Nigeria</li>
              </ul>
              <p>
                You may also contact Nigeria&apos;s data protection authority: National Information
                Technology Development Agency (NITDA), Abuja.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
