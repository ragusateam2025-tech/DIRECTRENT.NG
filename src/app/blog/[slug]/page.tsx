import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/blog';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  company: 'bg-accent-coral/10 text-accent-coral',
  housing: 'bg-accent-gold/10 text-accent-gold',
  technology: 'bg-info/10 text-info',
  guides: 'bg-success/10 text-success',
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) { return { title: 'Post Not Found' }; }

  return {
    title: `${post.title} — Directrent.ng Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="section">
      <Container size="md">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Article header */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                categoryColors[post.category] ||
                  'bg-white/10 text-text-secondary'
              )}
            >
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="text-xs text-text-muted">
              {post.readingTime}
            </span>
            <span className="text-xs text-text-muted">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-sm text-text-muted">By {post.author}</p>
        </div>

        <hr className="mb-8 border-border" />

        {/* Article body */}
        <div
          className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-text-primary prose-h2:mb-4 prose-h2:mt-10 prose-h2:text-2xl prose-p:mb-4 prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-accent-coral prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold prose-strong:text-text-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className="my-12 border-border" />

        {/* Bottom actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="ghost" size="md">
            <Link href="/blog">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </Button>
          <Button asChild size="md">
            <Link href="/waitlist">
              Join the Waitlist
              <ArrowRight className="ml-2 size-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
