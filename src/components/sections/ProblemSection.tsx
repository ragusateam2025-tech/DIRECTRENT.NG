'use client';

import { useRef, useState, useCallback } from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { AlertTriangle, Clock, Ghost, ShieldOff, TrendingDown, Ban } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

const painPoints = [
  {
    icon: AlertTriangle,
    title: '78% encounter fake listings',
    description: 'Hours wasted visiting properties that don\'t exist or look nothing like the photos.',
  },
  {
    icon: Clock,
    title: '2-3 months average search time',
    description: 'Agents deliberately delay the process to extract more fees and "inspection" charges.',
  },
  {
    icon: Ghost,
    title: 'Zero accountability',
    description: 'Agent complaints resolution rate is below 10%. Once fees are paid, they vanish.',
  },
  {
    icon: ShieldOff,
    title: 'No payment protection',
    description: 'Tenants hand over large sums with no escrow, no receipts, and no recourse.',
  },
  {
    icon: TrendingDown,
    title: 'Inflated prices',
    description: 'Agents add markups to rental prices, keeping the difference as hidden profit.',
  },
  {
    icon: Ban,
    title: 'Blocked communication',
    description: 'Tenants and landlords can\'t talk directly. Everything goes through the middleman.',
  },
];

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

export function ProblemSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const handlePainPointHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
  }, []);

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
            The Problem We&apos;re{' '}
            <span className="text-accent-coral">Solving</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* LEFT: The Agent Effect — By the Numbers */}
          <motion.div
            className="rounded-2xl border border-border bg-primary-medium p-6 md:p-8"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: 0.2 }}
          >
            <h3 className="mb-2 font-display text-xl font-semibold text-text-primary">
              The Agent Effect
            </h3>
            <p className="mb-8 text-sm text-text-muted">
              Primary research data from 70 Lagos residents
            </p>

            <div className="space-y-6">
              {/* Stat 1: Vacancy Days */}
              <div className="rounded-xl bg-primary-dark p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">
                    Agent-managed vacancy
                  </span>
                  <span className="font-display text-2xl font-bold text-error md:text-3xl">
                    63 days
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">
                    Direct-managed vacancy
                  </span>
                  <span className="font-display text-2xl font-bold text-success md:text-3xl">
                    25 days
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-medium">
                  <div className="h-full w-[39%] rounded-full bg-success" />
                </div>
                <p className="mt-2 text-xs font-medium text-accent-gold">
                  61% faster with direct connections
                </p>
              </div>

              {/* Stat 2: Psychological Stress Score */}
              <div className="rounded-xl bg-primary-dark p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">
                    Stress with agents
                  </span>
                  <span className="font-display text-2xl font-bold text-error md:text-3xl">
                    7.4<span className="text-base font-normal text-text-muted">/10</span>
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">
                    Stress without agents
                  </span>
                  <span className="font-display text-2xl font-bold text-success md:text-3xl">
                    2.4<span className="text-base font-normal text-text-muted">/10</span>
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-accent-gold">
                  Cohen&apos;s d = 3.36 — massive effect size
                </p>
              </div>

              {/* Stat 3: Payment Delays */}
              <div className="rounded-xl bg-primary-dark p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">
                    Payment delays with agents
                  </span>
                  <span className="font-display text-2xl font-bold text-error md:text-3xl">
                    93%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">
                    Payment delays without agents
                  </span>
                  <span className="font-display text-2xl font-bold text-success md:text-3xl">
                    0%
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-accent-gold">
                  Cramer&apos;s V = 0.882 — near-perfect correlation
                </p>
              </div>

              {/* Stat 4: Platform adoption intent */}
              <div className="flex items-center justify-between rounded-xl bg-accent-gold/10 p-4">
                <span className="text-sm font-medium text-accent-gold">
                  Would switch to a direct platform
                </span>
                <span className="font-display text-2xl font-bold text-accent-gold md:text-3xl">
                  100%
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Hidden Costs / Pain Points */}
          <motion.div
            variants={cVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="mb-6 font-display text-xl font-semibold text-text-primary">
              The Hidden Costs
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {painPoints.map((point, i) => {
                const Icon = point.icon;
                const isHovered = hoveredIndex === i;
                const anotherHovered = hoveredIndex !== null && hoveredIndex !== i;

                return (
                  <motion.div
                    key={point.title}
                    variants={iVariants}
                    className={cn(
                      'flex gap-3 rounded-xl border border-border bg-primary-medium p-4 transition-opacity duration-200',
                      anotherHovered && 'opacity-50'
                    )}
                    onMouseEnter={() => handlePainPointHover(i)}
                    onMouseLeave={() => handlePainPointHover(null)}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-error/10">
                      <Icon
                        className="size-5 text-error"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {point.title}
                      </p>
                      <p
                        className={cn(
                          'mt-1 text-xs leading-relaxed text-text-muted transition-all duration-200',
                          isHovered && 'text-text-secondary'
                        )}
                      >
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
