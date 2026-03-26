'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';

function formatNaira(value: number): string {
  return '₦' + value.toLocaleString('en-NG');
}

export function SavingsCalculator() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const [rawRent, setRawRent] = useState(0);
  const [displayValue, setDisplayValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, '');
    if (digits === '') {
      setRawRent(0);
      setDisplayValue('');
      return;
    }
    const num = parseInt(digits, 10);
    setRawRent(num);
    setDisplayValue(num.toLocaleString('en-NG'));
  }

  const traditionalFee = rawRent * 0.32;
  const directrentFee = rawRent * 0.02;
  const savings = rawRent * 0.30;
  const showResults = rawRent >= 100000;

  return (
    <section ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary-medium/40 via-transparent to-accent-gold/5" />

      <Container size="md">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            See How Much You&apos;ll{' '}
            <span className="text-gradient">Save</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Enter your annual rent to calculate your savings with Directrent.ng.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-primary-medium p-6 sm:p-8 md:p-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
        >
          {/* Input */}
          <div>
            <label
              htmlFor="annual-rent"
              className="mb-2 block text-sm font-medium text-text-primary"
            >
              Annual Rent
            </label>
            <div className="flex items-stretch overflow-hidden rounded-lg border border-border bg-primary-dark transition-colors duration-200 focus-within:border-accent-coral focus-within:ring-2 focus-within:ring-accent-coral/30">
              {/* Prefix — sits OUTSIDE the input, shares the visual container */}
              <span className="flex select-none items-center bg-primary-medium px-4 text-lg font-semibold text-text-muted">
                ₦
              </span>
              {/* Input — no border, no ring, no padding-left for prefix */}
              <input
                id="annual-rent"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 1,200,000"
                className="min-h-[48px] w-full bg-transparent px-4 py-3 text-right font-display text-xl font-bold text-text-primary placeholder:text-base placeholder:font-normal placeholder:text-text-muted focus:outline-none"
                value={displayValue}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                className="mt-6 space-y-3"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              >
                <div className="flex items-center justify-between rounded-xl bg-primary-dark p-4">
                  <span className="text-sm text-text-secondary">
                    Traditional Fees (Agent + Legal + Misc)
                  </span>
                  <span className="font-display text-lg font-bold text-error">
                    {formatNaira(traditionalFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-primary-dark p-4">
                  <span className="text-sm text-text-secondary">
                    Directrent.ng Fee (2%)
                  </span>
                  <span className="font-display text-lg font-bold text-accent-gold">
                    {formatNaira(directrentFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-success/10 p-4">
                  <span className="text-sm font-medium text-success">
                    Your Savings
                  </span>
                  <span className="font-display text-2xl font-bold text-success">
                    {formatNaira(savings)}
                  </span>
                </div>

                <p className="pt-2 text-center text-xs text-text-muted">
                  Based on average Lagos all-in rental fees (agent, legal, caution, and misc charges) vs Directrent.ng&apos;s
                  2% platform fee.
                </p>

                <div className="flex justify-center pt-4">
                  <Button asChild size="lg">
                    <Link href="/waitlist">
                      Join the Waitlist
                      <ArrowRight className="ml-2 size-5" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
