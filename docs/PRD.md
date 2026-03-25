# Product Requirements Document (PRD)
## Directrent.ng Marketing Website

**Version:** 1.0  
**Last Updated:** March 2026  
**Author:** MBA Capstone Project Team  
**Status:** Active Development  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Target Audience](#3-target-audience)
4. [Website Goals & KPIs](#4-website-goals--kpis)
5. [Sitemap & Page Requirements](#5-sitemap--page-requirements)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [Content Strategy](#8-content-strategy)
9. [SEO Requirements](#9-seo-requirements)
10. [Analytics & Tracking](#10-analytics--tracking)
11. [Launch Checklist](#11-launch-checklist)

---

## 1. Executive Summary

### 1.1 Product Overview

The Directrent.ng website serves as the primary digital storefront for the Directrent.ng mobile application. It functions as a marketing, information, and lead-generation platform designed to:

- Educate visitors about the "Mandatory Middleman" problem in Lagos rental markets
- Showcase the Directrent.ng solution and its benefits
- Convert visitors into app downloads and waitlist sign-ups
- Establish trust through transparency and social proof
- Support both tenant and landlord user journeys

### 1.2 Business Context

**Primary Research Insights (N=70):**
- 50 tenants and 20 landlords surveyed across five Lagos areas
- Financial Friction Index (FFI) and Psychological Stress Score (PSS) validate market pain
- Cronbach's Alpha of .996 confirms unified construct of dissatisfaction with agent system
- Cramer's V of .882 indicates near-perfect correlation between agent presence and payment delays

### 1.3 Success Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|--------|------------------|------------------|
| Monthly Visitors | 5,000 | 25,000 |
| Waitlist Sign-ups | 500 | 2,500 |
| App Downloads | N/A (pre-launch) | 1,000 |
| Bounce Rate | < 50% | < 40% |
| Avg. Session Duration | > 2 min | > 3 min |

---

## 2. Product Vision

### 2.1 Mission Statement

*"To become the most trusted digital gateway for Nigerians seeking transparent, direct rental connections — eliminating the financial and emotional burden of traditional agent intermediaries."*

### 2.2 Core Value Propositions

#### For Tenants
1. **Save 13%+ on Rental Costs** — No agency fees, no legal fees to middlemen
2. **Verified Landlords** — BVN/NIN verification reduces fraud risk
3. **Transparent Pricing** — See actual rent, no hidden markups
4. **Secure Payments** — Paystack escrow protects your deposit

#### For Landlords
1. **Direct Tenant Access** — No commission to agents
2. **Faster Occupancy** — Reduce vacancy with direct connections
3. **Verified Tenants** — Identity-verified applicants only
4. **Digital Management** — Rent collection, agreements, communications

### 2.3 Brand Personality

- **Trustworthy** — We handle your most important transactions
- **Transparent** — No hidden fees, no surprises
- **Modern** — Technology-first, mobile-native
- **Empowering** — Putting control back in your hands
- **Nigerian** — Built by Nigerians, for Nigerians

---

## 3. Target Audience

### 3.1 Primary Personas

#### Persona 1: "Young Professional Tayo"
- **Demographics:** 25-35, employed, earning ₦150k-500k/month
- **Location:** Yaba, Surulere, Lekki, Ikeja
- **Pain Points:**
  - Frustrated by agent fees (10-15% of annual rent)
  - Time wasted on property viewings with no outcome
  - Fear of fraudulent agents
  - Difficulty finding quality listings
- **Goals:**
  - Find affordable housing quickly
  - Avoid unnecessary fees
  - Secure, verified transactions
- **Digital Behavior:**
  - Mobile-first
  - Active on Instagram, Twitter, WhatsApp
  - Researches extensively before decisions

#### Persona 2: "Property Owner Adaeze"
- **Demographics:** 40-55, property owner, 1-5 rental units
- **Location:** Various Lagos areas
- **Pain Points:**
  - Agents not finding quality tenants
  - Long vacancy periods
  - Rent collection difficulties
  - Lack of transparency in agent dealings
- **Goals:**
  - Minimize vacancy periods
  - Find reliable, paying tenants
  - Simplify property management
- **Digital Behavior:**
  - Mobile user but less tech-savvy
  - Uses WhatsApp heavily
  - Prefers clear, simple interfaces

### 3.2 Secondary Audiences

- **Real estate professionals** exploring the platform
- **Investors** interested in PropTech
- **Press/Media** covering Lagos housing market
- **Potential partners** (payment providers, verification services)

---

## 4. Website Goals & KPIs

### 4.1 Primary Goals

| Goal | Priority | KPI |
|------|----------|-----|
| Build Waitlist | P0 | # of sign-ups |
| Educate Market | P1 | Time on site, pages/session |
| Establish Trust | P1 | Testimonial engagement, FAQ views |
| Drive App Downloads | P0 | Download clicks (post-launch) |
| Capture Leads | P2 | Contact form submissions |

### 4.2 Conversion Funnel

```
Awareness → Interest → Consideration → Intent → Conversion
   ↓           ↓            ↓            ↓          ↓
Landing    Features     How It       Pricing    Waitlist
  Page      Page        Works        Page       Sign-up
```

### 4.3 Key Performance Indicators

**Traffic Metrics:**
- Unique visitors (monthly)
- Traffic sources breakdown
- Geographic distribution (Lagos focus)

**Engagement Metrics:**
- Bounce rate
- Average session duration
- Pages per session
- Scroll depth on key pages

**Conversion Metrics:**
- Waitlist conversion rate
- Contact form submission rate
- Newsletter sign-up rate
- App download rate (post-launch)

---

## 5. Sitemap & Page Requirements

### 5.1 Complete Sitemap

```
directrent.ng/
├── / (Home)
├── /about
├── /features
│   ├── /features/tenants
│   └── /features/landlords
├── /how-it-works
├── /pricing
├── /contact
├── /waitlist
├── /blog (Phase 2)
│   └── /blog/[slug]
├── /faq
├── /privacy
├── /terms
├── /cookies
└── /404
```

### 5.2 Page-by-Page Requirements

---

#### 5.2.1 Home Page (`/`)

**Purpose:** First impression, value proposition, conversion

**Sections:**

1. **Hero Section**
   - Headline: Clear value proposition
   - Subheadline: Supporting statement
   - Primary CTA: "Join the Waitlist"
   - Secondary CTA: "Learn More"
   - Background: Animated gradient or Lagos cityscape
   - Trust badges: "2% Fee", "Verified Users", "Secure Payments"

2. **Problem Statement**
   - "The Mandatory Middleman Problem"
   - Statistics from primary research (FFI, PSS)
   - Emotional connection with audience pain points

3. **Solution Overview**
   - How Directrent.ng solves the problem
   - Key differentiators
   - Simple visual/diagram

4. **Features Highlight**
   - 3-4 key features with icons
   - Brief descriptions
   - Link to full features page

5. **How It Works**
   - 3-step process (simplified)
   - Visual timeline or cards
   - CTA to detailed how-it-works page

6. **Social Proof**
   - Testimonials (if available)
   - Statistics: "X landlords waiting", "Y tenants registered"
   - Press mentions (if applicable)

7. **Dual CTA Section**
   - For Tenants: "Find Your Next Home"
   - For Landlords: "List Your Property"

8. **FAQ Preview**
   - 3-4 most common questions
   - Link to full FAQ page

9. **Final CTA**
   - Waitlist form embedded
   - App store badges (when available)

---

#### 5.2.2 About Page (`/about`)

**Purpose:** Build trust, tell the story, humanize the brand

**Sections:**

1. **Our Story**
   - Origin of Directrent.ng
   - The problem we witnessed
   - Our mission to solve it

2. **The Problem We're Solving**
   - Detailed explanation of "Agent Effect"
   - Research-backed statistics
   - Human impact stories

3. **Our Values**
   - Transparency
   - Trust
   - Technology
   - Community

4. **Team Section** (Optional for MVP)
   - Founder(s) with brief bio
   - Advisor mentions if applicable

5. **Vision for the Future**
   - Where we're headed
   - Expansion plans
   - Community impact goals

---

#### 5.2.3 Features Page (`/features`)

**Purpose:** Detailed product information, differentiation

**Structure:** Tab or toggle between Tenant/Landlord views

**Tenant Features:**
1. Verified Property Listings
2. Direct Landlord Communication
3. Secure Escrow Payments
4. Digital Lease Agreements
5. Neighborhood Insights
6. Search & Filters
7. Saved Properties
8. In-App Messaging

**Landlord Features:**
1. Free Property Listing
2. Verified Tenant Pool
3. Automated Rent Collection
4. Digital Agreements
5. Tenant Screening Tools
6. Payment History Tracking
7. Property Analytics
8. Multi-Property Management

---

#### 5.2.4 How It Works (`/how-it-works`)

**Purpose:** Reduce friction, explain the process clearly

**For Tenants:**
1. Create Account → BVN/NIN Verification
2. Search Properties → Filter by location, price, type
3. Contact Landlord → Direct messaging
4. Secure Payment → Escrow protection
5. Sign Agreement → Digital lease
6. Move In → Start your new chapter

**For Landlords:**
1. Create Account → Verify identity
2. List Property → Photos, details, pricing
3. Receive Applications → View verified tenants
4. Select Tenant → Review profiles
5. Collect Payment → Secure escrow
6. Manage Tenancy → Digital tools

---

#### 5.2.5 Pricing Page (`/pricing`)

**Purpose:** Transparency, address cost concerns

**Content:**
- **For Tenants:** Always free to search and connect
- **For Landlords:** Free listing, 2% on successful rental
- **Comparison:** 2% vs. traditional 10-15% agent fees
- **Fee Breakdown:** What's included, what's not
- **FAQ about pricing**

---

#### 5.2.6 Contact Page (`/contact`)

**Purpose:** Lead capture, support inquiries

**Features:**
- Contact form (Name, Email, Subject, Message)
- Email address: hello@directrent.ng
- Social media links
- Business hours (if applicable)
- Physical address (optional)
- Map embed (optional)

---

#### 5.2.7 Waitlist Page (`/waitlist`)

**Purpose:** Dedicated conversion page

**Content:**
- Strong headline
- Key benefits bullet points
- Simple form: Name, Email, Phone, User Type (Tenant/Landlord)
- Privacy notice
- Thank you message/redirect

---

#### 5.2.8 FAQ Page (`/faq`)

**Purpose:** Reduce support burden, build trust

**Categories:**
1. General Questions
2. For Tenants
3. For Landlords
4. Payments & Security
5. Verification Process
6. Troubleshooting

**Format:** Accordion/expandable sections

---

#### 5.2.9 Legal Pages

**/privacy** — Privacy Policy
**/terms** — Terms of Service
**/cookies** — Cookie Policy

All legal pages should be:
- Clearly written (plain language)
- Comprehensive
- NDPR compliant
- Dated with last update

---

## 6. Functional Requirements

### 6.1 Forms

#### 6.1.1 Waitlist Form
- **Fields:** Name*, Email*, Phone, User Type (Tenant/Landlord)*
- **Validation:** Email format, phone format (Nigerian)
- **Storage:** Database/Mailchimp/ConvertKit
- **Response:** Thank you message, confirmation email
- **Rate Limiting:** Prevent spam submissions

#### 6.1.2 Contact Form
- **Fields:** Name*, Email*, Subject*, Message*
- **Validation:** All fields required, email format
- **Action:** Email to team, confirmation to user
- **Rate Limiting:** 5 submissions per hour per IP

#### 6.1.3 Newsletter Form
- **Fields:** Email*
- **Integration:** Mailchimp/ConvertKit
- **Double Opt-in:** Required

### 6.2 Navigation

- **Desktop:** Horizontal nav bar, sticky on scroll
- **Mobile:** Hamburger menu, slide-out drawer
- **Items:** Home, Features, How It Works, Pricing, About, Contact
- **CTA Button:** "Join Waitlist" (always visible)

### 6.3 Footer

- **Columns:**
  1. Logo + tagline + social links
  2. Quick Links (Features, Pricing, About)
  3. Support (FAQ, Contact, Blog)
  4. Legal (Privacy, Terms, Cookies)
- **Bottom:** Copyright, "Made in Lagos 🇳🇬"

### 6.4 Interactivity

- **Smooth scrolling** for anchor links
- **Hover states** on all interactive elements
- **Loading states** for forms and buttons
- **Error states** with clear messages
- **Success states** with confirmations

---

## 7. Non-Functional Requirements

### 7.1 Performance

| Metric | Requirement |
|--------|-------------|
| Time to First Byte | < 200ms |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.5s |
| Total Bundle Size | < 300KB (gzipped) |
| Image Optimization | WebP with fallbacks |

### 7.2 Browser Support

- Chrome 90+ (primary)
- Safari 14+ (primary)
- Firefox 90+
- Edge 90+
- Mobile browsers (Chrome, Safari)
- Opera Mini (graceful degradation)

### 7.3 Accessibility

- WCAG 2.1 Level AA compliance
- Screen reader compatibility
- Keyboard navigation
- Focus indicators
- Skip to content link
- Alt text for all images
- Color contrast ≥ 4.5:1

### 7.4 Security

- HTTPS only
- Input sanitization
- CSRF protection on forms
- Rate limiting on API routes
- Security headers (CSP, X-Frame-Options)
- No sensitive data in client-side code

### 7.5 Reliability

- 99.9% uptime target
- Error monitoring (Vercel built-in)
- Graceful error handling
- 404 and 500 error pages

---

## 8. Content Strategy

### 8.1 Tone of Voice

- **Confident** but not arrogant
- **Friendly** but professional
- **Clear** and jargon-free
- **Empathetic** to user pain points
- **Nigerian** — use local context appropriately

### 8.2 Key Messages

1. "No more agents standing between you and your home"
2. "2% fee vs. 15% — the math is simple"
3. "Verified landlords, verified tenants, verified trust"
4. "Your rent should go to your landlord, not middlemen"
5. "Built for Lagos, built for Nigeria"

### 8.3 Content Inventory

| Page | Word Count | Images | CTAs |
|------|------------|--------|------|
| Home | 800-1000 | 6-8 | 5+ |
| About | 500-700 | 2-3 | 2 |
| Features | 600-800 | 8-10 | 3 |
| How It Works | 400-600 | 4-6 | 2 |
| Pricing | 300-400 | 1-2 | 2 |
| FAQ | 800-1200 | 0 | 1 |

---

## 9. SEO Requirements

### 9.1 Technical SEO

- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy (H1 → H6)
- [ ] Meta titles (50-60 characters)
- [ ] Meta descriptions (150-160 characters)
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] XML Sitemap
- [ ] robots.txt
- [ ] JSON-LD structured data
- [ ] Mobile-friendly (responsive)
- [ ] Core Web Vitals optimized

### 9.2 Target Keywords

**Primary Keywords:**
- "rent apartment Lagos"
- "direct landlord Lagos"
- "apartment rental Nigeria"
- "find house to rent Lagos"
- "no agent apartment Lagos"

**Long-tail Keywords:**
- "how to rent apartment without agent Lagos"
- "apartment for rent in Yaba direct landlord"
- "verified landlords Lagos rental"
- "secure apartment payment Nigeria"

### 9.3 Page-Specific Meta

| Page | Title | Description |
|------|-------|-------------|
| Home | Directrent.ng — Rent Direct, Save More | Connect directly with verified landlords in Lagos. No agents, no hidden fees. Just 2% platform fee vs. 15% traditional costs. |
| Features | Features — Directrent.ng | Explore our features: verified listings, direct messaging, secure payments, and digital lease agreements. |
| Pricing | Pricing — Directrent.ng | Simple, transparent pricing. Free for tenants, 2% for landlords. See why we're cheaper than agents. |

---

## 10. Analytics & Tracking

### 10.1 Required Tracking

- **Google Analytics 4**
  - Page views
  - Events (form submissions, button clicks)
  - User flow
  - Demographics
  - Acquisition channels

- **Custom Events**
  - waitlist_signup
  - contact_form_submit
  - feature_view (Tenant/Landlord toggle)
  - faq_expand
  - cta_click
  - social_link_click

### 10.2 Dashboard Metrics

**Weekly Review:**
- Total visitors
- New vs. returning
- Top pages
- Waitlist conversions
- Traffic sources

**Monthly Review:**
- Month-over-month growth
- Conversion rate trends
- User behavior patterns
- Geographic distribution

---

## 11. Launch Checklist

### Pre-Launch

- [ ] All pages built and reviewed
- [ ] Forms tested and working
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed
- [ ] Performance audit passed (90+ Lighthouse)
- [ ] SEO audit completed
- [ ] Legal pages approved
- [ ] Analytics configured
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Error pages styled
- [ ] Social preview images uploaded
- [ ] Favicon and app icons set

### Launch Day

- [ ] Final content review
- [ ] Form submission test
- [ ] Analytics verification
- [ ] Social media announcement ready
- [ ] Team notified
- [ ] Monitoring enabled

### Post-Launch (Week 1)

- [ ] Monitor error logs
- [ ] Review analytics data
- [ ] Collect user feedback
- [ ] Fix any discovered issues
- [ ] Assess initial KPIs

---

## Appendix A: Research Data Summary

**Primary Research (N=70):**
- 50 tenants, 20 landlords
- 5 Lagos areas: Yaba, Surulere, Lekki, Ikeja, Mainland
- Financial Friction Index (FFI): [Value from research]
- Psychological Stress Score (PSS): [Value from research]
- Cronbach's Alpha: .996 (reliability)
- Cramer's V: .882 (agent-delay correlation)
- P-values: <.001 for key hypotheses

---

## Appendix B: Competitive Landscape

| Competitor | Strengths | Weaknesses | Our Advantage |
|------------|-----------|------------|---------------|
| PropertyPro | Established | High fees, no verification | Verification + low fees |
| Nigeria Property Centre | Large inventory | Agent-driven | Direct landlord model |
| Jumia House | Brand recognition | Poor UX, inactive listings | Fresh, verified listings |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | March 2026 | Team | Initial PRD |

---

*End of PRD*
