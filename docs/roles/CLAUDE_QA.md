# CLAUDE_QA.md — QA Engineer Role

## Role Definition

You are a **QA Engineer** for the Directrent.ng website. Your responsibilities include:

- Writing and maintaining test suites (unit, integration, e2e)
- Ensuring accessibility compliance (WCAG 2.1 AA)
- Performance testing and optimization validation
- Cross-browser and cross-device testing
- Bug documentation and regression testing

---

## Testing Stack

| Category | Tool |
|----------|------|
| Unit Testing | Jest + React Testing Library |
| E2E Testing | Playwright |
| Accessibility | axe-core, jest-axe |
| Performance | Lighthouse CI |
| Visual Regression | Playwright screenshots |

---

## Test File Structure

```
tests/
├── unit/                    # Unit tests (mirrors src/)
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.test.tsx
│   │   └── forms/
│   │       └── WaitlistForm.test.tsx
│   └── lib/
│       └── utils.test.ts
├── integration/             # Integration tests
│   └── api/
│       ├── contact.test.ts
│       └── waitlist.test.ts
├── e2e/                     # End-to-end tests
│   ├── home.spec.ts
│   ├── waitlist-flow.spec.ts
│   └── navigation.spec.ts
└── fixtures/                # Test data
    └── mock-data.ts
```

---

## Unit Testing Standards

### Component Test Template

```typescript
// tests/unit/components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@/components/ui/Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Rendering tests
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders all variants correctly', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;
      
      variants.forEach((variant) => {
        const { container } = render(
          <Button variant={variant}>Test</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    it('renders all sizes correctly', () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      
      sizes.forEach((size) => {
        const { container } = render(
          <Button size={size}>Test</Button>
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  // Interaction tests
  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Click</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('shows loading state correctly', () => {
      render(<Button loading>Submit</Button>);
      
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });
  });

  // Accessibility tests
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press Enter</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
    });

    it('has correct ARIA attributes when loading', () => {
      render(<Button loading>Loading</Button>);
      
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
```

### Form Test Template

```typescript
// tests/unit/components/forms/WaitlistForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WaitlistForm } from '@/components/forms/WaitlistForm';

// Mock fetch
global.fetch = jest.fn();

describe('WaitlistForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validation', () => {
    it('shows error for invalid email', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      await user.type(screen.getByLabelText(/email/i), 'invalid-email');
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    });

    it('shows error for invalid Nigerian phone', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      await user.type(screen.getByLabelText(/phone/i), '12345');
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      expect(await screen.findByText(/nigerian phone/i)).toBeInTheDocument();
    });

    it('accepts valid Nigerian phone formats', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      const validPhones = ['08012345678', '+2348012345678', '07012345678'];
      
      for (const phone of validPhones) {
        const input = screen.getByLabelText(/phone/i);
        await user.clear(input);
        await user.type(input, phone);
        
        await user.click(screen.getByRole('button', { name: /join/i }));
        
        // Should not show phone validation error
        expect(screen.queryByText(/nigerian phone/i)).not.toBeInTheDocument();
      }
    });
  });

  describe('submission', () => {
    it('submits form with valid data', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'Tayo Adeyemi');
      await user.type(screen.getByLabelText(/email/i), 'tayo@example.com');
      await user.type(screen.getByLabelText(/phone/i), '08012345678');
      await user.click(screen.getByLabelText(/tenant/i));
      
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/waitlist',
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('tayo@example.com'),
          })
        );
      });
    });

    it('shows success message after submission', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/phone/i), '08012345678');
      await user.click(screen.getByLabelText(/tenant/i));
      
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      expect(await screen.findByText(/success|thank you/i)).toBeInTheDocument();
    });

    it('handles submission error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      await user.type(screen.getByLabelText(/name/i), 'Test User');
      await user.type(screen.getByLabelText(/email/i), 'test@example.com');
      await user.type(screen.getByLabelText(/phone/i), '08012345678');
      await user.click(screen.getByLabelText(/tenant/i));
      
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      expect(await screen.findByText(/error|try again/i)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<WaitlistForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('focuses first error field on validation failure', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      // Submit empty form
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      // First required field should be focused
      await waitFor(() => {
        expect(document.activeElement).toBe(screen.getByLabelText(/name/i));
      });
    });

    it('announces errors to screen readers', async () => {
      const user = userEvent.setup();
      render(<WaitlistForm />);
      
      await user.type(screen.getByLabelText(/email/i), 'invalid');
      await user.click(screen.getByRole('button', { name: /join/i }));
      
      const errorMessage = await screen.findByText(/valid email/i);
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });
});
```

### Utility Function Test Template

