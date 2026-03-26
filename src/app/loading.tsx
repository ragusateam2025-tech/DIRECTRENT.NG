import { Container } from '@/components/layout';

export default function Loading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <Container size="sm">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-4 border-accent-coral border-t-transparent" />
          <p className="text-sm text-text-muted">Loading...</p>
        </div>
      </Container>
    </section>
  );
}
