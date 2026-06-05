'use client'

export function MentorCTA() {
  return (
    <div
      className="container mx-auto px-4 md:px-8 max-w-7xl"
      style={{ paddingBottom: '2rem' }}
    >
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-2xl"
        style={{ background: '#0D0F14' }}
      >
        {/* Left */}
        <div>
          <h3
            className="text-2xl font-bold mb-1"
            style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            Apply as a{' '}
            <span style={{ color: '#4ade80' }}>Mentor</span>
          </h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Share your expertise. Shape India's next generation of enterprise UX designers.
          </p>
        </div>

        {/* CTA */}
        <a
          href="mailto:hello@skillbanao.in?subject=Mentor Application"
          className="shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-opacity duration-200 hover:opacity-90 whitespace-nowrap"
          style={{ background: '#22c55e', color: '#000' }}
        >
          Join as a mentor
        </a>
      </div>
    </div>
  )
}
