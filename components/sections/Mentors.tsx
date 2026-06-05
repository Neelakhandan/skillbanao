'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users2, MessageSquare } from 'lucide-react'
import { staggerContainer, scaleIn, fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { MentorsData } from '@/lib/types'

interface MentorsProps {
  data: MentorsData
}

const MENTOR_COLORS = [
  'rgba(91,46,255,0.18)',
  'rgba(255,214,68,0.12)',
  'rgba(255,107,53,0.12)',
  'rgba(34,197,94,0.12)',
  'rgba(59,130,246,0.12)',
  'rgba(168,85,247,0.12)',
  'rgba(236,72,153,0.12)',
  'rgba(20,184,166,0.12)',
]

const MENTOR_TEXT_COLORS = [
  'var(--color-primary-dark)',
  '#92640a',
  'var(--color-accent-2)',
  'var(--color-success)',
  '#1d4ed8',
  '#6d28d9',
  '#be185d',
  '#0f766e',
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export function Mentors({ data }: MentorsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="mentors" style={{ background: 'var(--color-bg-dark)' }}>
      <SectionHeading
        badge="1-on-1 Guidance"
        title={data.title}
        highlight="Mentorship"
        subtitle={data.subtitle}
      />

      {/* Callout banner */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex items-start gap-4 p-6 rounded-2xl border mb-10"
        style={{
          background: 'rgba(91,46,255,0.07)',
          borderColor: 'rgba(91,46,255,0.25)',
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: 'rgba(91,46,255,0.15)', color: 'var(--color-primary-dark)' }}
        >
          <MessageSquare size={18} />
        </div>
        <div>
          <p className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Personalised Mentor Matching
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {data.callout}
          </p>
        </div>
      </motion.div>

      {/* Mentor grid */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
      >
        {data.items.map((mentor, i) => (
          <motion.div
            key={mentor.name}
            variants={scaleIn}
            className="group flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 cursor-default"
            style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(91,46,255,0.35)'
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 12px 40px rgba(91,46,255,0.12)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--color-border)'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-3"
              style={{
                background: MENTOR_COLORS[i % MENTOR_COLORS.length],
                color: MENTOR_TEXT_COLORS[i % MENTOR_TEXT_COLORS.length],
                fontFamily: 'var(--font-heading)',
              }}
            >
              {initials(mentor.name)}
            </div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
              {mentor.name}
            </p>
            <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
              {mentor.role}
            </p>
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: 'rgba(91,46,255,0.1)',
                color: 'var(--color-primary-dark)',
              }}
            >
              {mentor.company}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats strip */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-wrap items-center justify-center gap-8 p-6 rounded-2xl border"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center gap-3">
          <Users2 size={20} style={{ color: 'var(--color-primary-dark)' }} />
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
              {data.mentor_count}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Industry Mentors</p>
          </div>
        </div>
        <div
          className="w-px h-10 hidden sm:block"
          style={{ background: 'var(--color-border)' }}
        />
        <div className="flex items-center gap-3">
          <MessageSquare size={20} style={{ color: 'var(--color-accent)' }} />
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
              {data.session_count}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Guaranteed Sessions</p>
          </div>
        </div>
        <div
          className="w-px h-10 hidden sm:block"
          style={{ background: 'var(--color-border)' }}
        />
        <p className="text-sm max-w-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
          Matched based on your background, goals, and career stage — not random assignment.
        </p>
      </motion.div>
    </Section>
  )
}
