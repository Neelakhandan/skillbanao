'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { WebinarPricingCtaData } from '@/lib/webinar-types'

interface Props { data: WebinarPricingCtaData; onRegister: () => void }

export function WebinarPricingCTA({ data, onRegister }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section>
      <div ref={ref} className="max-w-2xl mx-auto text-center flex flex-col gap-6">
        <motion.span
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="inline-block w-fit mx-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ background: 'var(--color-accent)', color: '#000' }}
        >
          {data.label}
        </motion.span>

        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          {data.heading}
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {data.body}
        </motion.p>

        {/* Event detail pills */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-wrap justify-center gap-3">
          {[data.date, data.time, data.mode].map((detail, i) => (
            <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'rgba(91,46,255,0.08)', color: '#5B2EFF', border: '1px solid rgba(91,46,255,0.2)' }}>
              {detail}
            </span>
          ))}
        </motion.div>

        {/* Price + CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="p-8 rounded-2xl flex flex-col items-center gap-5"
          style={{ background: '#0A0518', border: '1px solid rgba(91,46,255,0.3)' }}
        >
          <p className="text-sm uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>Registration Fee</p>
          <p className="text-6xl font-black" style={{ color: '#A78BFA' }}>{data.price}</p>
          <button
            onClick={onRegister}
            className="px-10 py-4 rounded-xl text-base font-bold text-white transition-all"
            style={{ background: '#5B2EFF', boxShadow: '0 0 32px rgba(91,46,255,0.5)', width: '100%', maxWidth: '320px' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 48px rgba(91,46,255,0.7)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(91,46,255,0.5)' }}
          >
            {data.cta}
          </button>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{data.supporting_line}</p>
        </motion.div>
      </div>
    </Section>
  )
}
