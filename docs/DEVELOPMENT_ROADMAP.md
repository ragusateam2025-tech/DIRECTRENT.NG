# Directrent.ng — Development Roadmap

> **Version:** 2.0  
> **Last Updated:** 2026-03-23  
> **Status:** In Progress  
> **Project Manager:** Claude (Lead TPM)

---

## Table of Contents

1. [Roadmap Overview](#1-roadmap-overview)
2. [Phase 0: Foundation & Website](#phase-0-foundation--website)
3. [Phase 1: Authentication & User Management](#phase-1-authentication--user-management)
4. [Phase 2: Landlord Dashboard & Listings](#phase-2-landlord-dashboard--listings)
5. [Phase 3: Tenant Discovery & Favorites](#phase-3-tenant-discovery--favorites)
6. [Phase 4: Messaging System](#phase-4-messaging-system)
7. [Phase 5: Lease Management](#phase-5-lease-management)
8. [Phase 6: Payments & Escrow](#phase-6-payments--escrow)
9. [Phase 7: Polish & Launch](#phase-7-polish--launch)
10. [Release Schedule](#release-schedule)
11. [Risk Register](#risk-register)

---

## 1. Roadmap Overview

### 1.1 Timeline Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         14-WEEK DEVELOPMENT TIMELINE                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Phase 0: Foundation & Website                                              │
│  ████████████████████                    Weeks 1-2                          │
│                                                                              │
│  Phase 1: Authentication & Users                                            │
│            ████████████████████          Weeks 3-4                          │
│                                                                              │
│  Phase 2: Landlord Dashboard                                                │
│                      ████████████████████ Weeks 5-6                         │
│                                                                              │
│  Phase 3: Tenant Discovery                                                  │
│                                ██████████ Weeks 7-8                         │
│                                                                              │
│  Phase 4: Messaging                                                         │
│                                      ████████████ Weeks 9-10                │
│                                                                              │
│  Phase 5: Lease Management                                                  │
│                                              ████████ Weeks 11-12           │
│                                                                              │
│  Phase 6: Payments & Escrow                                                 │
│                                                    ██████ Week 13           │
│                                                                              │
│  Phase 7: Polish & Launch                                                   │
│                                                        ████ Week 14         │
│                                                                              │
│  TODAY ▼                                                                     │
│  Week 1   2   3   4   5   6   7   8   9  10  11  12  13  14                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Development Tracks

| Track | Focus | Team |
|-------|-------|------|
| **Website** | Marketing site, waitlist, download page | Frontend |
| **Mobile (Tenant)** | Tenant-facing mobile app | Mobile |
| **Mobile (Landlord)** | Landlord-facing mobile app | Mobile |
| **Backend** | API, database, integrations | Backend |
| **DevOps** | CI/CD, deployment, monitoring | DevOps |

### 1.3 Current Status

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 0 | 🟡 In Progress | 70% |
| Phase 1 | ⚪ Not Started | 0% |
| Phase 2 | ⚪ Not Started | 0% |
| Phase 3 | ⚪ Not Started | 0% |
| Phase 4 | ⚪ Not Started | 0% |
| Phase 5 | ⚪ Not Started | 0% |
| Phase 6 | ⚪ Not Started | 0% |
| Phase 7 | ⚪ Not Started | 0% |

**Legend:** 🟢 Complete | 🟡 In Progress | 🔴 Blocked | ⚪ Not Started

---

## Phase 0: Foundation & Website

**Duration:** Weeks 1-2  
**Status:** 🟡 In Progress  
**Goal:** Establish project foundation and launch marketing website

### Sprint 0.1: Project Setup (Week 1)

#### Environment & Tooling
- [x] Initialize Next.js 14 project with TypeScript
- [x] Configure Tailwind CSS with brand colors
- [x] Set up ESLint + Prettier
- [x] Configure VS Code workspace settings
- [x] Create CLAUDE.md for Claude Code
- [x] Set up Git repository
- [x] Connect GitHub to Vercel
- [x] Configure custom domain (directrent.ng)
- [ ] Set up Firebase project
- [ ] Configure environment variables in Vercel
- [ ] Set up Upstash Redis for rate limiting

#### Documentation
- [x] Create README.md
- [x] Create docs/PRD.md (basic)
- [x] Create docs/ARCHITECTURE.md (basic)
- [x] Create docs/STYLE_GUIDE.md
- [x] Create docs/roles/* (Claude Code roles)
- [x] Create PRODUCT_REQUIREMENTS.md (comprehensive)
- [x] Create SYSTEM_ARCHITECTURE.md (comprehensive)
- [x] Create DEVELOPMENT_ROADMAP.md (this file)
- [x] Create MEMORY_STATE.md

### Sprint 0.2: Marketing Website (Week 2)

#### Core Pages
- [x] Homepage with hero, features, CTA
- [x] Layout (Header, Footer, Container)
- [x] Basic UI components (Button, Input, Card)
- [x] Waitlist page (basic form)
- [ ] Features page
- [ ] How It Works page
- [ ] Pricing page
- [ ] About page
- [ ] Contact page
- [ ] FAQ page
- [ ] Download/App page (with animations)

#### Legal Pages
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie Policy page

#### API Routes
- [ ] POST /api/waitlist - Waitlist signup
- [ ] POST /api/contact - Contact form
- [ ] POST /api/newsletter - Newsletter signup
- [ ] GET /api/health - Health check

#### Integrations
- [ ] Resend email integration (waitlist confirmation)
- [ ] Mailchimp integration (newsletter)
- [ ] Google Analytics setup
- [ ] Sentry error tracking setup

#### Quality Assurance
- [ ] Responsive design testing (320px - 1920px)
- [ ] Lighthouse audit (Performance 90+, Accessibility 95+)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Form validation and error handling
- [ ] SEO metadata on all pages

### Phase 0 Deliverables
- [ ] Live marketing website at directrent.ng
- [ ] Functional waitlist capturing leads
- [ ] Download page ready for app store links
- [ ] All documentation complete

---

## Phase 1: Authentication & User Management

**Duration:** Weeks 3-4  
**Status:** ⚪ Not Started  
**Goal:** Complete authentication system with identity verification

### Sprint 1.1: Firebase Auth Setup (Week 3)

#### Firebase Configuration
- [ ] Initialize Firebase in Next.js
- [ ] Configure Firebase Auth providers
- [ ] Set up Firebase Admin SDK
- [ ] Create auth context provider
- [ ] Implement auth state persistence

#### Registration Flow
- [ ] Create registration form component
- [ ] Email/password registration API route
- [ ] Phone number collection
- [ ] Email verification flow
- [ ] Phone OTP verification (Termii)
- [ ] Registration success screen

#### Login Flow
- [ ] Create login form component
- [ ] Email/password login API route
- [ ] Remember me functionality
- [ ] Password reset flow
- [ ] Magic link login (optional)

### Sprint 1.2: Identity Verification (Week 4)

#### BVN/NIN Verification
- [ ] Integrate Dojah/Paystack Identity API
- [ ] Create verification form UI
- [ ] BVN verification API route
- [ ] NIN verification API route
- [ ] Verification rate limiting (3/24hr)
- [ ] Store verification status in Firestore
- [ ] Display verified badge

#### User Profile
- [ ] Create user profile page
- [ ] Profile update API route
- [ ] Avatar upload to Firebase Storage
- [ ] Role selection (Tenant/Landlord)
- [ ] Notification preferences

#### Security Implementation
- [ ] JWT custom claims for roles
- [ ] Session timeout (30 minutes)
- [ ] Auth middleware for API routes
- [ ] Rate limiting on auth endpoints
- [ ] Audit logging for auth events

### Phase 1 Deliverables
- [ ] Complete registration and login flows
- [ ] BVN/NIN verification working
- [ ] User profiles with verified badges
- [ ] Role-based access control implemented

---

## Phase 2: Landlord Dashboard & Listings

**Duration:** Weeks 5-6  
**Status:** ⚪ Not Started  
**Goal:** Enable landlords to create and manage property listings

### Sprint 2.1: Landlord Dashboard (Week 5)

#### Dashboard Shell
- [ ] Create landlord app shell (React Native)
- [ ] Bottom navigation setup
- [ ] Dashboard home screen
- [ ] Stats overview component (listings, views, inquiries)
- [ ] Quick actions panel

#### Bank Account Setup
- [ ] Bank selection UI
- [ ] Account number input with validation
- [ ] Account verification via Paystack
- [ ] Bank account storage (encrypted)

### Sprint 2.2: Listing Management (Week 6)

#### Create Listing
- [ ] Multi-step listing form
- [ ] Property details step
- [ ] Location/address step with autocomplete
- [ ] Amenities selection step
- [ ] Pricing step
- [ ] Photo upload step (up to 10)
- [ ] Image compression and watermarking
- [ ] Preview before publish
- [ ] Save as draft functionality

#### Manage Listings
- [ ] My listings screen
- [ ] Listing card component
- [ ] Edit listing flow
- [ ] Deactivate/reactivate listing
- [ ] Delete listing (soft delete)
- [ ] Listing analytics (views, inquiries)

#### Firestore Implementation
- [ ] Listings collection schema
- [ ] Create listing API
- [ ] Update listing API
- [ ] Delete listing API
- [ ] Firestore security rules for listings
- [ ] Composite indexes for search

### Phase 2 Deliverables
- [ ] Landlord mobile app shell
- [ ] Full listing creation flow
- [ ] Listing management dashboard
- [ ] Photo upload working
- [ ] Bank account setup complete

---

## Phase 3: Tenant Discovery & Favorites

**Duration:** Weeks 7-8  
**Status:** ⚪ Not Started  
**Goal:** Enable tenants to search, discover, and save properties

### Sprint 3.1: Tenant App & Search (Week 7)

#### Tenant Dashboard
- [ ] Create tenant app shell (React Native)
- [ ] Bottom navigation setup
- [ ] Home screen with featured listings
- [ ] Location-based listing suggestions

#### Search & Filters
- [ ] Search bar component
- [ ] Area filter (Yaba, Surulere)
- [ ] Price range filter
- [ ] Bedroom filter
- [ ] Property type filter
- [ ] Amenities filter
- [ ] Search results screen
- [ ] Sort options (price, date, relevance)
- [ ] Infinite scroll pagination

### Sprint 3.2: Listing Details & Favorites (Week 8)

#### Listing Details
- [ ] Full-screen photo gallery
- [ ] Property details display
- [ ] Amenities grid
- [ ] Location map (Google Maps)
- [ ] Landlord preview card
- [ ] Contact landlord CTA
- [ ] Share listing functionality

#### Favorites
- [ ] Save to favorites button
- [ ] Favorites screen
- [ ] Remove from favorites
- [ ] Favorites count on listing card

#### Firestore Implementation
- [ ] Favorites subcollection
- [ ] Search query optimization
- [ ] View count increment
- [ ] Favorite count increment

### Phase 3 Deliverables
- [ ] Tenant mobile app shell
- [ ] Full search and filter functionality
- [ ] Listing details screen
- [ ] Favorites working

---

## Phase 4: Messaging System

**Duration:** Weeks 9-10  
**Status:** ⚪ Not Started  
**Goal:** Enable direct communication between landlords and tenants

### Sprint 4.1: Messaging Infrastructure (Week 9)

#### Firestore Real-time
- [ ] Conversations collection schema
- [ ] Messages subcollection schema
- [ ] Real-time listener setup
- [ ] Message ordering and pagination

#### Conversation Management
- [ ] Start conversation from listing
- [ ] Conversation list screen
- [ ] Conversation card component
- [ ] Unread count badge
- [ ] Archive conversation

### Sprint 4.2: Chat UI & Notifications (Week 10)

#### Chat Interface
- [ ] Chat screen layout
- [ ] Message bubble component
- [ ] Send message input
- [ ] Typing indicator
- [ ] Read receipts
- [ ] Image sharing
- [ ] Scroll to bottom on new message

#### Push Notifications
- [ ] Firebase Cloud Messaging setup
- [ ] Push notification on new message
- [ ] Notification preferences
- [ ] Background notification handling
- [ ] Deep linking from notification

#### Safety Features
- [ ] Block user functionality
- [ ] Report message functionality
- [ ] Message moderation (profanity filter)

### Phase 4 Deliverables
- [ ] Real-time messaging working
- [ ] Push notifications working
- [ ] Block and report functionality

---

## Phase 5: Lease Management

**Duration:** Weeks 11-12  
**Status:** ⚪ Not Started  
**Goal:** Enable digital lease agreements with e-signatures

### Sprint 5.1: Lease Generation (Week 11)

#### Lease Templates
- [ ] Create lease template (Lagos standard)
- [ ] Template variable substitution
- [ ] Custom clauses support
- [ ] PDF generation (jspdf or similar)

#### Lease Creation Flow
- [ ] Initiate lease from conversation
- [ ] Lease terms form
- [ ] Rent and deposit amounts
- [ ] Lease duration selection
- [ ] Preview lease document
- [ ] Send lease for signature

### Sprint 5.2: E-Signatures (Week 12)

#### Signature Flow
- [ ] Signature capture component (typed name)
- [ ] Timestamp and IP logging
- [ ] Both parties signing flow
- [ ] Lease status tracking
- [ ] Signature deadline (7 days)

#### Document Management
- [ ] PDF storage in Firebase Storage
- [ ] Executed lease email to both parties
- [ ] Lease history screen
- [ ] Download lease PDF

#### Firestore Implementation
- [ ] Leases collection schema
- [ ] Lease state machine
- [ ] Security rules for leases

### Phase 5 Deliverables
- [ ] Lease template generation
- [ ] E-signature capture
- [ ] PDF generation and storage
- [ ] Lease status tracking

---

## Phase 6: Payments & Escrow

**Duration:** Week 13  
**Status:** ⚪ Not Started  
**Goal:** Implement secure escrow payments via Paystack

### Sprint 6.1: Payment Integration (Week 13)

#### Paystack Setup
- [ ] Paystack account configuration
- [ ] Webhook endpoint setup
- [ ] Webhook signature verification
- [ ] Initialize transaction API
- [ ] Verify transaction API

#### Payment Flow
- [ ] Payment initiation from lease
- [ ] Paystack checkout redirect
- [ ] Payment verification
- [ ] Transaction recording
- [ ] Payment receipt generation

#### Escrow Logic
- [ ] Escrow holding state
- [ ] Tenant move-in confirmation
- [ ] Landlord payout trigger
- [ ] 72-hour auto-release
- [ ] Dispute window (48 hours)

#### Payouts
- [ ] Landlord bank account verification
- [ ] Payout initiation
- [ ] Platform fee deduction (2%)
- [ ] Payout status tracking

### Phase 6 Deliverables
- [ ] End-to-end payment flow
- [ ] Escrow working correctly
- [ ] Payouts to landlords
- [ ] Transaction history

---

## Phase 7: Polish & Launch

**Duration:** Week 14  
**Status:** ⚪ Not Started  
**Goal:** Final polish, testing, and production launch

### Sprint 7.1: Polish & QA (Week 14)

#### UI/UX Polish
- [ ] Animation refinements
- [ ] Loading states everywhere
- [ ] Error states everywhere
- [ ] Empty states everywhere
- [ ] Pull-to-refresh
- [ ] Haptic feedback

#### Testing
- [ ] End-to-end flow testing
- [ ] Edge case testing
- [ ] Performance testing
- [ ] Security audit
- [ ] Accessibility audit

#### App Store Preparation
- [ ] App icons (all sizes)
- [ ] Splash screens
- [ ] App Store screenshots
- [ ] App Store description
- [ ] Privacy policy for stores

### Launch Checklist

#### Pre-Launch
- [ ] All features working
- [ ] All bugs resolved (P0, P1)
- [ ] Performance targets met
- [ ] Security review complete
- [ ] Legal review complete
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Support email configured
- [ ] Error tracking active
- [ ] Analytics active

#### App Store Submission
- [ ] Apple Developer account ready
- [ ] Google Play Console account ready
- [ ] iOS app submitted
- [ ] Android app submitted
- [ ] App review responses prepared

#### Marketing Launch
- [ ] Waitlist users notified
- [ ] Social media posts scheduled
- [ ] Press release prepared
- [ ] Influencer outreach
- [ ] Launch day monitoring plan

### Phase 7 Deliverables
- [ ] Apps live on App Store and Play Store
- [ ] Website updated with download links
- [ ] Launch marketing executed
- [ ] Support channels active

---

## Release Schedule

| Release | Date | Contents |
|---------|------|----------|
| v0.1.0 (Website Alpha) | Week 2 | Marketing website live |
| v0.2.0 (Website Beta) | Week 2 | All pages, waitlist functional |
| v1.0.0-alpha.1 | Week 6 | Auth + Landlord listings |
| v1.0.0-alpha.2 | Week 8 | Tenant search + messaging |
| v1.0.0-beta.1 | Week 12 | Leases + payments |
| v1.0.0-rc.1 | Week 13 | Release candidate |
| v1.0.0 | Week 14 | Production launch |

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| BVN/NIN API delays | Medium | High | Multiple provider fallbacks |
| Paystack escrow limitations | Low | High | Early testing, alternative design |
| App Store rejection | Medium | High | Follow guidelines strictly |
| Low initial adoption | Medium | Medium | Strong waitlist engagement |
| Technical debt accumulation | High | Medium | Regular refactoring sprints |
| Security vulnerability | Low | Critical | Shift-left security, audits |
| Team capacity constraints | High | Medium | Prioritize ruthlessly, cut scope |

---

## Definition of Done

A feature is considered "Done" when:

- [ ] Code is written and self-reviewed
- [ ] Code passes all automated tests
- [ ] Code passes linting with no errors
- [ ] Feature works on iOS and Android (mobile)
- [ ] Feature works on all breakpoints (web)
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Accessibility verified
- [ ] Security review completed
- [ ] Documentation updated
- [ ] MEMORY_STATE.md updated
- [ ] PR merged to develop branch

---

## Change Log

| Date | Author | Change |
|------|--------|--------|
| 2026-03-23 | Claude (TPM) | Initial roadmap creation |

---

*This roadmap is a living document. Update it as priorities shift and progress is made.*
