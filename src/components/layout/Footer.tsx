import Link from 'next/link';

import { Mail, MapPin, Phone, Twitter, Instagram, Linkedin } from 'lucide-react';

import { SITE_CONFIG, SOCIAL_LINKS, FOOTER_LINKS } from '@/lib/constants';

import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary-dark">
      <Container>
        {/* Main Footer Content */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-display text-2xl font-bold text-text-primary"
            >
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              {SITE_CONFIG.description}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 sm:justify-start">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-text-secondary transition-colors hover:bg-accent-coral hover:text-white"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-text-secondary transition-colors hover:bg-accent-coral hover:text-white"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-white/10 text-text-secondary transition-colors hover:bg-accent-coral hover:text-white"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent-gold">
              Product
            </h3>
            <ul className="space-y-1">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-text-secondary transition-colors hover:text-accent-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent-gold">
              Company
            </h3>
            <ul className="space-y-1">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-text-secondary transition-colors hover:text-accent-coral"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent-gold">
              Contact
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-coral"
                >
                  <Mail className="size-4 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <span className="inline-flex min-h-[44px] items-center gap-2 text-sm text-text-secondary">
                  <Phone className="size-4 shrink-0" />
                  {SITE_CONFIG.phone}
                </span>
              </li>
              <li>
                <span className="inline-flex min-h-[44px] items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="size-4 shrink-0" />
                  {SITE_CONFIG.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-center md:flex-row md:text-left"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          <p className="text-xs text-text-muted sm:text-sm">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>

          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-muted transition-colors hover:text-text-secondary sm:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
