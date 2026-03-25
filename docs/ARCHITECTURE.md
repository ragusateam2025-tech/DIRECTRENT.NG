# Architecture Document
## Directrent.ng Website

**Version:** 1.0  
**Last Updated:** March 2026  

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Architecture](#3-project-architecture)
4. [Component Architecture](#4-component-architecture)
5. [Data Flow](#5-data-flow)
6. [API Design](#6-api-design)
7. [State Management](#7-state-management)
8. [Styling Architecture](#8-styling-architecture)
9. [Performance Strategy](#9-performance-strategy)
10. [Security Architecture](#10-security-architecture)
11. [Deployment Architecture](#11-deployment-architecture)
12. [Testing Strategy](#12-testing-strategy)

---

## 1. System Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS                                   │
│              (Tenants, Landlords, Visitors)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL EDGE NETWORK                        │
│                   (CDN, SSL, Edge Functions)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NEXT.JS APPLICATION                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Static     │  │   Server     │  │   API        │          │
│  │   Pages      │  │   Components │  │   Routes     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Email Service  │ │   Analytics      │ │   Marketing      │
│   (Resend/etc)   │ │   (GA4/Plausible)│ │   (Mailchimp)    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### 1.2 Design Principles

1. **Static-First:** Generate static pages where possible
2. **Edge-Optimized:** Leverage Vercel's edge network
3. **Progressive Enhancement:** Core functionality works without JS
4. **Mobile-First:** Design and develop for mobile first
5. **Performance Budget:** Strict limits on bundle size and load times

---

## 2. Technology Stack

### 2.1 Core Technologies

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 14.x | Full-stack React framework |
| Language | TypeScript | 5.x | Type safety |
| Runtime | Node.js | 18.17+ | Server runtime |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Animation | Framer Motion | 10.x | Declarative animations |

### 2.2 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Husky | Git hooks |
| lint-staged | Pre-commit linting |
| TypeScript | Type checking |

### 2.3 External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| Vercel | Hosting & Deployment | Platform |
| Google Analytics | Analytics | Client SDK |
| Mailchimp/ConvertKit | Email Marketing | API |
| Resend | Transactional Email | API |

---

## 3. Project Architecture

### 3.1 Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages route group
│   │   ├── layout.tsx            # Marketing layout
│   │   ├── page.tsx              # Home page (/)
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── features/
│   │   │   ├── page.tsx          # Features overview
│   │   │   ├── tenants/
│   │   │   │   └── page.tsx      # Tenant features
│   │   │   └── landlords/
│   │   │       └── page.tsx      # Landlord features
│   │   ├── how-it-works/
│   │   │   └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── waitlist/
│   │   │   └── page.tsx
│   │   └── faq/
│   │       └── page.tsx
│   ├── (legal)/                  # Legal pages route group
│   │   ├── layout.tsx            # Legal pages layout
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── cookies/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── waitlist/
│   │   │   └── route.ts
│   │   └── newsletter/
│   │       └── route.ts
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Error boundary
│
├── components/
│   ├── ui/                       # Base UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Modal/
│   │   └── index.ts              # Barrel export
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   └── Container/
│   │
│   ├── sections/                 # Page sections
│   │   ├── Hero/
│   │   ├── Features/
│   │   ├── HowItWorks/
│   │   ├── Testimonials/
│   │   ├── Pricing/
│   │   ├── FAQ/
│   │   └── CTA/
│   │
│   └── forms/                    # Form components
│       ├── ContactForm/
│       ├── WaitlistForm/
│       └── NewsletterForm/
│
├── lib/                          # Utility libraries
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   ├── validations.ts            # Zod schemas
│   ├── analytics.ts              # Analytics helpers
│   └── api.ts                    # API helpers
│
├── hooks/                        # Custom React hooks
│   ├── useScrollPosition.ts
│   ├── useMediaQuery.ts
│   ├── useIntersectionObserver.ts
│   └── useLocalStorage.ts
│
├── types/                        # TypeScript types
│   ├── index.ts
│   ├── api.ts
│   └── forms.ts
│
└── styles/                       # Additional styles
    └── animations.css
```

### 3.2 Route Groups Explanation

**`(marketing)`** — Groups all marketing pages:
- Shares a common layout with header/footer
- Allows future changes without affecting URLs

**`(legal)`** — Groups legal pages:
- May have different layout (simpler header)
- Consistent styling for legal content

---

## 4. Component Architecture

### 4.1 Component Categories

```
┌─────────────────────────────────────────────────────────────────┐
│                       PAGE COMPONENTS                           │
│                    (app/**/page.tsx)                            │
│         Compose sections, handle page-level concerns            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SECTION COMPONENTS                          │
│                  (components/sections/)                         │
│              Large, page-specific compositions                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FEATURE COMPONENTS                          │
│               (components/forms/, etc.)                         │
│            Business logic + UI, domain-specific                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       UI COMPONENTS                             │
│                    (components/ui/)                             │
│         Primitive, reusable, stateless or minimal state         │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Component Patterns

#### 4.2.1 UI Components (Atomic)

```tsx
// components/ui/Button/Button.tsx
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-accent-coral text-white hover:bg-accent-coral/90',
        secondary: 'bg-accent-gold text-primary-dark hover:bg-accent-gold/90',
        outline: 'border-2 border-accent-coral text-accent-coral hover:bg-accent-coral/10',
        ghost: 'text-white hover:bg-white/10',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }
);
```

#### 4.2.2 Section Components

```tsx
// components/sections/Hero/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Container } from '@/components/layout';

export function Hero() {
  return (
    <section className="relative min-h-screen bg-primary-dark">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white">
            Rent Direct. Save More.
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Connect directly with verified landlords. No agents, no hidden fees.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Button size="lg">Join the Waitlist</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
```

### 4.3 Component Guidelines

1. **Single Responsibility:** Each component does one thing well
2. **Composition over Inheritance:** Build complex UIs from simple parts
3. **Props Interface:** Always define TypeScript interfaces
4. **Default Exports:** Only for page components
5. **Named Exports:** For all other components
6. **Co-location:** Tests and styles live with components

---

## 5. Data Flow

### 5.1 Form Data Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───▶│   Form      │───▶│   API       │───▶│   External  │
│   Input     │    │   Component │    │   Route     │    │   Service   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                  │
                          ▼                  ▼
                   ┌─────────────┐    ┌─────────────┐
                   │   Zod       │    │   Response  │
                   │   Validation│    │   Handling  │
                   └─────────────┘    └─────────────┘
```

### 5.2 Waitlist Flow Example

```tsx
// 1. Form Component (Client)
// components/forms/WaitlistForm/WaitlistForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waitlistSchema, type WaitlistInput } from '@/lib/validations';

export function WaitlistForm() {
  const form = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistInput) => {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Handle response...
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form>;
}

// 2. Validation Schema
// lib/validations.ts

import { z } from 'zod';

export const waitlistSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^(\+234|0)[789][01]\d{8}$/, 'Invalid Nigerian phone'),
  userType: z.enum(['tenant', 'landlord']),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

// 3. API Route (Server)
// app/api/waitlist/route.ts

import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = waitlistSchema.parse(body);
    
    // Save to database / email service
    await saveToMailchimp(validated);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 400 }
    );
  }
}
```

---

## 6. API Design

### 6.1 API Routes

| Route | Method | Purpose | Request Body |
|-------|--------|---------|--------------|
| `/api/waitlist` | POST | Add to waitlist | `WaitlistInput` |
| `/api/contact` | POST | Submit contact form | `ContactInput` |
| `/api/newsletter` | POST | Subscribe to newsletter | `{ email }` |

### 6.2 Response Format

```typescript
// Success Response
interface SuccessResponse<T> {
  success: true;
  data?: T;
  message?: string;
}

// Error Response
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
```

### 6.3 Rate Limiting

```typescript
// lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
});
```

---

## 7. State Management

### 7.1 Philosophy

- **Server-First:** Leverage Server Components for data fetching
- **Minimal Client State:** Only what's necessary for interactivity
- **Form State:** React Hook Form handles form state
- **UI State:** useState/useReducer for local UI state

### 7.2 State Categories

| Category | Solution | Example |
|----------|----------|---------|
| Server Data | Server Components | Page content |
| Form State | React Hook Form | Waitlist form |
| UI State | useState | Mobile menu open/close |
| Animation State | Framer Motion | Section animations |

### 7.3 No Global State Store

This marketing website doesn't require Redux, Zustand, or similar. If needed later:
- Consider React Context for theme/language
- Use URL state for filters/tabs

---

## 8. Styling Architecture

### 8.1 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1A0A0A',
          medium: '#2D1515',
        },
        accent: {
          gold: '#D4A853',
          coral: '#E85A4F',
          orange: '#F5A623',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 8.2 CSS Variables

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary-dark: 26 10 10;
    --color-primary-medium: 45 21 21;
    --color-accent-gold: 212 168 83;
    --color-accent-coral: 232 90 79;
    --color-accent-orange: 245 166 35;
  }
}
```

### 8.3 Utility Function

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 9. Performance Strategy

### 9.1 Next.js Optimizations

| Feature | Implementation |
|---------|----------------|
| Static Generation | Default for marketing pages |
| Image Optimization | next/image for all images |
| Font Optimization | next/font for Google Fonts |
| Code Splitting | Automatic per-route |
| Prefetching | Automatic for links |

### 9.2 Image Strategy

```tsx
// Always use next/image
import Image from 'next/image';

<Image
  src="/images/hero.webp"
  alt="Descriptive alt text"
  width={1200}
  height={800}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL={shimmer(1200, 800)}
/>
```

### 9.3 Bundle Optimization

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};
```

### 9.4 Performance Budget

| Metric | Budget |
|--------|--------|
| Total JS | < 150KB gzipped |
| Total CSS | < 30KB gzipped |
| Largest Image | < 200KB |
| Total Page Weight | < 500KB |

---

## 10. Security Architecture

### 10.1 Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];
```

### 10.2 Input Validation

- All inputs validated with Zod on client AND server
- Sanitize HTML to prevent XSS
- Escape user input in responses

### 10.3 Environment Variables

- Never expose secrets to client
- Use `NEXT_PUBLIC_` prefix only for public values
- Store secrets in Vercel environment variables

---

## 11. Deployment Architecture

### 11.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 11.2 Deployment Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Local     │───▶│   GitHub    │───▶│   Vercel    │
│   Dev       │    │   (Push)    │    │   Build     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                   ┌──────────────────────────┴──────┐
                   │                                 │
                   ▼                                 ▼
            ┌─────────────┐                  ┌─────────────┐
            │   Preview   │                  │  Production │
            │   (PR)      │                  │  (main)     │
            └─────────────┘                  └─────────────┘
```

### 11.3 Domain Configuration

1. Add `directrent.ng` in Vercel Dashboard
2. Configure DNS at registrar:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
3. Enable automatic SSL

---

## 12. Testing Strategy

### 12.1 Testing Pyramid

```
                    /\
                   /  \
                  / E2E \        <- 10% (Critical paths)
                 /──────\
                /        \
               / Integration \   <- 20% (API routes, forms)
              /──────────────\
             /                \
            /      Unit        \ <- 70% (Components, utilities)
           /────────────────────\
```

### 12.2 Testing Tools

| Type | Tool | Focus |
|------|------|-------|
| Unit | Jest + RTL | Components, utilities |
| Integration | Jest | API routes, form submissions |
| E2E | Playwright | Critical user journeys |
| Visual | Chromatic (optional) | UI regression |

### 12.3 Test Examples

```typescript
// Unit Test
// components/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// E2E Test
// tests/e2e/waitlist.spec.ts
import { test, expect } from '@playwright/test';

test('user can join waitlist', async ({ page }) => {
  await page.goto('/');
  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## Appendix A: Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Mar 2026 | Next.js 14 App Router | Latest stable, better DX |
| Mar 2026 | Tailwind CSS | Rapid development, small bundle |
| Mar 2026 | Vercel hosting | Seamless Next.js integration |
| Mar 2026 | No global state | Not needed for marketing site |

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| App Router | Next.js 13+ routing system using file-based routing in `app/` |
| Server Component | React component that runs only on server |
| Client Component | React component that runs in browser (uses `'use client'`) |
| Route Handler | Next.js API endpoint in App Router |

---

*End of Architecture Document*
