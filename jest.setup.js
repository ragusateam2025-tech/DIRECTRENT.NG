// Jest setup file
// This file is executed before each test file

import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

// ================================================
// MOCK: next/navigation
// ================================================
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  useParams: () => ({}),
}));

// ================================================
// MOCK: next/image
// ================================================
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image(props) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// ================================================
// MOCK: next/link
// ================================================
jest.mock('next/link', () => ({
  __esModule: true,
  default: function Link({ children, href, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// ================================================
// MOCK: Framer Motion
// ================================================
jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv({ children, ...props }) {
      return <div {...props}>{children}</div>;
    },
    span: function MotionSpan({ children, ...props }) {
      return <span {...props}>{children}</span>;
    },
    button: function MotionButton({ children, ...props }) {
      return <button {...props}>{children}</button>;
    },
    section: function MotionSection({ children, ...props }) {
      return <section {...props}>{children}</section>;
    },
    article: function MotionArticle({ children, ...props }) {
      return <article {...props}>{children}</article>;
    },
    nav: function MotionNav({ children, ...props }) {
      return <nav {...props}>{children}</nav>;
    },
    header: function MotionHeader({ children, ...props }) {
      return <header {...props}>{children}</header>;
    },
    footer: function MotionFooter({ children, ...props }) {
      return <footer {...props}>{children}</footer>;
    },
    ul: function MotionUl({ children, ...props }) {
      return <ul {...props}>{children}</ul>;
    },
    li: function MotionLi({ children, ...props }) {
      return <li {...props}>{children}</li>;
    },
    p: function MotionP({ children, ...props }) {
      return <p {...props}>{children}</p>;
    },
    h1: function MotionH1({ children, ...props }) {
      return <h1 {...props}>{children}</h1>;
    },
    h2: function MotionH2({ children, ...props }) {
      return <h2 {...props}>{children}</h2>;
    },
    h3: function MotionH3({ children, ...props }) {
      return <h3 {...props}>{children}</h3>;
    },
    a: function MotionA({ children, ...props }) {
      return <a {...props}>{children}</a>;
    },
  },
  AnimatePresence: function AnimatePresence({ children }) {
    return <>{children}</>;
  },
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => true,
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: (value, range, output) => output[0],
}));

// ================================================
// MOCK: Intersection Observer
// ================================================
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// ================================================
// MOCK: ResizeObserver
// ================================================
class MockResizeObserver {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// ================================================
// MOCK: matchMedia
// ================================================
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// ================================================
// MOCK: scrollTo
// ================================================
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: jest.fn(),
});

// ================================================
// MOCK: fetch (global)
// ================================================
global.fetch = jest.fn();

// ================================================
// ENVIRONMENT VARIABLES
// ================================================
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
process.env.NEXT_PUBLIC_SITE_NAME = 'Directrent.ng';

// ================================================
// SUPPRESS CONSOLE ERRORS FOR EXPECTED FAILURES
// ================================================
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Suppress React act() warnings in tests
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// ================================================
// CLEAN UP AFTER EACH TEST
// ================================================
afterEach(() => {
  jest.clearAllMocks();
});
