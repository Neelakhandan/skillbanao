'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { WebinarNotForData } from '@/lib/webinar-types'

interface Props { data: WebinarNotForData }

export function WebinarNotFor({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: '#FFFBEB' } as React.CSSProperties}>
      <div ref={ref} className="max-w-3xl mx-auto text-center flex flex-col gap-6">
        <motion.span
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="inline-block w-fit mx-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: 'rgba(234,179,8,0.15)', color: '#B45309', border: '1px solid rgba(234,179,8,0.3)' }}
        >
          {data.label}
        </motion.span>

        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} style={{ color: 'var(--color-text-primary)' }}>
          {data.heading}
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
          {data.body}
        </motion.p>

        <motion.ul
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-2 text-left"
        >
          {data.disqualifiers.map((item, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-start gap-3 px-5 py-3 rounded-lg text-sm"
              style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.12)', color: 'var(--color-text-secondary)' }}
            >
              <span style={{ color: '#DC2626', fontWeight: 700 }}>✕</span>
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-base font-semibold"
          style={{ color: '#B45309' }}
        >
          {data.honest_line}
        </motion.p>
      </div>
    </Section>
  )
}
