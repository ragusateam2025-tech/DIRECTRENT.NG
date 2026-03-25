import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join the Waitlist — Directrent.ng',
  description:
    'Be the first to know when Directrent.ng launches in your area. Join our waitlist for early access to agent-free renting in Lagos.',
};

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
