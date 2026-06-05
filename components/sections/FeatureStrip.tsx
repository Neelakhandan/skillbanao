'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  GraduationCap, Radio, Bot,
  ListChecks, FolderOpen, ScanEye,
} from 'lucide-react'
import { staggerContainer, scaleIn } from '@/lib/motion'
import type { FeatureStripData } from '@/lib/types'

const ICON_MAP: Record<string, React.ElementType> = {
  'graduation-cap': GraduationCap,
  'radio':          Radio,
  'bot':            Bot,
  'list-checks':    ListChecks,
  'folder-open':    FolderOpen,
  'scan-eye':       ScanEye,
}

const STYLE_MAP: Record<string, { bg: string; color: string }> = {
  'graduation-cap': { bg: 'rgba(91,46,255,0.08)',  color: 'var(--color-primary)' },
  'radio':          { bg: 'rgba(255,194,0,0.12)',  color: '#7A5C00' },
  'bot':            { bg: 'rgba(91,46,255,0.08)',  color: 'var(--color-primary)' },
  'list-checks':    { bg: 'rgba(21,128,61,0.08)',  color: 'var(--color-success)' },
  'folder-open':    { bg: 'rgba(224,90,34,0.08)',  color: 'var(--color-accent-2)' },
  'scan-eye':       { bg: 'rgba(255,194,0,0.12)',  color: '#7A5C00' },
}

interface FeatureStripProps {
  data: FeatureStripData
}

export function FeatureStrip({ data }: FeatureStripProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      className="relative py-14 border-y"
      style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
        >
          {data.features.map((f) => {
            const Icon = ICON_MAP[f.icon] ?? GraduationCap
            const style = STYLE_MAP[f.icon] ?? { bg: 'rgba(91,46,255,0.08)', color: 'var(--color-primary)' }
            return (
              <motion.div
                key={f.label}
                variants={scaleIn}
                className="flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: style.bg }}
                >
                  <Icon size={24} style={{ color: style.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {f.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
