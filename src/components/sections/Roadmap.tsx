'use client';

import { useRef } from 'react';

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Code2, Rocket, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface Milestone {
  icon: LucideIcon;
  title: string;
  period: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

const milestones: Milestone[] = [
  {
    icon: Code2,
    title: 'Platform Development',
    period: '2025 - 2026',
    description:
      'Building the marketing website, mobile apps for tenants and landlords, and the core escrow payment infrastructure.',
    status: 'current',
  },
  {
    icon: Rocket,
    title: 'Yaba & Surulere Launch',
    period: '2026',
    description:
      'Hyperlocal launch in two of Lagos\'s most active rental markets. Onboarding early adopters from the waitlist.',
    status: 'upcoming',
  },
  {
    icon: Globe,
    title: 'Lagos-Wide Expansion',
    period: '2027+',
    description:
      'Expanding to Ikeja, Lekki, Victoria Island, and beyond. Adding features like virtual tours and AI-powered pricing.',
    status: 'upcoming',
  },
];

function MilestoneTooltip({ children }: { children: React.ReactNode }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent-gold/20 px-2 py-1 text-xs font-medium text-accent-gold opacity-0 transition-opacity group-hover/tip:opacity-100"
      >
        Coming Soon
      </span>
    </span>
  );
}

export function Roadmap() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} className="section relative">
      <Container size="lg">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Our <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline — always vertical, left-aligned */}
        <div className="mx-auto max-w-2xl">
          <div className="relative pl-8 sm:pl-10">
            {/* Timeline line */}
            <div className="absolute inset-y-0 left-[7px] w-0.5 overflow-hidden sm:left-[9px]">
              <div className="size-full bg-border" />
              <motion.div
                className="absolute left-0 top-0 w-full bg-accent-gold"
                style={
                  prefersReducedMotion
                    ? { height: '100%' }
                    : { height: lineHeight }
                }
              />
            </div>

            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;

              const dot = (
                <div
                  className={cn(
                    'absolute left-0 top-1 z-10 flex items-center justify-center rounded-full border-2',
                    'size-4 sm:size-5',
                    milestone.status === 'completed' &&
                      'border-accent-gold bg-accent-gold',
                    milestone.status === 'current' &&
                      'animate-pulse-gold border-accent-coral bg-accent-coral',
                    milestone.status === 'upcoming' &&
                      'border-border bg-primary-dark'
                  )}
                >
                  {milestone.status === 'completed' && (
                    <div className="size-1.5 rounded-full bg-primary-dark sm:size-2" />
                  )}
                  {milestone.status === 'current' && (
                    <div className="size-1.5 rounded-full bg-white sm:size-2" />
                  )}
                </div>
              );

              return (
                <div key={milestone.title} className="relative pb-10 last:pb-0">
                  {milestone.status === 'upcoming' ? (
                    <MilestoneTooltip>{dot}</MilestoneTooltip>
                  ) : (
                    dot
                  )}

                  <motion.div
                    className="ml-6 rounded-xl border border-border bg-primary-medium p-4 sm:ml-8 sm:p-5"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: prefersReducedMotion ? 0 : 0.2 + i * 0.15,
                    }}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-lg',
                          milestone.status === 'completed' && 'bg-accent-gold/10',
                          milestone.status === 'current' && 'bg-accent-coral/10',
                          milestone.status === 'upcoming' && 'bg-white/5'
                        )}
                      >
                        <Icon
                          className={cn(
                            'size-5',
                            milestone.status === 'completed' && 'text-accent-gold',
                            milestone.status === 'current' && 'text-accent-coral',
                            milestone.status === 'upcoming' && 'text-text-muted'
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-text-primary sm:text-xl">
                          {milestone.title}
                        </h3>
                        <p className="text-xs text-text-muted sm:text-sm">
                          {milestone.period}
                        </p>
                      </div>
                      {milestone.status === 'current' && (
                        <span className="ml-auto shrink-0 rounded-full bg-accent-coral/10 px-2.5 py-0.5 text-xs font-medium text-accent-coral">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
