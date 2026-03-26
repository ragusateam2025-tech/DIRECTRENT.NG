/**
 * Site-wide constants for Directrent.ng
 */

// ================================================
// SITE INFORMATION
// ================================================
export const SITE_CONFIG = {
  name: 'Directrent.ng',
  description:
    'Connect directly with landlords and tenants in Lagos. No middlemen, no stress.',
  tagline: 'Rent Direct. Save More.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://directrent.ng',
  email: 'hello@directrent.ng',
  phone: '+234 800 DIRECT',
  location: 'Lagos, Nigeria',
} as const;

// ================================================
// SOCIAL LINKS
// ================================================
export const SOCIAL_LINKS = {
  twitter: 'https://x.com/directrentng',
  instagram: 'https://instagram.com/directrentng',
  linkedin: 'https://linkedin.com/company/directrentng',
  facebook: 'https://facebook.com/directrentng',
} as const;

// ================================================
// NAVIGATION
// ================================================
export const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/features', label: 'Features' },
  { href: '/blog', label: 'Blog' },
  { href: '/waitlist', label: 'Join Waitlist' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const FOOTER_LINKS = {
  product: [
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/waitlist', label: 'Join Waitlist' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
} as const;

// ================================================
// PLATFORM FEES
// ================================================
export const PLATFORM_FEES = {
  directrent: 0.02, // 2%
  traditional: 0.32, // ~32% (agency + legal + caution + misc fees)
} as const;

// ================================================
// LAUNCH AREAS (Hyperlocal rollout)
// ================================================
export const LAUNCH_AREAS = [
  { value: 'yaba', label: 'Yaba' },
  { value: 'surulere', label: 'Surulere' },
] as const;

export const COMING_SOON_AREAS = [
  { value: 'ikeja', label: 'Ikeja' },
  { value: 'lekki', label: 'Lekki' },
  { value: 'victoria-island', label: 'Victoria Island' },
  { value: 'ikoyi', label: 'Ikoyi' },
  { value: 'gbagada', label: 'Gbagada' },
  { value: 'maryland', label: 'Maryland' },
] as const;

// ================================================
// USER TYPES
// ================================================
export const USER_TYPES = [
  { value: 'tenant', label: 'Tenant', description: 'Looking for a place to rent' },
  { value: 'landlord', label: 'Landlord', description: 'Have a property to rent out' },
] as const;

// ================================================
// FEATURES LIST
// ================================================
export const FEATURES = {
  tenants: [
    {
      title: 'Direct Landlord Access',
      description: 'Connect directly with property owners without middlemen',
      icon: 'Users',
    },
    {
      title: 'Verified Listings',
      description: 'All properties are verified for authenticity',
      icon: 'CheckCircle',
    },
    {
      title: 'Secure Payments',
      description: 'Pay safely through Paystack escrow',
      icon: 'Shield',
    },
    {
      title: 'Save ₦300K+',
      description: 'Pay only 2% vs ~32% traditional all-in fees',
      icon: 'PiggyBank',
    },
    {
      title: 'Neighborhood Insights',
      description: 'Know your area before you move',
      icon: 'MapPin',
    },
    {
      title: 'Digital Lease',
      description: 'Sign your lease agreement online',
      icon: 'FileText',
    },
  ],
  landlords: [
    {
      title: 'Verified Tenants',
      description: 'BVN/NIN verified tenant profiles',
      icon: 'UserCheck',
    },
    {
      title: 'Reduced Vacancy',
      description: 'Find tenants faster with direct access',
      icon: 'Clock',
    },
    {
      title: 'Automated Collection',
      description: 'Set up automatic rent reminders',
      icon: 'CreditCard',
    },
    {
      title: 'Property Dashboard',
      description: 'Manage all your properties in one place',
      icon: 'LayoutDashboard',
    },
    {
      title: 'Legal Protection',
      description: 'Digital lease with legal backing',
      icon: 'Scale',
    },
    {
      title: 'Performance Analytics',
      description: 'Track occupancy and payment history',
      icon: 'BarChart',
    },
  ],
} as const;

// ================================================
// HOW IT WORKS STEPS
// ================================================
export const HOW_IT_WORKS = {
  tenants: [
    {
      step: 1,
      title: 'Create Your Profile',
      description: 'Sign up and verify your identity with BVN/NIN',
    },
    {
      step: 2,
      title: 'Browse Listings',
      description: 'Search verified properties in Yaba & Surulere',
    },
    {
      step: 3,
      title: 'Connect Directly',
      description: 'Message landlords and schedule viewings',
    },
    {
      step: 4,
      title: 'Pay Securely',
      description: 'Complete payment via Paystack escrow',
    },
  ],
  landlords: [
    {
      step: 1,
      title: 'List Your Property',
      description: 'Create a listing with photos and details',
    },
    {
      step: 2,
      title: 'Get Verified',
      description: 'Confirm property ownership documents',
    },
    {
      step: 3,
      title: 'Receive Applications',
      description: 'Review verified tenant profiles',
    },
    {
      step: 4,
      title: 'Close the Deal',
      description: 'Sign digital lease and receive payment',
    },
  ],
} as const;

// ================================================
// TESTIMONIALS
// ================================================
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Adaeze O.',
    role: 'Landlord',
    location: 'Surulere',
    quote:
      'I found a verified tenant in just 2 weeks. No more dealing with unreliable agents.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Tayo A.',
    role: 'Tenant',
    location: 'Yaba',
    quote:
      'Saved over ₦300,000 in rental fees. The direct connection with my landlord changed everything.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Chidi N.',
    role: 'Tenant',
    location: 'Surulere',
    quote:
      'Finally, a platform that respects renters. No hidden fees, no surprises.',
    rating: 5,
  },
] as const;

// ================================================
// FAQ
// ================================================
export const FAQ_ITEMS = [
  {
    question: 'How does Directrent.ng verify listings?',
    answer:
      'We verify property ownership through document checks and physical inspections. All landlords must provide valid identification and property documents.',
  },
  {
    question: 'What is the 2% platform fee?',
    answer:
      'Our 2% fee covers identity verification, secure escrow payments, digital lease agreements, and customer support. This replaces the traditional 30%+ in combined agent, legal, caution, and miscellaneous fees.',
  },
  {
    question: 'How does the escrow payment work?',
    answer:
      'When you make a payment, the funds are held securely by Paystack. The money is only released to the landlord after you confirm you\'ve received the keys and moved in.',
  },
  {
    question: 'Which areas do you currently serve?',
    answer:
      'We\'re launching in Yaba and Surulere first. Join our waitlist to be notified when we expand to your area.',
  },
  {
    question: 'How do I get verified as a tenant?',
    answer:
      'Download the app, create an account, and complete verification using your BVN or NIN. The process takes about 5 minutes.',
  },
  {
    question: 'Can landlords list multiple properties?',
    answer:
      'Yes! Landlords can list and manage multiple properties from a single dashboard. Each property is verified independently.',
  },
] as const;

// ================================================
// ANIMATION VARIANTS
// ================================================
export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    default: [0.25, 0.1, 0.25, 1],
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
} as const;
