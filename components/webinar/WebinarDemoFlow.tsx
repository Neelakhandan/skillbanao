'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarDemoFlowData } from '@/lib/webinar-types'

interface Props { data: WebinarDemoFlowData }

export function WebinarDemoFlow({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="demo-flow" style={{ background: '#F5F3FF' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} />

      <div className="max-w-3xl mx-auto mb-12">
        {data.body.trim().split('\n\n').map((para, i) => (
          <p key={i} className="text-lg leading-relaxed mb-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>
            {para}
          </p>
        ))}
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col gap-4 max-w-3xl mx-auto"
      >
        {data.steps.map((step) => (
          <motion.div
            key={step.number}
            variants={fadeUp}
            className="flex gap-5 items-start p-5 rounded-xl"
            style={{ background: '#fff', border: '1px solid rgba(91,46,255,0.1)', boxShadow: '0 2px 12px rgba(91,46,255,0.05)' }}
          >
            <span
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: '#5B2EFF', color: '#fff' }}
            >
              {step.number}
            </span>
            <div>
              <p className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{step.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
