'use client';

import Image from 'next/image';

import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

type UserType = 'tenant' | 'landlord';

interface HowItWorksHeroProps {
  activeView: UserType;
  onViewChange: (view: UserType) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function HowItWorksHero({ activeView, onViewChange }: HowItWorksHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const cVariants = prefersReducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : containerVariants;
  const iVariants = prefersReducedMotion ? noopVariants : itemVariants;

  return (
    <section className="relative overflow-hidden pb-8 pt-12 md:pb-12 md:pt-16">
      {/* Background lifestyle image */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/female-models.webp"
          alt="Happy Directrent users exploring rental options in Lagos"
          fill
          className="object-cover object-top opacity-15"
          sizes="100vw"
          quality={60}
        />
      </div>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary-dark via-primary-medium/40 to-primary-dark" />
      <div className="pointer-events-none absolute left-1/3 top-10 -z-10 size-80 rounded-full bg-accent-coral/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 size-64 rounded-full bg-accent-gold/5 blur-[80px]" />

      <Container size="lg">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={cVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
            variants={iVariants}
          >
            Renting Made{' '}
            <span className="text-gradient">Simple</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-text-secondary md:text-xl"
            variants={iVariants}
          >
            Whether you&apos;re looking for your next home or your next tenant,
            Directrent.ng gets you there in 4 simple steps — with zero agent
            fees.
          </motion.p>

          {/* Toggle */}
          <motion.div
            className="mt-10 inline-flex items-center rounded-full border border-border bg-primary-medium p-1"
            variants={iVariants}
            role="tablist"
            aria-label="Select user type"
          >
            <button
              role="tab"
              aria-selected={activeView === 'tenant'}
              onClick={() => onViewChange('tenant')}
              className={cn(
                'relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
                activeView === 'tenant'
                  ? 'bg-accent-coral text-white shadow-button'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              For Tenants
            </button>
            <button
              role="tab"
              aria-selected={activeView === 'landlord'}
              onClick={() => onViewChange('landlord')}
              className={cn(
                'relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
                activeView === 'landlord'
                  ? 'bg-accent-coral text-white shadow-button'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              For Landlords
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
