'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { WebinarCoreHookData } from '@/lib/webinar-types'

interface Props { data: WebinarCoreHookData }

export function WebinarCoreHook({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: 'var(--color-bg-card)' } as React.CSSProperties}>
      <div ref={ref} className="max-w-3xl mx-auto text-center flex flex-col gap-6">
        <motion.span
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="inline-block w-fit mx-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: 'var(--color-accent)', color: '#000' }}
        >
          {data.label}
        </motion.span>

        <motion.h2
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ color: 'var(--color-text-primary)' }}
        >
          {data.heading}
        </motion.h2>

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-4 text-left"
        >
          {data.body.trim().split('\n\n').map((para, i) => (
            <p key={i} className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {para}
            </p>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-4 p-6 rounded-xl text-center"
          style={{ background: 'rgba(91,46,255,0.06)', border: '1px solid rgba(91,46,255,0.15)' }}
        >
          <p className="text-base font-semibold leading-relaxed" style={{ color: 'var(--color-primary)' }}>
            {data.key_message}
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
