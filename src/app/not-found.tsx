import Link from 'next/link';

import { Home } from 'lucide-react';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center">
      <Container size="sm">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-accent-coral md:text-9xl">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-bold text-text-primary md:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-text-secondary">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 size-5" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
