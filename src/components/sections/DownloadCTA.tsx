'use client';

import { useEffect, useState } from 'react';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

import { StoreButton } from '@/components/ui/StoreButton';

const APPLE_STORE_URL = 'https://apps.apple.com/app/directrent';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=ng.directrent';

export function DownloadCTA() {
  const [show, setShow] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) { return; }
      ticking = true;

      requestAnimationFrame(() => {
        const heroThreshold = window.innerHeight * 0.8;
        const pastHero = window.scrollY > heroThreshold;

        const footer = document.querySelector('footer');
        const nearFooter = footer
          ? footer.getBoundingClientRect().top < window.innerHeight + 100
          : false;

        setShow(pastHero && !nearFooter);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
          initial={prefersReducedMotion ? { opacity: 1 } : { y: 100, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="border-t border-border bg-primary-dark/80 px-4 py-3 backdrop-blur-lg"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="mx-auto flex max-w-md items-center justify-center gap-3">
              <StoreButton
                store="apple"
                href={APPLE_STORE_URL}
                variant="primary"
                size="sm"
              />
              <StoreButton
                store="google"
                href={GOOGLE_PLAY_URL}
                variant="primary"
                size="sm"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
