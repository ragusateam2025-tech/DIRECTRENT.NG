'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ShieldCheck, CreditCard, Scale } from 'lucide-react';

import { Container } from '@/components/layout';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    name: 'Adaeze O.',
    role: 'Landlord, Surulere',
    quote:
      'Found a verified tenant in 2 weeks. No more dealing with unreliable agents.',
  },
  {
    name: 'Tayo A.',
    role: 'Tenant, Yaba',
    quote:
      'Saved over ₦300,000 in agency fees. The direct landlord connection changed everything.',
  },
  {
    name: 'Chidi N.',
    role: 'Tenant, Surulere',
    quote:
      'Finally, a platform that respects renters. No hidden fees, no surprises.',
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'BVN Verified', color: 'text-success' },
  { icon: CreditCard, label: 'Paystack Secured', color: 'text-accent-gold' },
  { icon: Scale, label: 'NDPR Compliant', color: 'text-info' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
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

export function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const cVariants = prefersReducedMotion ? noopContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? noopItemVariants : itemVariants;

  return (
    <section ref={ref} className="section relative">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary-medium/30 to-transparent" />

      <Container size="xl">
        <motion.div
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Counter */}
          <motion.div className="mb-4 text-center" variants={iVariants}>
            <span className="font-display text-5xl font-bold text-text-primary md:text-6xl">
              <AnimatedCounter target={2000} suffix="+" />
            </span>
          </motion.div>
          <motion.p
            className="mb-12 text-center text-lg text-text-secondary md:mb-16 md:text-xl"
            variants={iVariants}
          >
            early adopters already on the waitlist
          </motion.p>

          {/* AI Ambassador Trust Callout */}
          <motion.div
            className="mx-auto mb-12 max-w-4xl overflow-hidden rounded-2xl border border-border bg-primary-medium md:mb-16"
            variants={iVariants}
          >
            <div className="grid items-center md:grid-cols-5">
              {/* Image */}
              <div className="relative aspect-square md:col-span-2 md:aspect-auto md:h-full">
                <Image
                  src="/images/ai-ambassador.webp"
                  alt="Directrent AI-powered verification ambassador ensuring trust and safety"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary-medium/50 md:bg-gradient-to-l" />
              </div>
              {/* Content */}
              <div className="p-6 sm:p-8 md:col-span-3">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1">
                  <ShieldCheck className="size-4 text-success" aria-hidden="true" />
                  <span className="text-xs font-semibold text-success">
                    AI-POWERED VERIFICATION
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
                  Trust Built Into Every Transaction
                </h3>
                <p className="mt-3 text-sm text-text-secondary sm:text-base">
                  Every landlord and tenant is verified through BVN/NIN identity
                  checks. Our AI-powered system screens listings for authenticity,
                  flags suspicious activity, and ensures your rental journey is
                  safe from start to finish.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {trustBadges.map((badge) => {
                    const Icon = badge.icon;
                    return (
                      <div
                        key={badge.label}
                        className="flex items-center gap-1.5 rounded-full border border-border bg-primary-dark/50 px-3 py-1.5"
                      >
                        <Icon
                          className={cn('size-4', badge.color)}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-medium text-text-secondary">
                          {badge.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3"
            variants={cVariants}
          >
            {testimonials.map((t) => (
              <motion.blockquote
                key={t.name}
                className="rounded-xl border border-border bg-primary-medium p-6 text-left"
                variants={iVariants}
              >
                <p className="text-sm italic text-text-secondary">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-sm font-semibold text-text-primary">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
