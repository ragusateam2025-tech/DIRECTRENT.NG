import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ============================================
      // DIRECTRENT.NG BRAND COLORS
      // ============================================
      colors: {
        // Primary palette (dark backgrounds)
        primary: {
          DEFAULT: '#1A0A0A',
          dark: '#1A0A0A',     // Deep burgundy - main background
          medium: '#2D1515',    // Slightly lighter - cards, sections
          light: '#4A2020',     // Hover states
        },
        
        // Accent colors
        accent: {
          gold: {
            DEFAULT: '#D4A853',
            light: '#E5C47A',
            dark: '#B8923F',
          },
          coral: {
            DEFAULT: '#E85A4F',
            light: '#F07D74',
            dark: '#D14338',
          },
          orange: {
            DEFAULT: '#F5A623',
            light: '#FFB84D',
            dark: '#D4891A',
          },
        },
        
        // Semantic colors
        success: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },

        // Background & Surface
        background: {
          DEFAULT: '#1A0A0A',
          paper: '#2D1515',
          elevated: '#3D2020',
        },

        // Text colors
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          muted: 'rgba(255, 255, 255, 0.5)',
          disabled: 'rgba(255, 255, 255, 0.3)',
        },

        // Border colors
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.2)',
          gold: '#D4A853',
        },
      },

      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        // Scale: 1.25 (Major Third)
        'xs': ['0.75rem', { lineHeight: '1rem' }],           // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],       // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],          // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],       // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],        // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],           // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],      // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],        // 36px
        '5xl': ['3rem', { lineHeight: '1.16' }],             // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],           // 60px
        '7xl': ['4.5rem', { lineHeight: '1.05' }],           // 72px
      },

      // ============================================
      // SPACING
      // ============================================
      screens: {
        'xs': '375px',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },

      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },

      // ============================================
      // ANIMATIONS
      // ============================================
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 83, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212, 168, 83, 0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-gold': 'pulse-gold 2s infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },

      // ============================================
      // SHADOWS
      // ============================================
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 168, 83, 0.3)',
        'glow-coral': '0 0 20px rgba(232, 90, 79, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.4)',
        'button': '0 4px 14px rgba(232, 90, 79, 0.4)',
        'button-hover': '0 6px 20px rgba(232, 90, 79, 0.5)',
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ============================================
      // CONTAINER
      // ============================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },

      // ============================================
      // BACKDROP BLUR
      // ============================================
      backdropBlur: {
        xs: '2px',
      },

      // ============================================
      // Z-INDEX
      // ============================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // ============================================
      // TRANSITION
      // ============================================
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add custom utilities
    function({ addUtilities }: { addUtilities: Function }) {
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.text-gradient-gold': {
          'background': 'linear-gradient(135deg, #D4A853, #F5A623)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-gradient-dark': {
          'background': 'linear-gradient(180deg, #1A0A0A 0%, #2D1515 100%)',
        },
        '.bg-gradient-card': {
          'background': 'linear-gradient(145deg, #2D1515 0%, #3D2020 100%)',
        },
      });
    },
  ],
};

export default config;
