'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LAUNCH_AREAS, COMING_SOON_AREAS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations';

const REFERRAL_SOURCES = [
  'Social Media',
  'Friend/Family',
  'Google Search',
  'Blog/Article',
  'Other',
];

export default function WaitlistPage() {
  const prefersReducedMotion = useReducedMotion();
  const [submitState, setSubmitState] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submittedName, setSubmittedName] = useState('');
  const [positionNumber] = useState(
    () => Math.floor(Math.random() * 400) + 1800
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  async function onSubmit(data: WaitlistFormData) {
    try {
      setSubmittedName(data.name);

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) { throw new Error('Failed'); }

      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <section className="section">
      <Container size="sm">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <div className="rounded-2xl bg-primary-medium p-8 md:p-12">
          {submitState === 'success' ? (
            <motion.div
              className="flex flex-col items-center py-8 text-center"
              initial={
                prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle
                  className="size-8 text-success"
                  aria-hidden="true"
                />
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
                You&apos;re on the list!
              </h2>
              <p className="mt-2 text-text-secondary">
                Thanks for joining, {submittedName}! We&apos;ll notify you when
                Directrent.ng launches in your area.
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Your position:{' '}
                <span className="font-semibold text-accent-gold">
                  #{positionNumber}
                </span>
              </p>

              {/* What to expect */}
              <div className="mt-8 w-full rounded-xl border border-border bg-primary-dark p-6 text-left">
                <h3 className="mb-4 text-sm font-semibold text-text-secondary">
                  What to expect:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="size-5 shrink-0 text-accent-gold" />
                    <span>Early access when we launch in your area</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="size-5 shrink-0 text-accent-gold" />
                    <span>Exclusive founding member benefits</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="size-5 shrink-0 text-accent-gold" />
                    <span>Updates on our progress</span>
                  </li>
                </ul>
              </div>

              <Button asChild variant="outline" size="lg" className="mt-8">
                <Link href="/">Back to Home</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">
                  Join the Waitlist
                </h1>
                <p className="text-text-secondary">
                  Be among the first to experience a better way to rent in
                  Lagos.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                noValidate
              >
                {/* Name */}
                <Input
                  label="Full Name"
                  required
                  placeholder="Enter your full name"
                  error={errors.name?.message}
                  {...register('name')}
                />

                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                {/* Phone */}
                <Input
                  label="Phone Number"
                  type="tel"
                  required
                  placeholder="08012345678"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                {/* User Type */}
                <div>
                  <p className="mb-2 text-sm font-medium text-text-primary">
                    I am a{' '}
                    <span className="text-accent-coral" aria-hidden="true">
                      *
                    </span>
                  </p>
                  <div className="flex gap-4">
                    <label className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-primary-dark p-4 transition-all hover:border-accent-coral has-[:checked]:border-accent-coral has-[:checked]:bg-accent-coral/10">
                      <input
                        type="radio"
                        value="tenant"
                        className="sr-only"
                        {...register('userType')}
                      />
                      <span className="text-sm font-medium">Tenant</span>
                    </label>
                    <label className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-primary-dark p-4 transition-all hover:border-accent-coral has-[:checked]:border-accent-coral has-[:checked]:bg-accent-coral/10">
                      <input
                        type="radio"
                        value="landlord"
                        className="sr-only"
                        {...register('userType')}
                      />
                      <span className="text-sm font-medium">Landlord</span>
                    </label>
                  </div>
                  {errors.userType?.message && (
                    <p role="alert" className="mt-1.5 text-sm text-error">
                      {errors.userType.message}
                    </p>
                  )}
                </div>

                {/* Preferred Area */}
                <div>
                  <p className="mb-2 text-sm font-medium text-text-primary">
                    Preferred Area
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {LAUNCH_AREAS.map((area) => (
                      <label
                        key={area.value}
                        className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border border-border bg-primary-dark px-5 py-2.5 transition-all hover:border-accent-coral has-[:checked]:border-accent-coral has-[:checked]:bg-accent-coral/10 has-[:checked]:text-accent-coral"
                      >
                        <input
                          type="radio"
                          value={area.value}
                          className="sr-only"
                          {...register('area')}
                        />
                        <span className="text-sm font-medium">
                          {area.label}
                        </span>
                      </label>
                    ))}
                    {COMING_SOON_AREAS.map((area) => (
                      <div
                        key={area.value}
                        className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-border/50 bg-primary-dark/50 px-5 py-2.5 opacity-50"
                      >
                        <span className="text-sm text-text-muted">
                          {area.label}
                        </span>
                        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                          Soon
                        </span>
                      </div>
                    ))}
                  </div>
                  {errors.area?.message && (
                    <p role="alert" className="mt-1.5 text-sm text-error">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* Referral Source */}
                <div className="w-full">
                  <label
                    htmlFor="referral-source"
                    className="mb-2 block text-sm font-medium text-text-primary"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="referral-source"
                    className={cn(
                      'flex h-11 w-full rounded-lg border border-border bg-primary-medium px-4 py-2 text-base text-text-primary',
                      'focus:border-accent-coral focus:outline-none focus:ring-2 focus:ring-accent-coral focus:ring-offset-2 focus:ring-offset-primary-dark'
                    )}
                    {...register('referralSource')}
                  >
                    <option value="">Select an option</option>
                    {REFERRAL_SOURCES.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error banner */}
                {submitState === 'error' && (
                  <div className="flex items-center gap-3 rounded-lg border border-error/20 bg-error/10 p-4">
                    <AlertCircle
                      className="size-5 shrink-0 text-error"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-error">
                      Something went wrong. Please try again or email us
                      directly at{' '}
                      <a
                        href="mailto:hello@directrent.ng"
                        className="underline"
                      >
                        hello@directrent.ng
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                >
                  Join the Waitlist
                </Button>
              </form>

              {/* Benefits */}
              <div className="mt-8 border-t border-border pt-8">
                <h3 className="mb-4 text-center text-sm font-semibold text-text-secondary">
                  What you&apos;ll get:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="size-5 shrink-0 text-accent-gold" />
                    <span>Early access when we launch in your area</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="size-5 shrink-0 text-accent-gold" />
                    <span>Exclusive founding member benefits</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle className="size-5 shrink-0 text-accent-gold" />
                    <span>Updates on our progress</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
