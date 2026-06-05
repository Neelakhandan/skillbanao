'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CheckCircle2, FileText, ChevronDown, ChevronRight, Brain, Search, Layers, GraduationCap } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { CurriculumModulesData, ModuleItem } from '@/lib/types'

interface WhatYouLearnProps {
  data: CurriculumModulesData
}

const PHASE_ICONS = [Brain, Search, Layers, GraduationCap]

const PHASE_COLORS = [
  { accent: '#5B2EFF', light: 'rgba(91,46,255,0.08)', border: 'rgba(91,46,255,0.15)', divider: 'rgba(91,46,255,0.12)' },
  { accent: '#0EA5E9', light: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.15)', divider: 'rgba(14,165,233,0.12)' },
  { accent: '#E11D48', light: 'rgba(225,29,72,0.08)', border: 'rgba(225,29,72,0.15)', divider: 'rgba(225,29,72,0.12)' },
  { accent: '#059669', light: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.15)', divider: 'rgba(5,150,105,0.12)' },
]

interface ModuleCardProps {
  module: ModuleItem
  color: typeof PHASE_COLORS[number]
  defaultOpen?: boolean
}

function ModuleCard({ module, color: c, defaultOpen = false }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: isOpen ? c.border : 'var(--color-border)', background: 'var(--color-bg-card)', transition: 'border-color 0.2s' }}
    >
      {/* Clickable header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-black text-sm transition-all duration-300"
          style={{ background: c.accent, fontFamily: 'var(--font-heading)', boxShadow: isOpen ? `0 4px 16px ${c.accent}44` : 'none' }}
        >
          {module.id}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="text-base font-bold mb-2 leading-snug"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
          >
            {module.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: c.light, color: c.accent, border: `1px solid ${c.border}` }}
            >
              {module.weeks}
            </span>
            <span className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {module.topics}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <div
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-1"
          style={{
            background: isOpen ? c.light : 'transparent',
            border: `1px solid ${isOpen ? c.border : 'var(--color-border)'}`,
            color: isOpen ? c.accent : 'var(--color-text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronDown size={16} />
        </div>
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-6 pb-6 border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <p className="text-sm leading-relaxed my-5" style={{ color: 'var(--color-text-secondary)' }}>
                {module.description}
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {/* What you'll be able to do */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    What you'll be able to do
                  </p>
                  <ul className="flex flex-col gap-3">
                    {module.can_do.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: c.accent }} />
                        <span className="text-sm leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portfolio deliverables */}
                <div className="md:border-l md:pl-6" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    Portfolio deliverables
                  </p>
                  <ul className="flex flex-col gap-3">
                    {module.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <FileText size={14} className="shrink-0 mt-0.5" style={{ color: '#D97706' }} />
                        <span className="text-sm leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function WhatYouLearn({ data }: WhatYouLearnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="curriculum" style={{ background: 'var(--color-bg-dark)' } as React.CSSProperties}>

      {/* Section header */}
      <div className="mb-10 text-center">
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
          {data.subtitle}
        </p>
      </div>

      {/* Phase navigation strip — progressive */}
      <div className="flex flex-col md:flex-row items-stretch mb-14 rounded-xl border overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
        {data.phases.map((phase, i) => {
          const c = PHASE_COLORS[i % PHASE_COLORS.length]
          const Icon = PHASE_ICONS[i]
          const isLast = i === data.phases.length - 1
          return (
            <div key={phase.number} className="flex md:flex-1 items-stretch">
              {/* Phase card */}
              <div
                className="flex-1 flex flex-col gap-3 px-5 py-5 transition-colors duration-200"
                style={{ background: c.light, borderRight: !isLast ? `1px solid ${c.border}` : 'none' }}
              >
                {/* Icon + phase number row */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: c.accent }}
                  >
                    <Icon size={18} color="#fff" />
                  </div>
                  <span
                    className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.06)', color: c.accent }}
                  >
                    {phase.number < 10 ? `0${phase.number}` : phase.number}
                  </span>
                </div>

                {/* Label + weeks */}
                <div>
                  <p className="text-sm font-bold leading-snug mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                    {phase.label}
                  </p>
                  <p className="text-xs" style={{ color: c.accent }}>{phase.weeks}</p>
                </div>

                {/* Bottom accent bar */}
                <div className="w-full h-0.5 rounded-full mt-auto" style={{ background: c.accent, opacity: 0.3 }} />
              </div>

              {/* Connector arrow (between cards) */}
              {!isLast && (
                <div
                  className="hidden md:flex items-center justify-center w-6 shrink-0"
                  style={{ background: 'var(--color-bg-card)' }}
                >
                  <ChevronRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Phases + modules */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col gap-12"
      >
        {data.phases.map((phase, phaseIdx) => {
          const c = PHASE_COLORS[phaseIdx % PHASE_COLORS.length]
          return (
            <div key={phase.number}>
              {/* Phase header */}
              <div
                className="flex flex-wrap items-center gap-3 mb-6 pb-4 border-b"
                style={{ borderColor: c.divider }}
              >
                <div className="w-1.5 h-6 rounded-full shrink-0" style={{ background: c.accent }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: c.accent }}>
                  Phase {phase.number}
                </span>
                <span className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {phase.label}
                </span>
                <span
                  className="ml-auto text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: c.light, color: c.accent, border: `1px solid ${c.border}` }}
                >
                  {phase.weeks}
                </span>
              </div>

              {/* Module accordion cards */}
              <div className="flex flex-col gap-3">
                {phase.modules.map((module, moduleIdx) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    color={c}
                    defaultOpen={phaseIdx === 0 && moduleIdx === 0}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </motion.div>
    </Section>
  )
}
