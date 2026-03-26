'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { motion, useInView, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';

const cards = [
  {
    src: '/images/minimalist-apartment-grey.webp',
    alt: 'Modern minimalist apartment interior available on Directrent',
    title: 'Verified Properties',
    subtitle: 'Every listing on Directrent.ng is inspected and authenticated.',
  },
  {
    src: '/images/minimalist-luxury-apartment-maroon.webp',
    alt: 'Luxury maroon-accented apartment available through Directrent',
    title: 'Quality Spaces',
    subtitle: 'From studio apartments to family homes across Lagos.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopContainerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const noopItemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function FeatureLifestyleBreak() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();

  const cVariants = prefersReducedMotion ? noopContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? noopItemVariants : itemVariants;

  return (
    <section ref={ref} className="section-sm relative">
      <Container size="xl">
        <motion.div
          className="grid gap-4 sm:gap-6 md:grid-cols-2"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={iVariants}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-[16/9]"
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/30 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
