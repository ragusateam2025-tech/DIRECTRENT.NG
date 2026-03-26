import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Directrent.ng — Rent Direct. Save More.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1A0A0A 0%, #2D1515 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: 16,
            fontFamily: 'sans-serif',
          }}
        >
          Directrent.ng
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#D4A853',
            marginBottom: 40,
            fontFamily: 'sans-serif',
          }}
        >
          Rent Direct. Save More.
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.5,
            fontFamily: 'sans-serif',
          }}
        >
          Skip the agents. Save up to ₦300,000 in rental fees. Connect directly
          with verified landlords in Lagos.
        </div>
        <div
          style={{
            marginTop: 40,
            padding: '12px 32px',
            background: '#E85A4F',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 600,
            color: '#FFFFFF',
            fontFamily: 'sans-serif',
          }}
        >
          Join the Waitlist →
        </div>
      </div>
    ),
    { ...size }
  );
}
