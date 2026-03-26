'use client';

import { useRef } from 'react';

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import {
  Users,
  CheckCircle,
  Shield,
  PiggyBank,
  FileSignature,
  MapPin,
  UserCheck,
  Clock,
  CreditCard,
  LayoutDashboard,
  Scale,
  BarChart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

type UserType = 'tenant' | 'landlord';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
  stat?: string;
}

const tenantFeatures: Feature[] = [
  {
    icon: Users,
    title: 'Direct Landlord Access',
    description:
      'Message property owners directly through our secure in-app chat. Schedule viewings, negotiate terms, and ask questions without a middleman filtering or delaying your communication. Our research found that agent-managed properties take 63 days to fill vs just 25 days for direct connections.',
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
    stat: '61% faster occupancy',
  },
  {
    icon: CheckCircle,
    title: 'Verified Listings Only',
    description:
      'Every property on Directrent.ng is verified through document checks and physical inspections. Landlords must provide ownership documents, C of O validation, and utility bill cross-referencing. No more wasting hours visiting properties that don\u2019t exist or look nothing like the photos.',
    color: 'text-success',
    bg: 'bg-success/10',
    stat: '78% encounter fakes elsewhere',
  },
  {
    icon: Shield,
    title: 'Paystack Escrow Payments',
    description:
      'Your rent payment is held securely by Paystack until you confirm move-in. If the property doesn\u2019t match the listing or the landlord fails to deliver the keys, you\u2019re fully protected with a refund process. No more handing over large sums with no recourse.',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
    stat: '₦0 lost to fraud',
  },
  {
    icon: PiggyBank,
    title: 'Save Up to ₦300,000 in Fees',
    description:
      'Traditional agents charge ~32% of annual rent in combined agency, legal, caution, and misc fees. Directrent.ng charges just 2%. On a ₦1M annual rent, that\u2019s ₦300,000 back in your pocket. Our primary research confirmed that 50% of tenants find current fees unacceptable.',
    color: 'text-accent-orange',
    bg: 'bg-accent-orange/10',
    stat: '₦300K average savings',
  },
  {
    icon: FileSignature,
    title: 'Digital Lease Agreements',
    description:
      'Sign legally binding lease agreements directly from your phone. Every lease is compliant with Lagos State Tenancy Law 2011, replacing the traditional 10% legal fee with a simple digital process. Both parties get a signed copy stored securely in the app.',
    color: 'text-info',
    bg: 'bg-info/10',
    stat: 'Lagos State compliant',
  },
  {
    icon: MapPin,
    title: 'Neighborhood Insights',
    description:
      'Know your area before you move. Get safety ratings, amenity data, proximity to transport, and community reviews for every listing. Compare neighborhoods side by side and make informed decisions about where you\u2019ll live.',
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
  },
];

const landlordFeatures: Feature[] = [
  {
    icon: UserCheck,
    title: 'BVN/NIN Verified Tenants',
    description:
      'Every tenant on the platform is verified through government-issued BVN or NIN. Know exactly who you\u2019re renting to before any commitment. Background checks and employment verification are built in, so you can screen applicants with confidence.',
    color: 'text-success',
    bg: 'bg-success/10',
    stat: '4.44/5 tenant demand',
  },
  {
    icon: Clock,
    title: 'Reduced Vacancy Periods',
    description:
      'Find tenants faster with direct access to a pool of verified, ready-to-move renters. Our research shows agent-managed properties sit vacant for an average of 63.53 days \u2014 direct listings average just 24.60 days. That\u2019s over a month of lost rental income you recover.',
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
    stat: '24.6 days avg fill time',
  },
  {
    icon: CreditCard,
    title: 'Automated Rent Collection',
    description:
      'Set up automatic rent payment reminders and collection through Paystack. Track payment history, send gentle nudges before due dates, and receive funds directly to your bank account. No more chasing tenants for rent.',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
  },
  {
    icon: LayoutDashboard,
    title: 'Property Management Dashboard',
    description:
      'Manage all your properties from a single dashboard. View occupancy status, track rent payments, handle maintenance requests, and monitor tenant applications across every listing. Purpose-built for Lagos landlords with one to ten properties.',
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: Scale,
    title: 'Legal Protection',
    description:
      'Every tenancy is backed by a digital lease agreement compliant with Lagos State Tenancy Law. No more informal handshake deals or disputes without documentation. Both parties are protected with clear, enforceable terms.',
    color: 'text-accent-orange',
    bg: 'bg-accent-orange/10',
    stat: 'Legally binding',
  },
  {
    icon: BarChart,
    title: 'Performance Analytics',
    description:
      'Track occupancy rates, payment history, and rental yield across your portfolio. Get neighborhood pricing insights so you can set competitive rents. Data-driven property management for the modern Lagos landlord.',
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
  },
];

const headingData: Record<UserType, { title: string; subtitle: string }> = {
  tenant: {
    title: 'Built for Renters',
    subtitle: 'Tools that put you in control of your housing search.',
  },
  landlord: {
    title: 'Built for Property Owners',
    subtitle: 'Tools that help you find reliable tenants faster.',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopContainerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const noopItemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

interface FeatureShowcaseProps {
  activeView: UserType;
}

export function FeatureShowcase({ activeView }: FeatureShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const cVariants = prefersReducedMotion ? noopContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? noopItemVariants : itemVariants;

  const features = activeView === 'tenant' ? tenantFeatures : landlordFeatures;
  const heading = headingData[activeView];

  return (
    <section ref={ref} className="section relative">
      <Container size="lg">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            >
              <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
                {heading.title}
              </h2>
              <p className="mt-4 text-lg text-text-secondary">
                {heading.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Feature cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={cVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={iVariants}
                  className="rounded-2xl border border-border bg-primary-medium p-6 md:p-8"
                >
                  <div
                    className={cn(
                      'flex size-12 items-center justify-center rounded-xl',
                      feature.bg
                    )}
                  >
                    <Icon
                      className={cn('size-6', feature.color)}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                  {feature.stat && (
                    <div className="mt-4 inline-flex items-center rounded-full bg-accent-gold/10 px-3 py-1 text-xs font-medium text-accent-gold">
                      {feature.stat}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
