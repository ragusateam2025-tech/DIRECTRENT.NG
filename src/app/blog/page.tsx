'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components/layout';
import { BlogHero } from '@/components/sections/BlogHero';
import { BlogPostCard } from '@/components/sections/BlogPostCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getPostsByCategory, BLOG_CATEGORIES } from '@/lib/blog';
import { cn } from '@/lib/utils';
import { newsletterSchema, type NewsletterFormData } from '@/lib/validations';

export default function BlogPage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [newsletterState, setNewsletterState] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const posts = getPostsByCategory(activeCategory);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onNewsletterSubmit(data: NewsletterFormData) {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) { throw new Error('Failed'); }

      setNewsletterState('success');
      reset();
    } catch {
      setNewsletterState('error');
    }
  }

  return (
    <>
      <BlogHero />

      <section className="section relative">
        <Container size="lg">
          {/* Category filter */}
          <motion.div
            className="mb-10 flex flex-wrap gap-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {BLOG_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'min-h-[44px] rounded-full px-5 py-2 text-sm font-medium transition-colors',
                  activeCategory === category.value
                    ? 'bg-accent-coral text-white'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                )}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Post grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  featured={post.featured}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-text-muted">
                No posts in this category yet. Check back soon!
              </p>
            </div>
          )}

          {/* Newsletter signup */}
          <motion.div
            className="mt-16 rounded-2xl border border-border bg-primary-medium p-8 text-center md:p-12"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
              Stay Updated
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-text-secondary">
              Get the latest articles and Directrent.ng news delivered to your
              inbox.
            </p>

            {newsletterState === 'success' ? (
              <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-success">
                <CheckCircle className="size-5" aria-hidden="true" />
                <span className="text-sm font-medium">
                  You&apos;re subscribed! Check your inbox.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onNewsletterSubmit)}
                className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
                noValidate
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    aria-label="Email address"
                    {...register('email')}
                  />
                </div>
                <Button
                  type="submit"
                  size="md"
                  loading={isSubmitting}
                  rightIcon={
                    !isSubmitting ? (
                      <Send className="size-4" aria-hidden="true" />
                    ) : undefined
                  }
                >
                  Subscribe
                </Button>
              </form>
            )}

            {newsletterState === 'error' && (
              <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-error">
                <AlertCircle className="size-4" aria-hidden="true" />
                <span className="text-xs">
                  Something went wrong. Please try again.
                </span>
              </div>
            )}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
