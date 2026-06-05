'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion'
import { CurriculumModal } from '@/components/ui/CurriculumModal'
import { CallbackModal } from '@/components/ui/CallbackModal'
import type { HeroData, StatsData } from '@/lib/types'

interface HeroProps {
  data: HeroData
  stats: StatsData['hero_stats']
}

function useCountUp(end: number, duration = 2000, trigger: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!trigger) return
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setValue(end)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [end, duration, trigger])

  return value
}

function StatCard({
  stat,
  inView,
}: {
  stat: StatsData['hero_stats'][number]
  inView: boolean
}) {
  const count = useCountUp(stat.value, 1800, inView)

  return (
    <div className="flex flex-col">
      <span
        className="text-3xl md:text-4xl font-bold tabular-nums leading-none"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
      >
        {stat.prefix ?? ''}{count.toLocaleString()}{stat.suffix ?? ''}
      </span>
      <span className="mt-1.5 text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
        {stat.label}
      </span>
    </div>
  )
}

export function Hero({ data, stats }: HeroProps) {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })
  const [modalOpen, setModalOpen]           = useState(false)
  const [callbackOpen, setCallbackOpen]     = useState(false)

  return (
    <section
      className="section-hero relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-20 px-4"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      {/* Large purple glow — top-left, slow breathe */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-40 w-[900px] h-[700px] rounded-full blur-[120px]"
        style={{ background: 'var(--color-primary)' }}
        animate={{ opacity: [0.22, 0.38, 0.16, 0.22], scale: [1, 1.12, 0.92, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Gold accent glow — bottom-right, opposite phase */}
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 w-[520px] h-[520px] rounded-full blur-[100px]"
        style={{ background: 'var(--color-accent)' }}
        animate={{ opacity: [0.12, 0.24, 0.08, 0.12], scale: [1, 0.86, 1.14, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Secondary purple accent — mid-right */}
      <motion.div
        className="pointer-events-none absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full blur-[90px]"
        style={{ background: 'var(--color-primary-dark)' }}
        animate={{ opacity: [0.08, 0.18, 0.06, 0.08], scale: [1, 1.08, 0.94, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
      {/* Subtle grid overlay — very slow shimmer */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        animate={{ opacity: [0.025, 0.045, 0.025] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className=""
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-1.5 mb-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'var(--color-accent)', color: '#000' }}
            >
              {data.badge}
            </span>
          </motion.div>

          {/* Headline — very large, left-aligned */}
          <motion.h1
            variants={fadeUp}
            className="mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {data.headline}{' '}
            <span className="text-gradient-primary">{data.headline_highlight}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {data.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 mb-20"
          >
            <button
              onClick={() => setCallbackOpen(true)}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
              style={{
                background: 'var(--color-accent)',
                color: '#000',
                boxShadow: '0 0 40px rgba(255,194,0,0.4)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.background = '#e8b420'
                el.style.boxShadow = '0 0 60px rgba(255,194,0,0.6)'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.background = 'var(--color-accent)'
                el.style.boxShadow = '0 0 40px rgba(255,194,0,0.4)'
                el.style.transform = 'translateY(0)'
              }}
            >
              {data.cta_primary.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base border transition-all duration-300"
              style={{
                borderColor: 'rgba(240,238,255,0.2)',
                color: 'var(--color-text-primary)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'var(--color-primary)'
                el.style.color = '#A78BFA'
                el.style.background = 'rgba(91,46,255,0.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.borderColor = 'rgba(240,238,255,0.2)'
                el.style.color = 'var(--color-text-primary)'
                el.style.background = 'transparent'
              }}
            >
              {data.cta_secondary.label}
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Stats — horizontal divider row */}
          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="pt-8 border-t"
            style={{ borderColor: 'rgba(91,46,255,0.2)' }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} inView={statsInView} />
              ))}
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <span
                className="flex items-center gap-1.5 text-base font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-success)' }} />
                {data.duration}
              </span>
              <span
                className="flex items-center gap-1.5 text-base font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
                {data.start_date}
              </span>
              <span
                className="flex items-center gap-1.5 text-base font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-primary-light)' }} />
                {data.live_classes}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — mentor image */}
        <div className="hidden lg:flex justify-start items-start">
          <img
            src="/images/hero-mentors.png"
            alt="Skill Banao mentors"
            className="drop-shadow-2xl"
          />
        </div>

        </div>
      </div>

      <CurriculumModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </section>
  )
}
