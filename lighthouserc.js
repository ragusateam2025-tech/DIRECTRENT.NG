/**
 * Lighthouse CI Configuration
 * @see https://github.com/GoogleChrome/lighthouse-ci
 */
module.exports = {
  ci: {
    // Collect settings
    collect: {
      // URLs to test
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/features',
        'http://localhost:3000/about',
        'http://localhost:3000/how-it-works',
        'http://localhost:3000/pricing',
        'http://localhost:3000/contact',
        'http://localhost:3000/waitlist',
      ],
      
      // Number of runs for statistical accuracy
      numberOfRuns: 3,
      
      // Start server command (if not already running)
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 60000,
      
      // Chrome flags for consistent results
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
      },
    },

    // Assert settings - fail builds that don't meet thresholds
    assert: {
      // Use recommended preset as base
      preset: 'lighthouse:recommended',
      
      // Custom assertions
      assertions: {
        // Category scores
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        
        // Additional metrics
        'max-potential-fid': ['warn', { maxNumericValue: 130 }],
        'uses-responsive-images': 'warn',
        'uses-optimized-images': 'warn',
        'uses-text-compression': 'warn',
        'uses-rel-preconnect': 'warn',
        
        // Accessibility
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'image-alt': 'error',
        'link-name': 'error',
        'button-name': 'error',
        
        // Best practices
        'errors-in-console': 'warn',
        'deprecations': 'warn',
        'is-on-https': 'error',
        
        // SEO
        'robots-txt': 'warn',
        'canonical': 'warn',
        'hreflang': 'off', // Not applicable for single language site
      },
    },

    // Upload settings
    upload: {
      // Use temporary public storage for CI
      target: 'temporary-public-storage',
    },
  },
};
