'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

// TODO: Replace with real LinkedIn URLs before launch
const mentorLinks = {
  anil: {
    linkedin: 'https://www.linkedin.com/in/neelakandan/',
    website: 'https://www.neelan.design',
  },
  rajesh: {
    linkedin: 'https://www.linkedin.com/in/rajesh-ux/',
  },
}

interface LeadMentor {
  name: string
  role: string
  experience: string
  credibility: string
  image: string
  has_website: boolean
}

interface LeadMentorsData {
  label: string
  heading: string
  body: string
  supporting_line: string
  cta: string
  mentors: LeadMentor[]
}

const DEFAULT_REGISTER_URL = 'https://rzp.io/rzp/sb-webinar-15aug'

interface Props {
  data: LeadMentorsData
  registerUrl?: string
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WebsiteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function getLinksByIndex(index: number) {
  if (index === 0) return { linkedin: mentorLinks.anil.linkedin, website: mentorLinks.anil.website }
  return { linkedin: mentorLinks.rajesh.linkedin, website: null }
}

export function WebinarLeadMentors({ data, registerUrl = DEFAULT_REGISTER_URL }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: '#fff' } as React.CSSProperties}>
      <SectionHeading badge={data.label} title={data.heading} />

      <div className="max-w-3xl mx-auto mb-10 flex flex-col gap-4 text-center">
        {data.body.trim().split('\n\n').map((para, i) => (
          <p key={i} className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{para}</p>
        ))}
        <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--color-text-primary)', borderLeft: '3px solid #5B2EFF', paddingLeft: '16px', textAlign: 'left' }}>
          {data.supporting_line}
        </p>
      </div>

      {/* Mentor cards */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      >
        {data.mentors.map((mentor, i) => {
          const links = getLinksByIndex(i)
          return (
            <motion.div
              key={mentor.name}
              variants={fadeUp}
              className="flex flex-col gap-5 p-7 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #0A0518 0%, #1A0F3C 100%)',
                border: '1px solid rgba(167,139,250,0.2)',
                boxShadow: '0 4px 32px rgba(91,46,255,0.08)',
              }}
            >
              {/* Photo + name row */}
              <div className="flex items-center gap-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-20 h-20 rounded-full object-cover shrink-0"
                  style={{ border: '2px solid rgba(167,139,250,0.4)' }}
                />
                <div>
                  <p className="text-xl font-bold" style={{ color: '#fff' }}>{mentor.name}</p>
                  <p className="text-sm mt-0.5 font-medium" style={{ color: '#A78BFA' }}>{mentor.role}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{mentor.experience}</p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

              {/* Credibility */}
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {mentor.credibility}
              </p>

              {/* Links */}
              <div className="flex items-center gap-4 mt-auto pt-2">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(167,139,250,0.1)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.2)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.1)' }}
                >
                  <LinkedInIcon /> View LinkedIn
                </a>
                {links.website && (
                  <a
                    href={links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(167,139,250,0.1)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.2)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.2)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(167,139,250,0.1)' }}
                  >
                    <WebsiteIcon /> Visit Website
                  </a>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex justify-center mt-10"
      >
        <a
          href={registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-4 rounded-xl text-base font-bold text-white transition-all duration-300"
          style={{ background: '#5B2EFF', boxShadow: '0 0 32px rgba(91,46,255,0.4)' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 48px rgba(91,46,255,0.6)' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(91,46,255,0.4)' }}
        >
          {data.cta}
        </a>
      </motion.div>
    </Section>
  )
}
