'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X, Check, Sparkles } from 'lucide-react'
import { fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { DifferenceData } from '@/lib/types'

const COL_STYLES = [
  {
    bg: 'rgba(239,68,68,0.08)',
    color: '#B91C1C',
    border: 'rgba(239,68,68,0.25)',
  },
  {
    bg: 'rgba(91,46,255,0.1)',
    color: 'var(--color-primary)',
    border: 'rgba(91,46,255,0.3)',
  },
  {
    bg: 'rgba(255,194,0,0.12)',
    color: '#7A5C00',
    border: 'rgba(255,194,0,0.35)',
  },
]

interface SkillBanaoDifferenceProps {
  data: DifferenceData
}

export function SkillBanaoDifference({ data }: SkillBanaoDifferenceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="difference">
      <SectionHeading
        badge={data.badge}
        title={data.title}
        highlight={data.title_highlight}
        subtitle={data.subtitle}
      />

      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {/* Column headers */}
        <div className="grid grid-cols-3">
          {data.col_headers.map((col, i) => (
            <div
              key={i}
              className="px-5 py-4 text-center text-sm font-bold whitespace-pre-line leading-tight"
              style={{
                background: COL_STYLES[i].bg,
                color: COL_STYLES[i].color,
                borderBottom: `2px solid ${COL_STYLES[i].border}`,
              }}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {data.rows.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-3"
            style={{ borderTop: i > 0 ? `1px solid var(--color-border)` : undefined }}
          >
            {/* Col 1 — what they think they need */}
            <div
              className="flex items-start gap-2.5 px-5 py-4"
              style={{ background: i % 2 === 0 ? 'var(--color-bg-dark)' : 'var(--color-bg-card)' }}
            >
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(220,38,38,0.1)' }}
              >
                <X size={11} style={{ color: '#DC2626' }} />
              </div>
              <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {row.think}
              </span>
            </div>

            {/* Col 2 — what they actually need */}
            <div
              className="flex items-start gap-2.5 px-5 py-4"
              style={{ background: i % 2 === 0 ? 'rgba(91,46,255,0.04)' : 'rgba(91,46,255,0.07)' }}
            >
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(91,46,255,0.15)' }}
              >
                <Check size={11} style={{ color: 'var(--color-primary)' }} />
              </div>
              <span className="text-sm leading-relaxed font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {row.need}
              </span>
            </div>

            {/* Col 3 — what Skill Banao delivers */}
            <div
              className="flex items-start gap-2.5 px-5 py-4"
              style={{ background: i % 2 === 0 ? 'rgba(255,194,0,0.04)' : 'rgba(255,194,0,0.08)' }}
            >
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,194,0,0.2)' }}
              >
                <Sparkles size={10} style={{ color: '#7A5C00' }} />
              </div>
              <span className="text-sm leading-relaxed font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {row.deliver}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}
