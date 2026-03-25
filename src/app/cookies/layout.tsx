import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — Directrent.ng',
  description:
    'How Directrent.ng uses cookies and similar technologies to improve your browsing experience.',
  alternates: {
    canonical: 'https://directrent.ng/cookies',
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
