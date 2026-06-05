'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, scaleIn } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { ToolsData } from '@/lib/types'

interface ToolsYouLearnProps {
  data: ToolsData
}

const TOOL_PALETTE: Record<string, { bg: string; color: string }> = {
  Figma:              { bg: 'rgba(242,78,30,0.15)',   color: '#F24E1E' },
  FigJam:             { bg: 'rgba(85,81,255,0.15)',   color: '#5551FF' },
  Maze:               { bg: 'rgba(255,51,102,0.15)',  color: '#FF3366' },
  Lyssna:             { bg: 'rgba(20,184,166,0.15)',  color: '#14B8A6' },
  Miro:               { bg: 'rgba(255,208,47,0.15)',  color: '#b8860b' },
  Notion:             { bg: 'rgba(55,53,47,0.08)',    color: '#37352F' },
  Framer:             { bg: 'rgba(0,85,255,0.12)',    color: '#0055FF' },
  Zeroheight:         { bg: 'rgba(99,102,241,0.12)', color: '#4338CA' },
  'Optimal Workshop': { bg: 'rgba(255,107,53,0.15)', color: 'var(--color-accent-2)' },
  Loom:               { bg: 'rgba(98,93,245,0.12)',  color: '#625DF5' },
  Midjourney:         { bg: 'rgba(91,46,255,0.15)',  color: 'var(--color-primary)' },
  ChatGPT:            { bg: 'rgba(16,163,127,0.15)', color: '#10A37F' },
}

const CATEGORY_COLORS: Record<string, string> = {
  'Design & Prototyping': 'rgba(242,78,30,0.12)',
  'Collaboration':        'rgba(85,81,255,0.12)',
  'Usability Testing':    'rgba(255,51,102,0.12)',
  'User Research':        'rgba(20,184,166,0.12)',
  'Workshops':            'rgba(255,208,47,0.10)',
  'Documentation':        'rgba(55,53,47,0.06)',
  'Responsive Design':    'rgba(0,85,255,0.12)',
  'Design Systems':       'rgba(99,102,241,0.12)',
  'IA & Research':        'rgba(255,107,53,0.12)',
  'Presentation':         'rgba(98,93,245,0.12)',
  'AI & Ideation':        'rgba(91,46,255,0.12)',
  'AI & Writing':         'rgba(16,163,127,0.12)',
}

export function ToolsYouLearn({ data }: ToolsYouLearnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="tools" style={{ background: 'var(--color-bg-dark)' }}>
      <SectionHeading
        badge="Tech Stack"
        title={data.title}
        highlight="Master"
        subtitle={data.subtitle}
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {data.items.map((tool) => {
          const palette = TOOL_PALETTE[tool.name] ?? { bg: 'rgba(91,46,255,0.12)', color: 'var(--color-primary)' }
          const catBg   = CATEGORY_COLORS[tool.category] ?? 'rgba(91,46,255,0.08)'

          return (
            <motion.div
              key={tool.name}
              variants={scaleIn}
              className="group flex flex-col p-5 rounded-2xl border transition-all duration-300 cursor-default"
              style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = palette.color
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow = `0 12px 36px ${palette.bg}`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--color-border)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              {/* Tool letter avatar */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-4 transition-all duration-300"
                style={{ background: palette.bg, color: palette.color, fontFamily: 'var(--font-heading)' }}
              >
                {tool.name[0]}
              </div>

              {/* Category pill */}
              <span
                className="inline-block mb-2 text-xs font-medium px-2 py-0.5 rounded-md"
                style={{ background: catBg, color: 'var(--color-text-muted)' }}
              >
                {tool.category}
              </span>

              <h4
                className="text-sm font-semibold mb-1.5"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {tool.name}
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {tool.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