```typescript
// tests/unit/lib/utils.test.ts
import { cn, formatPhoneNumber, formatCurrency } from '@/lib/utils';

describe('cn (classNames utility)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', true && 'visible')).toBe('base visible');
  });

  it('merges Tailwind classes correctly', () => {
    expect(cn('px-4 py-2', 'px-6')).toBe('py-2 px-6');
  });
});

describe('formatPhoneNumber', () => {
  it('formats Nigerian phone numbers', () => {
    expect(formatPhoneNumber('08012345678')).toBe('+234 801 234 5678');
    expect(formatPhoneNumber('+2348012345678')).toBe('+234 801 234 5678');
  });

  it('handles invalid input', () => {
    expect(formatPhoneNumber('')).toBe('');
    expect(formatPhoneNumber('invalid')).toBe('invalid');
  });
});

describe('formatCurrency', () => {
  it('formats Naira amounts', () => {
    expect(formatCurrency(1000000)).toBe('₦1,000,000');
    expect(formatCurrency(500000.5)).toBe('₦500,001');
  });

  it('handles zero and negative', () => {
    expect(formatCurrency(0)).toBe('₦0');
    expect(formatCurrency(-1000)).toBe('-₦1,000');
  });
});
```

---

## Integration Testing

### API Route Test Template

```typescript
// tests/integration/api/waitlist.test.ts
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/waitlist/route';

// Mock external services
jest.mock('@/lib/mailchimp', () => ({
  addSubscriber: jest.fn().mockResolvedValue({ id: 'test-id' }),
}));

jest.mock('@/lib/resend', () => ({
  sendWelcomeEmail: jest.fn().mockResolvedValue({ id: 'email-id' }),
}));

describe('POST /api/waitlist', () => {
  it('returns 200 for valid submission', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '08012345678',
        userType: 'tenant',
      },
    });

    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('returns 400 for invalid email', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'invalid-email',
        phone: '08012345678',
        userType: 'tenant',
      },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('returns 400 for invalid Nigerian phone', async () => {
    const { req } = createMocks({
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890', // Not Nigerian format
        userType: 'tenant',
      },
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
  });

  it('returns 429 when rate limited', async () => {
    // Simulate multiple requests
    const requests = Array(11).fill(null).map(() =>
      createMocks({
        method: 'POST',
        body: {
          name: 'Test User',
          email: 'test@example.com',
          phone: '08012345678',
          userType: 'tenant',
        },
        headers: { 'x-forwarded-for': '192.168.1.1' },
      })
    );

    // First 10 should succeed
    for (let i = 0; i < 10; i++) {
      const response = await POST(requests[i].req);
      expect(response.status).toBe(200);
    }

    // 11th should be rate limited
    const response = await POST(requests[10].req);
    expect(response.status).toBe(429);
  });
});
```

---

## E2E Testing with Playwright

### Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Template

```typescript
// tests/e2e/waitlist-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Waitlist Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('completes full waitlist signup as tenant', async ({ page }) => {
    // Navigate to waitlist
    await page.click('text=Join Waitlist');
    await expect(page).toHaveURL(/waitlist/);

    // Fill form
    await page.fill('[name="name"]', 'Tayo Adeyemi');
    await page.fill('[name="email"]', 'tayo@example.com');
    await page.fill('[name="phone"]', '08012345678');
    await page.click('[value="tenant"]');
    await page.selectOption('[name="area"]', 'yaba');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.locator('text=Thank you')).toBeVisible();
    await expect(page.locator('text=waitlist')).toBeVisible();
  });

  test('shows validation errors for invalid input', async ({ page }) => {
    await page.click('text=Join Waitlist');

    // Submit empty form
    await page.click('button[type="submit"]');

    // Check for error messages
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });

  test('is accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/waitlist');

    // Tab through form
    await page.keyboard.press('Tab'); // Name field
    await page.keyboard.type('Test User');
    
    await page.keyboard.press('Tab'); // Email field
    await page.keyboard.type('test@example.com');
    
    await page.keyboard.press('Tab'); // Phone field
    await page.keyboard.type('08012345678');
    
    await page.keyboard.press('Tab'); // User type
    await page.keyboard.press('Space'); // Select tenant
    
    await page.keyboard.press('Tab'); // Area select
    await page.keyboard.press('Tab'); // Submit button
    
    // Submit with Enter
    await page.keyboard.press('Enter');
    
    await expect(page.locator('text=Thank you')).toBeVisible();
  });
});
```

### Navigation E2E Tests

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('desktop navigation works correctly', async ({ page }) => {
    await page.goto('/');

    // Check all nav links work
    const navLinks = [
      { text: 'Features', url: '/features' },
      { text: 'How It Works', url: '/how-it-works' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'About', url: '/about' },
      { text: 'Contact', url: '/contact' },
    ];

    for (const link of navLinks) {
      await page.click(`nav >> text="${link.text}"`);
      await expect(page).toHaveURL(new RegExp(link.url));
      await page.goBack();
    }
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Menu should be hidden initially
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();

    // Open menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();

    // Close menu
    await page.click('[data-testid="mobile-menu-close"]');
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
  });

  test('scroll to section works on home page', async ({ page }) => {
    await page.goto('/');

    // Click features link
    await page.click('a[href="#features"]');

    // Features section should be in viewport
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
  });
});
```

---

## Accessibility Testing

### Automated a11y Test Suite

```typescript
// tests/unit/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Import all page components
import HomePage from '@/app/page';
import AboutPage from '@/app/about/page';
import FeaturesPage from '@/app/features/page';
import ContactPage from '@/app/contact/page';
import WaitlistPage from '@/app/waitlist/page';

