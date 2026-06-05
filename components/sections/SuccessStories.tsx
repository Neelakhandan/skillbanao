'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { fadeUp } from '@/lib/motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TestimonialsData } from '@/lib/types'

interface SuccessStoriesProps {
  data: TestimonialsData
}

const AVATAR_PALETTES = [
  { from: '#7C3AED', to: '#4F46E5' },
  { from: '#0EA5E9', to: '#2563EB' },
  { from: '#F59E0B', to: '#EF4444' },
  { from: '#10B981', to: '#059669' },
  { from: '#EC4899', to: '#8B5CF6' },
  { from: '#F97316', to: '#EF4444' },
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

export function SuccessStories({ data }: SuccessStoriesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [current, setCurrent] = useState(0)
  const items = data.items
  const story = items[current]
  const palette = AVATAR_PALETTES[current % AVATAR_PALETTES.length]

  const prev = () => setCurrent((i) => (i - 1 + items.length) % items.length)
  const next = () => setCurrent((i) => (i + 1) % items.length)

  return (
    <section
      id="success-stories"
      className="section-dark relative w-full py-20 md:py-32 overflow-hidden"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-15"
        style={{ background: 'var(--color-primary)' }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-10"
        style={{ background: 'var(--color-accent)' }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10" ref={ref}>
        <SectionHeading
          badge="Alumni Stories"
          title={data.title}
          highlight={data.title_highlight}
          subtitle={data.subtitle}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl p-8 md:p-12 border"
              style={{
                background: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
              }}
            >
              {/* Quote icon + stars */}
              <div className="flex items-start justify-between mb-6">
                <Quote
                  size={48}
                  className="opacity-30"
                  style={{ color: 'var(--color-primary)' }}
                />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="var(--color-accent)" style={{ color: 'var(--color-accent)' }} />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <p
                className="text-xl md:text-2xl leading-relaxed mb-10"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 500,
                }}
              >
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar — real photo or gradient initials fallback */}
                {story.avatar ? (
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-24 h-24 rounded-lg object-cover object-top shrink-0"
                    style={{ boxShadow: `0 8px 32px ${palette.from}44` }}
                  />
                ) : (
                  <div
                    className="w-24 h-24 rounded-lg flex items-center justify-center text-3xl font-bold text-white shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
                      fontFamily: 'var(--font-heading)',
                      boxShadow: `0 8px 32px ${palette.from}55`,
                    }}
                  >
                    {initials(story.name)}
                  </div>
                )}
                <div>
                  <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {story.name}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {story.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background: i === current ? 'var(--color-primary)' : 'rgba(91,46,255,0.25)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-3">
              {[{ fn: prev, Icon: ChevronLeft }, { fn: next, Icon: ChevronRight }].map(({ fn, Icon }, idx) => (
                <button
                  key={idx}
                  onClick={fn}
                  className="w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--color-primary)'
                    el.style.color = '#A78BFA'
                    el.style.background = 'rgba(91,46,255,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--color-border)'
                    el.style.color = 'var(--color-text-secondary)'
                    el.style.background = 'transparent'
                  }}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
