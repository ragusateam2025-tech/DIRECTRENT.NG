'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary coral button
        primary: [
          'bg-accent-coral text-white',
          'hover:bg-accent-coral-dark hover:shadow-button-hover',
          'active:scale-[0.98]',
          'shadow-button',
        ],
        // Secondary gold button
        secondary: [
          'bg-accent-gold text-primary-dark',
          'hover:bg-accent-gold-light hover:shadow-glow-gold',
          'active:scale-[0.98]',
        ],
        // Outline button
        outline: [
          'border-2 border-accent-gold bg-transparent text-accent-gold',
          'hover:bg-accent-gold hover:text-primary-dark',
          'active:scale-[0.98]',
        ],
        // Ghost button
        ghost: [
          'bg-transparent text-text-primary',
          'hover:bg-white/10',
          'active:bg-white/20',
        ],
        // Link button
        link: [
          'bg-transparent text-accent-coral underline-offset-4',
          'hover:underline hover:text-accent-coral-light',
        ],
        // Destructive button
        destructive: [
          'bg-error text-white',
          'hover:bg-error-dark',
          'active:scale-[0.98]',
        ],
      },
      size: {
        sm: 'min-h-[44px] px-4 text-sm',
        md: 'min-h-[48px] px-6 text-base',
        lg: 'min-h-[56px] px-8 text-lg',
        icon: 'min-h-[44px] min-w-[44px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, renders as child element using Radix Slot
   */
  asChild?: boolean;
  /**
   * Shows loading spinner and disables button
   */
  loading?: boolean;
  /**
   * Icon to show before text
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to show after text
   */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
