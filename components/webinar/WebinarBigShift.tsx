'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { WebinarBigShiftData } from '@/lib/webinar-types'

interface Props { data: WebinarBigShiftData }

export function WebinarBigShift({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden" style={{ background: '#0A0518' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(91,46,255,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div ref={ref} className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <motion.span
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="inline-block w-fit mx-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ background: 'rgba(167,139,250,0.15)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.25)' }}
          >
            {data.label}
          </motion.span>

          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            {data.heading}
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            {data.body}
          </motion.p>

          <motion.ul
            variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mt-2"
          >
            {data.skills.map((skill, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#A78BFA' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{skill}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.blockquote
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="mt-4 px-8 py-6 rounded-xl text-center"
            style={{ background: 'rgba(91,46,255,0.12)', border: '1px solid rgba(91,46,255,0.25)' }}
          >
            <p className="text-xl font-semibold italic" style={{ color: '#A78BFA' }}>
              &ldquo;{data.pull_quote}&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  )
}
