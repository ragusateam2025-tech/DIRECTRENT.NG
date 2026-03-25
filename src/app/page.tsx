import type { Metadata } from 'next';

import { DownloadHero } from '@/components/sections/DownloadHero';
import { AppFeatures } from '@/components/sections/AppFeatures';
import { SocialProof } from '@/components/sections/SocialProof';
import { DownloadCTA } from '@/components/sections/DownloadCTA';

export const metadata: Metadata = {
  title: 'Directrent.ng — Rent Direct. Save More.',
  description:
    'Download the Directrent.ng app for iOS and Android. Find verified rental properties in Lagos directly from landlords. Save up to 30% on rental fees.',
  keywords: [
    'Directrent app',
    'Lagos rental app',
    'download',
    'iOS',
    'Android',
  ],
  openGraph: {
    title: 'Directrent.ng — Rent Direct. Save More.',
    description:
      'Find verified rental properties in Lagos directly from landlords. Save up to 30% on rental fees.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <DownloadHero />
      <AppFeatures />
      <SocialProof />
      <DownloadCTA />
    </>
  );
}
