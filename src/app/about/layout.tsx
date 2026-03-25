import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Directrent.ng',
  description:
    'Learn about the story behind Directrent.ng — born from MBA research into Lagos\'s broken rental market. We\'re eliminating the mandatory middleman and saving renters an average of ₦300,000.',
  alternates: {
    canonical: 'https://directrent.ng/about',
  },
  openGraph: {
    title: 'About — Directrent.ng',
    description:
      'Born from research, built for Lagos. Discover why we\'re eliminating the mandatory middleman in Nigerian real estate.',
    url: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
