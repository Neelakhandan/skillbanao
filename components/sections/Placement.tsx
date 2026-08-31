'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Briefcase, TrendingUp, Award, Mail,
  Calendar, Users2, ArrowRight,
} from 'lucide-react'
import { staggerContainer, scaleIn } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { PlacementData } from '@/lib/types'

interface PlacementProps {
  data: PlacementData
}

const BLUE = '#2563EB'

const iconMap: Record<string, React.ReactNode> = {
  briefcase:    <Briefcase size={20} />,
  users:        <Users2 size={20} />,
  linkedin:     <TrendingUp size={20} />,
  mail:         <Mail size={20} />,
  calendar:     <Calendar size={20} />,
  'trending-up': <TrendingUp size={20} />,
}


export function Placement({ data }: PlacementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="placement" style={{ background: '#EFF6FF' } as React.CSSProperties}>
      <SectionHeading
        badge="Career Support"
        title={data.title}
        highlight={data.title_highlight}
        subtitle={data.subtitle}
      />

      {/* Key stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-3 gap-4 mb-12"
      >
        {[
          { value: data.placement_rate, label: 'Placement Rate' },
          { value: data.hiring_partners, label: 'Years Industry Experience' },
          { value: data.support_duration, label: 'Support After Graduation' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={scaleIn}
            className="text-center py-6 px-4 rounded-lg border"
            style={{ background: 'rgba(37,99,235,0.06)', borderColor: 'rgba(37,99,235,0.15)' }}
          >
            <p
              className="text-3xl md:text-4xl font-bold mb-1"
              style={{ color: BLUE, fontFamily: 'var(--font-heading)' }}
            >
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
      >
        {data.features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={scaleIn}
            className="flex gap-4 p-5 rounded-lg border transition-all duration-300 cursor-default"
            style={{ background: '#FFFFFF', borderColor: 'rgba(37,99,235,0.15)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(37,99,235,0.35)'
              el.style.background = 'rgba(37,99,235,0.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(37,99,235,0.15)'
              el.style.background = '#FFFFFF'
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(37,99,235,0.12)', color: BLUE }}
            >
              {iconMap[feature.icon] ?? <Award size={20} />}
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {feature.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </Section>
  )
}
