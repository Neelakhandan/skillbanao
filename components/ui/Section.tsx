'use client'

import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  style?: CSSProperties
  children: React.ReactNode
}

export function Section({ id, className, style, children }: SectionProps) {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        'relative w-full py-20 md:py-32 overflow-hidden',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  )
}
