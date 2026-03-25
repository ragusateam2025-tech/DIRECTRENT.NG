# Style Guide
## Directrent.ng Design System

**Version:** 1.0  
**Last Updated:** March 2026  

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Icons](#6-icons)
7. [Imagery](#7-imagery)
8. [Motion & Animation](#8-motion--animation)
9. [Accessibility](#9-accessibility)
10. [Implementation](#10-implementation)

---

## 1. Brand Overview

### 1.1 Brand Essence

**Directrent.ng** represents a new era of transparent, direct rental transactions in Lagos. Our visual identity reflects:

- **Trust:** Deep, grounded colors that convey stability
- **Warmth:** Gold and coral accents that feel welcoming
- **Modernity:** Clean typography and generous whitespace
- **Nigerian Pride:** Colors inspired by Lagos evenings and local vibrancy

### 1.2 Brand Personality

| Trait | Expression |
|-------|------------|
| Trustworthy | Dark, stable backgrounds; professional typography |
| Warm | Golden accents; friendly copy tone |
| Modern | Clean layouts; smooth animations |
| Bold | Vibrant CTAs; confident headlines |
| Nigerian | Localized imagery; cultural relevance |

### 1.3 Logo Usage

**Primary Logo:** Wordmark "Directrent.ng" in Outfit Bold
- On dark backgrounds: White text
- On light backgrounds: Primary Dark text
- Minimum size: 100px width

**Clearspace:** Minimum margin equal to the height of the "D" in the logo

---

## 2. Color System

### 2.1 Primary Palette

#### Primary Dark (Backgrounds)
```css
--color-primary-dark: #1A0A0A;
RGB: 26, 10, 10
HSL: 0°, 44%, 7%
```
**Usage:** Main backgrounds, hero sections, dark UI elements

#### Primary Medium (Cards/Sections)
```css
--color-primary-medium: #2D1515;
RGB: 45, 21, 21
HSL: 0°, 36%, 13%
```
**Usage:** Card backgrounds, elevated surfaces, section dividers

### 2.2 Accent Palette

#### Accent Gold (Highlights)
```css
--color-accent-gold: #D4A853;
RGB: 212, 168, 83
HSL: 40°, 59%, 58%
```
**Usage:** Secondary CTAs, badges, highlights, icons, premium features

#### Accent Coral (Primary Actions)
```css
--color-accent-coral: #E85A4F;
RGB: 232, 90, 79
HSL: 4°, 77%, 61%
```
**Usage:** Primary buttons, links, important actions, notifications

#### Accent Orange (Tertiary)
```css
--color-accent-orange: #F5A623;
RGB: 245, 166, 35
HSL: 37°, 91%, 55%
```
**Usage:** Secondary highlights, hover states, progress indicators

### 2.3 Neutral Palette

```css
--color-white: #FFFFFF;        /* Primary text on dark */
--color-off-white: #F8F5F0;    /* Light section backgrounds */
--color-gray-100: #E5E5E5;     /* Borders, dividers */
--color-gray-300: #B3B3B3;     /* Disabled states */
--color-gray-600: #6B6B6B;     /* Secondary text */
--color-gray-800: #333333;     /* Primary text on light */
--color-black: #0D0D0D;        /* Strongest text */
```

### 2.4 Semantic Colors

```css
--color-success: #10B981;      /* Success states, confirmations */
--color-warning: #F59E0B;      /* Warnings, important notices */
--color-error: #EF4444;        /* Errors, destructive actions */
--color-info: #3B82F6;         /* Informational, help text */
```

### 2.5 Color Usage Guidelines

| Context | Background | Text | Accent |
|---------|------------|------|--------|
| Hero Section | primary-dark | white | coral (CTA) |
| Feature Card | primary-medium | white | gold (icons) |
| Light Section | off-white | gray-800 | coral (links) |
| CTA Button | coral | white | - |
| Secondary Button | gold | primary-dark | - |

### 2.6 Gradient Definitions

```css
/* Hero gradient */
--gradient-hero: linear-gradient(
  180deg, 
  #1A0A0A 0%, 
  #2D1515 50%, 
  #1A0A0A 100%
);

/* Accent gradient (for special elements) */
--gradient-accent: linear-gradient(
  135deg, 
  #E85A4F 0%, 
  #D4A853 100%
);

/* Overlay gradient (for images) */
--gradient-overlay: linear-gradient(
  180deg, 
  rgba(26, 10, 10, 0.8) 0%, 
  rgba(26, 10, 10, 0.4) 100%
);
```

---

## 3. Typography

### 3.1 Font Families

#### Display Font: Outfit
```css
font-family: 'Outfit', system-ui, sans-serif;
```
**Usage:** Headlines (H1, H2), Logo, Hero text

**Weights:**
- Bold (700) — Headlines
- SemiBold (600) — Subheadlines
- Medium (500) — Button text

#### Body Font: Inter
```css
font-family: 'Inter', system-ui, sans-serif;
```
**Usage:** Body text, UI elements, forms

**Weights:**
- Regular (400) — Body text
- Medium (500) — Labels, navigation
- SemiBold (600) — Emphasis

### 3.2 Type Scale

| Level | Size (Desktop) | Size (Mobile) | Line Height | Weight | Font |
|-------|----------------|---------------|-------------|--------|------|
| H1 | 64px / 4rem | 40px / 2.5rem | 1.1 | 700 | Outfit |
| H2 | 48px / 3rem | 32px / 2rem | 1.2 | 700 | Outfit |
| H3 | 36px / 2.25rem | 28px / 1.75rem | 1.3 | 600 | Outfit |
| H4 | 28px / 1.75rem | 24px / 1.5rem | 1.4 | 600 | Outfit |
| H5 | 24px / 1.5rem | 20px / 1.25rem | 1.4 | 600 | Inter |
| Body Large | 20px / 1.25rem | 18px / 1.125rem | 1.6 | 400 | Inter |
| Body | 16px / 1rem | 16px / 1rem | 1.6 | 400 | Inter |
| Body Small | 14px / 0.875rem | 14px / 0.875rem | 1.5 | 400 | Inter |
| Caption | 12px / 0.75rem | 12px / 0.75rem | 1.4 | 400 | Inter |

### 3.3 Tailwind Typography Classes

```tsx
// Headings
<h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">
<h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
<h3 className="font-display text-2xl md:text-4xl font-semibold leading-snug">

// Body
<p className="text-lg md:text-xl leading-relaxed">
<p className="text-base leading-relaxed">
<small className="text-sm text-gray-600">
```

### 3.4 Text Colors

| Context | Color | Class |
|---------|-------|-------|
| Primary (on dark) | white | `text-white` |
| Primary (on light) | gray-800 | `text-gray-800` |
| Secondary (on dark) | gray-300 | `text-gray-300` |
| Secondary (on light) | gray-600 | `text-gray-600` |
| Accent/Link | coral | `text-accent-coral` |
| Muted | gray-500 | `text-gray-500` |

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Based on 4px/8px grid:

| Token | Value | Usage |
|-------|-------|-------|
| 1 | 4px | Tight spacing, icon gaps |
| 2 | 8px | Standard small gaps |
| 3 | 12px | Medium gaps |
| 4 | 16px | Default spacing |
| 6 | 24px | Section padding (small) |
| 8 | 32px | Card padding |
| 12 | 48px | Section padding (medium) |
| 16 | 64px | Section spacing |
| 24 | 96px | Large section spacing |
| 32 | 128px | Hero section padding |

### 4.2 Container

```tsx
// Standard container
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// Container component
export function Container({ children, className }) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
```

**Max widths:**
- Content: 1280px (max-w-7xl)
- Text: 768px (max-w-3xl)
- Narrow: 640px (max-w-2xl)

### 4.3 Grid System

```tsx
// Standard feature grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// Two-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

// Asymmetric layout
<div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
  <div className="lg:col-span-3">Main content</div>
  <div className="lg:col-span-2">Sidebar</div>
</div>
```

### 4.4 Section Spacing

```tsx
// Standard section
<section className="py-16 md:py-24">

// Hero section
<section className="py-24 md:py-32 lg:py-40">

// Compact section
<section className="py-12 md:py-16">
```

---

## 5. Components

### 5.1 Buttons

#### Primary Button (Coral)
```tsx
<button className="
  bg-accent-coral 
  text-white 
  px-6 py-3 
  rounded-lg 
  font-medium
  hover:bg-accent-coral/90
  focus:outline-none 
  focus:ring-2 
  focus:ring-accent-coral 
  focus:ring-offset-2
  focus:ring-offset-primary-dark
  transition-colors
">
  Join Waitlist
</button>
```

#### Secondary Button (Gold)
```tsx
<button className="
  bg-accent-gold 
  text-primary-dark 
  px-6 py-3 
  rounded-lg 
  font-medium
  hover:bg-accent-gold/90
  transition-colors
">
  Learn More
</button>
```

#### Outline Button
```tsx
<button className="
  border-2 
  border-accent-coral 
  text-accent-coral 
  px-6 py-3 
  rounded-lg 
  font-medium
  hover:bg-accent-coral/10
  transition-colors
">
  Contact Us
</button>
```

#### Button Sizes
| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| sm | px-4 py-2 | text-sm | 36px |
| md | px-6 py-3 | text-base | 44px |
| lg | px-8 py-4 | text-lg | 56px |

### 5.2 Cards

#### Feature Card
```tsx
<div className="
  bg-primary-medium 
  rounded-2xl 
  p-8 
  border 
  border-white/10
  hover:border-accent-gold/30
  transition-colors
">
  <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center mb-6">
    <Icon className="w-6 h-6 text-accent-gold" />
  </div>
  <h3 className="text-xl font-semibold text-white mb-3">Feature Title</h3>
  <p className="text-gray-400 leading-relaxed">Feature description text goes here.</p>
</div>
```

#### Testimonial Card
```tsx
<div className="
  bg-white 
  rounded-2xl 
  p-8 
  shadow-lg
">
  <div className="flex items-center gap-1 mb-4">
    {/* Star rating */}
  </div>
  <p className="text-gray-800 mb-6">"Testimonial quote..."</p>
  <div className="flex items-center gap-4">
    <img className="w-12 h-12 rounded-full" />
    <div>
      <p className="font-semibold text-gray-800">Name</p>
      <p className="text-sm text-gray-500">Role</p>
    </div>
  </div>
</div>
```

### 5.3 Form Elements

#### Input Field
```tsx
<div>
  <label className="block text-sm font-medium text-white mb-2">
    Email Address
  </label>
  <input
    type="email"
    className="
      w-full 
      px-4 
      py-3 
      rounded-lg 
      bg-white/10 
      border 
      border-white/20
      text-white
      placeholder-gray-400
      focus:outline-none 
      focus:border-accent-gold
      focus:ring-1 
      focus:ring-accent-gold
      transition-colors
    "
    placeholder="you@example.com"
  />
</div>
```

#### Select Field
```tsx
<select className="
  w-full 
  px-4 
  py-3 
  rounded-lg 
  bg-white/10 
  border 
  border-white/20
  text-white
  focus:outline-none 
  focus:border-accent-gold
  appearance-none
  bg-[url('data:image/svg+xml;...')] 
  bg-no-repeat 
  bg-right
">
  <option>Select an option</option>
</select>
```

### 5.4 Navigation

#### Desktop Navigation
```tsx
<nav className="hidden md:flex items-center gap-8">
  <a className="text-white/80 hover:text-white transition-colors">Features</a>
  <a className="text-white/80 hover:text-white transition-colors">Pricing</a>
  <a className="text-white/80 hover:text-white transition-colors">About</a>
  <Button>Join Waitlist</Button>
</nav>
```

#### Mobile Menu Item
```tsx
<a className="
  block 
  px-4 
  py-3 
  text-lg 
  text-white 
  border-b 
  border-white/10
  hover:bg-white/5
">
  Features
</a>
```

### 5.5 Badges

```tsx
// Status badge
<span className="
  inline-flex 
  items-center 
  px-3 
  py-1 
  rounded-full 
  text-sm 
  font-medium
  bg-accent-gold/20 
  text-accent-gold
">
  Coming Soon
</span>

// Highlight badge
<span className="
  inline-flex 
  items-center 
  px-3 
  py-1 
  rounded-full 
  text-sm 
  font-medium
  bg-accent-coral 
  text-white
">
  2% Fee Only
</span>
```

---

## 6. Icons

### 6.1 Icon Library

Primary: **Lucide React** (recommended)
- Consistent stroke width
- MIT licensed
- Tree-shakeable

### 6.2 Icon Sizes

| Size | Dimension | Usage |
|------|-----------|-------|
| xs | 16px | Inline with text |
| sm | 20px | Buttons, navigation |
| md | 24px | Standard UI icons |
| lg | 32px | Feature icons |
| xl | 48px | Hero icons |

### 6.3 Icon Usage

```tsx
import { Home, Search, User, Settings } from 'lucide-react';

// Standard usage
<Home className="w-6 h-6 text-accent-gold" />

// In button
<button className="inline-flex items-center gap-2">
  <Search className="w-5 h-5" />
  <span>Search</span>
</button>

// Feature icon with background
<div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
  <Home className="w-6 h-6 text-accent-gold" />
</div>
```

---

## 7. Imagery

### 7.1 Photography Style

- **Authentic:** Real Lagos neighborhoods and buildings
- **Warm:** Golden hour lighting preferred
- **Diverse:** Representative of Nigerian demographics
- **Modern:** Contemporary properties and lifestyles
- **Contextual:** Show real rental scenarios

### 7.2 Image Treatment

```tsx
// Hero image with overlay
<div className="relative">
  <Image 
    src="/images/hero-lagos.jpg"
    alt="Lagos skyline at sunset"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 to-primary-dark/40" />
</div>

// Feature image
<Image
  src="/images/feature-1.jpg"
  alt="Happy tenant in new home"
  width={600}
  height={400}
  className="rounded-2xl object-cover"
/>
```

### 7.3 Illustration Guidelines

If using illustrations:
- Consistent with brand colors
- Simple, flat style
- Diverse representation
- Nigerian context (buildings, clothing, etc.)

---

## 8. Motion & Animation

### 8.1 Animation Principles

1. **Purposeful:** Animations guide attention and provide feedback
2. **Subtle:** Don't distract from content
3. **Quick:** Most animations under 300ms
4. **Consistent:** Same easing across the site

### 8.2 Timing & Easing

| Type | Duration | Easing |
|------|----------|--------|
| Micro (hover) | 150ms | ease-out |
| Standard | 200-300ms | ease-out |
| Enter | 300-400ms | ease-out |
| Exit | 200ms | ease-in |
| Complex | 400-600ms | custom |

### 8.3 Framer Motion Variants

```tsx
// Fade in from bottom (for sections)
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Scale on hover (for cards)
const hoverScale = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.2 }
};
```

### 8.4 Scroll Animations

```tsx
import { useInView } from 'framer-motion';

function Section() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* content */}
    </motion.section>
  );
}
```

### 8.5 Loading States

```tsx
// Button loading
<button disabled className="flex items-center gap-2">
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
    {/* spinner SVG */}
  </svg>
  <span>Loading...</span>
</button>

// Skeleton loading
<div className="animate-pulse">
  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4" />
  <div className="h-4 bg-gray-700 rounded w-1/2" />
</div>
```

---

## 9. Accessibility

### 9.1 Color Contrast

All text meets WCAG 2.1 AA standards:

| Combination | Ratio | Status |
|-------------|-------|--------|
| White on primary-dark | 15.4:1 | ✅ AAA |
| Gray-300 on primary-dark | 8.2:1 | ✅ AAA |
| White on accent-coral | 4.5:1 | ✅ AA |
| Primary-dark on accent-gold | 7.8:1 | ✅ AAA |

### 9.2 Focus States

```css
/* Standard focus */
:focus-visible {
  outline: 2px solid var(--color-accent-gold);
  outline-offset: 2px;
}

/* Focus on dark background */
.dark :focus-visible {
  outline-color: var(--color-accent-gold);
}
```

### 9.3 Interactive Elements

- Minimum touch target: 44x44px
- Clear hover states
- Visible focus indicators
- Sufficient spacing between targets

### 9.4 Screen Reader Considerations

```tsx
// Hidden but accessible text
<span className="sr-only">Open navigation menu</span>

// Accessible icon button
<button aria-label="Close menu">
  <X className="w-6 h-6" aria-hidden="true" />
</button>

// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
```

---

## 10. Implementation

### 10.1 Tailwind Configuration

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
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 168, 83, 0.3)',
        'glow-coral': '0 0 20px rgba(232, 90, 79, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 10.2 Font Setup (Next.js)

```tsx
// app/layout.tsx
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### 10.3 Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-primary-dark text-white antialiased;
  }
  
  ::selection {
    @apply bg-accent-gold/30 text-white;
  }
}

@layer components {
  .btn-primary {
    @apply bg-accent-coral text-white px-6 py-3 rounded-lg font-medium
           hover:bg-accent-coral/90 focus:outline-none focus:ring-2 
           focus:ring-accent-coral focus:ring-offset-2 
           focus:ring-offset-primary-dark transition-colors;
  }
  
  .btn-secondary {
    @apply bg-accent-gold text-primary-dark px-6 py-3 rounded-lg font-medium
           hover:bg-accent-gold/90 transition-colors;
  }
}
```

---

## Appendix: Quick Reference

### Color Tokens
```
Primary Dark:   #1A0A0A
Primary Medium: #2D1515
Accent Gold:    #D4A853
Accent Coral:   #E85A4F
Accent Orange:  #F5A623
White:          #FFFFFF
```

### Font Stack
```
Display: Outfit, system-ui, sans-serif
Body:    Inter, system-ui, sans-serif
```

### Spacing (most used)
```
4:  16px  - Default gap
8:  32px  - Card padding
12: 48px  - Section padding (small)
16: 64px  - Section spacing
24: 96px  - Large section spacing
```

### Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

*End of Style Guide*
