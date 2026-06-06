'use client'

interface Props {
  date: string
  short_date: string
  time: string
}

export function StickyBottomBar({ date, short_date, time }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 py-3 md:justify-center md:gap-6 md:px-10"
      style={{
        background: '#0A0A14',
        borderTop: '1px solid rgba(91,46,255,0.25)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Mobile label | Desktop full title */}
      <div className="flex items-center min-w-0">
        {/* Mobile: "UX + AI Masterclass · 25 July" */}
        <p className="md:hidden text-sm font-semibold whitespace-nowrap" style={{ color: '#F0EEFF' }}>
          UX + AI Masterclass{' '}
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>{' '}
          <span style={{ color: '#FFC200', fontWeight: 800 }}>{short_date}</span>
        </p>

        {/* Desktop title */}
        <p
          className="hidden md:block text-sm md:text-base font-semibold whitespace-nowrap"
          style={{ color: '#F0EEFF' }}
        >
          Master enterprise design workflows powered by AI —{' '}
          <span style={{ fontWeight: 800, color: '#FFC200' }}>{date}</span>
        </p>
      </div>

      {/* Divider — desktop only */}
      <span className="hidden md:block w-px h-5 shrink-0" style={{ background: 'rgba(91,46,255,0.3)' }} />

      {/* CTA */}
      <a
        href="#apply"
        className="relative px-4 py-2 md:px-6 md:py-2.5 rounded-lg text-xs md:text-sm font-black whitespace-nowrap shrink-0 transition-all duration-300 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #AAFF00, #7CDD00)',
          color: '#000',
          boxShadow: '0 0 18px rgba(170,255,0,0.6), 0 0 40px rgba(170,255,0,0.3)',
          animation: 'glow-pulse 2s ease-in-out infinite',
        }}
      >
        REGISTER NOW FOR ₹199/-
      </a>

      {/* Webinar time widget — desktop only */}
      <div
        className="hidden sm:flex flex-col items-start leading-tight shrink-0 px-3 py-1.5 rounded-lg"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: '#AAFF00' }}>
          Online Webinar
        </span>
        <span className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
          {time}
        </span>
      </div>

    </div>
  )
}
