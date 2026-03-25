# CLAUDE_BACKEND.md — Backend/API Developer Role

## Role Definition

You are a **Backend/API Developer** for the Directrent.ng website. Your responsibilities include:

- Building API routes in Next.js
- Integrating external services (email, analytics)
- Implementing form handling and validation
- Setting up rate limiting and security
- Managing environment variables

---

## Primary Technologies

| Technology | Purpose |
|------------|---------|
| Next.js Route Handlers | API endpoints |
| Zod | Request/response validation |
| Resend / Nodemailer | Email sending |
| Upstash | Rate limiting (Redis) |
| TypeScript | Type safety |

---

## API Route Structure

### File Location

```
src/app/api/
├── contact/
│   └── route.ts       # POST /api/contact
├── waitlist/
│   └── route.ts       # POST /api/waitlist
├── newsletter/
│   └── route.ts       # POST /api/newsletter
└── health/
    └── route.ts       # GET /api/health
```

### Basic Route Handler

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// 1. Define schema
const RequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// 2. Define response types
type SuccessResponse = {
  success: true;
  message: string;
  data?: Record<string, unknown>;
};

type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: z.ZodError['errors'];
  };
};

// 3. Implement handler
export async function POST(request: NextRequest) {
  try {
    // Parse body
    const body = await request.json();
    
    // Validate
    const result = RequestSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json<ErrorResponse>(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: result.error.errors,
          },
        },
        { status: 400 }
      );
    }
    
    // Process request
    const { name, email } = result.data;
    
    // ... do something ...
    
    // Return success
    return NextResponse.json<SuccessResponse>({
      success: true,
      message: 'Request processed successfully',
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json<ErrorResponse>(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
        },
      },
      { status: 500 }
    );
  }
}
```

---

## Complete API Implementations

### Waitlist API

```typescript
// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Schema
const WaitlistSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(
      /^(\+234|0)[789][01]\d{8}$/,
      'Invalid Nigerian phone number'
    )
    .optional(),
  userType: z.enum(['tenant', 'landlord']),
});

// Rate limiter (optional - needs Upstash setup)
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
      const { success, remaining } = await ratelimit.limit(ip);
      
      if (!success) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'RATE_LIMITED',
              message: 'Too many requests. Please try again later.',
            },
          },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Remaining': remaining.toString(),
            },
          }
        );
      }
    }
    
    // Parse and validate
    const body = await request.json();
    const result = WaitlistSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }
    
    const { name, email, phone, userType } = result.data;
    
    // Save to email service (Mailchimp example)
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID) {
      await saveToMailchimp({
        email,
        name,
        phone,
        userType,
      });
    }
    
    // Send confirmation email (Resend example)
    if (process.env.RESEND_API_KEY) {
      await sendConfirmationEmail({
        to: email,
        name,
        userType,
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist',
    });
    
  } catch (error) {
    console.error('Waitlist API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to process request',
        },
      },
      { status: 500 }
    );
  }
}

// Helper functions
async function saveToMailchimp(data: {
  email: string;
  name: string;
  phone?: string;
  userType: string;
}) {
  const response = await fetch(
    `https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: data.name.split(' ')[0],
          LNAME: data.name.split(' ').slice(1).join(' '),
          PHONE: data.phone || '',
          USERTYPE: data.userType,
        },
        tags: [data.userType, 'waitlist'],
      }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    // Handle "already subscribed" gracefully
    if (error.title === 'Member Exists') {
      return; // Not an error
    }
    throw new Error(`Mailchimp error: ${error.detail}`);
  }
}

async function sendConfirmationEmail(data: {
  to: string;
  name: string;
  userType: string;
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Directrent.ng <hello@directrent.ng>',
      to: data.to,
      subject: "You're on the Directrent.ng waitlist! 🏠",
      html: `
        <h1>Welcome to Directrent.ng, ${data.name}!</h1>
        <p>You've been added to our waitlist as a <strong>${data.userType}</strong>.</p>
        <p>We'll notify you as soon as we launch.</p>
        <p>In the meantime, feel free to reply to this email with any questions!</p>
        <br/>
        <p>Best,<br/>The Directrent.ng Team</p>
      `,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Resend error:', error);
    // Don't throw - email is not critical
  }
}
```

### Contact API

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = ContactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: result.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }
    
    const { name, email, subject, message } = result.data;
    
    // Send email to team
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Directrent.ng <noreply@directrent.ng>',
          to: process.env.CONTACT_EMAIL || 'hello@directrent.ng',
          replyTo: email,
          subject: `[Contact Form] ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr/>
            <p>${message.replace(/\n/g, '<br/>')}</p>
          `,
        }),
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
    
  } catch (error) {
    console.error('Contact API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to send message',
        },
      },
      { status: 500 }
    );
  }
}
```

### Health Check API

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  });
}
```

