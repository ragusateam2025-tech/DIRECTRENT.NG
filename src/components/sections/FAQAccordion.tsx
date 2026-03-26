'use client';

import { useRef, useState } from 'react';

import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How much does Directrent.ng cost?',
    answer:
      'For tenants, browsing and messaging is completely free. When you complete a rental, there\'s a 2% platform fee — that\'s it. No hidden charges, no agent fees.',
  },
  {
    question: 'How does identity verification work?',
    answer:
      'We partner with Nigeria\'s identity verification providers to confirm your BVN or NIN. This takes less than 60 seconds and helps build trust between tenants and landlords.',
  },
  {
    question: 'Is my payment safe?',
    answer:
      'Absolutely. We use Paystack\'s escrow system. Your rent is held securely until you confirm move-in. If something goes wrong, you\'re protected.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'We\'re currently launching in Yaba and Surulere, Lagos. More areas coming soon — join the waitlist to be notified when we expand to your neighborhood.',
  },
  {
    question: 'Can I be both a tenant and landlord?',
    answer:
      'Yes! You can switch between tenant and landlord modes in the app. Many of our users are both.',
  },
];

export function FAQAccordion() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section ref={ref} className="section relative">
      <Container size="md">
        <motion.div
          className="mb-12 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl">
            Common <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl space-y-3"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-border bg-primary-medium"
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={cn(
                    'flex min-h-[48px] w-full items-center justify-between gap-4 p-4 text-left transition-colors sm:p-6',
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
                      className="size-5 text-text-muted"
                      aria-hidden="true"
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
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
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
