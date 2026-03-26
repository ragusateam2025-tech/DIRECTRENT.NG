import type { MetadataRoute } from 'next';

import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://directrent.ng';

  const staticPages = [
    '',
    '/how-it-works',
    '/features',
    '/about',
    '/blog',
    '/contact',
    '/waitlist',
    '/faq',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency:
      path === '/blog' ? ('weekly' as const) : ('monthly' as const),
    priority: path === '' ? 1.0 : path === '/features' ? 0.9 : 0.7,
  }));

  const posts = getAllPosts();
  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