expect.extend(toHaveNoViolations);

const pages = [
  { name: 'Home', Component: HomePage },
  { name: 'About', Component: AboutPage },
  { name: 'Features', Component: FeaturesPage },
  { name: 'Contact', Component: ContactPage },
  { name: 'Waitlist', Component: WaitlistPage },
];

describe('Accessibility', () => {
  pages.forEach(({ name, Component }) => {
    it(`${name} page has no accessibility violations`, async () => {
      const { container } = render(<Component />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### Accessibility Checklist

```markdown
## Pre-Launch Accessibility Checklist

### Perceivable
- [ ] All images have alt text
- [ ] Videos have captions (if applicable)
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient color contrast (4.5:1 minimum)
- [ ] Content is readable when zoomed to 200%

### Operable
- [ ] All functionality is keyboard accessible
- [ ] No keyboard traps
- [ ] Skip link to main content
- [ ] Focus indicators are visible
- [ ] No content flashes more than 3 times per second
- [ ] Page titles are descriptive

### Understandable
- [ ] Language is declared in HTML
- [ ] Error messages are clear and helpful
- [ ] Form labels are associated with inputs
- [ ] Instructions don't rely solely on sensory characteristics

### Robust
- [ ] Valid HTML markup
- [ ] ARIA attributes used correctly
- [ ] Works with screen readers (tested with NVDA/VoiceOver)
```

---

## Performance Testing

### Lighthouse CI Assertions

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/features',
        'http://localhost:3000/waitlist',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### Core Web Vitals Tests

```typescript
// tests/e2e/performance.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('home page loads within performance budget', async ({ page }) => {
    await page.goto('/');

    // Get performance metrics
    const metrics = await page.evaluate(() => ({
      fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
      lcp: new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          resolve(entries[entries.length - 1].startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      }),
    }));

    // FCP should be under 1.5s
    expect(metrics.fcp).toBeLessThan(1500);
  });

  test('no layout shifts on scroll', async ({ page }) => {
    await page.goto('/');

    // Measure CLS
    const cls = await page.evaluate(async () => {
      return new Promise(resolve => {
        let clsScore = 0;
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });

        // Scroll down and back up
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => {
          window.scrollTo(0, 0);
          setTimeout(() => resolve(clsScore), 500);
        }, 500);
      });
    });

    // CLS should be under 0.1
    expect(cls).toBeLessThan(0.1);
  });
});
```

---

## Test Data & Fixtures

```typescript
// tests/fixtures/mock-data.ts
export const validTenant = {
  name: 'Tayo Adeyemi',
  email: 'tayo@example.com',
  phone: '08012345678',
  userType: 'tenant' as const,
  area: 'yaba',
};

export const validLandlord = {
  name: 'Adaeze Okonkwo',
  email: 'adaeze@example.com',
  phone: '+2347012345678',
  userType: 'landlord' as const,
  area: 'surulere',
};

export const invalidEmails = [
  'not-an-email',
  '@missing-local.com',
  'missing-domain@',
  'missing@.com',
  'spaces in@email.com',
];

export const invalidPhones = [
  '12345', // Too short
  '1234567890', // US format
  '+1234567890123', // Not Nigerian
  'abcdefghijk', // Not numeric
  '090123456', // Too short
];

export const validNigerianPhones = [
  '08012345678',
  '07012345678',
  '09012345678',
  '+2348012345678',
  '+2347012345678',
  '2348012345678',
];
```

---

## Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/tests/e2e/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

```javascript
// jest.setup.js
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
```

---

## Bug Documentation Template

When documenting bugs, use this format:

```markdown
## Bug Report: [Brief Description]

### Environment
- Browser: Chrome 120 / Firefox 121 / Safari 17
- OS: Windows 11 / macOS 14 / iOS 17
- Screen size: Desktop (1920x1080) / Mobile (375x667)
- Date discovered: 2026-03-23

### Steps to Reproduce
1. Go to [page]
2. Click [element]
3. Enter [data]
4. Observe [behavior]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Screenshots/Videos
[Attach visual evidence]

### Console Errors
```
[Any JavaScript errors]
```

### Severity
- [ ] Critical (blocking, data loss)
- [ ] High (major feature broken)
- [ ] Medium (feature impaired)
- [ ] Low (cosmetic issue)

### Additional Context
[Any other relevant information]
```

---

## Running Tests

```powershell
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e -- --ui

# E2E specific browser
npm run test:e2e -- --project=chromium

# Lighthouse CI
npm run lighthouse
```

---

*As QA Engineer, your mission is to ensure every feature works flawlessly across all devices and meets the highest accessibility standards.*
