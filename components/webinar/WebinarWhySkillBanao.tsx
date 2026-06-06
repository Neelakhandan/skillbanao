'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarWhySkillBanaoData } from '@/lib/webinar-types'

interface Props { data: WebinarWhySkillBanaoData }

export function WebinarWhySkillBanao({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: '#ECFDF5' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} />

      <div ref={ref} className="max-w-4xl mx-auto flex flex-col gap-8">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col gap-4">
          {data.body.trim().split('\n\n').map((para, i) => (
            <motion.p key={i} variants={fadeUp} className="text-lg leading-relaxed text-center" style={{ color: 'var(--color-text-secondary)' }}>
              {para}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="p-6 rounded-xl text-center"
          style={{ background: 'rgba(21,128,61,0.08)', border: '1px solid rgba(21,128,61,0.2)' }}
        >
          <p className="text-base font-semibold" style={{ color: '#15803D' }}>{data.core_belief}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {data.focus_items.map((item, i) => (
            <motion.div
              key={i} variants={fadeUp}
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{ background: '#fff', border: '1px solid rgba(21,128,61,0.15)' }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#15803D' }} />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
