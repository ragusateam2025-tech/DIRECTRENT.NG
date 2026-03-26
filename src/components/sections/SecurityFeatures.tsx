'use client';

import { useRef } from 'react';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Lock, Shield, UserCheck } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Lock,
    title: 'Bank-Level Encryption',
    description:
      'All data encrypted with AES-256. Your personal information and financial data are protected with the same standard used by leading banks.',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
  },
  {
    icon: Shield,
    title: 'Escrow Protection',
    description:
      'Money held safely by Paystack until move-in is confirmed. If something goes wrong, you\'re fully protected and can request a refund.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: UserCheck,
    title: 'Verified Users Only',
    description:
      'Every user is verified with government-issued BVN or NIN. Know exactly who you\'re dealing with before any commitment.',
    color: 'text-info',
    bg: 'bg-info/10',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopCardVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function SecurityFeatures() {
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
          transition: { staggerChildren: 0.05, delayChildren: 0.2 },
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
            Your Security is Our{' '}
            <span className="text-gradient">Priority</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={iVariants}
                className="rounded-2xl border border-border bg-primary-medium p-6 text-center md:p-8"
              >
                <div
                  className={cn(
                    'mx-auto mb-5 flex size-14 items-center justify-center rounded-xl',
                    feature.bg
                  )}
                >
                  <Icon className={cn('size-7', feature.color)} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
