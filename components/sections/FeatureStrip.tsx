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

const CHIP_BG = 'rgba(255,255,255,0.5)'

const COLOR_MAP: Record<string, string> = {
  'graduation-cap': '#7A5C00',
  'radio':          '#92400E',
  'bot':            '#713F12',
  'list-checks':    '#A16207',
  'folder-open':    '#854D0E',
  'scan-eye':       '#B45309',
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
      style={{ background: 'linear-gradient(180deg, #FFD84D 0%, #FFC200 55%, #FFAA00 100%)', borderColor: 'rgba(122,92,0,0.2)' }}
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
            const color = COLOR_MAP[f.icon] ?? '#7A5C00'
            return (
              <motion.div
                key={f.label}
                variants={scaleIn}
                className="flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: CHIP_BG }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {f.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(15,10,46,0.65)' }}>
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
