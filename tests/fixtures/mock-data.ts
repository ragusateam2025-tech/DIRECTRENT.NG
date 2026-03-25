/**
 * Test fixtures and mock data for Directrent.ng website tests
 */

// ================================================
// USER DATA
// ================================================
export const validTenant = {
  name: 'Tayo Adeyemi',
  email: 'tayo@example.com',
  phone: '08012345678',
  userType: 'tenant' as const,
  area: 'yaba' as const,
};

export const validLandlord = {
  name: 'Adaeze Okonkwo',
  email: 'adaeze@example.com',
  phone: '+2347012345678',
  userType: 'landlord' as const,
  area: 'surulere' as const,
};

// ================================================
// VALIDATION TEST DATA
// ================================================
export const invalidEmails = [
  'not-an-email',
  '@missing-local.com',
  'missing-domain@',
  'missing@.com',
  'spaces in@email.com',
  '',
  '   ',
];

export const validEmails = [
  'test@example.com',
  'user.name@domain.com',
  'user+tag@example.com',
  'user@subdomain.example.com',
];

export const invalidPhones = [
  '12345', // Too short
  '1234567890', // US format
  '+1234567890123', // Not Nigerian
  'abcdefghijk', // Not numeric
  '090123456', // Too short
  '090123456789012', // Too long
  '', // Empty
];

export const validNigerianPhones = [
  '08012345678',
  '07012345678',
  '09012345678',
  '+2348012345678',
  '+2347012345678',
  '2348012345678',
];

// ================================================
// FORM TEST DATA
// ================================================
export const validWaitlistSubmission = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '08012345678',
  userType: 'tenant' as const,
  area: 'yaba' as const,
};

export const validContactSubmission = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '08012345678',
  subject: 'General Inquiry',
  message: 'This is a test message with more than 10 characters.',
};

// ================================================
// API RESPONSE MOCKS
// ================================================
export const mockSuccessResponse = {
  success: true,
  message: 'Submission received successfully',
};

export const mockErrorResponse = {
  error: 'Validation failed',
  code: 'VALIDATION_ERROR',
  details: {
    email: 'Invalid email format',
  },
};

export const mockRateLimitResponse = {
  error: 'Too many requests',
  code: 'RATE_LIMIT_EXCEEDED',
  retryAfter: 60,
};

// ================================================
// NAVIGATION TEST DATA
// ================================================
export const navLinks = [
  { text: 'Features', url: '/features' },
  { text: 'How It Works', url: '/how-it-works' },
  { text: 'Pricing', url: '/pricing' },
  { text: 'About', url: '/about' },
  { text: 'Contact', url: '/contact' },
];

export const footerLinks = {
  product: [
    { text: 'Features', url: '/features' },
    { text: 'How It Works', url: '/how-it-works' },
    { text: 'Pricing', url: '/pricing' },
    { text: 'Join Waitlist', url: '/waitlist' },
  ],
  company: [
    { text: 'About Us', url: '/about' },
    { text: 'Contact', url: '/contact' },
    { text: 'FAQ', url: '/faq' },
  ],
  legal: [
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms of Service', url: '/terms' },
    { text: 'Cookie Policy', url: '/cookies' },
  ],
};

// ================================================
// ACCESSIBILITY TEST DATA
// ================================================
export const a11yPages = [
  '/',
  '/features',
  '/how-it-works',
  '/pricing',
  '/about',
  '/contact',
  '/waitlist',
  '/faq',
];

// ================================================
// PERFORMANCE TEST DATA
// ================================================
export const performanceThresholds = {
  fcp: 1500, // First Contentful Paint
  lcp: 2500, // Largest Contentful Paint
  tbt: 200, // Total Blocking Time
  cls: 0.1, // Cumulative Layout Shift
  speedIndex: 3000,
};
