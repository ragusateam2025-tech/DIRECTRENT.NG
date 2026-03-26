export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'company' | 'housing' | 'technology' | 'guides';
  author: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  coverImage?: string;
}

export const BLOG_CATEGORIES = [
  { value: 'all', label: 'All Posts' },
  { value: 'company', label: 'Company News' },
  { value: 'housing', label: 'Housing & Urban' },
  { value: 'technology', label: 'Technology' },
  { value: 'guides', label: 'Guides & Tips' },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'introducing-directrent',
    title:
      'Introducing Directrent.ng: Ending the Mandatory Middleman in Lagos',
    excerpt:
      'Born from MBA research at Rome Business School, Directrent.ng is building a direct rental marketplace that saves Lagos tenants an average of ₦300,000 in unnecessary fees.',
    content: `
      <p>Every Lagos renter knows the story. You find an apartment you love, and then the fees start piling up — agency commission, legal fees, caution fees, agreement fees, inspection fees. Before you've spent a single night in your new home, you've handed over hundreds of thousands of naira to middlemen who add no real value to the transaction.</p>
      <p>That experience — multiplied across millions of Lagos renters — is the problem Directrent.ng was built to solve.</p>
      <h2>The Research Behind the Platform</h2>
      <p>Directrent.ng isn't just another app. It's the product of rigorous academic research conducted as part of an MBA capstone at Rome Business School. We surveyed 70 participants — 50 tenants and 20 landlords — across five Lagos neighborhoods to quantify what we call the "Agent Effect."</p>
      <p>The findings were striking: tenants pay an average of 32% of their annual rent in non-housing fees. Agent-managed properties sit vacant for 63 days on average, versus just 25 days for direct listings. And 100% of surveyed landlords and tenants expressed willingness to switch to a direct platform.</p>
      <h2>What We're Building</h2>
      <p>Directrent.ng connects landlords and tenants directly through a verified marketplace. Every user is verified via BVN/NIN. Payments are secured through Paystack escrow. Lease agreements are digital and legally compliant with Lagos State Tenancy Law.</p>
      <p>The result? Tenants save an average of ₦300,000. Landlords fill vacancies 61% faster. Everyone wins — except the middlemen.</p>
      <h2>Join the Movement</h2>
      <p>We're launching first in Yaba and Surulere — two of Lagos's most active rental markets. Join our waitlist to be among the first to experience a better way to rent.</p>
    `,
    category: 'company',
    author: 'Ololade',
    publishedAt: '2026-03-20T00:00:00Z',
    readingTime: '4 min read',
    featured: true,
  },
  {
    slug: 'true-cost-of-renting-lagos',
    title:
      "The True Cost of Renting in Lagos: Why You're Paying 32% More Than You Should",
    excerpt:
      'A data-backed breakdown of the hidden fees Lagos tenants pay — agency commission, legal fees, caution deposits, and more — and how to avoid them.',
    content: `
      <p>When you rent an apartment in Lagos, the listed rent is just the beginning. Our research across 50 Lagos tenants revealed a pattern of systematic overcharging that most renters have simply accepted as normal.</p>
      <h2>Breaking Down the 32%</h2>
      <p>Here's what the average Lagos tenant actually pays on top of their annual rent:</p>
      <p><strong>Agency fee (10%):</strong> The most visible charge. Agents typically demand 10% of the annual rent as their commission, though some push for 15% or higher in premium locations.</p>
      <p><strong>Legal/agreement fee (10%):</strong> Ostensibly for drafting the tenancy agreement. In practice, most agents use a standard template that costs nothing to produce.</p>
      <p><strong>Caution/commission fee (7%):</strong> A vaguely defined charge that covers "damage protection" — even though the agent has no role in property maintenance.</p>
      <p><strong>Inspection and miscellaneous (5%):</strong> Fees for "property inspection," "documentation," and other charges that exist primarily to extract more money.</p>
      <h2>The Real Impact</h2>
      <p>On a ₦1,000,000 annual rent, these fees total approximately ₦320,000. That's money that could cover three months of rent, or fund a business, or simply stay in your savings account where it belongs.</p>
      <p>Our survey found that 78% of tenants have encountered fake or misleading listings, and the average apartment search takes 2-3 months. The system isn't just expensive — it's broken.</p>
      <h2>A Better Way</h2>
      <p>Directrent.ng replaces the entire fee structure with a single 2% platform fee. That's ₦20,000 instead of ₦320,000. The difference — ₦300,000 — goes back into your pocket.</p>
    `,
    category: 'housing',
    author: 'Ololade',
    publishedAt: '2026-03-18T00:00:00Z',
    readingTime: '6 min read',
    featured: true,
  },
  {
    slug: 'bvn-nin-verification-explained',
    title:
      'How BVN/NIN Verification Makes Renting Safer for Everyone',
    excerpt:
      'Understanding the identity verification technology behind Directrent.ng and why it matters for both tenants and landlords in Lagos.',
    content: `
      <p>Trust is the foundation of every rental transaction. Yet in the traditional Lagos rental market, neither party can truly verify who they're dealing with. Tenants can't confirm a landlord actually owns the property. Landlords can't verify a tenant's identity or financial reliability.</p>
      <h2>What is BVN/NIN Verification?</h2>
      <p>BVN (Bank Verification Number) and NIN (National Identification Number) are government-issued identity credentials linked to biometric data. When a user registers on Directrent.ng, we verify their BVN or NIN through accredited identity verification partners.</p>
      <p>This confirms their legal name, date of birth, and photograph — creating a verified identity that both parties can trust.</p>
      <h2>What This Means for Tenants</h2>
      <p>When you browse listings on Directrent.ng, every landlord has been verified. Their property ownership documents have been checked. You know you're dealing with a real person who actually owns the property you're viewing.</p>
      <h2>What This Means for Landlords</h2>
      <p>When you receive a tenant application, you can see their verified identity, employment details, and rental history. No more guessing whether someone is who they claim to be.</p>
      <p>Our research found that "Background verification of tenants" scored 4.44 out of 5 as the most desired platform feature — making it the single most important capability we could build.</p>
    `,
    category: 'technology',
    author: 'Directrent.ng Team',
    publishedAt: '2026-03-15T00:00:00Z',
    readingTime: '5 min read',
    featured: false,
  },
];

// Helper functions
export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'all') { return getAllPosts(); }
  return getAllPosts().filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
