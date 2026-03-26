'use client';

import { useRef } from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

type UserType = 'tenant' | 'landlord';

const tenantLabels = [
  'Create Profile',
  'Discover Properties',
  'Connect Directly',
  'Pay & Move In',
];

const landlordLabels = [
  'List Property',
  'Verified Tenants',
  'Chat & Screen',
  'Payment & Lease',
];

interface ProcessTimelineProps {
  activeView: UserType;
}

export function ProcessTimeline({ activeView }: ProcessTimelineProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const labels = activeView === 'tenant' ? tenantLabels : landlordLabels;

  return (
    <section ref={ref} className="section-sm relative">
      <Container size="lg">
        {/* Horizontal timeline — desktop */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute inset-x-[calc(12.5%)] top-5 h-0.5 bg-border" />
            <motion.div
              className="absolute inset-x-[calc(12.5%)] top-5 h-0.5 origin-left bg-accent-coral"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }
              }
            />

            {labels.map((label, i) => (
              <motion.div
                key={`${activeView}-${i}`}
                className="relative z-10 flex w-1/4 flex-col items-center"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.3 + i * 0.2 }}
              >
                {/* Dot */}
                <div
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full border-2 font-display text-sm font-bold',
                    'border-accent-coral bg-primary-dark text-accent-coral'
                  )}
                >
                  {i + 1}
                </div>
                <p className="mt-3 text-center text-sm font-medium text-text-secondary">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical timeline — mobile */}
        <div className="md:hidden">
          <div className="relative ml-5 border-l-2 border-border pl-8">
            <motion.div
              className="absolute inset-y-0 -left-px w-0.5 origin-top bg-accent-coral"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }
              }
            />

            {labels.map((label, i) => (
              <motion.div
                key={`${activeView}-mob-${i}`}
                className="relative pb-8 last:pb-0"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.3 + i * 0.2 }}
              >
                {/* Dot */}
                <div className="absolute -left-[37px] flex size-8 items-center justify-center rounded-full border-2 border-accent-coral bg-primary-dark font-display text-xs font-bold text-accent-coral">
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
