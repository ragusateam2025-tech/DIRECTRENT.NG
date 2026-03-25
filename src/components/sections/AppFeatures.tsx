'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  MessageSquare,
  Shield,
  FileSignature,
  MapPin,
  Bell,
} from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

/* -------------------------------------------------- */
/* Feature items                                       */
/* -------------------------------------------------- */

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
  span?: string;
}

const features: FeatureItem[] = [
  {
    icon: MessageSquare,
    title: 'Direct Landlord Chat',
    description: 'Message property owners instantly — no middleman, no delays.',
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
  },
  {
    icon: Shield,
    title: 'Secure Escrow Payments',
    description: 'Pay through Paystack escrow. Funds release only after you move in.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: FileSignature,
    title: 'Digital Lease Signing',
    description: 'Sign legally binding lease agreements directly from your phone.',
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    icon: MapPin,
    title: 'Neighborhood Insights',
    description: 'Get safety ratings, amenity data, and community reviews before you move.',
    color: 'text-accent-orange',
    bg: 'bg-accent-orange/10',
  },
  {
    icon: Bell,
    title: 'Rent Payment Reminders',
    description: 'Never miss a payment with automated reminders and easy pay options.',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
    span: 'sm:col-span-2 lg:col-span-1',
  },
];

/* -------------------------------------------------- */
/* Animation variants                                  */
/* -------------------------------------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
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

/* -------------------------------------------------- */
/* Component                                           */
/* -------------------------------------------------- */

export function AppFeatures() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const cVariants = prefersReducedMotion ? noopContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? noopItemVariants : itemVariants;

  return (
    <section ref={ref} className="section relative">
      <Container size="xl">
        {/* Section header */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Everything You Need to{' '}
            <span className="text-gradient">Rent Smarter</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Powerful features designed for the Lagos rental market.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((item) => (
            <motion.div
              key={item.title}
              variants={iVariants}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { scale: 1.02, transition: { duration: 0.2 } }
              }
              className={cn(
                'rounded-2xl border border-border bg-primary-medium p-6',
                'transition-shadow duration-200 hover:shadow-card-hover',
                item.span
              )}
            >
              <div
                className={cn(
                  'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl',
                  item.bg
                )}
              >
                <item.icon
                  className={cn('h-6 w-6', item.color)}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-lg font-semibold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
