import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Directrent.ng',
  description:
    'Get in touch with the Directrent.ng team. Questions about our platform, partnership inquiries, or feedback — we\'d love to hear from you.',
  alternates: {
    canonical: 'https://directrent.ng/contact',
  },
  openGraph: {
    title: 'Contact Us — Directrent.ng',
    description:
      'Have questions about renting in Lagos without agents? Reach out to the Directrent.ng team.',
    url: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
