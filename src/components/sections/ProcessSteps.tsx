'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import {
  ShieldCheck,
  Search,
  MessageSquare,
  CreditCard,
  Home,
  UserCheck,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

type UserType = 'tenant' | 'landlord';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const tenantSteps: Step[] = [
  {
    number: 1,
    title: 'Create Your Profile',
    description:
      'Sign up in 2 minutes. Verify your identity with BVN or NIN to become a trusted tenant that landlords want to rent to.',
    icon: ShieldCheck,
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
  },
  {
    number: 2,
    title: 'Discover Properties',
    description:
      'Browse verified listings in Yaba, Surulere, and more. Filter by price, bedrooms, and amenities. Every property is real — no fake listings.',
    icon: Search,
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
  },
  {
    number: 3,
    title: 'Connect Directly',
    description:
      'Message landlords directly through our secure chat. Schedule viewings, ask questions, and negotiate terms — no middleman interference.',
    icon: MessageSquare,
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    number: 4,
    title: 'Pay Securely & Move In',
    description:
      'Pay through our secure escrow system. Your money is protected until you confirm move-in. Sign your digital lease and get the keys.',
    icon: CreditCard,
    color: 'text-success',
    bg: 'bg-success/10',
  },
];

const landlordSteps: Step[] = [
  {
    number: 1,
    title: 'List Your Property',
    description:
      'Create your listing in minutes. Add photos, set your price, and describe your property. No listing fees, ever.',
    icon: Home,
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
  },
  {
    number: 2,
    title: 'Get Verified Tenants',
    description:
      'Receive inquiries only from BVN/NIN verified tenants. Know who you\'re renting to before you even meet them.',
    icon: UserCheck,
    color: 'text-accent-coral',
    bg: 'bg-accent-coral/10',
  },
  {
    number: 3,
    title: 'Chat & Screen',
    description:
      'Communicate directly with interested tenants. Ask questions, share documents, and find the perfect match for your property.',
    icon: MessageSquare,
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    number: 4,
    title: 'Secure Payment & Lease',
    description:
      'Receive rent directly to your bank account. Our escrow system ensures payment before handover. Digital lease keeps everything legal.',
    icon: Wallet,
    color: 'text-success',
    bg: 'bg-success/10',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopCardVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

interface ProcessStepsProps {
  activeView: UserType;
}

export function ProcessSteps({ activeView }: ProcessStepsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const steps = activeView === 'tenant' ? tenantSteps : landlordSteps;
  const cVariants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
      };
  const iVariants = prefersReducedMotion ? noopCardVariants : cardVariants;

  return (
    <section ref={ref} className="section relative">
      <Container size="lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            className="grid gap-8 md:grid-cols-2"
            variants={cVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={iVariants}
                  className="group relative rounded-2xl border border-border bg-primary-medium p-6 transition-shadow duration-200 hover:shadow-card-hover md:p-8"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-accent-coral font-display text-sm font-bold text-white shadow-button">
                    {step.number}
                  </div>

                  <div className="mt-2 flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                        step.bg
                      )}
                    >
                      <Icon className={cn('h-6 w-6', step.color)} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-text-primary">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Lifestyle accent — desktop only */}
        <motion.div
          className="mt-8 hidden overflow-hidden rounded-2xl border border-border lg:block"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.3 }}
        >
          <div className="relative aspect-[19/6] sm:aspect-[16/7] lg:aspect-[21/9]">
            <Image
              src="/images/double-couple-2.jpg"
              alt="Two couples relaxing together in a beautifully furnished Lagos apartment found through Directrent"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 960px"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/70 via-primary-dark/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 max-w-md">
              <p className="font-display text-lg font-bold text-white sm:text-xl">
                From Search to Settled
              </p>
              <p className="mt-1 text-sm text-white/70">
                The entire journey takes 1–2 weeks with Directrent — not the 2–3
                months traditional agents need.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
