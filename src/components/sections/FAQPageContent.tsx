'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'getting-started' | 'payments' | 'verification' | 'landlords' | 'platform';
}

const faqCategories = [
  { value: 'all', label: 'All' },
  { value: 'getting-started', label: 'Getting Started' },
  { value: 'payments', label: 'Payments & Fees' },
  { value: 'verification', label: 'Verification' },
  { value: 'landlords', label: 'For Landlords' },
  { value: 'platform', label: 'Platform & Coverage' },
] as const;

const allFaqs: FAQItem[] = [
  // Getting Started
  {
    question: 'What is Directrent.ng?',
    answer:
      'Directrent.ng is a rental marketplace that connects landlords and tenants directly in Lagos, eliminating the traditional agent middleman. Instead of paying 30%+ in combined agent, legal, and miscellaneous fees, you pay just a 2% platform fee.',
    category: 'getting-started',
  },
  {
    question: 'How do I sign up?',
    answer:
      'Visit our waitlist page and enter your details. When we launch in your area, you\'ll receive an invitation to download the app, create your account, and complete identity verification.',
    category: 'getting-started',
  },
  {
    question: 'Is Directrent.ng free to use?',
    answer:
      'Browsing listings, searching, and messaging landlords is completely free. A 2% platform fee is only charged when a tenancy agreement is successfully executed through the platform.',
    category: 'getting-started',
  },
  {
    question: 'What areas do you currently serve?',
    answer:
      'We\'re launching first in Yaba and Surulere \u2014 two of Lagos\'s most active rental markets. We\'ll be expanding to Ikeja, Lekki, Victoria Island, Gbagada, Maryland, and more. Join the waitlist to be notified when we reach your area.',
    category: 'getting-started',
  },
  {
    question: 'Can I use Directrent.ng on my phone?',
    answer:
      'Yes. Directrent.ng will be available as a mobile app for both iOS and Android. The website provides information and waitlist signup ahead of the app launch.',
    category: 'getting-started',
  },
  {
    question: 'Do I need to be in Lagos to use Directrent.ng?',
    answer:
      'Currently, all listed properties are in Lagos. However, you can browse and connect with landlords from anywhere \u2014 which is especially useful for people relocating to Lagos or diaspora Nigerians searching for apartments remotely.',
    category: 'getting-started',
  },
  // Payments & Fees
  {
    question: 'What is the 2% platform fee?',
    answer:
      'Our 2% fee is charged only when a rental transaction is completed through the platform. It covers identity verification, secure escrow payment processing, digital lease generation, and customer support. This replaces the traditional 30%+ in combined agent, legal, caution, and miscellaneous fees.',
    category: 'payments',
  },
  {
    question: 'How does the escrow payment work?',
    answer:
      'When you make a rent payment, the funds are held securely by Paystack \u2014 not by Directrent.ng or the landlord. The money is only released to the landlord after you confirm you\'ve received the keys and moved in. If something goes wrong, you can raise a dispute.',
    category: 'payments',
  },
  {
    question: 'What happens if I pay but the property isn\'t as described?',
    answer:
      'You have 7 days after key handover to confirm move-in or raise a dispute. If the property materially differs from the listing, you can request a refund through our dispute resolution process. The escrow funds remain protected until the dispute is resolved.',
    category: 'payments',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'None. The only fee you\'ll ever pay to Directrent.ng is the 2% platform fee upon a successful rental. There are no inspection fees, no agreement fees, no caution fees, and no surprise charges.',
    category: 'payments',
  },
  {
    question: 'How do landlords receive payment?',
    answer:
      'Rent payments are processed through Paystack and deposited directly into the landlord\'s verified bank account after the tenant confirms move-in. Landlords can also set up recurring rent collection through the platform.',
    category: 'payments',
  },
  // Verification
  {
    question: 'How does identity verification work?',
    answer:
      'We partner with accredited identity verification providers to confirm your BVN (Bank Verification Number) or NIN (National Identification Number). The process takes less than 60 seconds and confirms your legal identity.',
    category: 'verification',
  },
  {
    question: 'Is my BVN/NIN data safe?',
    answer:
      'Your BVN or NIN number is encrypted using AES-256 encryption and is never stored in raw form. We only retain the verification result (confirmed/not confirmed). Your data is handled in full compliance with the Nigeria Data Protection Regulation (NDPR).',
    category: 'verification',
  },
  {
    question: 'Why is verification required?',
    answer:
      'Verification builds trust for both sides. Tenants know they\'re dealing with a real landlord who actually owns the property. Landlords know the tenant\'s identity has been confirmed by the government. Our research found that "background verification" scored 4.44 out of 5 as the most desired feature.',
    category: 'verification',
  },
  {
    question: 'How are properties verified?',
    answer:
      'Landlords must submit property ownership documents (Certificate of Occupancy, deed of assignment, or authorized power of attorney), which are cross-referenced with utility bills and, where possible, physical inspection. Properties that don\'t pass verification are not listed.',
    category: 'verification',
  },
  // For Landlords
  {
    question: 'How do I list my property?',
    answer:
      'Create an account, complete verification, and then use the listing tool to add your property details, photos, and pricing. Listing is free \u2014 you only pay the platform fee when a tenant is successfully matched.',
    category: 'landlords',
  },
  {
    question: 'Can I list multiple properties?',
    answer:
      'Yes. You can list and manage multiple properties from a single dashboard. Each property goes through its own verification process.',
    category: 'landlords',
  },
  {
    question: 'How do I screen tenants?',
    answer:
      'Every tenant on Directrent.ng is BVN/NIN verified before they can message you. You can review their verified identity, employment status, and rental history before accepting any application.',
    category: 'landlords',
  },
  {
    question: 'What if a tenant damages my property?',
    answer:
      'The digital lease agreement executed through the platform includes standard damage liability clauses compliant with Lagos State Tenancy Law. Security deposits held in escrow provide additional protection. For disputes, we provide mediation support.',
    category: 'landlords',
  },
  // Platform & Coverage
  {
    question: 'When is Directrent.ng launching?',
    answer:
      'We\'re currently in the pre-launch phase, building the platform and onboarding early adopters through our waitlist. The launch in Yaba and Surulere is planned for 2026.',
    category: 'platform',
  },
  {
    question: 'How is Directrent.ng different from PropertyPro or Nigeria Property Centre?',
    answer:
      'Listing platforms show properties but still route you through agents who charge 10\u201315%+ in fees. Directrent.ng eliminates the agent entirely \u2014 you deal directly with verified landlords, pay through secure escrow, and sign a digital lease. No middleman at any step.',
    category: 'platform',
  },
  {
    question: 'Is Directrent.ng regulated?',
    answer:
      'Yes. We operate within the regulatory framework of the Lagos State Real Estate Regulatory Authority (LASRERA), comply with the Nigeria Data Protection Regulation (NDPR), and process payments in accordance with Central Bank of Nigeria (CBN) guidelines.',
    category: 'platform',
  },
  {
    question: 'How do I report a problem?',
    answer:
      'Contact us at hello@directrent.ng or through the in-app support chat. We respond within 24 hours on business days. For payment disputes, our escrow resolution process begins within 48 hours of a filed complaint.',
    category: 'platform',
  },
];

