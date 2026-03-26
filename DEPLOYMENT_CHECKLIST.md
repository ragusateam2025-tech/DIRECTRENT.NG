# Deployment Checklist

## Environment Variables to Set in Vercel

### Required (set before first deploy)
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://directrent.ng`

### Required When Services Are Ready
- [ ] `RESEND_API_KEY` — for contact form and waitlist confirmation emails
- [ ] `MAILCHIMP_API_KEY` — for newsletter subscriptions
- [ ] `MAILCHIMP_DC` — Mailchimp data center (e.g., `us1`)
- [ ] `MAILCHIMP_AUDIENCE_ID` — Mailchimp audience/list ID
- [ ] `UPSTASH_REDIS_REST_URL` — for production rate limiting
- [ ] `UPSTASH_REDIS_REST_TOKEN` — for production rate limiting

### Optional
- [ ] `NEXT_PUBLIC_GA_ID` — Google Analytics measurement ID
- [ ] `SENTRY_DSN` — Error tracking (when Sentry is configured)

## Vercel Configuration
- [ ] Framework preset: Next.js
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Node.js version: 18.x
- [ ] Region: `cdg1` (or closest to Lagos — consider `jnb1` Johannesburg)

## Domain Configuration
- [ ] Add `directrent.ng` as production domain
- [ ] Add `www.directrent.ng` with redirect to bare domain
- [ ] Verify SSL certificate is provisioned
- [ ] Test HTTPS redirect works

## Post-Deploy Verification
- [ ] Homepage loads at https://directrent.ng
- [ ] All navigation links work
- [ ] Contact form submits successfully
- [ ] Waitlist form submits successfully
- [ ] OG image appears when sharing on WhatsApp/Twitter
- [ ] Favicon appears in browser tab
- [ ] robots.txt accessible at /robots.txt
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] 404 page appears for /nonexistent-page
- [ ] Mobile responsive (test on real phone via shared WiFi)
- [ ] Lighthouse score: Performance >= 85, Accessibility >= 95, SEO >= 95
