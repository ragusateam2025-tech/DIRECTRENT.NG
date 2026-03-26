'use client';

import { useRef } from 'react';

import Link from 'next/link';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';

export function FeaturesCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-accent-coral/5 via-transparent to-accent-gold/5" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -z-10 size-80 -translate-x-1/2 rounded-full bg-accent-coral/5 blur-[100px]" />

      <Container size="md">
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Ready to Experience{' '}
            <span className="text-gradient">Better Renting?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Join thousands of Lagos residents already on the waitlist. Be the
            first to access every feature when we launch.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <Button asChild size="lg" fullWidth className="sm:w-auto">
              <Link href="/waitlist" className="inline-flex items-center gap-2">
                <span>Join as Tenant</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" fullWidth className="sm:w-auto">
              <Link href="/waitlist">List Your Property</Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
