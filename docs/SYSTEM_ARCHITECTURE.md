# Directrent.ng — System Architecture Document

> **Version:** 2.0  
> **Last Updated:** 2026-03-23  
> **Status:** Active Development  
> **Architect:** Claude (Principal Full-Stack Engineer)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [System Components](#3-system-components)
4. [Database Schema](#4-database-schema)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [API Design](#6-api-design)
7. [Security Architecture](#7-security-architecture)
8. [Infrastructure & Deployment](#8-infrastructure--deployment)
9. [Integration Architecture](#9-integration-architecture)
10. [Performance & Scaling](#10-performance--scaling)

---

## 1. Architecture Overview

### 1.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │  Marketing Site  │  │  Tenant App      │  │  Landlord App    │          │
│  │  (Next.js SSR)   │  │  (React Native)  │  │  (React Native)  │          │
│  │  Vercel Edge     │  │  Expo            │  │  Expo            │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                     │
│           └─────────────────────┼─────────────────────┘                     │
│                                 │                                           │
├─────────────────────────────────┼───────────────────────────────────────────┤
│                          API GATEWAY                                        │
│  ┌──────────────────────────────┴──────────────────────────────┐           │
│  │                    Vercel Edge Functions                     │           │
│  │  • Rate Limiting (Upstash)  • JWT Validation                │           │
│  │  • Request Logging          • CORS Handling                 │           │
│  └──────────────────────────────┬──────────────────────────────┘           │
├─────────────────────────────────┼───────────────────────────────────────────┤
│                          APPLICATION LAYER                                  │
│  ┌──────────────────────────────┴──────────────────────────────┐           │
│  │                    Next.js API Routes                        │           │
│  │  /api/auth/*     /api/listings/*    /api/messages/*         │           │
│  │  /api/users/*    /api/leases/*      /api/payments/*         │           │
│  └─────────┬────────────────┬────────────────┬─────────────────┘           │
│            │                │                │                              │
├────────────┼────────────────┼────────────────┼──────────────────────────────┤
│            │         SERVICE LAYER           │                              │
│  ┌─────────┴─────┐  ┌───────┴───────┐  ┌────┴────────┐                     │
│  │ Auth Service  │  │ Listing Svc   │  │ Payment Svc │                     │
│  │ • JWT         │  │ • CRUD        │  │ • Paystack  │                     │
│  │ • BVN/NIN     │  │ • Search      │  │ • Escrow    │                     │
│  │ • Sessions    │  │ • Images      │  │ • Ledger    │                     │
│  └───────┬───────┘  └───────┬───────┘  └──────┬──────┘                     │
│          │                  │                 │                             │
├──────────┼──────────────────┼─────────────────┼─────────────────────────────┤
│          │           DATA LAYER               │                             │
│  ┌───────┴───────────────────┴─────────────────┴───────┐                   │
│  │                    Firebase                          │                   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │                   │
│  │  │ Firestore   │  │ Auth        │  │ Storage     │  │                   │
│  │  │ (NoSQL DB)  │  │ (Identity)  │  │ (Images)    │  │                   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │                   │
│  └─────────────────────────────────────────────────────┘                   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                       EXTERNAL SERVICES                                     │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐                │
│  │ Paystack  │  │ Dojah     │  │ Resend    │  │ Termii    │                │
│  │ Payments  │  │ BVN/NIN   │  │ Email     │  │ SMS       │                │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Serverless-First** | No managed servers; Vercel + Firebase handle scaling |
| **API-First** | All functionality exposed via REST APIs |
| **Security by Design** | Authentication, authorization, encryption at every layer |
| **Mobile-First** | API designed for mobile consumption; web as progressive enhancement |
| **Event-Driven** | Firebase triggers for async operations |
| **Offline-Capable** | Firestore offline persistence for mobile apps |

---

## 2. Technology Stack

### 2.1 Frontend Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Marketing Website** | Next.js | 14.2.x | SSR, SEO, performance |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first CSS |
| **Animations** | Framer Motion | 11.x | Micro-interactions |
| **Forms** | React Hook Form | 7.x | Form state management |
| **Validation** | Zod | 3.x | Schema validation |
| **Icons** | Lucide React | 0.379.x | Icon library |
| **Mobile Apps** | React Native | 0.74.x | Cross-platform mobile |
| **Mobile Framework** | Expo | 51.x | Development tooling |
| **State Management** | Zustand | 4.x | Lightweight state |
| **Data Fetching** | TanStack Query | 5.x | Server state management |

### 2.2 Backend Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **API Routes** | Next.js API | 14.2.x | Serverless functions |
| **Runtime** | Node.js | 20.x | JavaScript runtime |
| **Database** | Firestore | Latest | NoSQL document database |
| **Authentication** | Firebase Auth | Latest | Identity management |
| **File Storage** | Firebase Storage | Latest | Image hosting |
| **Caching** | Upstash Redis | Latest | Rate limiting, sessions |
| **Search** | Algolia | Latest | Full-text search (future) |

### 2.3 Infrastructure

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Web Hosting** | Vercel | Edge deployment, CDN |
| **Database Hosting** | Firebase | Managed NoSQL |
| **Domain** | Vercel DNS | directrent.ng |
| **SSL** | Vercel Auto-SSL | TLS 1.3 |
| **Monitoring** | Vercel Analytics | Performance monitoring |
| **Error Tracking** | Sentry | Error aggregation |
| **CI/CD** | GitHub Actions | Automated deployment |

### 2.4 External Services

| Service | Provider | Purpose |
|---------|----------|---------|
| **Payments** | Paystack | Card, bank transfer, USSD |
| **Identity Verification** | Dojah / Paystack Identity | BVN, NIN verification |
| **Email** | Resend | Transactional email |
| **SMS** | Termii | OTP, notifications |
| **Push Notifications** | Firebase Cloud Messaging | Mobile push |

---

## 3. System Components

### 3.1 Marketing Website (`/src/app/`)

```
src/app/
├── (marketing)/           # Marketing pages (public)
│   ├── page.tsx           # Homepage
│   ├── about/
│   ├── features/
│   ├── how-it-works/
│   ├── pricing/
│   ├── contact/
│   ├── waitlist/
│   ├── download/          # App download page
│   └── faq/
├── (legal)/               # Legal pages
│   ├── privacy/
│   ├── terms/
│   └── cookies/
├── api/                   # API routes
│   ├── auth/
│   ├── contact/
│   ├── waitlist/
│   ├── newsletter/
│   └── health/
├── layout.tsx             # Root layout
└── not-found.tsx          # 404 page
```

### 3.2 Mobile App Structure (Future)

```
apps/
├── tenant/                # Tenant mobile app
│   ├── app/               # Expo Router pages
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── stores/
├── landlord/              # Landlord mobile app
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── stores/
└── packages/
    └── shared/            # Shared code
        ├── components/
        ├── hooks/
        ├── services/
        ├── types/
        └── utils/
```

### 3.3 Component Architecture

```
src/components/
├── ui/                    # Atomic UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Spinner.tsx
│   └── index.ts
├── layout/                # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   ├── Sidebar.tsx
│   └── index.ts
├── sections/              # Page sections
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── DownloadHero.tsx
│   ├── AppFeatures.tsx
│   ├── AppScreenshots.tsx
│   └── DownloadCTA.tsx
├── forms/                 # Form components
│   ├── WaitlistForm.tsx
│   ├── ContactForm.tsx
│   └── NewsletterForm.tsx
└── providers/             # Context providers
    └── index.tsx
```

---

## 4. Database Schema

### 4.1 Firestore Collections

#### Users Collection (`/users/{userId}`)

```typescript
interface User {
  // Identity
  id: string;                    // Firebase Auth UID
  email: string;
  phone: string;
  displayName: string;
  photoURL?: string;
  
  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  bvnVerified: boolean;
  ninVerified: boolean;
  bvnHash?: string;              // Hashed BVN for reference
  ninHash?: string;              // Hashed NIN for reference
  verifiedAt?: Timestamp;
  
  // Role & Status
  roles: ('tenant' | 'landlord')[];
  primaryRole: 'tenant' | 'landlord';
  status: 'active' | 'suspended' | 'deactivated';
  
  // Profile
  bio?: string;
  location?: string;
  occupation?: string;
  
  // Preferences
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
  
  // Landlord-specific
  bankAccount?: {
    bankCode: string;
    accountNumber: string;        // Encrypted
    accountName: string;
    verified: boolean;
  };
}
```

#### Listings Collection (`/listings/{listingId}`)

```typescript
interface Listing {
  // Identity
  id: string;
  landlordId: string;            // Reference to User
  
  // Property Details
  title: string;
  description: string;
  propertyType: 'self-contained' | 'flat' | 'duplex' | 'room' | 'shop';
  
  // Location
  address: {
    street: string;
    area: string;                // e.g., 'Yaba', 'Surulere'
    lga: string;                 // Local Government Area
    state: string;               // Always 'Lagos' for MVP
  };
  coordinates: GeoPoint;
  
  // Specifications
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  sittingRooms?: number;
  
  // Amenities
  amenities: string[];           // ['24hr Power', 'Security', 'Parking', etc.]
  
  // Pricing
  annualRent: number;            // In Naira
  serviceCharge?: number;        // Annual service charge
  cautionDeposit?: number;       // Typically 1-2 years rent
  agencyFeeIncluded: false;      // Always false - we're the platform!
  
  // Media
  photos: {
    url: string;
    caption?: string;
    isPrimary: boolean;
  }[];
  videoUrl?: string;
  
  // Availability
  availableFrom: Timestamp;
  minimumLeaseTerm: number;      // In months
  petPolicy: 'allowed' | 'not-allowed' | 'negotiable';
  
  // Status
  status: 'draft' | 'pending' | 'active' | 'rented' | 'inactive';
  
  // Analytics
  viewCount: number;
  inquiryCount: number;
  favoriteCount: number;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  
  // Search optimization
  searchKeywords: string[];      // Generated from title, description, area
}
```

#### Conversations Collection (`/conversations/{conversationId}`)

```typescript
interface Conversation {
  id: string;
  
  // Participants
  participants: string[];         // [userId1, userId2]
  participantDetails: {
    [userId: string]: {
      displayName: string;
      photoURL?: string;
      role: 'tenant' | 'landlord';
    };
  };
  
  // Context
  listingId?: string;             // Related listing
  listingTitle?: string;          // Denormalized for display
  
  // Last Message Preview
  lastMessage: {
    content: string;
    senderId: string;
    sentAt: Timestamp;
    type: 'text' | 'image' | 'system';
  };
  
  // Status
  status: 'active' | 'archived' | 'blocked';
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Subcollection: /conversations/{conversationId}/messages/{messageId}
interface Message {
  id: string;
  conversationId: string;
  
  // Content
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'system' | 'lease_request' | 'payment_request';
  
  // Media (if applicable)
  mediaUrl?: string;
  
  // Status
  readBy: string[];               // Array of userIds who have read
  
  // Metadata
  sentAt: Timestamp;
  editedAt?: Timestamp;
  deletedAt?: Timestamp;
}
```

#### Leases Collection (`/leases/{leaseId}`)

```typescript
interface Lease {
  id: string;
  
  // Parties
  landlordId: string;
  tenantId: string;
  listingId: string;
  
  // Terms
  startDate: Timestamp;
  endDate: Timestamp;
  annualRent: number;
  paymentSchedule: 'annual' | 'biannual' | 'quarterly';
  
  // Deposits
  cautionDeposit: number;
  serviceCharge: number;
  totalAmount: number;            // All amounts summed
  
  // Custom Terms
  customTerms?: string[];
  specialConditions?: string;
  
  // Document
  documentUrl?: string;           // Generated PDF URL
  
  // Signatures
  signatures: {
    landlord?: {
      signedAt: Timestamp;
      signatureData: string;      // Typed name or image
      ipAddress: string;
      userAgent: string;
    };
    tenant?: {
      signedAt: Timestamp;
      signatureData: string;
      ipAddress: string;
      userAgent: string;
    };
  };
  
  // Status
  status: 'draft' | 'pending_landlord' | 'pending_tenant' | 'executed' | 'expired' | 'terminated';
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  executedAt?: Timestamp;
  expiresAt?: Timestamp;          // For signing deadline
}
```

#### Transactions Collection (`/transactions/{transactionId}`)

```typescript
interface Transaction {
  id: string;
  
  // References
  leaseId: string;
  payerId: string;                // Tenant
  payeeId: string;                // Landlord
  listingId: string;
  
  // Amount
  grossAmount: number;            // Total paid by tenant
  platformFee: number;            // 2% of grossAmount
  netAmount: number;              // Amount to landlord
  
  // Payment Details
  paymentMethod: 'card' | 'bank_transfer' | 'ussd';
  paystackReference: string;
  paystackTransactionId: string;
  
  // Escrow
  escrowStatus: 'pending' | 'held' | 'released' | 'refunded' | 'disputed';
  escrowHeldAt?: Timestamp;
  escrowReleasedAt?: Timestamp;
  
  // Dispute (if any)
  dispute?: {
    raisedBy: string;
    reason: string;
    raisedAt: Timestamp;
    resolvedAt?: Timestamp;
    resolution?: string;
  };
  
  // Status
  status: 'initiated' | 'pending' | 'successful' | 'failed' | 'refunded';
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Audit
  auditLog: {
    action: string;
    timestamp: Timestamp;
    actor: string;
    details?: string;
  }[];
}
```

#### Waitlist Collection (`/waitlist/{entryId}`)

```typescript
interface WaitlistEntry {
  id: string;
  
  // Contact
  name: string;
  email: string;
  phone: string;
  
  // Preferences
  userType: 'tenant' | 'landlord';
  area?: string;
  
  // Tracking
  source?: string;                // Referral source
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
  
  // Status
  status: 'pending' | 'invited' | 'registered' | 'unsubscribed';
  invitedAt?: Timestamp;
  registeredAt?: Timestamp;
  
  // Metadata
  createdAt: Timestamp;
  ipAddress?: string;
  userAgent?: string;
}
```

### 4.2 Firestore Indexes

```javascript
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "listings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "area", "order": "ASCENDING" },
        { "fieldPath": "annualRent", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "listings",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "propertyType", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "conversations",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "participants", "arrayConfig": "CONTAINS" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "messages",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "conversationId", "order": "ASCENDING" },
        { "fieldPath": "sentAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### 4.3 Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isVerified() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.bvnVerified == true;
    }
    
    function hasRole(role) {
      return role in get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles;
    }
    
    // Users
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if false; // Never delete users
    }
    
    // Listings
    match /listings/{listingId} {
      allow read: if true; // Public listings
      allow create: if isAuthenticated() && isVerified() && hasRole('landlord');
      allow update: if isAuthenticated() && isOwner(resource.data.landlordId);
      allow delete: if isAuthenticated() && isOwner(resource.data.landlordId);
    }
    
    // Conversations
    match /conversations/{conversationId} {
      allow read: if isAuthenticated() && 
        request.auth.uid in resource.data.participants;
      allow create: if isAuthenticated() && isVerified();
      allow update: if isAuthenticated() && 
        request.auth.uid in resource.data.participants;
      
      match /messages/{messageId} {
        allow read: if isAuthenticated() && 
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        allow create: if isAuthenticated() && 
          request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
      }
    }
    
    // Leases
    match /leases/{leaseId} {
      allow read: if isAuthenticated() && 
        (isOwner(resource.data.landlordId) || isOwner(resource.data.tenantId));
      allow create: if isAuthenticated() && isVerified();
      allow update: if isAuthenticated() && 
        (isOwner(resource.data.landlordId) || isOwner(resource.data.tenantId));
    }
    
    // Transactions
    match /transactions/{transactionId} {
      allow read: if isAuthenticated() && 
        (isOwner(resource.data.payerId) || isOwner(resource.data.payeeId));
      allow create: if false; // Only created by server
      allow update: if false; // Only updated by server
    }
    
    // Waitlist
    match /waitlist/{entryId} {
      allow read: if false; // Admin only
      allow create: if true; // Public signup
      allow update: if false; // Admin only
    }
  }
}
```

---

## 5. Authentication & Authorization

### 5.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  User    │───▶│  App     │───▶│ Firebase │───▶│  Server  │  │
│  │          │    │          │    │   Auth   │    │   API    │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │               │               │               │         │
│       │ 1. Enter      │               │               │         │
│       │    credentials│               │               │         │
│       │──────────────▶│               │               │         │
│       │               │ 2. Sign in    │               │         │
│       │               │──────────────▶│               │         │
│       │               │               │ 3. Return     │         │
│       │               │               │    ID Token   │         │
│       │               │◀──────────────│               │         │
│       │               │               │               │         │
│       │               │ 4. API Request with Bearer    │         │
│       │               │    Token in Authorization    ─┼────────▶│
│       │               │                               │         │
│       │               │               │ 5. Verify     │         │
│       │               │               │    Token      │         │
│       │               │               │◀──────────────│         │
│       │               │               │               │         │
│       │               │ 6. Return data│               │         │
│       │               │◀──────────────┼───────────────│         │
│       │ 7. Update UI  │               │               │         │
│       │◀──────────────│               │               │         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Authentication Methods

| Method | Implementation | Use Case |
|--------|----------------|----------|
| Email/Password | Firebase Auth | Primary login |
| Phone OTP | Firebase Auth + Termii | Phone verification |
| Magic Link | Firebase Auth | Password recovery |
| Google OAuth | Firebase Auth | Social login (future) |

### 5.3 JWT Token Structure

```typescript
interface DecodedToken {
  // Standard claims
  iss: string;                    // Issuer (Firebase project)
  sub: string;                    // Subject (User ID)
  aud: string;                    // Audience (Firebase project)
  iat: number;                    // Issued at
  exp: number;                    // Expiration
  
  // Firebase claims
  auth_time: number;              // Authentication time
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  
  // Custom claims (set by backend)
  roles?: string[];               // ['tenant', 'landlord']
  verified?: boolean;             // BVN/NIN verified
}
```

### 5.4 Role-Based Access Control (RBAC)

```typescript
// Permission matrix
const PERMISSIONS = {
  // Listing permissions
  'listing:create': ['landlord'],
  'listing:read': ['tenant', 'landlord', 'guest'],
  'listing:update': ['landlord'],  // Only own listings
  'listing:delete': ['landlord'],  // Only own listings
  
  // Messaging permissions
  'message:send': ['tenant', 'landlord'],
  'message:read': ['tenant', 'landlord'],
  
  // Lease permissions
  'lease:create': ['landlord'],
  'lease:read': ['tenant', 'landlord'],
  'lease:sign': ['tenant', 'landlord'],
  
  // Payment permissions
  'payment:initiate': ['tenant'],
  'payment:receive': ['landlord'],
  'payment:refund': ['admin'],
  
  // Admin permissions
  'admin:users': ['admin'],
  'admin:listings': ['admin'],
  'admin:transactions': ['admin'],
};

// Middleware function
function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles || [];
    const allowedRoles = PERMISSIONS[permission];
    
    if (!allowedRoles.some(role => userRoles.includes(role))) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}
```

---

## 6. API Design

### 6.1 API Conventions

| Convention | Standard |
|------------|----------|
| Protocol | HTTPS only |
| Format | JSON |
| Versioning | URL path (`/api/v1/`) |
| Authentication | Bearer token in `Authorization` header |
| Pagination | Cursor-based with `limit` and `startAfter` |
| Errors | RFC 7807 Problem Details |
| Rate Limiting | 100 requests/minute per IP |

### 6.2 API Endpoints

#### Authentication API

```
POST   /api/v1/auth/register          # Register new user
POST   /api/v1/auth/login             # Login with email/password
POST   /api/v1/auth/logout            # Logout (invalidate session)
POST   /api/v1/auth/refresh           # Refresh access token
POST   /api/v1/auth/forgot-password   # Request password reset
POST   /api/v1/auth/reset-password    # Reset password with token
POST   /api/v1/auth/verify-email      # Verify email address
POST   /api/v1/auth/send-otp          # Send phone OTP
POST   /api/v1/auth/verify-otp        # Verify phone OTP
POST   /api/v1/auth/verify-bvn        # Verify BVN
POST   /api/v1/auth/verify-nin        # Verify NIN
```

#### Users API

```
GET    /api/v1/users/me               # Get current user profile
PATCH  /api/v1/users/me               # Update current user profile
GET    /api/v1/users/:id              # Get user public profile
POST   /api/v1/users/me/bank-account  # Add bank account (landlord)
DELETE /api/v1/users/me/bank-account  # Remove bank account
```

#### Listings API

```
GET    /api/v1/listings               # List/search properties
POST   /api/v1/listings               # Create new listing
GET    /api/v1/listings/:id           # Get listing details
PATCH  /api/v1/listings/:id           # Update listing
DELETE /api/v1/listings/:id           # Delete listing
POST   /api/v1/listings/:id/publish   # Publish draft listing
POST   /api/v1/listings/:id/photos    # Upload photos
DELETE /api/v1/listings/:id/photos/:photoId  # Delete photo
GET    /api/v1/listings/:id/analytics # Get listing analytics
POST   /api/v1/listings/:id/favorite  # Add to favorites
DELETE /api/v1/listings/:id/favorite  # Remove from favorites
GET    /api/v1/users/me/favorites     # Get user's favorites
GET    /api/v1/users/me/listings      # Get landlord's listings
```

#### Conversations API

```
GET    /api/v1/conversations          # List user's conversations
POST   /api/v1/conversations          # Start new conversation
GET    /api/v1/conversations/:id      # Get conversation details
GET    /api/v1/conversations/:id/messages  # Get messages
POST   /api/v1/conversations/:id/messages  # Send message
PATCH  /api/v1/conversations/:id/read # Mark as read
POST   /api/v1/conversations/:id/archive  # Archive conversation
POST   /api/v1/conversations/:id/block    # Block user
```

#### Leases API

```
GET    /api/v1/leases                 # List user's leases
POST   /api/v1/leases                 # Create new lease
GET    /api/v1/leases/:id             # Get lease details
PATCH  /api/v1/leases/:id             # Update lease (draft only)
POST   /api/v1/leases/:id/send        # Send for signature
POST   /api/v1/leases/:id/sign        # Sign lease
GET    /api/v1/leases/:id/document    # Download PDF
```

#### Payments API

```
POST   /api/v1/payments/initialize    # Initialize payment
GET    /api/v1/payments/:id           # Get payment status
POST   /api/v1/payments/:id/verify    # Verify payment (webhook)
POST   /api/v1/payments/:id/confirm   # Confirm move-in (release escrow)
POST   /api/v1/payments/:id/dispute   # Raise dispute
GET    /api/v1/payments/history       # Get transaction history
```

#### Waitlist API (Website)

```
POST   /api/waitlist                  # Join waitlist
```

#### Contact API (Website)

```
POST   /api/contact                   # Send contact message
```

### 6.3 Request/Response Examples

#### Create Listing

**Request:**
```http
POST /api/v1/listings
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Spacious 2-Bedroom Flat in Yaba",
  "description": "Well-maintained flat with 24/7 power supply...",
  "propertyType": "flat",
  "address": {
    "street": "15 Herbert Macaulay Way",
    "area": "Yaba",
    "lga": "Yaba",
    "state": "Lagos"
  },
  "bedrooms": 2,
  "bathrooms": 2,
  "toilets": 2,
  "annualRent": 1200000,
  "serviceCharge": 150000,
  "amenities": ["24hr Power", "Security", "Parking", "Water"],
  "availableFrom": "2026-04-01",
  "minimumLeaseTerm": 12,
  "petPolicy": "not-allowed"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "lst_abc123xyz",
    "title": "Spacious 2-Bedroom Flat in Yaba",
    "status": "draft",
    "createdAt": "2026-03-23T14:30:00Z",
    "updatedAt": "2026-03-23T14:30:00Z"
  }
}
```

### 6.4 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "annualRent": "Annual rent must be a positive number",
      "bedrooms": "Bedrooms is required"
    }
  },
  "requestId": "req_abc123"
}
```

---

## 7. Security Architecture

### 7.1 Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Network Security                                  │
│  ├── TLS 1.3 encryption in transit                         │
│  ├── Vercel DDoS protection                                │
│  └── WAF (Cloudflare via Vercel)                           │
│                                                              │
│  Layer 2: API Gateway                                       │
│  ├── Rate limiting (100 req/min)                           │
│  ├── Request validation                                     │
│  ├── CORS policy enforcement                               │
│  └── IP reputation checking                                 │
│                                                              │
│  Layer 3: Authentication                                    │
│  ├── Firebase Auth (managed)                               │
│  ├── JWT token validation                                   │
│  ├── Session management                                     │
│  └── Multi-factor authentication (BVN/NIN)                 │
│                                                              │
│  Layer 4: Authorization                                     │
│  ├── Role-based access control                             │
│  ├── Resource ownership validation                         │
│  └── Firestore security rules                              │
│                                                              │
│  Layer 5: Data Security                                     │
│  ├── AES-256 encryption at rest                            │
│  ├── PII data encryption                                   │
│  ├── Secure key management                                 │
│  └── Data retention policies                               │
│                                                              │
│  Layer 6: Application Security                              │
│  ├── Input sanitization                                    │
│  ├── Output encoding                                       │
│  ├── CSRF protection                                       │
│  └── Security headers (CSP, HSTS, etc.)                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Security Headers

```typescript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://api.paystack.co;
      frame-src 'self' https://*.firebaseapp.com;
    `.replace(/\s+/g, ' ').trim()
  }
];
```

### 7.3 Input Validation

```typescript
// src/lib/validations/listing.ts
import { z } from 'zod';

export const createListingSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters')
    .regex(/^[\w\s\-,.']+$/, 'Title contains invalid characters'),
  
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  
  propertyType: z.enum(['self-contained', 'flat', 'duplex', 'room', 'shop']),
  
  address: z.object({
    street: z.string().min(5).max(200),
    area: z.enum(['Yaba', 'Surulere']), // MVP launch areas only
    lga: z.string().min(2).max(50),
    state: z.literal('Lagos'),
  }),
  
  bedrooms: z.number().int().min(0).max(10),
  bathrooms: z.number().int().min(1).max(10),
  toilets: z.number().int().min(1).max(10),
  
  annualRent: z
    .number()
    .min(100000, 'Minimum rent is ₦100,000')
    .max(50000000, 'Maximum rent is ₦50,000,000'),
  
  serviceCharge: z.number().min(0).optional(),
  
  amenities: z.array(z.string()).max(20),
  
  availableFrom: z.string().datetime(),
  minimumLeaseTerm: z.number().int().min(6).max(36),
  petPolicy: z.enum(['allowed', 'not-allowed', 'negotiable']),
});
```

### 7.4 Data Privacy (NDPR Compliance)

| Requirement | Implementation |
|-------------|----------------|
| **Consent** | Explicit consent checkbox on registration |
| **Data Access** | Users can export their data via Settings |
| **Data Deletion** | Users can request account deletion |
| **Data Minimization** | Only collect necessary PII |
| **Encryption** | PII encrypted at rest |
| **Retention** | Data retained for 7 years post-transaction (legal requirement) |
| **Breach Notification** | Automated alerting + 72-hour notification process |

---

## 8. Infrastructure & Deployment

### 8.1 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Developer                                                   │
│      │                                                       │
│      │ git push                                              │
│      ▼                                                       │
│  ┌────────────────┐                                         │
│  │    GitHub      │                                         │
│  │   Repository   │                                         │
│  └───────┬────────┘                                         │
│          │                                                   │
│          │ Webhook                                           │
│          ▼                                                   │
│  ┌────────────────┐    ┌────────────────┐                   │
│  │ GitHub Actions │───▶│   Run Tests    │                   │
│  │      CI        │    │  Lint, Build   │                   │
│  └───────┬────────┘    └────────────────┘                   │
│          │                                                   │
│          │ On success                                        │
│          ▼                                                   │
│  ┌────────────────┐                                         │
│  │     Vercel     │                                         │
│  │    Build &     │                                         │
│  │    Deploy      │                                         │
│  └───────┬────────┘                                         │
│          │                                                   │
│          ├───────────────┬───────────────┐                  │
│          ▼               ▼               ▼                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │  Production  │ │   Preview    │ │ Development  │        │
│  │   (main)     │ │   (PR)       │ │  (develop)   │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Environment Configuration

| Environment | Branch | Domain | Purpose |
|-------------|--------|--------|---------|
| Production | `main` | `directrent.ng` | Live site |
| Preview | `feature/*` | `*.vercel.app` | PR previews |
| Development | `develop` | `dev.directrent.ng` | Staging |
| Local | — | `localhost:3000` | Development |

### 8.3 Environment Variables

```bash
# .env.example

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://directrent.ng
NEXT_PUBLIC_SITE_NAME=Directrent.ng

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

# Paystack
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

# Identity Verification (Dojah)
DOJAH_API_KEY=
DOJAH_APP_ID=

# Email (Resend)
RESEND_API_KEY=
CONTACT_EMAIL=hello@directrent.ng

# SMS (Termii)
TERMII_API_KEY=
TERMII_SENDER_ID=

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Error Tracking
SENTRY_DSN=

# Analytics
NEXT_PUBLIC_GA_ID=
```

---

## 9. Integration Architecture

### 9.1 Payment Flow (Paystack)

```
┌─────────────────────────────────────────────────────────────┐
│                   PAYMENT FLOW                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Tenant initiates payment                                │
│     │                                                        │
│     ▼                                                        │
│  2. POST /api/v1/payments/initialize                        │
│     │                                                        │
│     ▼                                                        │
│  3. Create Transaction record (status: 'initiated')         │
│     │                                                        │
│     ▼                                                        │
│  4. Call Paystack Initialize Transaction API                │
│     │                                                        │
│     ▼                                                        │
│  5. Return authorization_url to frontend                    │
│     │                                                        │
│     ▼                                                        │
│  6. Redirect tenant to Paystack checkout                    │
│     │                                                        │
│     ▼                                                        │
│  7. Tenant completes payment                                │
│     │                                                        │
│     ▼                                                        │
│  8. Paystack sends webhook to /api/webhooks/paystack        │
│     │                                                        │
│     ▼                                                        │
│  9. Verify webhook signature (HMAC SHA512)                  │
│     │                                                        │
│     ▼                                                        │
│  10. Update Transaction (status: 'successful',              │
│      escrowStatus: 'held')                                  │
│     │                                                        │
│     ▼                                                        │
│  11. Notify landlord & tenant                               │
│     │                                                        │
│     ▼                                                        │
│  12. [After move-in] Tenant confirms move-in                │
│     │                                                        │
│     ▼                                                        │
│  13. Release escrow to landlord (minus 2% fee)              │
│     │                                                        │
│     ▼                                                        │
│  14. Transfer to landlord's bank account                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Identity Verification Flow (BVN/NIN)

```typescript
// src/services/verification.ts

interface VerificationResult {
  success: boolean;
  data?: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    phoneNumber: string;
    photo?: string;
  };
  error?: string;
}

async function verifyBVN(bvn: string, userId: string): Promise<VerificationResult> {
  // 1. Validate BVN format
  if (!/^\d{11}$/.test(bvn)) {
    return { success: false, error: 'Invalid BVN format' };
  }
  
  // 2. Check rate limit (3 attempts per 24 hours)
  const attempts = await getVerificationAttempts(userId, 'bvn');
  if (attempts >= 3) {
    return { success: false, error: 'Maximum verification attempts reached' };
  }
  
  // 3. Call Dojah/Paystack verification API
  const response = await fetch('https://api.dojah.io/api/v1/kyc/bvn', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DOJAH_API_KEY}`,
      'AppId': process.env.DOJAH_APP_ID!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bvn }),
  });
  
  // 4. Process response
  const result = await response.json();
  
  // 5. Log attempt
  await logVerificationAttempt(userId, 'bvn', result.success);
  
  // 6. On success, update user record
  if (result.success) {
    await updateUserVerification(userId, {
      bvnVerified: true,
      bvnHash: hashBVN(bvn), // Store hash, not raw BVN
      verifiedAt: new Date(),
    });
  }
  
  return result;
}
```

---

## 10. Performance & Scaling

### 10.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| API Response Time (p95) | < 500ms | Vercel Analytics |
| Database Query Time | < 100ms | Firebase Console |

### 10.2 Caching Strategy

| Layer | Cache Type | TTL | Invalidation |
|-------|------------|-----|--------------|
| CDN | Edge cache | 1 hour | On deploy |
| API | Upstash Redis | 5 minutes | On data change |
| Client | React Query | 5 minutes | Stale-while-revalidate |
| Images | Vercel Image Optimization | 1 year | Filename change |

### 10.3 Scaling Considerations

| Component | Scaling Approach | Trigger |
|-----------|------------------|---------|
| API Routes | Vercel auto-scaling | Automatic |
| Firestore | Read replicas | > 10,000 daily users |
| Image Storage | Firebase Storage (multi-region) | Automatic |
| Search | Algolia | When search becomes slow |
| Real-time | Firebase Realtime DB | If Firestore limits hit |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-23 | Ololade | Initial architecture |
| 2.0 | 2026-03-23 | Claude (Principal Engineer) | Comprehensive technical specification |

---

*This document defines the technical foundation. All implementation decisions should align with this architecture.*
