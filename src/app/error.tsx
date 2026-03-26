'use client';

import { useEffect } from 'react';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error('Application error:', error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center">
      <Container size="sm">
        <div className="text-center">
          <p className="font-display text-6xl font-bold text-accent-coral">
            Oops
          </p>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-primary md:text-3xl">
            Something Went Wrong
          </h1>
          <p className="mt-4 text-text-secondary">
            An unexpected error occurred. Please try again or contact us if the
            problem persists.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={reset}>
              Try Again
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = '/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
