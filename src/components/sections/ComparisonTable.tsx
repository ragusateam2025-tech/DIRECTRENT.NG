'use client';

import { useRef } from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface ComparisonRow {
  feature: string;
  traditional: { text: string; positive: boolean };
  directrent: { text: string; positive: boolean };
}

const rows: ComparisonRow[] = [
  {
    feature: 'All-In Fees',
    traditional: { text: '~32% of rent', positive: false },
    directrent: { text: '0% agent fees', positive: true },
  },
  {
    feature: 'Platform Fee',
    traditional: { text: 'N/A', positive: false },
    directrent: { text: 'Just 2%', positive: true },
  },
  {
    feature: 'Tenant Verification',
    traditional: { text: 'None', positive: false },
    directrent: { text: 'BVN/NIN Verified', positive: true },
  },
  {
    feature: 'Payment Protection',
    traditional: { text: 'None', positive: false },
    directrent: { text: 'Escrow Protection', positive: true },
  },
  {
    feature: 'Communication',
    traditional: { text: 'Through agent', positive: false },
    directrent: { text: 'Direct to landlord', positive: true },
  },
  {
    feature: 'Fake Listings',
    traditional: { text: 'Common', positive: false },
    directrent: { text: 'Zero tolerance', positive: true },
  },
  {
    feature: 'Timeline',
    traditional: { text: '2–3 months', positive: false },
    directrent: { text: '1–2 weeks', positive: true },
  },
];

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopRowVariants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const rVariants = prefersReducedMotion ? noopRowVariants : rowVariants;
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: 0.2 },
        },
      };

  return (
    <section ref={ref} className="section relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary-medium/30 to-transparent" />

      <Container size="lg">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Why Directrent.ng vs{' '}
            <span className="text-accent-coral">Traditional Agents</span>
          </h2>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          className="mx-auto hidden max-w-4xl overflow-hidden rounded-2xl border border-border md:table md:w-full"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          role="table"
        >
          {/* Header row */}
          <motion.div
            className="grid grid-cols-3 bg-primary-medium"
            variants={rVariants}
            role="row"
          >
            <div className="px-6 py-4 text-sm font-semibold text-text-muted" role="columnheader">
              Feature
            </div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-text-muted" role="columnheader">
              Traditional Agent
            </div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-accent-gold" role="columnheader">
              Directrent.ng
            </div>
          </motion.div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              className={cn(
                'grid grid-cols-3 border-t border-border',
                i % 2 === 0 ? 'bg-primary-dark' : 'bg-primary-medium/50'
              )}
              variants={rVariants}
              role="row"
            >
              <div className="px-6 py-4 text-sm font-medium text-text-primary" role="cell">
                {row.feature}
              </div>
              <div className="flex items-center justify-center gap-2 px-6 py-4 text-center text-sm" role="cell">
                {row.traditional.positive ? (
                  <Check className="size-5 shrink-0 text-green-500" aria-label="Yes" />
                ) : (
                  <X className="size-5 shrink-0 text-red-500" aria-label="No" />
                )}
                <span className={row.traditional.positive ? 'text-text-primary' : 'text-text-muted'}>
                  {row.traditional.text}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 px-6 py-4 text-center text-sm" role="cell">
                {row.directrent.positive ? (
                  <Check className="size-5 shrink-0 text-green-500" aria-label="Yes" />
                ) : (
                  <X className="size-5 shrink-0 text-red-500" aria-label="No" />
                )}
                <span className={cn('font-medium', row.directrent.positive ? 'text-accent-gold' : 'text-text-muted')}>
                  {row.directrent.text}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          className="space-y-4 px-1 md:hidden"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {rows.map((row) => (
            <motion.div
              key={row.feature}
              className="overflow-hidden rounded-xl border border-border bg-primary-medium"
              variants={rVariants}
            >
              <div className="border-b border-border bg-primary-dark px-4 py-3">
                <p className="text-sm font-semibold text-text-primary">
                  {row.feature}
                </p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="px-4 py-3">
                  <p className="mb-1.5 text-xs font-medium text-text-muted">
                    Traditional
                  </p>
                  <div className="flex items-center gap-1.5">
                    {row.traditional.positive ? (
                      <Check className="size-4 shrink-0 text-green-500" aria-label="Yes" />
                    ) : (
                      <X className="size-4 shrink-0 text-red-500" aria-label="No" />
                    )}
                    <span className={cn(
                      'text-sm',
                      row.traditional.positive ? 'text-text-primary' : 'text-text-muted'
                    )}>
                      {row.traditional.text}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="mb-1.5 text-xs font-medium text-accent-gold">
                    Directrent.ng
                  </p>
                  <div className="flex items-center gap-1.5">
                    {row.directrent.positive ? (
                      <Check className="size-4 shrink-0 text-green-500" aria-label="Yes" />
                    ) : (
                      <X className="size-4 shrink-0 text-red-500" aria-label="No" />
                    )}
                    <span className={cn(
                      'text-sm font-medium',
                      row.directrent.positive ? 'text-accent-gold' : 'text-text-muted'
                    )}>
                      {row.directrent.text}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
