'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CheckCircle2, FileText, ChevronDown, Brain, Search, Layers, GraduationCap } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { CurriculumModulesData, ModuleItem } from '@/lib/types'

interface WhatYouLearnProps {
  data: CurriculumModulesData
}

const PHASE_ICONS = [Brain, Search, Layers, GraduationCap]

const PHASE_COLORS = [
  { accent: '#5B2EFF', light: 'rgba(91,46,255,0.08)', border: 'rgba(91,46,255,0.15)', divider: 'rgba(91,46,255,0.12)', pastel: '#EBE6FF', ghost: 'rgba(91,46,255,0.05)' },
  { accent: '#0EA5E9', light: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.15)', divider: 'rgba(14,165,233,0.12)', pastel: '#E2F4FC', ghost: 'rgba(14,165,233,0.05)' },
  { accent: '#E11D48', light: 'rgba(225,29,72,0.08)', border: 'rgba(225,29,72,0.15)', divider: 'rgba(225,29,72,0.12)', pastel: '#FBE4E9', ghost: 'rgba(225,29,72,0.05)' },
  { accent: '#059669', light: 'rgba(5,150,105,0.08)', border: 'rgba(5,150,105,0.15)', divider: 'rgba(5,150,105,0.12)', pastel: '#E1F2ED', ghost: 'rgba(5,150,105,0.05)' },
]

const RAIL_BG = '#FAFAFC'

interface ModuleCardProps {
  module: ModuleItem
  color: typeof PHASE_COLORS[number]
  defaultOpen?: boolean
  highlight?: boolean
}

function ModuleCard({ module, color: c, defaultOpen = false, highlight = false }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl border overflow-hidden"
      style={{
        borderColor: isOpen ? c.border : (highlight ? c.border : 'var(--color-border)'),
        background: highlight ? `linear-gradient(135deg, ${c.light} 0%, #FFFFFF 100%)` : '#FFFFFF',
        transition: 'border-color 0.2s',
      }}
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
    <Section id="curriculum" style={{ background: RAIL_BG } as React.CSSProperties}>

      {/* Section header */}
      <div className="max-w-[680px] mx-auto text-center mb-16 md:mb-24">
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-5"
          style={{ background: 'rgba(255,194,0,0.16)', color: '#8A5B00' }}
        >
          {data.badge}
        </span>
        <h2
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          {data.title}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {data.subtitle}
        </p>
      </div>

      {/* Journey rail */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative max-w-[1000px] mx-auto"
      >
        <div
          className="absolute top-1.5 bottom-1.5 left-5 md:left-[27px] w-0.5"
          style={{ background: 'linear-gradient(180deg, #5B2EFF 0%, #0EA5E9 33%, #E11D48 66%, #059669 100%)', opacity: 0.22 }}
        />

        {data.phases.map((phase, phaseIdx) => {
          const c = PHASE_COLORS[phaseIdx % PHASE_COLORS.length]
          const Icon = PHASE_ICONS[phaseIdx % PHASE_ICONS.length]
          const isLastPhase = phaseIdx === data.phases.length - 1
          const paddedNumber = phase.number < 10 ? `0${phase.number}` : `${phase.number}`

          return (
            <div
              key={phase.number}
              className="relative pl-14 md:pl-[88px]"
              style={{ marginBottom: isLastPhase ? 0 : 88 }}
            >
              {/* Ghost phase number */}
              <span
                className="absolute -top-6 md:-top-10 left-9 md:left-10 text-[90px] md:text-[180px] font-black leading-none select-none pointer-events-none"
                style={{ color: c.ghost }}
              >
                {paddedNumber}
              </span>

              {/* Icon node */}
              <div
                className="absolute left-0 top-0.5 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center z-[2]"
                style={{ background: c.pastel, border: `2px solid ${c.border.replace('0.15', '0.3')}`, boxShadow: `0 0 0 8px ${RAIL_BG}` }}
              >
                <Icon size={20} style={{ color: c.accent }} />
              </div>

              <div className="relative z-[2]">
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: c.accent }}>
                  Phase {phase.number} &middot; {phase.weeks}
                </span>
                <h3
                  className="text-2xl font-bold mt-2 mb-6"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {phase.label}
                </h3>

                <div className="flex flex-col gap-3.5">
                  {phase.modules.map((module, moduleIdx) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      color={c}
                      defaultOpen={phaseIdx === 0 && moduleIdx === 0}
                      highlight={isLastPhase}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>
    </Section>
  )
}
