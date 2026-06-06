'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { X, Check } from 'lucide-react'
import type { WebinarDifferenceData } from '@/lib/webinar-types'

interface Props { data: WebinarDifferenceData }

export function WebinarDifference({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: 'var(--color-bg-card)' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} subtitle={data.body} />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(91,46,255,0.15)', boxShadow: '0 4px 24px rgba(91,46,255,0.06)' }}
      >
        {/* Header */}
        <div className="grid grid-cols-2">
          <div className="px-6 py-4 text-center font-bold text-sm" style={{ background: '#F3F4F6', color: '#6B7280' }}>
            {data.regular_label}
          </div>
          <div className="px-6 py-4 text-center font-bold text-sm text-white" style={{ background: '#5B2EFF' }}>
            {data.skillbanao_label}
          </div>
        </div>

        {data.rows.map((row, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="grid grid-cols-2 border-t"
            style={{ borderColor: 'rgba(91,46,255,0.08)' }}
          >
            <div
              className="px-5 py-4 flex items-start gap-2 text-sm"
              style={{ background: i % 2 === 0 ? '#fff' : '#F9FAFB', color: '#9CA3AF', borderRight: '1px solid rgba(91,46,255,0.08)' }}
            >
              <X size={14} className="shrink-0 mt-0.5" style={{ color: '#D1D5DB' }} />
              {row.regular}
            </div>
            <div
              className="px-5 py-4 flex items-start gap-2 text-sm font-medium"
              style={{ background: i % 2 === 0 ? 'rgba(91,46,255,0.03)' : 'rgba(91,46,255,0.06)', color: 'var(--color-text-primary)' }}
            >
              <Check size={14} className="shrink-0 mt-0.5" style={{ color: '#5B2EFF' }} />
              {row.skillbanao}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
