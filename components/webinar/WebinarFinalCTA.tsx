'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import type { WebinarFinalCtaData } from '@/lib/webinar-types'

const DEFAULT_REGISTER_URL = 'https://pages.razorpay.com/webinar-02'

interface Props { data: WebinarFinalCtaData; registerUrl?: string }

export function WebinarFinalCTA({ data, registerUrl = DEFAULT_REGISTER_URL }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative w-full py-24 md:py-36 overflow-hidden" style={{ background: '#0A0518' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '500px', background: 'radial-gradient(ellipse, rgba(91,46,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div ref={ref} className="text-center flex flex-col items-center gap-8">
          <motion.h2
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.2 }}
          >
            {data.heading}
          </motion.h2>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            {data.body}
          </motion.p>

          <motion.a
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-xl text-base font-bold text-white transition-all"
            style={{ background: '#5B2EFF', boxShadow: '0 0 40px rgba(91,46,255,0.6)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 60px rgba(91,46,255,0.8)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(91,46,255,0.6)' }}
          >
            {data.cta}
          </motion.a>

          <motion.p
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="text-sm"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {data.event_reminder}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
