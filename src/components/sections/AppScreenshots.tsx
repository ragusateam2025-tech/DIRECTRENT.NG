'use client';

import { useRef, useState, useCallback } from 'react';

import Image from 'next/image';

import { motion, useInView, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';
import { cn } from '@/lib/utils';

const showcaseImages = [
  {
    src: '/images/minimalist-apartment-grey.webp',
    alt: 'Modern minimalist apartment interior available on Directrent',
    label: 'Verified Listings',
  },
  {
    src: '/images/minimalist-apartment-luxury-grey.webp',
    alt: 'Luxury grey-toned apartment interior listed on Directrent Lagos',
    label: 'Premium Spaces',
  },
  {
    src: '/images/minimalist-luxury-apartment-maroon.webp',
    alt: 'Luxury maroon-accented apartment available through Directrent',
    label: 'Quality Homes',
  },
  {
    src: '/images/young-man-new-home-2.webp',
    alt: 'Young professional settling into a new home found on Directrent',
    label: 'Happy Tenants',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopContainerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const noopItemVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function AppScreenshots() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const cVariants = prefersReducedMotion ? noopContainerVariants : containerVariants;
  const iVariants = prefersReducedMotion ? noopItemVariants : itemVariants;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.scrollWidth / showcaseImages.length;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(index);
  }, []);

  return (
    <section ref={ref} className="section relative overflow-hidden">
      <Container size="xl">
        {/* Section header */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl">
            Spaces That Feel Like{' '}
            <span className="text-gradient">Home</span>
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Browse verified apartments and homes across Lagos — every listing is
            real, every photo is authentic.
          </p>
        </motion.div>

        {/* Mobile: horizontal carousel */}
        <div className="sm:hidden">
          <motion.div
            className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            onScroll={handleScroll}
          >
            {showcaseImages.map((image) => (
              <div
                key={image.label}
                className="relative aspect-[3/4] w-[75vw] shrink-0 snap-center overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="75vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-x-4 bottom-4">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    {image.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
          {/* Scroll indicator dots */}
          <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
            {showcaseImages.map((img, i) => (
              <div
                key={img.label}
                className={cn(
                  'size-1.5 rounded-full transition-colors',
                  i === activeIndex ? 'bg-accent-coral' : 'bg-text-muted'
                )}
              />
            ))}
          </div>
        </div>

        {/* Desktop: masonry-style image grid */}
        <motion.div
          className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4"
          variants={cVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {showcaseImages.map((image, i) => (
            <motion.div
              key={image.label}
              variants={iVariants}
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square',
                i === 0 && 'lg:row-span-2 lg:aspect-auto lg:min-h-[500px]'
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-x-4 bottom-4">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {image.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
