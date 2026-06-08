'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Wifi } from 'lucide-react'
import { fadeUp, slideInLeft, slideInRight } from '@/lib/motion'
import type { WebinarHeroData } from '@/lib/webinar-types'

interface Props {
  data: WebinarHeroData
  onRegister: () => void
}

export function WebinarHero({ data, onRegister }: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: '#0A0518', minHeight: '100vh', display: 'flex', alignItems: 'flex-start' }}
    >
      {/* Purple glow */}
      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(91,46,255,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-[42px] pb-8 md:pt-[46px] md:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <span
              className="inline-block w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: 'rgba(91,46,255,0.2)', color: '#A78BFA', border: '1px solid rgba(91,46,255,0.3)' }}
            >
              {data.eyebrow}
            </span>

            <h1
              className="font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#fff' }}
            >
              {data.headline}
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {data.subheadline}
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {data.subheadline_2}
            </p>

            {/* Trust line */}
            <p className="text-sm font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', borderLeft: '2px solid rgba(167,139,250,0.5)', paddingLeft: '12px' }}>
              {data.trust_line}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onRegister}
                className="px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-300"
                style={{ background: '#5B2EFF', boxShadow: '0 0 32px rgba(91,46,255,0.5)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 48px rgba(91,46,255,0.7)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(91,46,255,0.5)' }}
              >
                {data.cta_primary}
              </button>
              <a
                href="#demo-flow"
                className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 text-center"
                style={{ border: '1.5px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.5)'; e.currentTarget.style.color = '#A78BFA' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
              >
                {data.cta_secondary}
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Mentor photo + Event details ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-0"
          >
            {/* Combined mentor photo — transparent PNG blends with dark bg */}
            <div className="relative w-full flex justify-center">
              {/* Subtle glow behind mentors */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '90%', height: '60%',
                background: 'radial-gradient(ellipse at center bottom, rgba(91,46,255,0.35) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <img
                src="/images/webinar-lead-mentors.png"
                alt="Anil G and Rajesh Babu — Lead Mentors for the Masterclass"
                className="relative w-full object-contain"
                style={{ maxHeight: '560px' }}
              />
            </div>

            {/* Condensed event details — colourful live card */}
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(91,46,255,0.18) 0%, rgba(10,5,24,0.95) 60%, rgba(239,68,68,0.08) 100%)',
                border: '1px solid rgba(167,139,250,0.25)',
                backdropFilter: 'blur(12px)',
                marginTop: '-8px',
              }}
            >
              {/* Rainbow top strip */}
              <div style={{ height: '3px', background: 'linear-gradient(90deg, #5B2EFF 0%, #A78BFA 35%, #FFC200 65%, #ef4444 100%)' }} />

              <div className="grid grid-cols-3 p-0">

                {/* Date — gold */}
                <div className="flex items-start gap-2 px-4 py-3" style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(255,194,0,0.15)' }}>
                    <Calendar size={12} style={{ color: '#FFC200' }} />
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: '#FFC200', opacity: 0.85 }}>Date</span>
                    <span className="text-xs font-semibold leading-snug" style={{ color: '#fff' }}>{data.date}</span>
                  </div>
                </div>

                {/* Time — sky blue */}
                <div className="flex items-start gap-2 px-4 py-3" style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(56,189,248,0.15)' }}>
                    <Clock size={12} style={{ color: '#38bdf8' }} />
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: '#38bdf8', opacity: 0.85 }}>Time</span>
                    <span className="text-xs font-semibold leading-snug" style={{ color: '#fff' }}>{data.time}</span>
                  </div>
                </div>

                {/* Mode — red live */}
                <div className="flex items-start gap-2 px-4 py-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md" style={{ background: 'rgba(239,68,68,0.15)' }}>
                    <Wifi size={12} style={{ color: '#ef4444' }} />
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: '#ef4444', opacity: 0.9 }}>Mode</span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold leading-snug" style={{ color: '#fff' }}>
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#ef4444' }} />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#ef4444' }} />
                      </span>
                      {data.mode}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
