'use client';

import { useRef, useState } from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HelpCircle, Copy, Check } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

const CITATION =
  'Olaniran, O. (2025). Eliminating the Mandatory Middleman: A Digital Platform Approach to Direct Landlord-Tenant Connections in Lagos, Nigeria. MBA Capstone, Rome Business School.';

interface Metric {
  label: string;
  value: string;
  description: string;
  tooltip?: string;
}

const metrics: Metric[] = [
  {
    label: "Cronbach's Alpha",
    value: '0.996',
    description: 'Near-perfect internal consistency across survey instruments.',
    tooltip:
      'A measure of how closely related a set of survey items are as a group. Values above 0.9 are considered excellent.',
  },
  {
    label: "Cramer's V",
    value: '0.882',
    description: 'Strong association between agent presence and payment delays.',
    tooltip:
      'A measure of association between two categorical variables. Values above 0.5 indicate a strong relationship.',
  },
  {
    label: "Cohen's d",
    value: '1.8+',
    description: 'Large effect size for stress differential with agents.',
  },
  {
    label: 'P-value',
    value: '<0.001',
    description: 'Statistically significant across all measures.',
  },
];

function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
        aria-label="More information"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-border bg-primary-dark p-3 text-xs leading-relaxed text-text-secondary shadow-card"
        >
          {content}
          <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-primary-dark" />
        </span>
      )}
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as number[] },
  },
};

const noopCardVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function ResearchBacked() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const iVariants = prefersReducedMotion ? noopCardVariants : cardVariants;
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: 0.2 },
        },
      };

  async function handleCopyCitation() {
    try {
      await navigator.clipboard.writeText(CITATION);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = CITATION;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Subtle background differentiation */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary-medium/40 via-transparent to-accent-gold/5" />

      <Container size="lg">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Built on <span className="text-gradient">Research</span>, Not
            Assumptions
          </h2>
          <p className="mt-4 text-base text-text-secondary sm:text-lg">
            Directrent.ng isn&apos;t just another app. It&apos;s the product of
            rigorous academic research into Lagos&apos;s rental market —
            surveying 70 participants across 50 tenants and 20 landlords to
            quantify the &ldquo;Agent Effect.&rdquo;
          </p>
        </motion.div>

        {/* Metric cards — 2x2 on mobile, 4-col on desktop */}
        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={iVariants}
              className="rounded-2xl border border-border bg-primary-medium p-4 text-center sm:p-6"
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xs font-medium text-text-muted sm:text-sm">
                  {metric.label}
                </span>
                {metric.tooltip && (
                  <Tooltip content={metric.tooltip}>
                    <HelpCircle
                      className="size-3.5 text-text-muted transition-colors hover:text-accent-gold"
                      aria-hidden="true"
                    />
                  </Tooltip>
                )}
              </div>
              <p className="mt-2 font-display text-2xl font-bold text-accent-gold sm:text-3xl md:text-4xl">
                {metric.value}
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Citation */}
        <motion.div
          className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-primary-medium/50 p-4 sm:mt-12 sm:p-5"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-xs leading-relaxed text-text-muted">
              Research conducted as part of MBA Capstone, Rome Business School,
              2025. N=70 (50 tenants, 20 landlords).
            </p>
            <button
              onClick={handleCopyCitation}
              className={cn(
                'inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-medium',
                copied
                  ? 'bg-success/10 text-success'
                  : 'bg-primary-dark text-text-secondary hover:text-text-primary'
              )}
            >
              {copied ? (
                <>
                  <Check className="size-3.5" aria-hidden="true" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" aria-hidden="true" />
                  Copy Citation
                </>
              )}
            </button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
