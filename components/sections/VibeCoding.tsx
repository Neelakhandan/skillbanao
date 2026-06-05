'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, Check } from 'lucide-react'
import { fadeUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/motion'

const DENIALS = [
  { old: 'No developer required.', new: 'Just you and your design.' },
  { old: 'No "please imagine the interaction."', new: 'Show them the real thing.' },
  { old: 'A real, live prototype.', new: 'In your portfolio. In your hands.' },
]

export function VibeCoding() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="vibe-coding"
      className="relative w-full py-20 md:py-32 overflow-hidden"
      style={{ background: '#04050A' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07]" style={{ background: '#5B2EFF' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.06]" style={{ background: '#FFC200' }} />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center"
        >

          {/* ── LEFT: copy ── */}
          <div className="flex flex-col gap-8">

            {/* Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] uppercase"
                style={{ background: 'rgba(255,194,0,0.12)', color: '#FFC200', border: '1px solid rgba(255,194,0,0.25)' }}
              >
                <span>★</span> Vibe Coding <span>★</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight"
                style={{ color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}
              >
                Build functional prototypes{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #FFC200, #FFD84D)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  without writing code from scratch.
                </span>
              </h2>
            </motion.div>

            {/* Denial cards */}
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              {DENIALS.map((item) => (
                <div
                  key={item.old}
                  className="flex items-start gap-4 px-5 py-4 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(91,46,255,0.2)' }}
                  >
                    <Check size={11} style={{ color: '#A78BFA' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#FFFFFF' }}>{item.old}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.new}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: terminal card ── */}
          <motion.div variants={slideInRight} className="flex flex-col gap-5">

            {/* Terminal window */}
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0D0F1A' }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ background: '#131520', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
                </div>
                <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>claude-code ~ portfolio-project</span>
                <Terminal size={13} style={{ color: 'rgba(255,255,255,0.2)' }} />
              </div>

              {/* Terminal body */}
              <div className="px-5 py-5 font-mono text-sm flex flex-col gap-2">
                <div>
                  <span style={{ color: '#4ade80' }}>→ </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Turn my Figma designs into a live product</span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.3)' }} className="text-xs pl-4">Analysing screens… building components…</div>
                <div style={{ color: 'rgba(255,255,255,0.3)' }} className="text-xs pl-4">Setting up routing… wiring interactions…</div>
                <div className="flex items-center gap-2 pt-1">
                  <span style={{ color: '#FFC200' }}>✓ </span>
                  <span style={{ color: 'rgba(255,255,255,0.85)' }}>prototype ready —</span>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: 'rgba(91,46,255,0.25)', color: '#A78BFA' }}
                  >
                    localhost:3000
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#4ade80' }}>→ </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Deploy with an IDE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FFC200' }}>✓ </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: 'rgba(255,194,0,0.15)', color: '#FFC200' }}
                  >
                    Live product
                  </span>
                </div>
                <div className="flex items-center gap-1 pt-2">
                  <span className="inline-block w-2 h-4 rounded-sm animate-pulse" style={{ background: '#5B2EFF' }} />
                </div>
              </div>
            </div>

            {/* Closing statement */}
            <div
              className="rounded-lg px-6 py-5 flex flex-col gap-3"
              style={{ background: 'linear-gradient(135deg, rgba(91,46,255,0.1), rgba(255,194,0,0.06))', border: '1px solid rgba(91,46,255,0.2)' }}
            >
              <p
                className="text-sm font-semibold leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                This is{' '}
                <span
                  style={{
                    background: 'linear-gradient(90deg, #A78BFA, #FFC200)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 700,
                  }}
                >
                  not a coding class.
                </span>
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                This is a designer learning to{' '}
                <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>build what they designed.</span>
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
