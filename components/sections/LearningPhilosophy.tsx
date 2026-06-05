'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Search, Layers, GraduationCap } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { LearningPhilosophyData } from '@/lib/types'

interface LearningPhilosophyProps {
  data: LearningPhilosophyData
}

const PHASE_COLORS = [
  { accent: '#5B2EFF', light: 'rgba(91,46,255,0.08)', border: 'rgba(91,46,255,0.15)' },
  { accent: '#0EA5E9', light: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.15)' },
  { accent: '#E11D48', light: 'rgba(225,29,72,0.08)',  border: 'rgba(225,29,72,0.15)'  },
  { accent: '#059669', light: 'rgba(5,150,105,0.08)',  border: 'rgba(5,150,105,0.15)'  },
]

const PHASE_ICONS = [Brain, Search, Layers, GraduationCap]

export function LearningPhilosophy({ data }: LearningPhilosophyProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="learning-philosophy" style={{ background: 'var(--color-bg-card)' } as React.CSSProperties}>

      {/* Header */}
      <div className="text-center mb-12">
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-4"
          style={{ background: 'rgba(91,46,255,0.1)', color: 'var(--color-primary)' }}
        >
          {data.badge}
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          {data.title}
        </h2>
        <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
          {data.description}
        </p>
      </div>

      {/* Spectrum bar */}
      <div className="mb-14 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            ← {data.spectrum_left}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
            {data.spectrum_right} →
          </span>
        </div>

        {/* Gradient track + markers */}
        <div className="relative flex items-center">
          {/* Bar */}
          <div
            className="w-full h-2.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #5B2EFF 0%, #0EA5E9 33%, #E11D48 66%, #059669 100%)' }}
          />
          {/* Markers — overlaid and centered on the bar */}
          {data.phases.map((phase, i) => {
            const c = PHASE_COLORS[i]
            return (
              <div
                key={phase.number}
                className="absolute w-5 h-5 rounded-full border-2 border-white"
                style={{
                  left: `${phase.rhizomatic_percent}%`,
                  transform: 'translateX(-50%)',
                  background: c.accent,
                  boxShadow: `0 0 0 3px ${c.accent}44`,
                }}
              />
            )
          })}
        </div>

        {/* % labels below bar */}
        <div className="relative h-6 mt-1">
          {data.phases.map((phase, i) => {
            const c = PHASE_COLORS[i]
            return (
              <span
                key={phase.number}
                className="absolute text-xs font-bold -translate-x-1/2"
                style={{ left: `${phase.rhizomatic_percent}%`, color: c.accent }}
              >
                {phase.rhizomatic_percent}%
              </span>
            )
          })}
        </div>
      </div>

      {/* Phase cards */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {data.phases.map((phase, i) => {
          const c = PHASE_COLORS[i]
          const Icon = PHASE_ICONS[i]
          return (
            <motion.div
              key={phase.number}
              variants={fadeUp}
              className="flex flex-col rounded-xl border overflow-hidden"
              style={{ background: '#FFFFFF', borderColor: c.border }}
            >
              {/* Card top */}
              <div className="px-5 pt-5 pb-4" style={{ background: c.light }}>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: c.accent }}
                  >
                    <Icon size={18} color="#fff" />
                  </div>
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.07)', color: c.accent }}
                  >
                    {`0${phase.number}`}
                  </span>
                </div>
                <p className="text-sm font-bold leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                  {phase.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {phase.weeks}
                </p>
              </div>

              {/* Rhizomatic stat */}
              <div className="px-5 py-4 border-b" style={{ borderColor: c.border }}>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-4xl font-black leading-none"
                    style={{ color: c.accent, fontFamily: 'var(--font-heading)' }}
                  >
                    {phase.rhizomatic_percent}%
                  </span>
                </div>
                <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-text-muted)' }}>
                  Rhizomatic
                </p>
                {/* Animated progress bar */}
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: c.accent }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${phase.rhizomatic_percent}%` } : { width: 0 }}
                    transition={{ duration: 0.9, delay: i * 0.15, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Topics */}
              <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
                {phase.topics.map((topic, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: c.accent }}
                    />
                    <span className="text-xs leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
