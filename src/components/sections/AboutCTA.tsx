'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';

const stats = [
  { value: '2,000+', label: 'Early Adopters' },
  { value: '₦300,000', label: 'Average Savings' },
  { value: '2%', label: 'Platform Fee' },
];

export function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden py-12 sm:py-16 md:py-20">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-accent-coral/5 via-transparent to-accent-gold/5" />
        <div className="pointer-events-none absolute -bottom-20 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-coral/5 blur-[100px]" />

        <Container size="lg">
          {/* Stats row */}
          <motion.div
            className="mx-auto mb-12 grid max-w-3xl grid-cols-1 gap-6 sm:mb-16 sm:grid-cols-3 sm:gap-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-accent-gold sm:text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-text-muted sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
              Ready to Rent the{' '}
              <span className="text-gradient">Smart Way?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary sm:text-base md:text-lg">
              Join thousands of Lagos residents who are already saving money
              and finding better homes — without the middleman.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" fullWidth className="sm:w-auto">
                <Link href="/waitlist">
                  Join as Tenant
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
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
