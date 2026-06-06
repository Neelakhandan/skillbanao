'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Repeat2, PenTool, BookOpen, Users } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarAudienceData } from '@/lib/webinar-types'

interface Props { data: WebinarAudienceData }

const PERSONA_STYLES = [
  { Icon: GraduationCap, bg: 'rgba(91,46,255,0.08)',  color: 'var(--color-primary)' },
  { Icon: Repeat2,       bg: 'rgba(255,194,0,0.14)',  color: '#92600A' },
  { Icon: PenTool,       bg: 'rgba(225,29,72,0.08)',  color: '#e11d48' },
  { Icon: BookOpen,      bg: 'rgba(21,128,61,0.08)',  color: 'var(--color-success)' },
  { Icon: Users,         bg: 'rgba(14,165,233,0.08)', color: '#0284c7' },
]

export function WebinarAudience({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: '#F5F3FF' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
      >
        {data.personas.map((persona, i) => {
          const { Icon, bg, color } = PERSONA_STYLES[i] ?? PERSONA_STYLES[0]
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-6 rounded-xl flex flex-col gap-4"
              style={{ background: '#fff', border: '1px solid rgba(91,46,255,0.1)', boxShadow: '0 2px 12px rgba(91,46,255,0.05)' }}
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0" style={{ background: bg }}>
                <Icon size={24} style={{ color }} />
              </div>
              <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{persona.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{persona.body}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
