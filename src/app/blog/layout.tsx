import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Directrent.ng',
  description:
    'Insights on Lagos housing, rental tips, urban development, and the latest from Directrent.ng. Stay informed about the future of renting in Lagos.',
  alternates: {
    canonical: 'https://directrent.ng/blog',
  },
  openGraph: {
    title: 'Blog — Directrent.ng',
    description:
      'Insights on Lagos housing, urban development, and agent-free renting.',
    url: '/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
