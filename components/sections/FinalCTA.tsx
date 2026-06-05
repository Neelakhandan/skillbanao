'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Users2, Clock, CheckCircle2 } from 'lucide-react'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/motion'
import type { HeroData } from '@/lib/types'

interface FinalCTAProps {
  data: Pick<HeroData, 'cta_primary' | 'start_date' | 'duration'>
}

const TRUST_SIGNALS = [
  '14-day money-back guarantee',
  'No upfront hidden fees',
  '1-year placement support',
  'Placement guarantee or full refund',
]

const URGENCY_STATS = [
  { icon: <Users2 size={16} />, value: '40', label: 'seats per cohort' },
  { icon: <Calendar size={16} />, value: 'August 2025', label: 'next cohort starts' },
  { icon: <Clock size={16} />, value: '< 48hrs', label: 'typical response time' },
]

export function FinalCTA({ data }: FinalCTAProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="apply"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36 px-4"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      {/* Gradient blobs */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{ background: 'var(--color-primary)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--color-accent)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--color-primary-dark)' }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border"
          style={{
            background: 'rgba(91,46,255,0.12)',
            borderColor: 'rgba(91,46,255,0.3)',
            color: 'var(--color-primary)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: 'var(--color-success)' }}
          />
          Enrolments Open · Limited Seats
        </motion.span>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          className="mb-6"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Ready to Build Your{' '}
          <span className="text-gradient-primary">Design Career?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Join 3,500+ designers who took the leap. Apply in 5 minutes — our team will reach out within 48 hours to schedule your orientation call.
        </motion.p>

        {/* Urgency stats */}
        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
        >
          {URGENCY_STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={scaleIn}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border"
              style={{
                background: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border)',
              }}
            >
              <span style={{ color: 'var(--color-primary)' }}>{s.icon}</span>
              <span>
                <strong style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>{s.value}</strong>
                <span className="ml-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://forms.skillbanao.in/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-10 py-5 rounded-full font-bold text-white text-lg transition-all duration-300"
            style={{
              background: 'var(--color-primary)',
              boxShadow: '0 0 48px rgba(91,46,255,0.5)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.background = 'var(--color-primary-light)'
              el.style.boxShadow = '0 0 72px rgba(91,46,255,0.7)'
              el.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.background = 'var(--color-primary)'
              el.style.boxShadow = '0 0 48px rgba(91,46,255,0.5)'
              el.style.transform = 'scale(1)'
            }}
          >
            Apply Now — It&apos;s Free
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-5 rounded-full font-semibold text-base border transition-all duration-300"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = '#25D366'
              el.style.color = '#25D366'
              el.style.background = 'rgba(37,211,102,0.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--color-border)'
              el.style.color = 'var(--color-text-primary)'
              el.style.background = 'transparent'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Talk to Us First
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {TRUST_SIGNALS.map((signal) => (
            <span
              key={signal}
              className="flex items-center gap-1.5 text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
              {signal}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
