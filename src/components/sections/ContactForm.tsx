'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Send,
} from 'lucide-react';

import { Container } from '@/components/layout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const socialLinks = [
  { label: 'Twitter', href: SOCIAL_LINKS.twitter },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook },
];

export function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const [submitState, setSubmitState] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  }

  return (
    <section ref={ref} className="section relative">
      <Container size="lg">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info — appears first on mobile for context */}
          <motion.div
            className="lg:col-span-2 lg:order-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-border bg-primary-medium p-6 md:p-8">
              <h2 className="mb-6 font-display text-xl font-semibold text-text-primary">
                Contact Information
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-coral/10">
                    <Mail className="h-5 w-5 text-accent-coral" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Email</p>
                    <p className="text-sm text-text-secondary">{SITE_CONFIG.email}</p>
                  </div>
                </a>

                {/* Phone */}
                <div className="flex items-start gap-4 p-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-gold/10">
                    <Phone className="h-5 w-5 text-accent-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Phone</p>
                    <p className="text-sm text-text-secondary">{SITE_CONFIG.phone}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                    <MapPin className="h-5 w-5 text-success" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Location</p>
                    <p className="text-sm text-text-secondary">{SITE_CONFIG.location}</p>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-border" />

              {/* Social links */}
              <div>
                <p className="mb-3 text-sm font-medium text-text-primary">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-border px-3 py-2 text-sm text-text-secondary transition-colors hover:border-accent-coral hover:text-accent-coral"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <hr className="my-6 border-border" />

              {/* Office hours */}
              <p className="text-xs leading-relaxed text-text-muted">
                We typically respond within 24 hours during business days
                (Mon–Fri, 9AM–6PM WAT).
              </p>
            </div>
          </motion.div>

          {/* Form — appears second on mobile */}
          <motion.div
            className="lg:col-span-3 lg:order-1"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl border border-border bg-primary-medium p-6 md:p-8">
              {submitState === 'success' ? (
                <motion.div
                  className="flex flex-col items-center py-12 text-center"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle className="h-8 w-8 text-success" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-text-primary">
                    Message Sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-text-secondary">
                    Thanks for reaching out. We&apos;ll get back to you within
                    24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    className="mt-6"
                    onClick={() => setSubmitState('idle')}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <h2 className="mb-2 font-display text-xl font-semibold text-text-primary">
                    Send Us a Message
                  </h2>

                  {/* Name & Email row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      required
                      placeholder="Your full name"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  {/* Phone & Subject row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="08012345678"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Input
                      label="Subject"
                      required
                      placeholder="What's this about?"
                      error={errors.subject?.message}
                      {...register('subject')}
                    />
                  </div>

                  {/* User type radio */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-text-primary">
                      I am a...
                    </p>
                    <div className="flex gap-4">
                      <label className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-primary-dark p-3 transition-all hover:border-accent-coral has-[:checked]:border-accent-coral has-[:checked]:bg-accent-coral/10">
                        <input
                          type="radio"
                          value="tenant"
                          className="sr-only"
                          {...register('userType')}
                        />
                        <span className="text-sm font-medium">Tenant</span>
                      </label>
                      <label className="flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-primary-dark p-3 transition-all hover:border-accent-coral has-[:checked]:border-accent-coral has-[:checked]:bg-accent-coral/10">
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

                  {/* Message textarea */}
                  <div className="w-full">
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-medium text-text-primary"
                    >
                      Message{' '}
                      <span className="text-accent-coral" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      aria-invalid={!!errors.message}
                      className={cn(
                        'flex min-h-[120px] w-full resize-y rounded-lg border bg-primary-medium px-4 py-3 text-base text-text-primary placeholder:text-text-muted',
                        'focus:outline-none focus:ring-2 focus:ring-accent-coral focus:ring-offset-2 focus:ring-offset-primary-dark',
                        errors.message
                          ? 'border-error focus:border-error'
                          : 'border-border focus:border-accent-coral'
                      )}
                      {...register('message')}
                    />
                    {errors.message?.message && (
                      <p role="alert" className="mt-1.5 text-sm text-error">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  {submitState === 'error' && (
                    <div className="flex items-center gap-3 rounded-lg border border-error/20 bg-error/10 p-4">
                      <AlertCircle className="h-5 w-5 shrink-0 text-error" aria-hidden="true" />
                      <p className="text-sm text-error">
                        Something went wrong. Please try again or email us
                        directly at{' '}
                        <a
                          href={`mailto:${SITE_CONFIG.email}`}
                          className="underline"
                        >
                          {SITE_CONFIG.email}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    rightIcon={
                      !isSubmitting ? (
                        <Send className="h-5 w-5" aria-hidden="true" />
                      ) : undefined
                    }
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
