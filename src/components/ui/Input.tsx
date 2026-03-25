'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for the input
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string | undefined;
  /**
   * Helper text below the input
   */
  helperText?: string;
  /**
   * Icon to show on the left
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to show on the right
   */
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || React.useId();
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-accent-coral" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              // Base styles
              'flex h-11 w-full rounded-lg border bg-primary-medium px-4 py-2 text-base text-text-primary',
              'placeholder:text-text-muted',
              'transition-all duration-200',
              
              // Focus styles
              'focus:outline-none focus:ring-2 focus:ring-accent-coral focus:ring-offset-2 focus:ring-offset-primary-dark',
              
              // Border styles
              error
                ? 'border-error focus:border-error'
                : 'border-border focus:border-accent-coral',
              
              // Disabled styles
              'disabled:cursor-not-allowed disabled:opacity-50',
              
              // Icon padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-sm text-error"
          >
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
