'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Sparkles, Zap } from 'lucide-react'
import { fadeUp, staggerContainer, fadeIn } from '@/lib/motion'
import type { CurriculumData } from '@/lib/types'

interface AIAdvantageProps {
  data: CurriculumData['ai_section']
}

export function AIAdvantage({ data }: AIAdvantageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ai-advantage"
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ffc200, #ffaa00, #ffd84d, #ffc200)',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 8s ease infinite',
      }}
    >

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div
          ref={ref}
          className="relative rounded-xl overflow-hidden p-8 md:p-14"
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: '1px solid rgba(255,255,255,0.5)',
          }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Text */}
            <div>
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: 'rgba(0,0,0,0.12)', color: '#1A1000' }}
              >
                <Sparkles size={12} />
                {data.badge}
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="mb-4"
                style={{ color: '#0F0A00' }}
              >
                {data.title.replace(data.title_highlight, '').trim()}{' '}
                <span style={{ color: '#5B2EFF' }}>{data.title_highlight}</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-lg leading-relaxed mb-8"
                style={{ color: '#3A2800' }}
              >
                {data.subtitle}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 p-4 rounded-lg border"
                style={{ borderColor: 'rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.35)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(91,46,255,0.15)', color: '#5B2EFF' }}
                >
                  <Brain size={20} />
                </div>
                <p className="text-sm" style={{ color: '#3A2800' }}>
                  Every module includes an AI-powered workflow session where you apply the theory using real AI tools.
                </p>
              </motion.div>
            </div>

            {/* Right: Tools grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-3"
            >
              {data.tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={fadeIn}
                  className="group p-4 rounded-lg border transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.4)',
                    borderColor: 'rgba(255,255,255,0.6)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.75)'
                    el.style.borderColor = 'rgba(0,0,0,0.2)'
                    el.style.transform = 'translateY(-2px)'
                    el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(255,255,255,0.4)'
                    el.style.borderColor = 'rgba(255,255,255,0.6)'
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div className="flex items-start gap-2 mb-1.5">
                    <Zap size={14} className="mt-0.5 shrink-0" style={{ color: '#5B2EFF' }} />
                    <span className="text-sm font-semibold" style={{ color: '#0F0A00' }}>
                      {tool.name}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed pl-4" style={{ color: '#3A2800' }}>
                    {tool.use}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
