import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Directrent.ng',
  description:
    'Terms and conditions governing the use of Directrent.ng, the Lagos rental marketplace connecting landlords and tenants directly.',
  alternates: {
    canonical: 'https://directrent.ng/terms',
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
