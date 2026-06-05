'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { WhySkillBanaoData } from '@/lib/types'

interface WhySkillBanaoProps {
  data: WhySkillBanaoData
}

const GREEN = '#059669'

function renderBody(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: GREEN, fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function WhySkillBanao({ data }: WhySkillBanaoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="why-skill-banao" style={{ background: '#ECFDF5' } as React.CSSProperties}>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left — text */}
        <motion.div variants={fadeUp} className="flex flex-col gap-6">
          {/* Badge */}
          <span
            className="self-start inline-block text-xs font-bold px-3 py-1 rounded-full tracking-widest uppercase"
            style={{
              background: 'rgba(5,150,105,0.12)',
              color: GREEN,
            }}
          >
            {data.badge}
          </span>

          <h2
            className="text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
          >
            {data.heading}
          </h2>

          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {renderBody(data.body)}
          </p>

          {/* Decorative divider */}
          <div
            className="w-16 h-1 rounded-full"
            style={{ background: GREEN }}
          />
        </motion.div>

        {/* Right — card */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-xl p-8 flex flex-col gap-7 overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(5,150,105,0.15)',
            boxShadow: '0 8px 40px rgba(5,150,105,0.10)',
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-15"
            style={{ background: GREEN }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl opacity-10"
            style={{ background: '#FFC200' }}
          />

          {/* Quote */}
          <div className="relative z-10">
            <span
              className="block text-6xl font-bold leading-none mb-2"
              style={{ color: GREEN, fontFamily: 'Georgia, serif', opacity: 0.35 }}
            >
              "
            </span>
            <p
              className="text-lg font-semibold leading-snug"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {data.quote}
            </p>
          </div>

          {/* Stats row */}
          <div
            className="relative z-10 grid grid-cols-3 gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(5,150,105,0.12)' }}
          >
            {data.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="text-2xl font-bold"
                  style={{ color: GREEN, fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs font-medium leading-tight" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tag pills */}
          <div className="relative z-10 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(5,150,105,0.08)',
                  color: GREEN,
                  border: '1px solid rgba(5,150,105,0.18)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}
