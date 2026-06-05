import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Skill Banao — UI/UX Design Fellowship | Learn the Way Industry Works'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Purple accent bar at top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: '#5B2EFF', display: 'flex' }} />

        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="80" height="80" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="245" fill="#5B2EFF" />
            <path
              d="M 250,155 C 235,175 200,215 155,265 C 130,292 100,318 75,338 L 100,358 C 125,340 158,315 185,287 C 215,255 238,225 250,205 C 262,225 285,255 315,287 C 342,315 375,340 400,358 L 425,338 C 400,318 370,292 345,265 C 300,215 265,175 250,155 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Brand name */}
        <div style={{ display: 'flex', fontSize: '88px', fontWeight: '700', color: '#111111', letterSpacing: '-2px', lineHeight: 1 }}>
          Skill Banao
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', fontSize: '32px', color: '#6B7280', fontWeight: '400', marginTop: '16px', letterSpacing: '0.5px' }}>
          Learn the Way Industry Works
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '48px', marginTop: '48px' }}>
          {[
            { value: '94%', label: 'Placement Rate' },
            { value: '3500+', label: 'Alumni Placed' },
            { value: '20+ yrs', label: 'Mentor Experience' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '36px', fontWeight: '700', color: '#5B2EFF' }}>{stat.value}</span>
              <span style={{ fontSize: '18px', color: '#9CA3AF', marginTop: '4px' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Purple accent bar at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8px', background: '#5B2EFF', display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}
