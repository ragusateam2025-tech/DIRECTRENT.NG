'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/utils';

export interface StoreButtonProps {
  store: 'apple' | 'google';
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-12 px-4 gap-2',
  md: 'h-14 px-6 gap-3',
  lg: 'h-16 px-8 gap-3',
} as const;

const textSizes = {
  sm: { label: 'text-[10px]', name: 'text-sm' },
  md: { label: 'text-xs', name: 'text-base' },
  lg: { label: 'text-xs', name: 'text-lg' },
} as const;

const iconSizes = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
} as const;

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.196 12l2.502-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  );
}

function StoreButton({
  className,
  store,
  variant = 'primary',
  size = 'md',
  href,
}: StoreButtonProps) {
  const isApple = store === 'apple';
  const Icon = isApple ? AppleIcon : GooglePlayIcon;
  const storeName = isApple ? 'App Store' : 'Google Play';
  const storeLabel = isApple ? 'Download on the' : 'GET IT ON';
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className={cn(
        'inline-flex items-center rounded-xl font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark',
        sizeStyles[size],
        variant === 'primary'
          ? 'bg-white text-primary-dark hover:shadow-lg hover:shadow-white/10'
          : 'border border-border-light bg-white/5 text-white hover:bg-white/10',
        className
      )}
      aria-label={`Download on ${storeName}`}
    >
      <Icon className={iconSizes[size]} />
      <div className="flex flex-col leading-tight">
        <span className={cn(textSizes[size].label, 'font-normal opacity-80')}>
          {storeLabel}
        </span>
        <span className={cn(textSizes[size].name, 'font-semibold')}>
          {storeName}
        </span>
      </div>
    </motion.a>
  );
}

StoreButton.displayName = 'StoreButton';

export { StoreButton };
