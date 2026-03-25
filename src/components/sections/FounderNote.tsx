'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as number[] },
  },
};

const noopVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function FounderNote() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const iVariants = prefersReducedMotion ? noopVariants : itemVariants;
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
      };

  return (
    <section ref={ref} className="section relative">
      <Container size="md">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary-medium to-primary-dark p-6 sm:rounded-3xl sm:p-8 md:p-12"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Subtle texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              backgroundSize: '128px 128px',
            }}
          />

          <motion.h2
            className="font-display text-lg font-bold text-text-primary sm:text-xl md:text-2xl"
            variants={iVariants}
          >
            A Note From Our Founder
          </motion.h2>

          <motion.p
            className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg"
            variants={iVariants}
          >
            I know the Lagos rental nightmare firsthand. As a young professional
            searching for an apartment, I was shocked by how much of my savings
            went to agents who added no real value — just gatekeeping and
            frustration.
          </motion.p>

          <motion.p
            className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg"
            variants={iVariants}
          >
            That experience became the foundation of my MBA capstone research at
            Rome Business School, where I studied 70 participants across Lagos
            to quantify what I call the &ldquo;Agent Effect&rdquo; — the
            measurable financial and psychological burden of the mandatory
            middleman system.
          </motion.p>

          <motion.p
            className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg"
            variants={iVariants}
          >
            The numbers confirmed what every Lagos renter already knows:
            the system is broken, and technology can fix it. Directrent.ng is
            that fix — a platform built on research, not assumptions, designed to
            give power back to the people who actually own and rent homes.
          </motion.p>

          <motion.p
            className="mt-8 font-display text-lg font-semibold text-accent-gold sm:text-xl"
            variants={iVariants}
          >
            — Ololade, Founder
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
