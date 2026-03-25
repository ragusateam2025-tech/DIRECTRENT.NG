import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — Directrent.ng',
  description:
    'Discover how Directrent.ng connects landlords and tenants directly in Lagos. Skip the agents, save up to ₦300,000, and rent with confidence in 4 simple steps.',
  alternates: {
    canonical: 'https://directrent.ng/how-it-works',
  },
  openGraph: {
    title: 'How It Works — Directrent.ng',
    description:
      'Skip the agents, save up to ₦300,000, and rent with confidence in 4 simple steps.',
    url: '/how-it-works',
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
