import { Inter, Outfit } from 'next/font/google';

import type { Metadata, Viewport } from 'next';

import { Header, Footer } from '@/components/layout';
import { SITE_CONFIG } from '@/lib/constants';

import { StructuredData } from './structured-data';

import '@/styles/globals.css';

// ================================================
// FONTS
// ================================================
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

// ================================================
// METADATA
// ================================================
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Lagos rental',
    'apartment rental Lagos',
    'rent direct',
    'no agency fee',
    'landlord tenant',
    'Nigeria PropTech',
    'Yaba apartments',
    'Surulere rentals',
    'verified listings',
    'escrow payment',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    creator: '@directrentng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#1A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// ================================================
// ROOT LAYOUT
// ================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-NG"
      className={`${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-primary-dark font-sans text-text-primary antialiased">
        <StructuredData />

        {/* Skip to main content link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main content */}
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
