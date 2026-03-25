# CLAUDE.md — Directrent.ng Website Development

## Project Identity

**Project Name:** Directrent.ng Website  
**Domain:** directrent.ng  
**Repository:** [Your GitHub Repo URL]  
**Deployment:** Vercel (Free Tier)  
**Development Environment:** VS Code + Claude Code on Windows 10/PowerShell  

---

## Project Overview

Directrent.ng is a Lagos-based PropTech startup building a two-sided rental marketplace that eliminates traditional real estate agent intermediaries. This website serves as the primary marketing, information, and user onboarding platform for the mobile application.

### Core Value Proposition
- Direct landlord-tenant connections
- BVN/NIN identity verification
- Paystack escrow payments
- 2% platform fee (vs 15% traditional agency fees)
- Hyperlocal rollout starting with Yaba and Surulere

---

## Team Structure (Claude Code Roles)

This project uses a **single-session team simulation** approach. Each role has dedicated instructions in `/docs/roles/`.

### Team Roles

| Role | Focus Area | Instruction File |
|------|------------|------------------|
| **Team Lead** | Architecture decisions, code review, sprint planning | `CLAUDE_LEAD.md` |
| **Frontend Developer** | Next.js components, UI/UX implementation | `CLAUDE_FRONTEND.md` |
| **Backend/API Developer** | API routes, integrations, data handling | `CLAUDE_BACKEND.md` |
| **DevOps Engineer** | Deployment, CI/CD, Vercel configuration | `CLAUDE_DEVOPS.md` |
| **QA Engineer** | Testing, accessibility, performance | `CLAUDE_QA.md` |

### How to Switch Roles
When working on a specific aspect, reference the appropriate role file:
```
Acting as Frontend Developer per /docs/roles/CLAUDE_FRONTEND.md, implement [task]
```

---

## Technical Stack

### Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Deployment:** Vercel

### Development Tools
- **Package Manager:** npm (not yarn or pnpm for Windows compatibility)
- **Linting:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged
- **Testing:** Jest + React Testing Library + Playwright

---

## Brand Identity & Design System

### Color Palette (from brand reference)

```css
:root {
  /* Primary Colors */
  --color-primary-dark: #1A0A0A;      /* Deep burgundy/maroon - backgrounds */
  --color-primary-medium: #2D1515;    /* Medium burgundy - cards/sections */
  
  /* Accent Colors */
  --color-accent-gold: #D4A853;       /* Warm amber/gold - highlights, CTAs */
  --color-accent-coral: #E85A4F;      /* Vibrant coral-red - buttons, links */
  --color-accent-orange: #F5A623;     /* Orange - secondary CTAs */
  
  /* Neutral Colors */
  --color-white: #FFFFFF;             /* Primary text on dark */
  --color-off-white: #F8F5F0;         /* Light backgrounds */
  --color-gray-100: #E5E5E5;          /* Borders, dividers */
  --color-gray-600: #6B6B6B;          /* Secondary text */
  --color-black: #0D0D0D;             /* Text on light backgrounds */
  
  /* Semantic Colors */
  --color-success: #10B981;           /* Success states */
  --color-warning: #F59E0B;           /* Warning states */
  --color-error: #EF4444;             /* Error states */
  --color-info: #3B82F6;              /* Info states */
}
```

### Typography
- **Primary Font:** Inter (Google Fonts)
- **Display Font:** Outfit (for headlines)
- **Fallback:** system-ui, -apple-system, sans-serif

### Spacing System
Follow 8px grid: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

---

## Project Structure

