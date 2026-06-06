'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarMentorsData } from '@/lib/webinar-types'

interface Props { data: WebinarMentorsData }

export function WebinarMentors({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: 'var(--color-bg-card)' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} subtitle={data.body} />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
      >
        {data.mentors.map((mentor) => (
          <motion.div
            key={mentor.name}
            variants={fadeUp}
            className="flex flex-col items-center gap-3 p-5 rounded-xl text-center"
            style={{ background: '#fff', border: '1px solid rgba(91,46,255,0.08)' }}
          >
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-14 h-14 rounded-full object-cover"
              style={{ border: '1.5px solid rgba(91,46,255,0.2)' }}
            />
            <div>
              <p className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{mentor.name}</p>
              <p className="text-xs mt-0.5 leading-snug" style={{ color: '#5B2EFF' }}>{mentor.role}</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{mentor.experience}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
