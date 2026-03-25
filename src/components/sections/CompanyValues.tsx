'use client';

import { useRef, useCallback } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Eye, Users, Wallet, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const values: Value[] = [
  {
    icon: Eye,
    title: 'Trust Through Transparency',
    description:
      'No hidden fees, no surprises. Every cost is visible upfront. We earn trust by making the process open and honest.',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
  },
  {
    icon: Users,
    title: 'Direct Connection',
    description:
      'We remove barriers between landlords and tenants. Real conversations lead to better outcomes for everyone.',
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: Wallet,
    title: 'Fair Pricing',
    description:
      'A 2% platform fee instead of 30%+ in traditional agent, legal, and miscellaneous charges. Housing access shouldn\'t come with a punishing tax.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: MapPin,
    title: 'Lagos First',
    description:
      'Built in Lagos, for Lagos. We understand the neighborhoods, the culture, and the unique challenges of this city.',
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
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

function MagneticCard({ value }: { value: Value }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const Icon = value.icon;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty('--mouse-x', `${x}%`);
      cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    },
    [prefersReducedMotion]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-primary-medium p-6 md:p-8',
        'before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300',
        'before:bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(212,168,83,0.06),transparent_60%)]',
        'hover:before:opacity-100'
      )}
    >
      <div
        className={cn(
          'mb-5 flex h-12 w-12 items-center justify-center rounded-xl',
          value.bg
        )}
      >
        <Icon className={cn('h-6 w-6', value.color)} aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-text-primary">
        {value.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {value.description}
      </p>
    </div>
  );
}

export function CompanyValues() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const iVariants = prefersReducedMotion ? noopCardVariants : cardVariants;
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: 0.15 },
        },
      };

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
            What We <span className="text-gradient">Stand For</span>
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="overflow-hidden md:hidden">
          <motion.div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pl-4 pb-6 scrollbar-hide"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="w-[280px] shrink-0 snap-center rounded-2xl border border-border bg-primary-medium p-6"
                >
                  <div
                    className={cn(
                      'mb-5 flex h-12 w-12 items-center justify-center rounded-xl',
                      value.bg
                    )}
                  >
                    <Icon className={cn('h-6 w-6', value.color)} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {value.description}
                  </p>
                </div>
              );
            })}
            <div className="w-4 shrink-0" aria-hidden="true" />
          </motion.div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-1.5" aria-hidden="true">
            {values.map((v) => (
              <div
                key={v.title}
                className="h-1.5 w-1.5 rounded-full bg-text-muted"
              />
            ))}
          </div>
        </div>

        {/* Desktop: 2x2 grid with magnetic effect */}
        <motion.div
          className="hidden gap-6 md:grid md:grid-cols-2"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={iVariants}>
              <MagneticCard value={value} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
