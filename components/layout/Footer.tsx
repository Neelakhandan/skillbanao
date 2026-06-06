'use client'

import type { SiteData } from '@/lib/types'

interface FooterProps {
  footer: SiteData['footer']
  siteName: string
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
  youtube: <YouTubeIcon />,
}

export function Footer({ footer }: FooterProps) {
  return (
    <footer
      className="border-t"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-16 pb-24">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-10">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <img
              src="/logo/skill-banao-logo.svg"
              alt="Skill Banao"
              style={{ height: '28px', width: 'auto' }}
            />
            <p
              className="text-sm leading-relaxed max-w-sm text-center sm:text-left"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {footer.tagline}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 shrink-0">
            {footer.social.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'var(--color-primary)'
                  el.style.color = 'var(--color-primary)'
                  el.style.background = 'rgba(91,46,255,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'var(--color-border)'
                  el.style.color = 'var(--color-text-muted)'
                  el.style.background = 'transparent'
                }}
              >
                {iconMap[s.icon] ?? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t text-sm"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <p>{footer.legal}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/webinar" className="transition-colors duration-200 hover:text-[var(--color-text-secondary)]">
              Webinar
            </a>
            <a href="/privacy-policy" className="transition-colors duration-200 hover:text-[var(--color-text-secondary)]">
              Privacy Policy
            </a>
            <a href="/refund-policy" className="transition-colors duration-200 hover:text-[var(--color-text-secondary)]">
              Refund &amp; Returns Policy
            </a>
            <a href="/terms" className="transition-colors duration-200 hover:text-[var(--color-text-secondary)]">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
