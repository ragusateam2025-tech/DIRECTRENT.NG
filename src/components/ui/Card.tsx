import * as React from 'react';

import { cn } from '@/lib/utils';

// ================================================
// CARD ROOT
// ================================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant style
   */
  variant?: 'default' | 'outlined' | 'elevated';
  /**
   * Whether the card is interactive (clickable)
   */
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'overflow-hidden rounded-xl p-4 sm:rounded-2xl sm:p-6',
          'transition-all duration-200',
          
          // Variant styles
          {
            'bg-primary-medium': variant === 'default',
            'border border-border bg-transparent': variant === 'outlined',
            'bg-primary-medium shadow-card': variant === 'elevated',
          },
          
          // Interactive styles
          interactive && [
            'cursor-pointer',
            'hover:bg-background-elevated hover:shadow-card-hover',
            'active:scale-[0.99]',
          ],
          
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// ================================================
// CARD HEADER
// ================================================
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

// ================================================
// CARD TITLE
// ================================================
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display text-xl font-semibold text-text-primary',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

// ================================================
// CARD DESCRIPTION
// ================================================
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

// ================================================
// CARD CONTENT
// ================================================
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-4', className)} {...props} />
));

CardContent.displayName = 'CardContent';

// ================================================
// CARD FOOTER
// ================================================
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
