import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/layout';

export default function TermsOfServicePage() {
  return (
    <section className="section">
      <Container size="md">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Page header */}
        <div className="mb-12">
          <h1 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-text-muted">Last updated: March 25, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* 1. Agreement to Terms */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              1. Agreement to Terms
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                By accessing or using Directrent.ng, you agree to be bound by these Terms of
                Service. If you do not agree, do not use the platform.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and Directrent.ng.
              </p>
            </div>
          </div>

          {/* 2. Eligibility */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              2. Eligibility
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>To use Directrent.ng, you must meet the following requirements:</p>
              <ul className="ml-4 list-disc space-y-2">
                <li>You must be at least 18 years old</li>
                <li>
                  You must be a resident of Nigeria or have a valid Nigerian phone number
                </li>
                <li>
                  You must complete BVN or NIN verification to access listing, messaging, and
                  payment features
                </li>
                <li>
                  Landlords must have legal authority to rent the listed property (ownership
                  documents or authorized agent power of attorney)
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Account Responsibilities */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              3. Account Responsibilities
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  You are responsible for maintaining the confidentiality of your account
                </li>
                <li>You must provide accurate, current, and complete information</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>One person may maintain both a tenant and landlord account</li>
                <li>
                  We reserve the right to suspend accounts that violate these terms
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Platform Services */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              4. Platform Services
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Directrent.ng provides a technology platform that connects landlords and tenants
                directly.
              </p>
              <p>
                We are a technology intermediary, not a real estate agent, broker, or property
                manager. We do not own, manage, or control any properties listed on the platform.
              </p>
              <p>
                Services include: property listing, tenant search, in-app messaging, identity
                verification, escrow payment processing, and digital lease generation.
              </p>
              <p>
                The platform operates in compliance with Lagos State Real Estate Regulatory Authority
                (LASRERA) guidelines for technology intermediaries.
              </p>
            </div>
          </div>

          {/* 5. Listing Standards (Landlords) */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              5. Listing Standards (Landlords)
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>All property listings must be accurate and truthful</li>
                <li>
                  Photos must be of the actual property (no stock photos, no AI-generated images)
                </li>
                <li>
                  Rental prices must include all mandatory charges — no hidden fees
                </li>
                <li>
                  Properties must comply with Lagos State building and safety regulations
                </li>
                <li>
                  We reserve the right to remove listings that violate these standards or receive
                  verified complaints
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Tenant Conduct */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              6. Tenant Conduct
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>Treat all landlords and their properties with respect</li>
                <li>
                  Attend scheduled viewings on time or cancel with reasonable notice
                </li>
                <li>Provide accurate information in all applications</li>
                <li>
                  Do not attempt to circumvent the platform to avoid fees after initial contact was
                  made through Directrent.ng
                </li>
              </ul>
            </div>
          </div>

          {/* 7. Fees & Payments */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              7. Fees & Payments
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Browsing, searching, and messaging on Directrent.ng is free for all users.
              </p>
              <p>
                When a tenancy agreement is executed through the platform, a 2% platform fee is
                charged. This fee covers identity verification, escrow payment processing, digital
                lease generation, and customer support.
              </p>
              <p>
                All payments are processed through Paystack in accordance with Central Bank of
                Nigeria (CBN) guidelines.
              </p>
              <p>
                Escrow: When a tenant makes a rent payment, the funds are held by Paystack until the
                tenant confirms move-in. If the property materially differs from the listing or the
                landlord fails to deliver possession, the tenant may initiate a dispute and request a
                refund.
              </p>
            </div>
          </div>

          {/* 8. Escrow & Dispute Resolution */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              8. Escrow & Dispute Resolution
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Escrow funds are held for a maximum of 14 days after payment
                </li>
                <li>
                  Tenants must confirm move-in or raise a dispute within 7 days of key handover
                </li>
                <li>
                  If a dispute is raised, both parties will be contacted within 48 hours
                </li>
                <li>
                  Directrent.ng will mediate in good faith but is not an arbitrator — unresolved
                  disputes may be escalated to the Lagos Multi-Door Courthouse or a qualified
                  mediator
                </li>
              </ul>
              <p>
                We are not liable for disputes arising from conditions not visible in the listing or
                discovered after the escrow period.
              </p>
            </div>
          </div>

          {/* 9. Digital Lease Agreements */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              9. Digital Lease Agreements
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Lease agreements generated through Directrent.ng are designed to comply with the
                Lagos State Tenancy Law 2011 (as amended) and the Lagos State Tenancy and Recovery
                of Premises Bill 2025 (where applicable).
              </p>
              <p>
                Both parties must electronically sign the lease before escrow funds are released.
              </p>
              <p>
                Lease templates cover standard residential tenancy terms — complex commercial
                arrangements should involve independent legal counsel.
              </p>
              <p>
                Directrent.ng does not provide legal advice. Our digital leases are tools, not
                substitutes for professional legal guidance.
              </p>
            </div>
          </div>

          {/* 10. Prohibited Activities */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              10. Prohibited Activities
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Listing properties you do not own or have authority to rent
                </li>
                <li>Creating fake profiles or impersonating others</li>
                <li>Posting misleading, fraudulent, or deceptive content</li>
                <li>
                  Harassing, threatening, or discriminating against other users
                </li>
                <li>
                  Attempting to bypass payment processing or the escrow system
                </li>
                <li>Scraping, data mining, or reverse engineering the platform</li>
                <li>Using the platform for any illegal purpose</li>
              </ul>
            </div>
          </div>

          {/* 11. Intellectual Property */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              11. Intellectual Property
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                All content, design, and technology of Directrent.ng is owned by Directrent.ng or
                its licensors.
              </p>
              <p>
                User-generated content (listings, messages, reviews) remains the intellectual
                property of the user, but you grant Directrent.ng a non-exclusive license to display
                and distribute it within the platform.
              </p>
            </div>
          </div>

          {/* 12. Limitation of Liability */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              12. Limitation of Liability
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                Directrent.ng is provided &ldquo;as is.&rdquo; We do not guarantee the accuracy of
                listings, the reliability of users, or the outcome of any rental transaction.
              </p>
              <p>
                Our total liability for any claim shall not exceed the fees paid by you to
                Directrent.ng in the 12 months preceding the claim.
              </p>
              <p>
                We are not responsible for the actions, omissions, or conduct of any landlord,
                tenant, or third party.
              </p>
            </div>
          </div>

          {/* 13. Termination */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              13. Termination
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                You may close your account at any time by contacting hello@directrent.ng.
              </p>
              <p>We may suspend or terminate accounts that violate these terms.</p>
              <p>
                Upon termination, any pending escrow transactions will be resolved before account
                closure.
              </p>
            </div>
          </div>

          {/* 14. Governing Law */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              14. Governing Law
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                These Terms are governed by the laws of the Federal Republic of Nigeria, with
                specific reference to Lagos State Tenancy Law 2011, the NDPR 2019, and applicable
                LASRERA regulations.
              </p>
              <p>Disputes shall be resolved in the courts of Lagos State, Nigeria.</p>
            </div>
          </div>

          {/* 15. Changes to Terms */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              15. Changes to Terms
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <p>
                We may modify these Terms at any time. Material changes will be communicated via
                email 30 days before they take effect.
              </p>
            </div>
          </div>

          {/* 16. Contact */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text-primary md:text-2xl">
              16. Contact
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-text-secondary md:text-base">
              <ul className="ml-4 list-disc space-y-2">
                <li>Email: hello@directrent.ng</li>
                <li>Location: Lagos, Nigeria</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