---

## Validation Schemas

### Central Validation File

```typescript
// lib/validations.ts
import { z } from 'zod';

// Nigerian phone number regex
const nigerianPhoneRegex = /^(\+234|0)[789][01]\d{8}$/;

// Common schemas
export const emailSchema = z.string().email('Invalid email address');

export const phoneSchema = z
  .string()
  .regex(nigerianPhoneRegex, 'Invalid Nigerian phone number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long');

// Form schemas
export const waitlistSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  userType: z.enum(['tenant', 'landlord']),
});

export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(2000),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});

// Type exports
export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
```

---

## Error Handling

### Error Types

```typescript
// lib/errors.ts
export class APIError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
} as const;
```

### Error Response Helper

```typescript
// lib/api-utils.ts
import { NextResponse } from 'next/server';
import { APIError } from './errors';

export function handleAPIError(error: unknown) {
  console.error('API Error:', error);
  
  if (error instanceof APIError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      },
      { status: error.status }
    );
  }
  
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      },
    },
    { status: 500 }
  );
}
```

---

## Security Best Practices

### 1. Input Validation

Always validate ALL inputs with Zod before processing:

```typescript
// ✅ DO
const result = schema.safeParse(body);
if (!result.success) return error response;

// ❌ DON'T
const { email } = await request.json(); // Untrusted!
```

### 2. Rate Limiting

```typescript
// Using Upstash
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

// In route handler
const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
const { success } = await ratelimit.limit(ip);
if (!success) return 429 response;
```

### 3. Environment Variables

```typescript
// ✅ DO: Access server-side only
const apiKey = process.env.RESEND_API_KEY; // No NEXT_PUBLIC_ prefix

// ❌ DON'T: Expose to client
const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Visible to client!
```

### 4. CORS Headers

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://directrent.ng' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST' },
        ],
      },
    ];
  },
};
```

---

## External Service Integrations

### Mailchimp

```typescript
// lib/services/mailchimp.ts
const MAILCHIMP_API_URL = `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0`;

export async function addToAudience(data: {
  email: string;
  firstName: string;
  lastName: string;
  tags?: string[];
}) {
  const response = await fetch(
    `${MAILCHIMP_API_URL}/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: data.firstName,
          LNAME: data.lastName,
        },
        tags: data.tags,
      }),
    }
  );
  
  if (!response.ok && response.status !== 400) {
    throw new Error('Failed to add to Mailchimp');
  }
  
  return response.json();
}
```

### Resend (Emails)

```typescript
// lib/services/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { data, error } = await resend.emails.send({
    from: 'Directrent.ng <hello@directrent.ng>',
    ...options,
  });
  
  if (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email');
  }
  
  return data;
}
```

---

## Testing API Routes

```typescript
// __tests__/api/waitlist.test.ts
import { POST } from '@/app/api/waitlist/route';
import { NextRequest } from 'next/server';

describe('/api/waitlist', () => {
  it('accepts valid waitlist submission', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        userType: 'tenant',
      }),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
  
  it('rejects invalid email', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        userType: 'tenant',
      }),
    });
    
    const response = await POST(request);
    
    expect(response.status).toBe(400);
  });
});
```

---

## Environment Variables Reference

```env
# Required for production
RESEND_API_KEY=re_xxxx           # Email sending
CONTACT_EMAIL=hello@directrent.ng # Contact form recipient

# Optional (but recommended)
MAILCHIMP_API_KEY=xxx            # Newsletter/waitlist
MAILCHIMP_DC=us1                 # Mailchimp data center
MAILCHIMP_AUDIENCE_ID=xxx        # Mailchimp list ID

# Rate limiting (optional)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

---

*As Backend/API Developer, your primary job is to build secure, reliable API endpoints that handle form submissions and external service integrations while protecting against abuse.*
