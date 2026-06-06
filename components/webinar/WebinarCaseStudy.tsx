'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarCaseStudyData } from '@/lib/webinar-types'

interface Props { data: WebinarCaseStudyData }

export function WebinarCaseStudy({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: '#fff' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto flex flex-col gap-6"
      >
        <motion.p variants={fadeUp} className="text-lg leading-relaxed text-center" style={{ color: 'var(--color-text-secondary)' }}>
          {data.body}
        </motion.p>

        {/* Example box */}
        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl"
          style={{ background: 'rgba(91,46,255,0.06)', border: '1px solid rgba(91,46,255,0.2)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#5B2EFF' }}>{data.example_heading}</p>
          <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--color-text-primary)' }}>{data.example}</p>
          <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--color-text-secondary)' }}>{data.example_note}</p>
        </motion.div>

        {/* What you'll see */}
        <motion.div
          variants={fadeUp}
          className="p-6 rounded-xl"
          style={{ background: '#fff', border: '1px solid rgba(91,46,255,0.1)' }}
        >
          <p className="font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>What You Will See</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.what_you_will_see.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#5B2EFF' }} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p variants={fadeUp} className="text-sm text-center italic" style={{ color: 'var(--color-text-muted)' }}>
          {data.note}
        </motion.p>
      </motion.div>
    </Section>
  )
}
