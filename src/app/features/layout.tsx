import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — Directrent.ng',
  description:
    'Explore Directrent.ng features for tenants and landlords: BVN/NIN verification, Paystack escrow payments, digital leases, direct messaging, property dashboards, and more.',
  alternates: {
    canonical: 'https://directrent.ng/features',
  },
  openGraph: {
    title: 'Features — Directrent.ng',
    description:
      'Everything you need to rent smarter in Lagos. Verified users, secure payments, digital leases — zero agent fees.',
    url: '/features',
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
