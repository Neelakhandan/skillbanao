'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { WebinarFellowshipBridgeData } from '@/lib/webinar-types'

interface Props { data: WebinarFellowshipBridgeData }

export function WebinarFellowshipBridge({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #3B0FCC 0%, #5B2EFF 50%, #7C3AED 100%)' }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col gap-6">
            <motion.span
              variants={fadeUp}
              className="inline-block w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              {data.label}
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-bold" style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              {data.heading}
            </motion.h2>
            {data.body.trim().split('\n\n').map((para, i) => (
              <motion.p key={i} variants={fadeUp} className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {para}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white text-center transition-all"
                style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              >
                {data.cta}
              </a>
              <a
                href="https://rzp.io/rzp/design-skillbanao"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all text-center"
                style={{ background: '#fff', color: '#5B2EFF' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F5F3FF' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#fff' }}
              >
                Register for Webinar →
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {data.supporting_line}
            </motion.p>
          </motion.div>

          {/* Right — depth items */}
          <motion.ul
            variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-2"
          >
            {data.depth_items.map((item, i) => (
              <motion.li
                key={i} variants={fadeUp}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#A78BFA' }} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
