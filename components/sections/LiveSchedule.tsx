'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Moon, Sun, Calendar, Clock, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { HeroData } from '@/lib/types'

interface LiveScheduleProps {
  data: Pick<HeroData, 'schedule' | 'duration' | 'start_date' | 'cta_primary'>
}

const scheduleIcons: Record<string, React.ReactNode> = {
  moon: <Moon size={28} />,
  sun: <Sun size={28} />,
}

const cardAccents = [
  { border: 'rgba(91,46,255,0.35)', glow: 'rgba(91,46,255,0.12)', icon: 'rgba(91,46,255,0.15)', iconColor: 'var(--color-primary-light)' },
  { border: 'rgba(255,214,68,0.35)', glow: 'rgba(255,214,68,0.08)', icon: 'rgba(255,214,68,0.12)', iconColor: 'var(--color-accent)' },
]

export function LiveSchedule({ data }: LiveScheduleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="schedule" style={{ background: 'var(--color-bg-dark)' }}>
      <SectionHeading
        badge="Flexible Batches"
        title="Pick Your Schedule"
        highlight="Schedule"
        subtitle="Two live batch options — designed around working professionals and full-time learners."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
      >
        {data.schedule.map((batch, i) => {
          const accent = cardAccents[i % cardAccents.length]
          return (
            <motion.div
              key={batch.type}
              variants={scaleIn}
              className="relative p-8 rounded-3xl border overflow-hidden"
              style={{
                background: 'var(--color-bg-card)',
                borderColor: accent.border,
                boxShadow: `0 0 40px ${accent.glow}`,
              }}
            >
              {/* Background blob */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: accent.iconColor }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: accent.icon, color: accent.iconColor }}
                >
                  {scheduleIcons[batch.icon] ?? <Calendar size={28} />}
                </div>

                {/* Badge */}
                <span
                  className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ background: accent.icon, color: accent.iconColor, border: `1px solid ${accent.border}` }}
                >
                  {batch.type}
                </span>

                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {batch.days}
                </h3>

                <div className="flex items-center gap-2">
                  <Clock size={16} style={{ color: 'var(--color-text-muted)' }} />
                  <span className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                    {batch.time}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom meta row */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-2.5">
            <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Starts </span>
              {data.start_date}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock size={18} style={{ color: 'var(--color-accent)' }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{data.duration} </span>
              intensive program
            </span>
          </div>
        </div>
        <a
          href={data.cta_primary.href}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all duration-300 whitespace-nowrap"
          style={{ background: 'var(--color-primary)', boxShadow: '0 0 24px rgba(91,46,255,0.4)' }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--color-primary-light)'
            el.style.boxShadow = '0 0 36px rgba(91,46,255,0.6)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--color-primary)'
            el.style.boxShadow = '0 0 24px rgba(91,46,255,0.4)'
          }}
        >
          Reserve Your Seat <ArrowRight size={14} />
        </a>
      </motion.div>
    </Section>
  )
}
