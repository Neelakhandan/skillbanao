'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MentorModal } from '@/components/ui/MentorModal'
import { Building2, Globe } from 'lucide-react'
import Image from 'next/image'

function LinkedInIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
import { staggerContainer, scaleIn } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { InstructorsData, InstructorItem } from '@/lib/types'

interface InstructorsProps {
  data: InstructorsData
}

const AVATAR_COLORS = [
  { bg: 'linear-gradient(135deg, rgba(91,46,255,0.25), rgba(123,95,255,0.15))',  text: '#7B5FFF' },
  { bg: 'linear-gradient(135deg, rgba(255,194,0,0.25), rgba(255,194,0,0.1))',    text: '#7A5C00' },
  { bg: 'linear-gradient(135deg, rgba(224,90,34,0.25), rgba(224,90,34,0.1))',    text: 'var(--color-accent-2)' },
  { bg: 'linear-gradient(135deg, rgba(21,128,61,0.2), rgba(21,128,61,0.08))',    text: 'var(--color-success)' },
  { bg: 'linear-gradient(135deg, rgba(91,46,255,0.2), rgba(196,181,253,0.15))',  text: '#6d28d9' },
  { bg: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(37,99,235,0.08))',    text: '#1d4ed8' },
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

function InstructorCard({ instructor, index }: { instructor: InstructorItem; index: number }) {
  const palette = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <motion.div
      variants={scaleIn}
      className="group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-300"
      style={{ background: 'var(--color-bg-dark)', borderColor: 'var(--color-border)' }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(91,46,255,0.35)'
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow = '0 20px 60px rgba(91,46,255,0.1)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--color-border)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Photo area */}
      <div
        className="relative h-64 flex items-center justify-center overflow-hidden"
        style={{ background: instructor.avatar ? 'transparent' : palette.bg }}
      >
        {instructor.avatar ? (
          <Image
            src={instructor.avatar}
            alt={instructor.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-40" style={{ background: palette.text }} />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full blur-2xl opacity-20" style={{ background: palette.text }} />
            <div
              className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold ring-4 ring-white/20"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                color: palette.text,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {initials(instructor.name)}
            </div>
          </>
        )}

        <div
          className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-text-primary)', backdropFilter: 'blur(8px)' }}
        >
          <Building2 size={11} style={{ color: 'var(--color-primary)' }} />
          {instructor.company}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold mb-0.5" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
          {instructor.name}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
          {instructor.role}
        </p>
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
          {instructor.bio}
        </p>

        {/* Social links */}
        {(instructor.linkedin || instructor.website) && (
          <div className="flex items-center gap-2 mt-5 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            {instructor.linkedin && (
              <a
                href={instructor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(91,46,255,0.08)', color: 'var(--color-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(91,46,255,0.18)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(91,46,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                aria-label={`${instructor.name} on LinkedIn`}
              >
                <LinkedInIcon size={15} />
              </a>
            )}
            {instructor.website && (
              <a
                href={instructor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(91,46,255,0.08)', color: 'var(--color-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(91,46,255,0.18)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(91,46,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                aria-label={`${instructor.name}'s website`}
              >
                <Globe size={15} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Instructors({ data }: InstructorsProps) {
  const [mentorModalOpen, setMentorModalOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const topRow    = data.items.slice(0, 2)
  const bottomRow = data.items.slice(2)

  return (
    <Section id="instructors" style={{ background: 'var(--color-bg-card)' } as React.CSSProperties}>
      <SectionHeading
        badge="Who Teaches You"
        title={data.title}
        highlight={data.title_highlight}
        subtitle={data.subtitle}
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-col gap-6"
      >
        {/* Row 1 — 2 cards centred */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          {topRow.map((instructor, i) => (
            <InstructorCard key={instructor.name} instructor={instructor} index={i} />
          ))}
        </div>

        {/* Row 2 — 3 cards full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bottomRow.map((instructor, i) => (
            <InstructorCard key={instructor.name} instructor={instructor} index={i + 2} />
          ))}
        </div>
      </motion.div>

      {/* Apply as a Mentor banner */}
      <div
        className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-lg"
        style={{ background: '#0D0F14' }}
      >
        <div>
          <h3
            className="text-2xl font-bold mb-1"
            style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            Apply as a{' '}
            <span style={{ color: '#4ade80' }}>Mentor</span>
          </h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Share your expertise. Shape India's next generation of enterprise UX designers.
          </p>
        </div>
        <button
          onClick={() => setMentorModalOpen(true)}
          className="shrink-0 px-7 py-3 rounded-full font-semibold text-sm transition-opacity duration-200 hover:opacity-90 whitespace-nowrap cursor-pointer"
          style={{ background: '#22c55e', color: '#000', border: 'none' }}
        >
          Join as a mentor
        </button>
      </div>

      <MentorModal open={mentorModalOpen} onClose={() => setMentorModalOpen(false)} />
    </Section>
  )
}
