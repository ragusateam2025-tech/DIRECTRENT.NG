import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Directrent.ng',
  description:
    'Answers to common questions about Directrent.ng — how verification works, payment security, fees, coverage areas, and more.',
  alternates: {
    canonical: 'https://directrent.ng/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions — Directrent.ng',
    description:
      'Everything you need to know about renting without agents in Lagos.',
    url: '/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
