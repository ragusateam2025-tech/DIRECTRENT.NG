# Directrent.ng — Product Requirements Document (PRD)

> **Version:** 2.0  
> **Last Updated:** 2026-03-23  
> **Status:** Active Development  
> **Product Owner:** Ololade (MBA Capstone, Rome Business School)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target Audience](#3-target-audience)
4. [Value Proposition](#4-value-proposition)
5. [MVP Feature Set](#5-mvp-feature-set)
6. [User Stories](#6-user-stories)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Success Metrics](#9-success-metrics)
10. [Constraints & Assumptions](#10-constraints--assumptions)
11. [Glossary](#11-glossary)

---

## 1. Executive Summary

**Directrent.ng** is a Lagos-based PropTech platform that eliminates the "Mandatory Middleman" system in Nigerian real estate by enabling direct landlord-tenant connections. The platform addresses systemic market failures documented through primary research (N=70: 50 tenants, 20 landlords) that revealed a **Financial Friction Index (FFI)** and **Psychological Stress Score (PSS)** directly correlated with traditional agent involvement.

### Core Platform Components

| Component | Purpose | Status |
|-----------|---------|--------|
| Marketing Website | Lead generation, waitlist, information | In Development |
| Tenant Mobile App | Property search, verification, payments | Planned (Sprint 1-7) |
| Landlord Mobile App | Listing management, tenant screening | Planned (Sprint 1-7) |
| Admin Dashboard | Platform oversight, dispute resolution | Planned (Phase 3) |

---

## 2. Problem Statement

### 2.1 The "Mandatory Middleman" System

In Lagos, Nigeria, real estate transactions are dominated by agents who charge combined fees of **10-15% of annual rent**, creating:

| Problem | Impact | Statistical Evidence |
|---------|--------|---------------------|
| **Financial Friction** | Tenants pay ₦150,000-₦500,000+ in unnecessary fees | FFI correlation with agent presence: Cramer's V = 0.882 |
| **Psychological Stress** | Anxiety, distrust, and extended search times | PSS mean score: 4.2/5 among agent-involved transactions |
| **Extended Vacancies** | Landlords lose 3-6 months of potential rent | 65% of landlords report agent-related delays |
| **Information Asymmetry** | Inflated prices, hidden fees, fake listings | 78% of tenants report encountering fraudulent listings |
| **Lack of Accountability** | No recourse for disputes or misconduct | Agent complaints resolution rate: <10% |

### 2.2 The "Agent Effect" (Primary Research Finding)

Our primary research validates the **Agent Effect** as a measurable construct:

- **Cronbach's Alpha:** 0.996 (near-perfect internal consistency)
- **Cramer's V:** 0.882 (strong association between agent presence and payment delays)
- **Cohen's d:** 1.8+ (large effect size for stress differential)
- **P-value:** <0.001 (statistically significant across all measures)

### 2.3 Market Gap

No existing platform in Lagos offers:
- BVN/NIN identity verification for both parties
- Escrow payment protection
- Digital lease agreements with legal backing
- Direct, unmediated landlord-tenant communication
- Transparent, fixed platform fee (2% vs 15%)

---

## 3. Target Audience

### 3.1 Primary Persona: Tayo (Tenant)

| Attribute | Detail |
|-----------|--------|
| **Age** | 25-35 years |
| **Occupation** | Young professional, tech worker, entrepreneur |
| **Income** | ₦150,000-₦500,000/month |
| **Location** | Works in Lagos Island/Ikeja, seeks housing in Yaba/Surulere |
| **Pain Points** | Agent fees eat into savings, fake listings waste time, no transparency |
| **Goals** | Find verified property, connect directly with landlord, save money |
| **Tech Savviness** | High - uses mobile banking, ride-hailing, e-commerce daily |
| **Decision Factors** | Price, location, verified photos, landlord responsiveness |

### 3.2 Secondary Persona: Adaeze (Landlord)

| Attribute | Detail |
|-----------|--------|
| **Age** | 40-55 years |
| **Occupation** | Property owner (1-5 units), business owner, retiree |
| **Property Type** | Self-contained apartments, 2-3 bedroom flats |
| **Location** | Owns property in Yaba, Surulere, Gbagada |
| **Pain Points** | Long vacancy periods, unreliable agents, difficult tenant screening |
| **Goals** | Find verified tenants quickly, receive rent on time, minimize hassle |
| **Tech Savviness** | Medium - uses WhatsApp, mobile banking, needs simple interfaces |
| **Decision Factors** | Tenant verification, payment guarantee, ease of use |

### 3.3 Market Size (Lagos Focus)

| Metric | Value | Source |
|--------|-------|--------|
| Lagos Population | 21+ million | UN Habitat, 2024 |
| Rental Households | ~4.2 million | NBS Housing Survey |
| Average Annual Rent (Target Areas) | ₦800,000 - ₦2,500,000 | Primary Research |
| Total Addressable Market (TAM) | ₦3.4 trillion/year | Calculated |
| Serviceable Market (Yaba + Surulere) | ₦180 billion/year | Hyperlocal estimate |

---

## 4. Value Proposition

### 4.1 For Tenants

> **"Find your next home directly from landlords. Save up to ₦500,000 in agent fees."**

| Feature | Benefit | Quantified Value |
|---------|---------|------------------|
| Direct Connection | No middleman inflation | Save 10-15% of annual rent |
| BVN/NIN Verification | Trust in landlord identity | Eliminate 78% fraud risk |
| Escrow Payments | Money protected until move-in | Zero risk of absconding agents |
| Digital Lease | Legal protection, no paper hassle | Save ₦50,000+ in legal fees |
| Neighborhood Insights | Know the area before committing | Avoid regret moves |

### 4.2 For Landlords

> **"Find verified tenants in weeks, not months. Get paid on time, every time."**

| Feature | Benefit | Quantified Value |
|---------|---------|------------------|
| Verified Tenants | BVN/NIN confirms identity | Reduce bad tenant risk by 90% |
| Direct Messaging | No agent miscommunication | 3x faster tenant placement |
| Automated Reminders | Rent collection on autopilot | 95% on-time payment rate |
| Property Dashboard | Manage all units in one place | Save 5+ hours/month |
| Digital Lease | Legally binding, timestamped | Court-admissible documentation |

### 4.3 Platform Fee Model

| Platform | Fee Structure | Annual Cost (₦1.2M rent) |
|----------|---------------|--------------------------|
| Traditional Agent | 10% agency + 5% legal | ₦180,000 |
| **Directrent.ng** | 2% platform fee | ₦24,000 |
| **Savings** | — | **₦156,000** |

---

## 5. MVP Feature Set

### 5.1 Feature Priority Matrix

| Feature | Priority | Phase | Complexity | User Value |
|---------|----------|-------|------------|------------|
| User Registration & Authentication | P0 | 1 | Medium | Critical |
| BVN/NIN Identity Verification | P0 | 1 | High | Critical |
| Role-Based Access (Tenant/Landlord) | P0 | 1 | Medium | Critical |
| Property Listing (Landlord) | P0 | 2 | Medium | High |
| Property Search & Filter (Tenant) | P0 | 2 | Medium | High |
| Direct Messaging | P0 | 3 | Medium | High |
| Viewing Scheduling | P1 | 3 | Low | Medium |
| Digital Lease Generation | P0 | 4 | High | High |
| E-Signature Integration | P0 | 4 | High | High |
| Escrow Payments (Paystack) | P0 | 5 | High | Critical |
| Rent Payment Reminders | P1 | 5 | Low | Medium |
| Push Notifications | P1 | 6 | Medium | Medium |
| Review & Ratings | P2 | 7 | Low | Medium |
| Neighborhood Insights | P2 | 7 | Medium | Medium |

### 5.2 MVP Scope Definition

#### 5.2.1 In Scope (MVP)

- [x] Marketing website with waitlist capture
- [ ] User registration (email + phone)
- [ ] BVN/NIN verification via third-party API
- [ ] Landlord: Create, edit, delete property listings
- [ ] Landlord: Upload up to 10 photos per listing
- [ ] Tenant: Search properties by location, price, type
- [ ] Tenant: View property details and photos
- [ ] Direct messaging between matched landlord-tenant
- [ ] Digital lease template generation
- [ ] E-signature capture (typed signature MVP)
- [ ] Escrow payment via Paystack
- [ ] Basic notification system (email + in-app)
- [ ] User profile management

#### 5.2.2 Out of Scope (Post-MVP)

- Virtual property tours (360° video)
- AI-powered rent price suggestions
- Credit scoring integration
- Mortgage/financing partnerships
- Property management services
- Multi-city expansion
- Agent partnership program
- Insurance integration

---

## 6. User Stories

### 6.1 Authentication & Verification

```
US-001: User Registration
AS A new user
I WANT TO create an account using my email and phone number
SO THAT I can access the Directrent.ng platform

Acceptance Criteria:
- User can register with email, phone, and password
- Email verification link is sent within 60 seconds
- Phone OTP is sent within 30 seconds
- Password must be 8+ characters with 1 uppercase, 1 number
- Duplicate email/phone is rejected with clear error message
```

```
US-002: BVN Verification
AS A registered user
I WANT TO verify my identity using my BVN
SO THAT other users can trust my profile

Acceptance Criteria:
- User enters 11-digit BVN
- System validates BVN format before API call
- Verification result returned within 10 seconds
- Verified badge appears on user profile
- Failed verification shows clear remediation steps
- User can retry verification up to 3 times per 24 hours
```

```
US-003: Role Selection
AS A registered user
I WANT TO select my role (Tenant or Landlord)
SO THAT I see relevant features and interfaces

Acceptance Criteria:
- User selects role during onboarding
- Role can be changed in settings (with re-verification)
- UI adapts immediately to selected role
- Users can have both roles (landlord who is also renting)
```

### 6.2 Property Listings (Landlord)

```
US-010: Create Property Listing
AS A verified landlord
I WANT TO create a property listing with details and photos
SO THAT tenants can discover my property

Acceptance Criteria:
- Required fields: Title, Address, Property Type, Bedrooms, Bathrooms, Annual Rent
- Optional fields: Description, Amenities, Available Date, Pet Policy
- Upload 3-10 photos (JPEG/PNG, max 5MB each)
- Photos auto-compressed and watermarked
- Listing saved as draft until published
- Preview before publishing
- Listing goes live within 5 minutes of publish
```

```
US-011: Manage Listings
AS A landlord
I WANT TO view, edit, and deactivate my property listings
SO THAT I can keep my portfolio current

Acceptance Criteria:
- Dashboard shows all listings with status (Active/Inactive/Pending)
- Edit any field of active listing
- Deactivate listing (soft delete, can reactivate)
- View analytics: Views, Inquiries, Conversion rate
- Duplicate listing to create similar property
```

### 6.3 Property Search (Tenant)

```
US-020: Search Properties
AS A tenant
I WANT TO search for properties by location and filters
SO THAT I can find suitable options

Acceptance Criteria:
- Search by area name or select from map
- Filter by: Price range, Bedrooms, Property type, Amenities
- Sort by: Price (low-high), Price (high-low), Newest, Closest
- Results load within 2 seconds
- Infinite scroll with 20 listings per page
- Save search criteria for alerts
```

```
US-021: View Property Details
AS A tenant
I WANT TO view full property details and photos
SO THAT I can evaluate if it meets my needs

Acceptance Criteria:
- Full-screen photo gallery with swipe navigation
- All property details clearly displayed
- Landlord profile preview (verified badge, response rate)
- "Contact Landlord" CTA prominently displayed
- "Save to Favorites" functionality
- Share listing via WhatsApp/Copy Link
```

### 6.4 Messaging

```
US-030: Initiate Conversation
AS A tenant
I WANT TO message a landlord about their property
SO THAT I can ask questions and schedule viewings

Acceptance Criteria:
- One-click "Contact Landlord" from listing
- Pre-populated message template (editable)
- Message sent notification to landlord (push + email)
- Conversation thread created
- Read receipts enabled
```

```
US-031: Conversation Management
AS A user
I WANT TO manage my conversations
SO THAT I can track all my interactions

Acceptance Criteria:
- Inbox shows all conversations sorted by recency
- Unread indicator on new messages
- Search conversations by user or property
- Archive/Delete conversations
- Report/Block user functionality
```

### 6.5 Lease Agreement

```
US-040: Generate Lease Agreement
AS A landlord
I WANT TO generate a digital lease agreement
SO THAT we have a legally binding rental contract

Acceptance Criteria:
- Template pre-populated with property and party details
- Customizable clauses (rent amount, duration, terms)
- Preview rendered PDF before sending
- Both parties notified when lease is ready for signature
- Lease expires after 7 days if not signed
```

```
US-041: Sign Lease Agreement
AS A user (tenant or landlord)
I WANT TO digitally sign the lease agreement
SO THAT the contract is legally executed

Acceptance Criteria:
- View full lease document before signing
- Type full legal name as signature
- Capture timestamp and IP address
- Both signatures required to execute
- Executed lease PDF emailed to both parties
- Lease stored securely for 7 years
```

### 6.6 Payments

```
US-050: Make Escrow Payment
AS A tenant
I WANT TO pay rent into escrow
SO THAT my money is protected until I move in

Acceptance Criteria:
- Pay via Paystack (card, bank transfer, USSD)
- Funds held in escrow account
- Confirmation shown to both parties
- Funds released to landlord upon tenant confirmation
- Dispute window of 48 hours after move-in
- Automatic release after 72 hours if no dispute
```

```
US-051: Receive Payment
AS A landlord
I WANT TO receive rent payment after tenant confirms move-in
SO THAT I am compensated for my property

Acceptance Criteria:
- Notification when escrow payment is made
- Track payment status (Pending → Released → Paid)
- Funds transferred to linked bank account
- Settlement within 24 hours of release
- Transaction history downloadable
```

---

## 7. Functional Requirements

### 7.1 Authentication & Authorization

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-001 | System shall support email/password authentication | P0 |
| FR-002 | System shall support phone number OTP verification | P0 |
| FR-003 | System shall integrate with BVN verification API | P0 |
| FR-004 | System shall integrate with NIN verification API | P0 |
| FR-005 | System shall implement role-based access control (RBAC) | P0 |
| FR-006 | System shall support password reset via email | P0 |
| FR-007 | System shall enforce session timeout after 30 minutes of inactivity | P1 |
| FR-008 | System shall support "Remember Me" for 30 days | P1 |
| FR-009 | System shall log all authentication events for audit | P1 |

### 7.2 Property Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-010 | System shall allow landlords to create property listings | P0 |
| FR-011 | System shall support up to 10 photos per listing | P0 |
| FR-012 | System shall auto-resize images to optimize loading | P0 |
| FR-013 | System shall watermark all property photos | P1 |
| FR-014 | System shall geocode addresses for map display | P0 |
| FR-015 | System shall validate listing completeness before publishing | P0 |
| FR-016 | System shall support listing drafts | P1 |
| FR-017 | System shall track listing views and inquiries | P1 |

### 7.3 Search & Discovery

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-020 | System shall support full-text search on property titles and descriptions | P0 |
| FR-021 | System shall support filtering by price range | P0 |
| FR-022 | System shall support filtering by number of bedrooms | P0 |
| FR-023 | System shall support filtering by property type | P0 |
| FR-024 | System shall support filtering by amenities | P1 |
| FR-025 | System shall support geolocation-based search | P1 |
| FR-026 | System shall implement search result pagination | P0 |
| FR-027 | System shall allow users to save favorite listings | P1 |

### 7.4 Messaging

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-030 | System shall provide real-time messaging between users | P0 |
| FR-031 | System shall send push notifications for new messages | P0 |
| FR-032 | System shall support message read receipts | P1 |
| FR-033 | System shall allow users to block other users | P0 |
| FR-034 | System shall allow users to report abusive content | P0 |
| FR-035 | System shall retain message history for 2 years | P1 |

### 7.5 Lease Management

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-040 | System shall generate lease agreements from templates | P0 |
| FR-041 | System shall pre-populate lease with property and user data | P0 |
| FR-042 | System shall support customizable lease terms | P0 |
| FR-043 | System shall capture digital signatures with timestamp | P0 |
| FR-044 | System shall generate PDF of executed lease | P0 |
| FR-045 | System shall email executed lease to both parties | P0 |
| FR-046 | System shall store executed leases for 7 years | P0 |

### 7.6 Payments

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-050 | System shall integrate with Paystack for payments | P0 |
| FR-051 | System shall support escrow holding of funds | P0 |
| FR-052 | System shall release funds upon tenant confirmation | P0 |
| FR-053 | System shall auto-release funds after 72-hour window | P0 |
| FR-054 | System shall support dispute filing within 48 hours | P0 |
| FR-055 | System shall calculate and deduct 2% platform fee | P0 |
| FR-056 | System shall support landlord bank account linking | P0 |
| FR-057 | System shall generate transaction receipts | P0 |

---

## 8. Non-Functional Requirements

### 8.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001 | Page load time (First Contentful Paint) | < 1.5 seconds |
| NFR-002 | API response time (95th percentile) | < 500ms |
| NFR-003 | Search results return time | < 2 seconds |
| NFR-004 | Image upload processing time | < 5 seconds |
| NFR-005 | Concurrent users supported | 10,000+ |
| NFR-006 | Mobile app launch time | < 3 seconds |

### 8.2 Security

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR-010 | Data encryption at rest | AES-256 |
| NFR-011 | Data encryption in transit | TLS 1.3 |
| NFR-012 | Password hashing | bcrypt with salt |
| NFR-013 | API authentication | JWT with refresh tokens |
| NFR-014 | Input validation | Server-side validation on all inputs |
| NFR-015 | SQL injection prevention | Parameterized queries / ORM |
| NFR-016 | XSS prevention | Content Security Policy, output encoding |
| NFR-017 | CSRF protection | CSRF tokens on all forms |
| NFR-018 | Rate limiting | 100 requests/minute per IP |
| NFR-019 | NDPR compliance | User consent, data access, deletion rights |

### 8.3 Availability & Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-020 | System uptime | 99.5% |
| NFR-021 | Planned maintenance window | 2 AM - 4 AM WAT |
| NFR-022 | Recovery Time Objective (RTO) | < 4 hours |
| NFR-023 | Recovery Point Objective (RPO) | < 1 hour |
| NFR-024 | Backup frequency | Daily |

### 8.4 Scalability

| ID | Requirement | Approach |
|----|-------------|----------|
| NFR-030 | Horizontal scaling | Stateless API design |
| NFR-031 | Database scaling | Read replicas, connection pooling |
| NFR-032 | Image storage scaling | Cloud object storage (S3-compatible) |
| NFR-033 | CDN for static assets | Vercel Edge Network |

### 8.5 Usability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-040 | Mobile responsiveness | All pages functional on 320px+ |
| NFR-041 | Accessibility compliance | WCAG 2.1 AA |
| NFR-042 | Supported browsers | Chrome 90+, Safari 14+, Firefox 88+ |
| NFR-043 | Offline functionality | View cached listings, queue messages |
| NFR-044 | Localization | English (primary), Pidgin (future) |

---

## 9. Success Metrics

### 9.1 North Star Metric

**Successful Rentals Completed** — The number of rental transactions completed through the platform (escrow payment released to landlord).

### 9.2 Key Performance Indicators (KPIs)

| Category | Metric | Target (6 months) |
|----------|--------|-------------------|
| **Acquisition** | Waitlist signups | 5,000 |
| **Acquisition** | Registered users | 2,000 |
| **Acquisition** | Verified users | 1,500 |
| **Activation** | Listings created | 500 |
| **Activation** | Property inquiries | 3,000 |
| **Retention** | Monthly Active Users (MAU) | 60% of registered |
| **Retention** | Landlord listing renewal rate | 80% |
| **Revenue** | Successful rentals | 100 |
| **Revenue** | Gross Transaction Value (GTV) | ₦120,000,000 |
| **Revenue** | Platform revenue (2% of GTV) | ₦2,400,000 |
| **Satisfaction** | Net Promoter Score (NPS) | 50+ |
| **Satisfaction** | App Store rating | 4.5+ stars |

### 9.3 Funnel Metrics

```
Waitlist Signup → Registration: 40% conversion
Registration → Verification: 75% conversion
Verification → First Action: 80% conversion
Property View → Inquiry: 15% conversion
Inquiry → Viewing: 50% conversion
Viewing → Lease Signed: 30% conversion
Lease Signed → Payment Complete: 95% conversion
```

---

## 10. Constraints & Assumptions

### 10.1 Constraints

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| Budget (MVP) | Limited to free/low-cost services | Vercel free tier, Firebase free tier, Paystack standard rates |
| Team Size | Solo developer + AI assistance | Phased development, prioritized features |
| Timeline | MVP in 14 weeks | Strict scope control, no feature creep |
| Geography | Lagos only (Yaba, Surulere) | Hyperlocal rollout, expand post-validation |
| Regulatory | NDPR, LASRERA compliance required | Built-in consent, data handling policies |

### 10.2 Assumptions

| Assumption | Validation Method |
|------------|-------------------|
| Users have smartphones with internet | Primary research confirms 95%+ smartphone ownership in target demographic |
| Users trust digital identity verification | Primary research shows 82% willing to provide BVN for trust |
| Users will pay 2% for verified service | Comparative analysis: 2% vs 15% is compelling |
| Landlords will self-list properties | Incentive: Direct tenant access, no agent dependency |
| Paystack escrow is legally enforceable | Legal review of Paystack terms and Nigerian e-commerce law |

### 10.3 Dependencies

| Dependency | Provider | Risk Level | Contingency |
|------------|----------|------------|-------------|
| Identity verification | Paystack/Dojah | Medium | Multiple provider integration |
| Payment processing | Paystack | Low | Flutterwave as backup |
| Email delivery | Resend | Low | SendGrid as backup |
| SMS delivery | Termii | Medium | Twilio as backup |
| Hosting | Vercel + Firebase | Low | AWS/GCP migration path |

---

## 11. Glossary

| Term | Definition |
|------|------------|
| **Agent Effect** | The measurable negative impact of real estate agent involvement on transaction efficiency and user satisfaction |
| **BVN** | Bank Verification Number — 11-digit unique identifier for Nigerian bank account holders |
| **Escrow** | A financial arrangement where a third party holds funds until transaction conditions are met |
| **FFI** | Financial Friction Index — A composite measure of financial obstacles in rental transactions |
| **GTV** | Gross Transaction Value — Total value of transactions processed through the platform |
| **LASRERA** | Lagos State Real Estate Regulatory Authority |
| **MVP** | Minimum Viable Product — The first release with core features only |
| **NDPR** | Nigeria Data Protection Regulation — Data privacy law requiring user consent and protection |
| **NIN** | National Identification Number — 11-digit unique identifier for Nigerian citizens |
| **NPS** | Net Promoter Score — Measure of customer loyalty and satisfaction |
| **PSS** | Psychological Stress Score — A composite measure of emotional burden in rental transactions |
| **RBAC** | Role-Based Access Control — Security model restricting access based on user roles |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-23 | Ololade | Initial PRD for website |
| 2.0 | 2026-03-23 | Claude (TPM) | Comprehensive rewrite with full platform scope |

---

*This document is the source of truth for product decisions. All feature requests must be evaluated against these requirements.*
