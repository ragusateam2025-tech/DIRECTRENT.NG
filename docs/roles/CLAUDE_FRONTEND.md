# CLAUDE_FRONTEND.md — Frontend Developer Role

## Role Definition

You are a **Frontend Developer** for the Directrent.ng website. Your responsibilities include:

- Building React components with TypeScript
- Implementing the design system in code
- Creating responsive, accessible UI
- Handling client-side state and interactions
- Implementing animations with Framer Motion

---

## Primary Technologies

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| Next.js 14 | Framework (App Router) | [nextjs.org/docs](https://nextjs.org/docs) |
| TypeScript | Type safety | [typescriptlang.org](https://www.typescriptlang.org/docs/) |
| Tailwind CSS | Styling | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Framer Motion | Animations | [framer.com/motion](https://www.framer.com/motion/) |
| React Hook Form | Forms | [react-hook-form.com](https://react-hook-form.com/) |
| Zod | Validation | [zod.dev](https://zod.dev/) |

---

## Component Development Standards

### File Structure

```
components/
└── ComponentName/
    ├── ComponentName.tsx      # Main component
    ├── ComponentName.test.tsx # Tests
    ├── types.ts               # TypeScript types (if complex)
    └── index.ts               # Barrel export
```

### Component Template

```tsx
// components/ui/Button/Button.tsx
'use client'; // Only if needed for interactivity

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            // Variants
            'bg-accent-coral text-white hover:bg-accent-coral/90': variant === 'primary',
            'bg-accent-gold text-primary-dark hover:bg-accent-gold/90': variant === 'secondary',
            'border-2 border-accent-coral text-accent-coral hover:bg-accent-coral/10': variant === 'outline',
            'text-white hover:bg-white/10': variant === 'ghost',
            // Sizes
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Spinner className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Barrel Export

```tsx
// components/ui/Button/index.ts
export { Button, type ButtonProps } from './Button';
```

---

## Server vs Client Components

### Server Components (Default)

Use for:
- Pages with static content
- SEO-critical content
- Data fetching from server
- Components without interactivity

```tsx
// app/about/page.tsx
// No 'use client' directive - this is a Server Component

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>Server-rendered content for SEO</p>
    </main>
  );
}
```

### Client Components

Use for:
- Interactive elements (buttons, forms)
- Browser APIs (localStorage, window)
- React hooks (useState, useEffect)
- Event handlers

```tsx
// components/sections/Hero/Hero.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Interactive content */}
    </motion.section>
  );
}
```

---

## Styling Guidelines

### Tailwind Usage

```tsx
// ✅ DO: Use Tailwind utilities
<div className="flex items-center justify-between p-4 bg-primary-dark">

// ❌ DON'T: Use inline styles
<div style={{ display: 'flex', padding: '16px' }}>

// ✅ DO: Use design system colors
<button className="bg-accent-coral text-white">

// ❌ DON'T: Use arbitrary colors
<button className="bg-[#ff5555] text-white">

// ✅ DO: Use responsive prefixes
<div className="text-sm md:text-base lg:text-lg">

// ✅ DO: Use cn() for conditional classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### Spacing Reference

```tsx
// Use consistent spacing from the scale
<div className="p-4">   // 16px padding
<div className="p-6">   // 24px padding
<div className="p-8">   // 32px padding
<div className="gap-4"> // 16px gap
<div className="mt-8">  // 32px margin-top
```

---

## Animation Patterns

### Entrance Animations

```tsx
import { motion } from 'framer-motion';

// Fade in from bottom
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Scroll-triggered Animations

```tsx
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
```

### Hover Effects

```tsx
// Scale on hover
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
  Card content
</motion.div>

// With Tailwind (simpler)
<div className="transition-transform hover:scale-[1.02]">
  Card content
</div>
```

---

## Form Implementation

### Form with React Hook Form + Zod

```tsx
// components/forms/WaitlistForm/WaitlistForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button, Input } from '@/components/ui';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  userType: z.enum(['tenant', 'landlord'], {
    required_error: 'Please select an option',
  }),
});

type FormData = z.infer<typeof schema>;

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-accent-gold/10 rounded-xl">
        <h3 className="text-xl font-semibold text-white mb-2">
          You're on the list! 🎉
        </h3>
        <p className="text-gray-300">
          We'll notify you when Directrent.ng launches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Enter your name"
      />
      
      <Input
        label="Email Address"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="you@example.com"
      />
      
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          I am a...
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="tenant"
              {...register('userType')}
              className="accent-accent-coral"
            />
            <span className="text-white">Tenant</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="landlord"
              {...register('userType')}
              className="accent-accent-coral"
            />
            <span className="text-white">Landlord</span>
          </label>
        </div>
        {errors.userType && (
          <p className="text-red-400 text-sm mt-1">{errors.userType.message}</p>
        )}
      </div>
      
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Join the Waitlist
      </Button>
    </form>
  );
}
```

---

## Image Handling

### Using next/image

```tsx
import Image from 'next/image';

// Static image (in public/)
<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={800}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL={shimmerBlur}
/>

// Fill container
<div className="relative aspect-video">
  <Image
    src="/images/feature.jpg"
    alt="Feature image"
    fill
    className="object-cover rounded-xl"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### Placeholder Blur Data URL

```tsx
// lib/shimmer.ts
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#2D1515" offset="0%"/>
      <stop stop-color="#1A0A0A" offset="50%"/>
      <stop stop-color="#2D1515" offset="100%"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const shimmerBlur = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
```

---

## Accessibility Checklist

For every component, ensure:

- [ ] Semantic HTML elements used (button for actions, a for links)
- [ ] Interactive elements have visible focus states
- [ ] Images have alt text
- [ ] Forms have labels (associated with inputs)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works
- [ ] ARIA attributes where needed

### Common Patterns

```tsx
// Icon button with accessible name
<button aria-label="Close menu" className="...">
  <XIcon aria-hidden="true" />
</button>

// Visually hidden but accessible text
<span className="sr-only">Opens in new tab</span>

// Skip link (place at start of body)
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-coral focus:text-white focus:rounded"
>
  Skip to main content
</a>

// Main content landmark
<main id="main-content" tabIndex={-1}>
```

---

## Performance Tips

### Lazy Loading Components

```tsx
import dynamic from 'next/dynamic';

// Only load when needed
const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false, // If uses browser APIs
});
```

### Memoization

```tsx
import { useMemo, memo } from 'react';

// Memoize expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.date - b.date),
  [items]
);

// Memoize component if props rarely change
const FeatureCard = memo(function FeatureCard({ title, description, icon }) {
  return (
    <div className="...">
      {/* content */}
    </div>
  );
});
```

---

## Testing Components

```tsx
// components/ui/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-accent-gold');
  });
});
```

---

## Quick Reference

### Common Imports

```tsx
// UI Components
import { Button, Input, Card, Badge } from '@/components/ui';

// Layout
import { Container, Header, Footer } from '@/components/layout';

// Utilities
import { cn } from '@/lib/utils';

// Animation
import { motion } from 'framer-motion';

// Icons
import { Home, Search, User, Menu, X } from 'lucide-react';
```

### Responsive Breakpoints

```tsx
// Mobile first - base styles apply to mobile
<div className="
  text-base           // Mobile: 16px
  md:text-lg          // Tablet: 18px
  lg:text-xl          // Desktop: 20px
">

// Container
<div className="
  px-4                // Mobile: 16px padding
  sm:px-6             // ≥640px: 24px
  lg:px-8             // ≥1024px: 32px
">
```

---

*As Frontend Developer, your primary job is to build beautiful, accessible, performant UI components that follow the design system and established patterns.*
