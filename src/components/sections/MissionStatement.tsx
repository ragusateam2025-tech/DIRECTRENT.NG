'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { motion, useInView, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as number[] },
  },
};

const noopVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function MissionStatement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  const iVariants = prefersReducedMotion ? noopVariants : itemVariants;
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 },
        },
      };

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background apartment image */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/minimalist-apartment-luxury-grey.webp"
          alt="Luxury apartment interior representing Lagos housing aspirations"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
          quality={50}
        />
      </div>

      <Container size="lg">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.blockquote variants={iVariants}>
            <p className="font-display text-2xl font-bold italic leading-snug text-accent-gold md:text-4xl">
              <span className="text-accent-gold/40">&ldquo;</span>
              We believe finding a home in Lagos shouldn&apos;t cost you months
              of salary in agent fees.
              <span className="text-accent-gold/40">&rdquo;</span>
            </p>
          </motion.blockquote>

          <motion.p
            className="mt-8 text-lg leading-relaxed text-text-secondary md:text-xl"
            variants={iVariants}
          >
            Directrent.ng exists to restore fairness to the Lagos rental market
            by connecting landlords and tenants directly — eliminating the
            &ldquo;Mandatory Middleman&rdquo; that has burdened renters for
            decades.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
