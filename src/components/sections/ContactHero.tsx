'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

export function ContactHero() {
  const prefersReducedMotion = useReducedMotion();
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : containerVariants;
  const iVariants = prefersReducedMotion ? noopVariants : itemVariants;

  return (
    <section className="relative overflow-hidden pb-8 pt-12 md:pb-12 md:pt-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary-dark via-primary-medium/40 to-primary-dark" />
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-80 w-80 rounded-full bg-accent-gold/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 -z-10 h-64 w-64 rounded-full bg-accent-coral/5 blur-[80px]" />

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
            Get in <span className="text-gradient">Touch</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-text-secondary md:text-xl"
            variants={iVariants}
          >
            Have a question, partnership idea, or just want to say hello?
            We&apos;d love to hear from you.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
