'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { fadeUp, fadeIn } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TimelineData } from '@/lib/types'

interface ProgramTimelineProps {
  data: TimelineData
}

const PHASE_PALETTE: Record<string, { active: string; border: string; bg: string; dot: string }> = {
  primary:   { active: 'var(--color-primary)',       border: 'rgba(91,46,255,0.4)',   bg: 'rgba(91,46,255,0.08)',   dot: 'var(--color-primary)' },
  accent:    { active: 'var(--color-accent)',         border: 'rgba(255,194,0,0.4)',  bg: 'rgba(255,194,0,0.06)',  dot: 'var(--color-accent)' },
  'accent-2':{ active: 'var(--color-accent-2)',       border: 'rgba(255,107,53,0.4)', bg: 'rgba(255,107,53,0.06)', dot: 'var(--color-accent-2)' },
  success:   { active: 'var(--color-success)',        border: 'rgba(34,197,94,0.4)',  bg: 'rgba(34,197,94,0.06)',  dot: 'var(--color-success)' },
}

export function ProgramTimeline({ data }: ProgramTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activePhase, setActivePhase] = useState(0)

  const phase = data.phases[activePhase]
  const palette = PHASE_PALETTE[phase.color] ?? PHASE_PALETTE.primary

  return (
    <Section id="timeline" style={{ background: 'var(--color-bg-dark)' }}>
      <SectionHeading
        badge="24 Weeks"
        title={data.title}
        highlight={data.title_highlight}
        subtitle={data.subtitle}
      />

      <div ref={ref}>
        {/* Phase tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {data.phases.map((p, i) => {
            const pal = PHASE_PALETTE[p.color] ?? PHASE_PALETTE.primary
            const isActive = i === activePhase
            return (
              <button
                key={p.phase}
                onClick={() => setActivePhase(i)}
                className="relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer"
                style={{
                  background:   isActive ? pal.bg    : 'var(--color-bg-card)',
                  borderColor:  isActive ? pal.border : 'var(--color-border)',
                  transform:    isActive ? 'scale(1.02)' : 'scale(1)',
                  boxShadow:    isActive ? `0 8px 32px ${pal.bg}` : 'none',
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: isActive ? pal.active : 'var(--color-text-muted)' }}
                >
                  {p.phase}
                </span>
                <span
                  className="text-sm font-semibold mb-1"
                  style={{ color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
                >
                  {p.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {p.weeks}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="phase-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                    style={{ background: pal.active }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Weeks list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative pl-6"
            style={{ borderLeft: `2px solid ${palette.border}` }}
          >
            {phase.items.map((week, i) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                className="relative mb-6 last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-9 top-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{
                    background: 'var(--color-bg-dark)',
                    borderColor: palette.dot,
                    boxShadow: `0 0 8px ${palette.bg}`,
                  }}
                />

                <div
                  className="p-5 rounded-2xl border transition-all duration-200"
                  style={{
                    background: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = palette.border
                    e.currentTarget.style.background = palette.bg
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.background = 'var(--color-bg-card)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold"
                      style={{
                        background: palette.bg,
                        color: palette.dot,
                        border: `1px solid ${palette.border}`,
                      }}
                    >
                      {week.week}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-sm font-semibold mb-1"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {week.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {week.description}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="shrink-0 mt-0.5 opacity-30"
                      style={{ color: palette.dot }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
