'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import type { StatsData } from '@/lib/types'

interface SocialProofProps {
  data: StatsData
}

const COMPANY_COLORS: Record<string, string> = {
  Google: '#4285F4',
  Microsoft: '#00A4EF',
  Flipkart: '#F74F00',
  Swiggy: '#FC8019',
  Zomato: '#CB202D',
  Razorpay: '#3395FF',
  PhonePe: '#5F259F',
  CRED: '#1A1A1A',
  Meesho: '#9B2D8E',
  Groww: '#00D09C',
}

export function SocialProof({ data }: SocialProofProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const companies = data.alumni_companies
  // Duplicate for seamless loop
  const doubled = [...companies, ...companies]

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden border-y"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <p
            className="text-sm font-medium uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Our Alumni Work at
          </p>
          <div className="flex items-center justify-center gap-3">
            <span
              className="text-4xl font-bold"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}
            >
              {data.enrollment_count}
            </span>
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {data.enrollment_label}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{
            background: 'linear-gradient(to right, var(--color-bg-card), transparent)',
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{
            background: 'linear-gradient(to left, var(--color-bg-card), transparent)',
          }}
        />

        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center gap-2.5 mx-4 px-6 py-3 rounded-full border whitespace-nowrap"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-bg-elevated)',
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: COMPANY_COLORS[company.name] ?? 'var(--color-primary)' }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
