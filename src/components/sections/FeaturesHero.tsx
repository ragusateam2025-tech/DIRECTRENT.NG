'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

type UserType = 'tenant' | 'landlord';

interface FeaturesHeroProps {
  activeView: UserType;
  onViewChange: (view: UserType) => void;
}

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

const contextLines: Record<UserType, string> = {
  tenant: 'Features designed to help you find, verify, and secure your next home.',
  landlord: 'Features designed to help you list, screen, and manage tenants.',
};

export function FeaturesHero({ activeView, onViewChange }: FeaturesHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const cVariants = prefersReducedMotion ? noopContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? noopItemVariants : itemVariants;

  return (
    <section className="relative overflow-hidden pb-8 pt-12 md:pb-12 md:pt-16">
      {/* Background lifestyle image */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/guy-unpacking.png"
          alt="Young man confidently unpacking in his new Lagos apartment"
          fill
          className="object-cover object-top opacity-20"
          sizes="100vw"
          quality={60}
        />
      </div>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary-dark via-primary-medium/40 to-primary-dark" />
      <div className="pointer-events-none absolute left-1/3 top-10 -z-10 h-80 w-80 rounded-full bg-accent-coral/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-accent-gold/5 blur-[80px]" />

      <Container size="lg">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={cVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-1.5"
            variants={iVariants}
          >
            <span className="h-2 w-2 rounded-full bg-accent-gold animate-pulse-gold" />
            <span className="text-sm font-medium text-accent-gold">
              Launching in Yaba &amp; Surulere
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl"
            variants={iVariants}
          >
            Everything You Need to{' '}
            <span className="text-gradient">Rent Smarter</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-text-secondary md:text-xl"
            variants={iVariants}
          >
            Directrent.ng gives tenants and landlords the tools to connect
            directly — with identity verification, secure payments, and digital
            leases built in.
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
                'relative min-h-[44px] rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200',
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
                'relative min-h-[44px] rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
                activeView === 'landlord'
                  ? 'bg-accent-coral text-white shadow-button'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              For Landlords
            </button>
          </motion.div>

          {/* Context line */}
          <div className="mt-6 h-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeView}
                className="text-base text-text-muted"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              >
                {contextLines[activeView]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
