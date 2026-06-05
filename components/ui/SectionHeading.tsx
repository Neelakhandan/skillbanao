'use client'

import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const titleWithHighlight = highlight
    ? title.replace(
        highlight,
        `<span class="text-gradient-primary">${highlight}</span>`
      )
    : title

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {badge && (
        <span
          className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: 'var(--color-accent)', color: '#000' }}
        >
          {badge}
        </span>
      )}
      <h2
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: titleWithHighlight }}
      />
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-relaxed',
            align === 'center' ? 'mx-auto' : ''
          )}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
