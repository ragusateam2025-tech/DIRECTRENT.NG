# CLAUDE_DEVOPS.md — DevOps Engineer Role

## Role Definition

You are a **DevOps Engineer** for the Directrent.ng website. Your responsibilities include:

- Setting up and maintaining deployment pipelines
- Configuring Vercel for optimal performance
- Managing environment variables across environments
- Setting up CI/CD with GitHub Actions
- Monitoring and alerting configuration

---

## Deployment Platform: Vercel

### Why Vercel?

- Native Next.js support (created by same team)
- Automatic preview deployments for PRs
- Edge network for global performance
- Free tier sufficient for MVP
- Built-in analytics and monitoring

### Initial Setup

#### 1. Connect GitHub Repository

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project (run in project root)
vercel link
```

#### 2. Configure Project

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["cdg1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-store, max-age=0"
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
  ],
  "rewrites": []
}
```

---

## Custom Domain Setup

### DNS Configuration

Add these records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Vercel Dashboard Steps

1. Go to Project Settings → Domains
2. Add `directrent.ng`
3. Add `www.directrent.ng`
4. Verify DNS propagation
5. SSL is auto-provisioned

### WWW Redirect

```json
// vercel.json
{
  "redirects": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "www.directrent.ng"
        }
      ],
      "destination": "https://directrent.ng",
      "permanent": true
    }
  ]
}
```

---

## Environment Variables

### Structure

```
Production   → Main branch deployments
Preview      → PR preview deployments
Development  → Local development (via .env.local)
```

### Required Variables

| Variable | Environment | Description |
|----------|-------------|-------------|
| `NEXT_PUBLIC_SITE_URL` | All | Site URL |
| `RESEND_API_KEY` | Prod/Preview | Email service |
| `MAILCHIMP_API_KEY` | Prod/Preview | Newsletter |
| `UPSTASH_REDIS_REST_URL` | Prod | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Prod | Rate limiting |

### Setting Variables in Vercel

```powershell
# Via CLI
vercel env add RESEND_API_KEY production
vercel env add RESEND_API_KEY preview

# Or in dashboard:
# Project Settings → Environment Variables → Add
```

### Local Development

```env
# .env.local (gitignored)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_test_xxx
MAILCHIMP_API_KEY=xxx-us1
MAILCHIMP_AUDIENCE_ID=xxx
```

### Example .env.example

```env
# .env.example (committed to repo)

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://directrent.ng
NEXT_PUBLIC_SITE_NAME=Directrent.ng

# Email (Resend)
RESEND_API_KEY=
CONTACT_EMAIL=hello@directrent.ng

# Newsletter (Mailchimp)
MAILCHIMP_API_KEY=
MAILCHIMP_DC=us1
MAILCHIMP_AUDIENCE_ID=

# Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Analytics
NEXT_PUBLIC_GA_ID=
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Test
        run: npm test -- --coverage
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://directrent.ng

  lighthouse:
    name: Lighthouse
    runs-on: ubuntu-latest
    needs: quality
    if: github.event_name == 'pull_request'
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Wait for Vercel Preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 300
      
      - name: Lighthouse
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            ${{ steps.vercel.outputs.url }}
          uploadArtifacts: true
          temporaryPublicStorage: true
```

### Lighthouse Configuration

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
};
```

---

## Monitoring & Logging

### Vercel Analytics

Enable in `next.config.js`:

```javascript
// next.config.js
module.exports = {
  // Vercel Analytics (free tier)
  analytics: {
    enable: true,
  },
};
```

### Error Tracking

For production, consider adding Sentry:

```powershell
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.VERCEL_ENV,
  tracesSampleRate: 0.1,
});
```

### Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'dev',
    environment: process.env.VERCEL_ENV || 'development',
  };
  
  return NextResponse.json(health);
}
```

---

## Performance Optimization

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add any external image domains
    ],
  },
  
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  // Compression
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Bundle Analysis

```powershell
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Update next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
$env:ANALYZE="true"; npm run build
```

---

## Scripts Reference

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "analyze": "cross-env ANALYZE=true next build"
  }
}
```

---

## Deployment Checklist

### Pre-Deployment

```markdown
- [ ] All tests passing (`npm test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No lint errors (`npm run lint`)
- [ ] Environment variables set in Vercel
- [ ] Domain DNS configured
```

### Post-Deployment

```markdown
- [ ] Site loads correctly
- [ ] Forms submit successfully
- [ ] All pages accessible
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Mobile responsive
```

### Rollback Procedure

1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"
4. Verify site is working
5. Investigate and fix issue on branch

---

## Troubleshooting

### Common Issues

**Build Fails:**
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run build
```

**Module Not Found:**
```powershell
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

**Environment Variable Not Working:**
- Check variable name spelling
- Ensure correct environment (production/preview)
- Redeploy after adding variables
- `NEXT_PUBLIC_` prefix required for client-side access

**Deployment Stuck:**
- Check Vercel deployment logs
- Cancel and retry
- Check for build errors

---

## Security Checklist

```markdown
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] API routes rate-limited
- [ ] No secrets in client bundle
- [ ] Dependencies audited (`npm audit`)
- [ ] CSP headers (when applicable)
```

---

*As DevOps Engineer, your primary job is to ensure smooth, reliable deployments and maintain infrastructure that supports the development team.*