```
directrent-website/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI/CD
├── docs/
│   ├── roles/                        # Role-specific Claude instructions
│   │   ├── CLAUDE_LEAD.md
│   │   ├── CLAUDE_FRONTEND.md
│   │   ├── CLAUDE_BACKEND.md
│   │   ├── CLAUDE_DEVOPS.md
│   │   └── CLAUDE_QA.md
│   ├── ARCHITECTURE.md               # Technical architecture
│   ├── PRD.md                        # Product Requirements
│   └── STYLE_GUIDE.md                # Design system details
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Marketing pages group
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── about/
│   │   │   ├── features/
│   │   │   ├── pricing/
│   │   │   └── contact/
│   │   ├── (legal)/                  # Legal pages group
│   │   │   ├── privacy/
│   │   │   ├── terms/
│   │   │   └── cookies/
│   │   ├── api/                      # API routes
│   │   │   ├── contact/
│   │   │   ├── waitlist/
│   │   │   └── newsletter/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/                 # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   └── forms/                    # Form components
│   │       ├── ContactForm.tsx
│   │       └── WaitlistForm.tsx
│   ├── lib/                          # Utility functions
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validations.ts
│   ├── hooks/                        # Custom React hooks
│   │   ├── useScrollPosition.ts
│   │   └── useMediaQuery.ts
│   ├── types/                        # TypeScript types
│   │   └── index.ts
│   └── styles/                       # Additional styles
│       └── animations.css
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .env.local                        # (gitignored)
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── CLAUDE.md                         # This file
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Development Commands

### Windows PowerShell Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Type checking
npm run type-check

# Format code
npm run format
```

---

## Git Workflow

### Branch Naming Convention
- `main` — Production branch (auto-deploys to Vercel)
- `develop` — Integration branch
- `feature/[ticket-id]-description` — Feature branches
- `fix/[ticket-id]-description` — Bug fix branches
- `hotfix/[ticket-id]-description` — Production hotfixes

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(hero): add animated background gradient

- Implemented Framer Motion animation
- Added responsive breakpoints
- Optimized for performance
```

---

## Key Development Principles

### 1. Performance First
- Target Lighthouse score: 90+ on all metrics
- Implement lazy loading for images and components
- Use Next.js Image component for all images
- Minimize JavaScript bundle size

### 2. Mobile First
- Design and develop for mobile viewport first
- Use responsive Tailwind classes: `sm:`, `md:`, `lg:`, `xl:`
- Test on actual devices when possible

### 3. Accessibility (WCAG 2.1 AA)
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios ≥ 4.5:1

### 4. SEO Optimization
- Proper meta tags on all pages
- Open Graph and Twitter cards
- Structured data (JSON-LD)
- Sitemap and robots.txt

### 5. Security
- Input validation on all forms
- Rate limiting on API routes
- HTTPS only (enforced by Vercel)
- No sensitive data in client-side code

---

## Environment Variables

### Required Variables
```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://directrent.ng
NEXT_PUBLIC_SITE_NAME=Directrent.ng

# Analytics (optional for MVP)
NEXT_PUBLIC_GA_ID=

# Contact Form
CONTACT_EMAIL=hello@directrent.ng

# Waitlist/Newsletter (e.g., Mailchimp, ConvertKit)
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=
```

### Vercel Environment Setup
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add each variable for Production, Preview, and Development
3. Redeploy after adding/changing variables

---

## Sprint Workflow

### Sprint 0: Foundation (Week 1)
- [ ] Project setup and configuration
- [ ] Design system implementation
- [ ] Base components (Button, Card, Input)
- [ ] Layout components (Header, Footer)
- [ ] Vercel deployment pipeline

### Sprint 1: Core Pages (Week 2)
- [ ] Home page with all sections
- [ ] About page
- [ ] Features page
- [ ] Contact page with form

### Sprint 2: Enhancements (Week 3)
- [ ] Animations and micro-interactions
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility audit

### Sprint 3: Launch Prep (Week 4)
- [ ] Legal pages (Privacy, Terms)
- [ ] Final testing
- [ ] Analytics setup
- [ ] Production deployment

---

## Quality Checklist

Before merging any PR, ensure:

- [ ] TypeScript has no errors (`npm run type-check`)
- [ ] ESLint passes (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Page loads under 3 seconds
- [ ] Mobile responsive (320px to 1920px)
- [ ] Accessibility audit passes
- [ ] No console errors
- [ ] Images optimized
- [ ] Meta tags present

---

## Useful Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vercel Deployment Docs](https://vercel.com/docs)

### Design Resources
- Figma designs (if available): [Link]
- Brand guidelines: `/docs/STYLE_GUIDE.md`
- Component library: `/src/components/ui/`

### Project Context
- Full PRD: `/docs/PRD.md`
- Architecture decisions: `/docs/ARCHITECTURE.md`
- Mobile app PRD: [Reference from Opus 4.5 chat]

---

## Emergency Contacts & Support

- **Project Owner:** Ololade
- **Domain Registrar:** [Your registrar]
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** [Your repo URL]

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025 | Initial project setup |

---

*Last updated: March 2026*
