import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Container size variant
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Render as a different element
   */
  as?: React.ElementType;
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
} as const;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xl', as: Component = 'div', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          containerSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container };
