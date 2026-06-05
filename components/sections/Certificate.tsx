'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BadgeCheck, Share2, QrCode, Shield } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function Certificate() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const benefits = [
    {
      icon: <BadgeCheck size={20} />,
      title: 'Verifiable Online',
      description: 'Every certificate has a unique ID that hiring managers can verify at verify.skillbanao.in.',
    },
    {
      icon: <Share2 size={20} />,
      title: 'LinkedIn Ready',
      description: 'Add directly to your LinkedIn profile with one click. Verified badge appears on your profile.',
    },
    {
      icon: <QrCode size={20} />,
      title: 'QR Code Linked',
      description: 'Physical and digital copies include a QR code linking to your verified credential.',
    },
    {
      icon: <Shield size={20} />,
      title: 'Industry Recognised',
      description: 'Accepted by 200+ hiring partners. The certificate signals job-readiness to recruiters.',
    },
  ]

  return (
    <Section id="certificate" style={{ background: 'var(--color-bg-card)' }}>
      <SectionHeading
        badge="Credential"
        title="Your Certificate of Completion"
        highlight="Certificate"
        subtitle="Graduate with a verifiable credential that hiring managers respect — not just a PDF."
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Certificate mockup */}
        <motion.div variants={scaleIn} className="relative">
          {/* Glow behind the certificate */}
          <div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-20 -z-10 scale-95"
            style={{ background: 'var(--color-primary)' }}
          />
          <div
            className="relative rounded-3xl p-8 md:p-10 border"
            style={{
              background: 'linear-gradient(135deg, #FDFCFF 0%, #F5F2FF 60%, #EDE8FF 100%)',
              borderColor: 'rgba(91,46,255,0.25)',
              boxShadow: '0 8px 48px rgba(91,46,255,0.1), inset 0 0 40px rgba(91,46,255,0.02)',
            }}
          >
            {/* Top decoration line */}
            <div
              className="h-0.5 w-full rounded-full mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(91,46,255,0.8), var(--color-accent), rgba(91,46,255,0.8), transparent)' }}
            />

            {/* Issuer */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'var(--color-primary)' }}
                >
                  SB
                </div>
                <span
                  className="text-lg font-bold"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  Skill Banao
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>
                Certificate of Completion
              </p>
            </div>

            {/* Body */}
            <div className="text-center mb-8">
              <p className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>
                This is to certify that
              </p>
              <div
                className="py-3 px-6 rounded-xl border mb-5 mx-auto max-w-xs"
                style={{ borderColor: 'rgba(255,194,0,0.35)', background: 'rgba(255,194,0,0.06)' }}
              >
                <p
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}
                >
                  Your Name Here
                </p>
              </div>
              <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                has successfully completed the
              </p>
              <p
                className="text-lg font-semibold mb-1"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                UI/UX Design Fellowship
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                24-Week Intensive Program · 2025 Cohort
              </p>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'rgba(91,46,255,0.2)' }}>
              <div>
                <div
                  className="h-px w-20 mb-1"
                  style={{ background: 'var(--color-border)' }}
                />
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Programme Director
                </p>
              </div>
              {/* Seal */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: 'rgba(91,46,255,0.5)',
                  background: 'rgba(91,46,255,0.1)',
                  boxShadow: '0 0 20px rgba(91,46,255,0.3)',
                }}
              >
                <BadgeCheck size={24} style={{ color: 'var(--color-primary-dark)' }} />
              </div>
              <div className="text-right">
                <div
                  className="h-px w-20 mb-1 ml-auto"
                  style={{ background: 'var(--color-border)' }}
                />
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Date Issued
                </p>
              </div>
            </div>

            {/* Bottom decoration */}
            <div
              className="h-0.5 w-full rounded-full mt-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(91,46,255,0.8), var(--color-accent), rgba(91,46,255,0.8), transparent)' }}
            />
          </div>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          variants={staggerContainer}
          className="flex flex-col gap-5"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              className="flex gap-4 p-5 rounded-2xl border transition-all duration-300"
              style={{ background: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(91,46,255,0.35)'
                e.currentTarget.style.transform = 'translateX(6px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(91,46,255,0.12)', color: 'var(--color-primary-dark)' }}
              >
                {b.icon}
              </div>
              <div>
                <h4
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {b.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {b.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  )
}
