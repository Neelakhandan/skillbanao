'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { StatsData } from '@/lib/types'

interface CohortStatsProps {
  data: StatsData
}

function useCountUp(end: number, duration = 1800, trigger: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)
  useEffect(() => {
    if (!trigger) return
    const startTime = Date.now()
    const animate = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Number((eased * end).toFixed(end % 1 !== 0 ? 1 : 0)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
      else setValue(end)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [end, duration, trigger])
  return value
}

function RingChart({ inView }: { inView: boolean }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setProgress(1), 200)
    return () => clearTimeout(timer)
  }, [inView])

  return (
    <div className="relative flex items-center justify-center mx-auto" style={{ width: 220, height: 220 }}>
      {/* Outer ring — conic gradient */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-1000"
        style={{
          background: progress
            ? 'conic-gradient(var(--color-primary) 0% 20%, var(--color-accent) 20% 100%)'
            : 'conic-gradient(var(--color-border) 0% 100%)',
          transition: 'background 1.2s ease',
        }}
      />
      {/* Inner cutout */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center"
        style={{
          inset: 28,
          background: 'var(--color-bg-dark)',
        }}
      >
        <span
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          80%
        </span>
        <span className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
          Working Pros
        </span>
      </div>
    </div>
  )
}

function StatItem({ stat, inView }: { stat: StatsData['cohort_stats'][number]; inView: boolean }) {
  const count = useCountUp(stat.value, 1600, inView)
  return (
    <motion.div
      variants={scaleIn}
      className="text-center p-6 rounded-2xl border"
      style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
    >
      <p
        className="text-3xl font-bold mb-1"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}
      >
        {stat.prefix ?? ''}{typeof count === 'number' && count % 1 !== 0 ? count.toFixed(1) : count}{stat.suffix ?? ''}
      </p>
      <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
        {stat.label}
      </p>
      {stat.description && (
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {stat.description}
        </p>
      )}
    </motion.div>
  )
}

export function CohortStats({ data }: CohortStatsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="cohort-stats" style={{ background: 'var(--color-bg-card)' }}>
      <SectionHeading
        badge="Who Joins"
        title="Our Cohort Mix"
        highlight="Cohort"
        subtitle="A diverse community of learners — from freshers to senior professionals making bold career moves."
      />

      <div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left: ring chart + legend */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-8"
        >
          <RingChart inView={inView} />

          {/* Legend */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: 'var(--color-primary)' }}
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>20% Freshers</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>First design job</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>80% Working Pros</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Career transition</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: 4 stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4"
        >
          {data.cohort_stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} inView={inView} />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