export function FAQPageContent() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setOpenIndex(null);
  }, [activeCategory]);

  const filtered =
    activeCategory === 'all'
      ? allFaqs
      : allFaqs.filter((f) => f.category === activeCategory);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <main ref={ref}>
      {/* Hero */}
      <section className="pb-8 pt-12 md:pb-12 md:pt-16">
        <Container size="md">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35 }}
          >
            <h1 className="font-display text-3xl font-bold text-text-primary md:text-5xl">
              Frequently Asked{' '}
              <span className="text-gradient">Questions</span>
            </h1>
            <p className="mt-4 text-base text-text-secondary md:text-lg">
              Everything you need to know about renting on Directrent.ng.
              Can&apos;t find your answer?{' '}
              <Link
                href="/contact"
                className="text-accent-coral underline underline-offset-4 hover:text-accent-coral-light"
              >
                Contact us
              </Link>
              .
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Category Filter Tabs */}
      <section className="pb-8">
        <Container size="md">
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : 0.1 }}
          >
            {faqCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'min-h-[44px] rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
                  activeCategory === cat.value
                    ? 'bg-accent-coral text-white'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Accordion */}
      <section className="pb-16">
        <Container size="md">
          <motion.div
            className="mx-auto max-w-3xl space-y-3"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: prefersReducedMotion ? 0 : 0.15,
              staggerChildren: 0.05,
            }}
          >
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-border bg-primary-medium"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.35,
                    delay: prefersReducedMotion ? 0 : 0.15 + i * 0.05,
                  }}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className={cn(
                      'flex w-full min-h-[48px] items-center justify-between gap-4 p-4 sm:p-6 text-left transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-coral',
                      'hover:bg-background-elevated'
                    )}
                  >
                    <span className="text-base font-medium text-text-primary sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.2 }
                      }
                      className="shrink-0"
                    >
                      <ChevronDown
                        className="h-5 w-5 text-text-muted"
                        aria-hidden="true"
                      />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? { height: 'auto', opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
                        }
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border p-4 sm:p-6 sm:pt-5">
                          <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="pb-16">
        <Container size="md">
          <motion.div
            className="text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : 0.3 }}
          >
            <p className="mb-4 text-lg text-text-secondary">
              Still have questions?
            </p>
            <Button asChild variant="primary" size="md">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
