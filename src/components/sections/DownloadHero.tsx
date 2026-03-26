'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

import { Container } from '@/components/layout';
import { QRCode } from '@/components/ui/QRCode';
import { StoreButton } from '@/components/ui/StoreButton';

const APPLE_STORE_URL = 'https://apps.apple.com/app/directrent';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=ng.directrent';
const QR_CODE_URL = 'https://directrent.ng/';

type Platform = 'ios' | 'android' | 'desktop';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') { return 'desktop'; }
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) { return 'ios'; }
  if (/android/i.test(ua)) { return 'android'; }
  return 'desktop';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
};

const noopVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export function DownloadHero() {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);

  useEffect(() => {
    setPlatform(detectPlatform());

    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);
    function onChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const variants = prefersReducedMotion ? noopVariants : containerVariants;
  const childVariants = prefersReducedMotion ? noopVariants : itemVariants;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden lg:min-h-svh"
    >
      {/* Background lifestyle image with parallax */}
      <motion.div
        className="absolute inset-0 -z-20 min-h-full"
        style={prefersReducedMotion || !isDesktop ? {} : { y: imageY }}
      >
        <Image
          src="/images/couples-moving.webp"
          alt="Happy couple moving into their new Lagos apartment through Directrent"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </motion.div>

      {/* Gradient overlay for text legibility */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-dark via-primary-dark/90 to-primary-dark/60 md:via-primary-dark/80 md:to-transparent"
        style={prefersReducedMotion || !isDesktop ? { opacity: 0.6 } : { opacity: overlayOpacity }}
      />

      {/* Extra bottom gradient for seamless transition */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-primary-dark to-transparent" />

      <Container size="xl" className="relative flex min-h-[calc(100vh-5rem)] items-center lg:min-h-svh">
        <motion.div
          className="grid w-full items-center gap-8 py-24 lg:grid-cols-2 lg:gap-16 lg:py-32"
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          {/* Text content — left side */}
          <div className="text-center lg:text-left">
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-4 py-1.5"
              variants={childVariants}
            >
              <span className="size-2 animate-pulse-gold rounded-full bg-accent-gold" />
              <span className="text-sm font-medium text-accent-gold">
                Now in Yaba & Surulere
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
              variants={childVariants}
            >
              Find Your Next Home{' '}
              <span className="text-gradient">Directly</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-lg text-text-secondary md:text-xl lg:mx-0"
              variants={childVariants}
            >
              Skip the agents. Save up to ₦300,000 in rental fees. Connect directly with
              verified landlords and tenants in Lagos — secure payments, digital
              leases, all in one app.
            </motion.p>

            {/* Store buttons */}
            <motion.div
              className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 lg:justify-start"
              variants={childVariants}
            >
              {platform === 'ios' ? (
                <>
                  <StoreButton store="apple" href={APPLE_STORE_URL} variant="primary" size="lg" />
                  <StoreButton store="google" href={GOOGLE_PLAY_URL} variant="secondary" size="md" />
                </>
              ) : platform === 'android' ? (
                <>
                  <StoreButton store="google" href={GOOGLE_PLAY_URL} variant="primary" size="lg" />
                  <StoreButton store="apple" href={APPLE_STORE_URL} variant="secondary" size="md" />
                </>
              ) : (
                <>
                  <StoreButton store="apple" href={APPLE_STORE_URL} variant="primary" size="lg" />
                  <StoreButton store="google" href={GOOGLE_PLAY_URL} variant="primary" size="lg" />
                </>
              )}
            </motion.div>

            {/* QR Code - desktop only */}
            {platform === 'desktop' && (
              <motion.div className="mt-8 hidden lg:block" variants={childVariants}>
                <QRCode url={QR_CODE_URL} size={140} />
              </motion.div>
            )}

            {/* Trust indicators */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted lg:justify-start"
              variants={childVariants}
            >
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-2 rounded-full bg-success" />
                Free to download
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-2 rounded-full bg-success" />
                BVN/NIN verified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-2 rounded-full bg-success" />
                Paystack secured
              </span>
            </motion.div>
          </div>

          {/* Right side — secondary image card (desktop only) */}
          <motion.div
            className="hidden lg:flex lg:justify-end"
            variants={childVariants}
          >
            <div className="relative h-[500px] w-[400px] overflow-hidden rounded-3xl border border-white/10 shadow-card">
              <Image
                src="/images/young-man-new-home-1.webp"
                alt="Young man happily settling into his new Lagos apartment"
                fill
                className="object-cover object-top"
                sizes="400px"
                quality={80}
              />
              {/* Subtle overlay on the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="text-sm font-medium text-white/90">
                  &ldquo;Saved ₦200,000+ in agency fees&rdquo;
                </p>
                <p className="mt-1 text-xs text-white/60">— Tayo A., Yaba</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
