export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Directrent.ng',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      'Lagos rental marketplace connecting landlords and tenants directly. Save up to ₦300,000 in agent fees.',
    url: 'https://directrent.ng',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NGN',
      description: 'Free to browse. 2% platform fee on successful rentals.',
    },
    author: {
      '@type': 'Organization',
      name: 'Directrent.ng',
      url: 'https://directrent.ng',
      email: 'hello@directrent.ng',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
