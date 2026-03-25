import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Directrent.ng',
  description:
    'How Directrent.ng collects, uses, and protects your personal data in compliance with the Nigeria Data Protection Regulation (NDPR).',
  alternates: {
    canonical: 'https://directrent.ng/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
