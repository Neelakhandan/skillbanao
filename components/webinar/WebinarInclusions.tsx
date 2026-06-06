'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Video, FileText, ListChecks, BookOpen, PlayCircle, GraduationCap } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarInclusionsData } from '@/lib/webinar-types'

interface Props { data: WebinarInclusionsData }

const ITEM_STYLES = [
  { Icon: Video,          bg: 'rgba(91,46,255,0.08)',  color: 'var(--color-primary)' },
  { Icon: FileText,       bg: 'rgba(255,194,0,0.14)',  color: '#92600A' },
  { Icon: ListChecks,     bg: 'rgba(21,128,61,0.08)',  color: 'var(--color-success)' },
  { Icon: BookOpen,       bg: 'rgba(225,29,72,0.08)',  color: '#e11d48' },
  { Icon: PlayCircle,     bg: 'rgba(14,165,233,0.08)', color: '#0284c7' },
  { Icon: GraduationCap,  bg: 'rgba(234,88,12,0.08)',  color: '#ea580c' },
]

export function WebinarInclusions({ data }: Props) {
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
        {data.items.map((item, i) => {
          const { Icon, bg, color } = ITEM_STYLES[i] ?? ITEM_STYLES[0]
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
              <p className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>{item.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.body}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
