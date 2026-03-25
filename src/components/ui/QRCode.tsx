'use client';

import { cn } from '@/lib/utils';

interface QRCodeProps {
  url: string;
  size?: number;
  className?: string;
}

/**
 * Placeholder QR code component.
 * Renders a styled SVG pattern representing a QR code.
 * Replace with a real QR code library (e.g. qrcode.react) for production.
 */
function QRCode({ url, size = 160, className }: QRCodeProps) {
  // Generate a deterministic pattern from the URL
  const cells = 21; // Standard QR code grid
  const cellSize = size / cells;

  // Simple seeded pattern for visual placeholder
  function isBlack(row: number, col: number): boolean {
    // Position detection patterns (top-left, top-right, bottom-left)
    const inFinderPattern = (r: number, c: number) =>
      (r < 7 && c < 7) ||
      (r < 7 && c >= cells - 7) ||
      (r >= cells - 7 && c < 7);

    if (inFinderPattern(row, col)) {
      // Outer border
      if (row === 0 || row === 6 || col === 0 || col === 6) return true;
      if (row >= cells - 7 && (row === cells - 7 || row === cells - 1))
        return true;
      if (col >= cells - 7 && (col === cells - 7 || col === cells - 1))
        return true;
      // Inner square
      if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true;
      if (
        row >= cells - 5 &&
        row <= cells - 3 &&
        col >= 2 &&
        col <= 4
      )
        return true;
      if (
        row >= 2 &&
        row <= 4 &&
        col >= cells - 5 &&
        col <= cells - 3
      )
        return true;
      return false;
    }

    // Timing pattern
    if (row === 6) return col % 2 === 0;
    if (col === 6) return row % 2 === 0;

    // Pseudo-random data area based on URL hash
    const hash =
      (url.charCodeAt((row * cells + col) % url.length) * 31 +
        row * 7 +
        col * 13) %
      100;
    return hash < 45;
  }

  return (
    <div className={cn('inline-block', className)}>
      <div className="rounded-xl bg-white p-3">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`QR code linking to ${url}`}
        >
          {Array.from({ length: cells }, (_, row) =>
            Array.from({ length: cells }, (_, col) =>
              isBlack(row, col) ? (
                <rect
                  key={`${row}-${col}`}
                  x={col * cellSize}
                  y={row * cellSize}
                  width={cellSize}
                  height={cellSize}
                  fill="#1A0A0A"
                  rx={cellSize * 0.1}
                />
              ) : null
            )
          )}
        </svg>
      </div>
      <p className="mt-2 text-center text-xs text-text-muted">
        Scan to download
      </p>
    </div>
  );
}

QRCode.displayName = 'QRCode';

export { QRCode };
