'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { type BlogPost, formatDate } from '@/lib/blog';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  company: 'bg-accent-coral/10 text-accent-coral',
  housing: 'bg-accent-gold/10 text-accent-gold',
  technology: 'bg-info/10 text-info',
  guides: 'bg-success/10 text-success',
};

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogPostCard({ post, featured }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group block rounded-2xl border border-border bg-primary-medium p-6 transition-all duration-200 hover:border-border-light hover:shadow-card-hover',
        featured && 'md:p-8 lg:col-span-2'
      )}
    >
      {/* Top row: category + read time */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            categoryColors[post.category] || 'bg-white/10 text-text-secondary'
          )}
        >
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
        <span className="text-xs text-text-muted">{post.readingTime}</span>
      </div>

      {/* Title */}
      <h3
        className={cn(
          'font-display font-bold text-text-primary transition-colors group-hover:text-accent-gold',
          featured ? 'text-2xl' : 'text-xl'
        )}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">
        {post.excerpt}
      </p>

      {/* Footer: author + date + read more */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-text-muted">
          {post.author} · {formatDate(post.publishedAt)}
        </p>
        <span className="flex items-center gap-1 text-sm font-medium text-accent-coral transition-transform group-hover:translate-x-1">
          Read More
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
