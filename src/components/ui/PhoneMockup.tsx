'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

interface PhoneMockupProps {
  className?: string;
}

function PhoneMockup({ className }: PhoneMockupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn('relative mx-auto w-[280px] md:w-[320px]', className)}
      animate={
        prefersReducedMotion
          ? {}
          : {
              y: [0, -10, 0],
            }
      }
      transition={{
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[40px] border-[6px] border-gray-800 bg-primary-medium shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-gray-800" />

        {/* Screen content - Abstract app UI */}
        <div className="aspect-[9/19.5] w-full bg-gradient-to-b from-primary-dark to-primary-medium p-4 pt-10">
          {/* Status bar placeholder */}
          <div className="mb-6 flex items-center justify-between px-2">
            <div className="h-2 w-8 rounded-full bg-white/30" />
            <div className="flex gap-1">
              <div className="h-2 w-4 rounded-full bg-white/30" />
              <div className="h-2 w-4 rounded-full bg-white/30" />
              <div className="h-2 w-4 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
            <div className="h-4 w-4 rounded-full bg-accent-gold/60" />
            <div className="h-2 w-24 rounded-full bg-white/20" />
          </div>

          {/* Category pills */}
          <div className="mb-4 flex gap-2">
            <div className="h-7 w-16 rounded-full bg-accent-coral/80" />
            <div className="h-7 w-20 rounded-full bg-white/10" />
            <div className="h-7 w-14 rounded-full bg-white/10" />
          </div>

          {/* Property cards */}
          <div className="space-y-3">
            {/* Card 1 */}
            <div className="overflow-hidden rounded-xl bg-white/5">
              <div className="h-24 bg-gradient-to-br from-accent-gold/20 to-accent-coral/20" />
              <div className="space-y-2 p-3">
                <div className="h-2.5 w-3/4 rounded-full bg-white/30" />
                <div className="h-2 w-1/2 rounded-full bg-white/15" />
                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 rounded-full bg-accent-gold/50" />
                  <div className="h-6 w-6 rounded-full bg-accent-coral/40" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="overflow-hidden rounded-xl bg-white/5">
              <div className="h-24 bg-gradient-to-br from-accent-coral/15 to-accent-gold/15" />
              <div className="space-y-2 p-3">
                <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
                <div className="h-2 w-2/5 rounded-full bg-white/15" />
                <div className="flex items-center justify-between">
                  <div className="h-3 w-16 rounded-full bg-accent-gold/50" />
                  <div className="h-6 w-6 rounded-full bg-accent-coral/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-around rounded-2xl bg-white/5 px-4 py-3 backdrop-blur-sm">
            <div className="h-5 w-5 rounded bg-accent-coral/60" />
            <div className="h-5 w-5 rounded bg-white/20" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-coral">
              <div className="h-3 w-3 rounded-sm bg-white" />
            </div>
            <div className="h-5 w-5 rounded bg-white/20" />
            <div className="h-5 w-5 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* Decorative glow behind phone */}
      <div className="absolute -inset-8 -z-10 rounded-full bg-accent-coral/10 blur-3xl" />
      <div className="absolute -inset-12 -z-20 rounded-full bg-accent-gold/5 blur-[60px]" />
    </motion.div>
  );
}

PhoneMockup.displayName = 'PhoneMockup';

export { PhoneMockup };
