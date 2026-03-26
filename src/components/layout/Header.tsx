'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { Container } from './Container';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-primary-dark/95 py-3 shadow-lg backdrop-blur-md'
          : 'bg-transparent py-4'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between" aria-label="Main">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-text-primary transition-colors hover:text-accent-gold"
          >
            <span className="font-display text-2xl">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const isWaitlist = link.href === '/waitlist';

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isWaitlist
                      ? isActive
                        ? 'bg-accent-coral text-white'
                        : 'bg-accent-coral/10 text-accent-coral hover:bg-accent-coral/20'
                      : isActive
                        ? 'bg-white/10 text-accent-gold'
                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-text-primary transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border bg-primary-dark md:hidden"
          >
            <Container>
              <div className="flex flex-col gap-2 py-4">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const isWaitlist = link.href === '/waitlist';

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        isWaitlist
                          ? isActive
                            ? 'bg-accent-coral text-white'
                            : 'bg-accent-coral/10 text-accent-coral hover:bg-accent-coral/20'
                          : isActive
                            ? 'bg-white/10 text-accent-gold'
                            : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
