'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { HowItWorksData } from '@/lib/types'

interface HowItWorksProps {
  data: HowItWorksData
}

export function HowItWorks({ data }: HowItWorksProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="how-it-works" style={{ background: 'var(--color-bg-dark)' } as React.CSSProperties}>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-center font-black uppercase tracking-tight mb-16"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '-0.01em',
        }}
      >
        {data.title}
      </motion.h2>

      {/* Steps */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 mb-12"
      >
        {data.steps.map((step, i) => {
          const isLast = i === data.steps.length - 1
          return (
            <motion.div key={step.number} variants={fadeUp} className="flex flex-col">
              {/* Step label */}
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Step {step.number}
              </p>

              {/* Circle + connecting line */}
              <div className="flex items-center mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'var(--color-text-primary)' }}
                >
                  <Check size={18} color="#fff" strokeWidth={3} />
                </div>
                {!isLast && (
                  <div
                    className="flex-1 h-px ml-3"
                    style={{ background: 'var(--color-border)' }}
                  />
                )}
              </div>

              {/* Text */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {step.text}
              </p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom action bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 rounded-xl border"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center shrink-0"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            <Zap size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {data.tagline}
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {data.tagline_sub}
            </p>
          </div>
        </div>

        <a
          href={data.cta_href}
          className="shrink-0 px-6 py-3 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90 whitespace-nowrap"
          style={{ background: 'var(--color-text-primary)' }}
        >
          {data.cta_label}
        </a>
      </motion.div>
    </Section>
  )
}
