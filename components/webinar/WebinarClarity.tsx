'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Check, X } from 'lucide-react'
import type { WebinarClarityData } from '@/lib/webinar-types'

interface Props { data: WebinarClarityData }

export function WebinarClarity({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section>
      <SectionHeading badge={data.label} title={data.heading} />

      <div className="max-w-3xl mx-auto mb-10">
        {data.body.trim().split('\n\n').map((para, i) => (
          <p key={i} className="text-lg leading-relaxed mb-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>{para}</p>
        ))}
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {/* Will Do */}
        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl flex flex-col gap-4"
          style={{ background: 'rgba(21,128,61,0.05)', border: '1px solid rgba(21,128,61,0.2)' }}
        >
          <p className="font-bold text-sm uppercase tracking-wider" style={{ color: '#15803D' }}>What We Will Do</p>
          <ul className="flex flex-col gap-3">
            {data.will_do.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: '#15803D' }}>
                  <Check size={11} color="#fff" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Will Not Do */}
        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl flex flex-col gap-4"
          style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.15)' }}
        >
          <p className="font-bold text-sm uppercase tracking-wider" style={{ color: '#DC2626' }}>What We Will Not Do</p>
          <ul className="flex flex-col gap-3">
            {data.will_not_do.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: '#DC2626' }}>
                  <X size={11} color="#fff" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </Section>
  )
}
