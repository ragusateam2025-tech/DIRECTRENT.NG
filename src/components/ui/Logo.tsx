import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { icon: 'h-7 w-7', text: 'text-lg' },
  md: { icon: 'h-8 w-8', text: 'text-xl' },
  lg: { icon: 'h-10 w-10', text: 'text-2xl' },
};

export function Logo({
  className,
  showWordmark = true,
  size = 'md',
}: LogoProps) {
  const s = sizes[size];

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {/* Logo mark — house/door icon with brand colors */}
      <svg
        className={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Rounded square background */}
        <rect width="40" height="40" rx="10" fill="#1A0A0A" />
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="9"
          stroke="#D4A853"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        {/* Door/entrance shape */}
        <path
          d="M14 32V16.5L20 12l6 4.5V32"
          stroke="#D4A853"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Door opening */}
        <rect
          x="17.5"
          y="22"
          width="5"
          height="10"
          rx="1"
          fill="#E85A4F"
          fillOpacity="0.9"
        />
        {/* Keyhole / handle dot */}
        <circle cx="21" cy="27" r="0.8" fill="#1A0A0A" />
        {/* Roof accent line */}
        <path
          d="M11 18l9-7 9 7"
          stroke="#D4A853"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={cn(
            'font-display font-bold text-text-primary',
            s.text
          )}
        >
          Direct<span className="text-accent-gold">rent</span>
          <span className="text-text-muted">.ng</span>
        </span>
      )}
    </span>
  );
}
