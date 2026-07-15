import { getContent } from '@/lib/content'
import type { WebinarSchedule } from '@/lib/types'
import {
  CalendarDays,
  CreditCard,
  CheckCircle2,
  Mail,
  MessageCircle,
  Video,
  HelpCircle,
  Rocket,
  PartyPopper,
} from 'lucide-react'

export const metadata = {
  title: 'You\'re In! — Skill Banao Webinar',
  robots: 'noindex, nofollow',
}

export default function RegistrationSuccessPage() {
  const schedule = getContent<WebinarSchedule>('webinar-schedule.md')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #080612 0%, #0F0A1E 60%, #080612 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '48px 20px 80px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 560 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img
            src="/logo/skill-banao-logo.svg"
            alt="Skill Banao"
            style={{ height: 32, width: 'auto', display: 'inline-block', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Success badge */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 16px',
              borderRadius: 999,
              background: 'rgba(255,194,0,0.12)',
              border: '1px solid rgba(255,194,0,0.3)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFC200',
            }}
          >
            <PartyPopper size={13} />
            Registration Successful
          </span>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 2.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#F0EEFF',
              margin: '0 0 12px',
              fontFamily: 'var(--font-body)',
            }}
          >
            You&apos;re In!{' '}
            <Rocket
              size={32}
              style={{ display: 'inline', verticalAlign: 'middle', color: '#FFC200' }}
            />
          </h1>
          <p style={{ color: '#A89EC8', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Thank you for registering for the Skill Banao Webinar.<br />
            Your seat has been reserved.
          </p>
        </div>

        {/* Booking card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(91,46,255,0.25)',
            borderRadius: 16,
            padding: '28px 28px 20px',
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: '#F0EEFF',
              margin: '0 0 20px',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
            }}
          >
            AI-Driven UX Workflows
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            {/* Date row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7A729E', fontSize: 14 }}>
                <CalendarDays size={15} style={{ color: '#5B2EFF' }} />
                Date
              </span>
              <span style={{ color: '#F0EEFF', fontSize: 14, fontWeight: 600 }}>
                {schedule.date}
              </span>
            </div>

            {/* Time row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7A729E', fontSize: 14 }}>
                <Video size={15} style={{ color: '#5B2EFF' }} />
                Time
              </span>
              <span style={{ color: '#F0EEFF', fontSize: 14, fontWeight: 600 }}>
                {schedule.time}
              </span>
            </div>

            {/* Payment row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7A729E', fontSize: 14 }}>
                <CreditCard size={15} style={{ color: '#5B2EFF' }} />
                Payment Received
              </span>
              <span style={{ color: '#AAFF00', fontSize: 14, fontWeight: 700 }}>₹199</span>
            </div>
          </div>

          {/* Seat confirmed pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(170,255,0,0.07)',
              border: '1px solid rgba(170,255,0,0.2)',
            }}
          >
            <CheckCircle2 size={16} style={{ color: '#AAFF00', flexShrink: 0 }} />
            <span style={{ color: '#AAFF00', fontSize: 13, fontWeight: 600 }}>
              Your seat has been successfully reserved.
            </span>
          </div>
        </div>

        {/* What happens next */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(91,46,255,0.2)',
            borderRadius: 16,
            padding: '24px 28px',
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#F0EEFF',
              margin: '0 0 6px',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <CheckCircle2 size={18} style={{ color: '#5B2EFF' }} />
            What Happens Next?
          </h3>
          <p style={{ color: '#7A729E', fontSize: 13, margin: '0 0 18px', paddingLeft: 26 }}>
            Within the next few business hours, you&apos;ll receive:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { icon: <Mail size={15} style={{ color: '#5B2EFF', flexShrink: 0 }} />, text: 'A payment confirmation email' },
              { icon: <MessageCircle size={15} style={{ color: '#5B2EFF', flexShrink: 0 }} />, text: 'Important webinar updates and reminders on WhatsApp' },
              { icon: <Video size={15} style={{ color: '#5B2EFF', flexShrink: 0 }} />, text: 'Webinar joining instructions before the event' },
            ].map((item, i, arr) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: 'rgba(91,46,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <span style={{ color: '#A89EC8', fontSize: 14, lineHeight: 1.5, paddingTop: 6 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 10,
            background: 'rgba(255,194,0,0.06)',
            border: '1px solid rgba(255,194,0,0.18)',
            marginBottom: 24,
          }}
        >
          <p style={{ color: '#A89EC8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            To provide a more personalised and distraction-free experience, we communicate
            with each participant <strong style={{ color: '#FFC200' }}>individually</strong> rather
            than through a common group.
          </p>
        </div>

        {/* Help */}
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 32,
          }}
        >
          <p style={{ color: '#6B6490', fontSize: 13, margin: '0 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <HelpCircle size={14} />
            Need help or have questions?
          </p>
          <a
            href="mailto:gayathri@skillbanao.com"
            style={{
              color: '#5B2EFF',
              fontSize: 14,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
            }}
          >
            <Mail size={14} />
            gayathri@skillbanao.com
          </a>
        </div>

        {/* Closing */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              color: '#F0EEFF',
              fontSize: 16,
              fontWeight: 700,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontFamily: 'var(--font-body)',
            }}
          >
            We can&apos;t wait to see you on {schedule.short_date}!
            <Rocket size={18} style={{ color: '#FFC200' }} />
          </p>
        </div>

      </div>
    </div>
  )
}
