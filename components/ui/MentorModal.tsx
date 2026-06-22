'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface MentorModalProps {
  open: boolean
  onClose: () => void
}

const EXPERTISE_OPTIONS = [
  'UX Design',
  'UI Design',
  'Product Design',
  'UX Research',
  'Design Systems',
  'Service Design',
  'Enterprise UX',
  'AI in Design',
  'Front-end / Design Engineering',
  'Product Management',
  'Career Mentoring',
  'Portfolio Review',
  'Interview Preparation',
  'Other',
]

const EXPERIENCE_OPTIONS = [
  '1–3 years',
  '3–5 years',
  '5–8 years',
  '8–12 years',
  '12–15 years',
  '15+ years',
]

const PHONE_RE = /^[6-9]\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE   = /^https?:\/\/.+\..+/i

interface FormState {
  fullName:   string
  phone:      string
  email:      string
  city:       string
  linkedin:   string
  portfolio:  string
  role:       string
  company:    string
  experience: string
  expertise:  string[]
  whyMentor:  string
  consent1:   boolean
  consent2:   boolean
  consent3:   boolean
}

const EMPTY: FormState = {
  fullName: '', phone: '', email: '', city: '',
  linkedin: '', portfolio: '', role: '', company: '',
  experience: '', expertise: [], whyMentor: '',
  consent1: false, consent2: false, consent3: false,
}

function Field({
  label, required, error, children,
}: {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: '#3B3566' }}>
        {label}{required && <span style={{ color: '#DC2626' }}> *</span>}
      </label>
      {children}
      {error && <p className="text-xs" style={{ color: '#DC2626' }}>{error}</p>}
    </div>
  )
}

const inputStyle = (error?: string) => ({
  border: `1.5px solid ${error ? '#DC2626' : '#D6D0F5'}`,
  borderRadius: 8,
  color: '#0F0A2E',
  background: '#fff',
})

export function MentorModal({ open, onClose }: MentorModalProps) {
  const [form, setForm]       = useState<FormState>(EMPTY)
  const [errors, setErrors]   = useState<Partial<Record<keyof FormState | 'expertise', string>>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const firstRef              = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setForm(EMPTY); setErrors({}); setLoading(false); setSuccess(false)
      setTimeout(() => firstRef.current?.focus(), 80)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }))
    setErrors((p) => ({ ...p, [key]: '' }))
  }

  function toggleExpertise(option: string) {
    setForm((p) => ({
      ...p,
      expertise: p.expertise.includes(option)
        ? p.expertise.filter((x) => x !== option)
        : [...p.expertise, option],
    }))
    setErrors((p) => ({ ...p, expertise: '' }))
  }

  function validate(): Partial<Record<keyof FormState | 'expertise', string>> {
    const e: Partial<Record<keyof FormState | 'expertise', string>> = {}
    if (!form.fullName.trim())                   e.fullName   = 'Full name is required'
    if (!PHONE_RE.test(form.phone))              e.phone      = 'Enter a valid 10-digit mobile number'
    if (!EMAIL_RE.test(form.email))              e.email      = 'Enter a valid email address'
    if (!form.city.trim())                       e.city       = 'City is required'
    if (!URL_RE.test(form.linkedin))             e.linkedin   = 'Enter a valid URL (starting with https://)'
    if (!URL_RE.test(form.portfolio))            e.portfolio  = 'Enter a valid URL (starting with https://)'
    if (!form.role.trim())                       e.role       = 'Current role is required'
    if (!form.company.trim())                    e.company    = 'Company is required'
    if (!form.experience)                        e.experience = 'Please select your experience range'
    if (form.expertise.length === 0)             e.expertise  = 'Select at least one area of expertise'
    if (!form.consent1)                          e.consent1   = 'This consent is required'
    if (!form.consent2)                          e.consent2   = 'This consent is required'
    if (!form.consent3)                          e.consent3   = 'This consent is required'
    return e
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await fetch('/api/mentor-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // continue to success regardless
    }
    setLoading(false)
    setSuccess(true)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden flex flex-col"
        style={{ borderRadius: 16, background: '#fff', boxShadow: '0 8px 60px rgba(0,0,0,0.22)', maxHeight: '92vh' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ background: '#5B2EFF', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
        >
          <div>
            <p className="text-base font-semibold" style={{ color: '#fff' }}>Join as a Mentor</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Shape India's next generation of enterprise UX designers
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-colors shrink-0"
            style={{ border: '1.5px solid rgba(255,255,255,0.35)', borderRadius: 6, color: 'rgba(255,255,255,0.8)', background: 'transparent' }}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {success ? (
            <div className="py-10 flex flex-col items-center gap-4 text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{ background: '#F0FFF4', color: '#15803D' }}
              >
                ✓
              </div>
              <p className="font-bold text-xl" style={{ color: '#0F0A2E' }}>
                Application received!
              </p>
              <p className="text-sm max-w-sm" style={{ color: '#7A729E' }}>
                Thank you for your interest in mentoring with Skill Banao. We'll review your application and get in touch with you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 text-sm font-semibold"
                style={{ border: '1.5px solid #5B2EFF', borderRadius: 8, color: '#5B2EFF', background: 'transparent' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

              {/* Section A — About You */}
              <div className="flex flex-col gap-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#5B2EFF' }}>
                  About You
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" required error={errors.fullName}>
                    <input
                      ref={firstRef}
                      type="text"
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={(e) => set('fullName', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.fullName)}
                    />
                  </Field>

                  <Field label="Phone Number" required error={errors.phone}>
                    <div
                      className="flex items-center"
                      style={{ border: `1.5px solid ${errors.phone ? '#DC2626' : '#D6D0F5'}`, borderRadius: 8, background: '#fff' }}
                    >
                      <span className="pl-3 text-base">🇮🇳</span>
                      <span className="px-2 text-sm font-medium" style={{ color: '#3B3566' }}>+91</span>
                      <span className="text-sm" style={{ color: '#D6D0F5' }}>|</span>
                      <input
                        type="tel"
                        placeholder="XXXXXXXXXX"
                        value={form.phone}
                        maxLength={10}
                        onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))}
                        className="flex-1 py-2.5 pl-2 pr-4 text-sm outline-none bg-transparent"
                        style={{ color: '#0F0A2E' }}
                      />
                    </div>
                  </Field>

                  <Field label="Email ID" required error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.email)}
                    />
                  </Field>

                  <Field label="City / Location" required error={errors.city}>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru"
                      value={form.city}
                      onChange={(e) => set('city', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.city)}
                    />
                  </Field>

                  <Field label="LinkedIn Profile URL" required error={errors.linkedin}>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourname"
                      value={form.linkedin}
                      onChange={(e) => set('linkedin', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.linkedin)}
                    />
                  </Field>

                  <Field label="Portfolio / Website" required error={errors.portfolio}>
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={form.portfolio}
                      onChange={(e) => set('portfolio', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.portfolio)}
                    />
                  </Field>

                  <Field label="Current Role / Designation" required error={errors.role}>
                    <input
                      type="text"
                      placeholder="e.g. Senior UX Designer"
                      value={form.role}
                      onChange={(e) => set('role', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.role)}
                    />
                  </Field>

                  <Field label="Current Company" required error={errors.company}>
                    <input
                      type="text"
                      placeholder="e.g. IBM"
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none"
                      style={inputStyle(errors.company)}
                    />
                  </Field>

                  <Field label="Total Years of Experience" required error={errors.experience}>
                    <select
                      value={form.experience}
                      onChange={(e) => set('experience', e.target.value)}
                      className="w-full px-4 py-2.5 text-sm outline-none appearance-none"
                      style={{ ...inputStyle(errors.experience), cursor: 'pointer' }}
                    >
                      <option value="">Select range</option>
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>

              {/* Section B — Expertise */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#5B2EFF' }}>
                    Primary Domain of Expertise
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#7A729E' }}>Select all that apply</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {EXPERTISE_OPTIONS.map((opt) => {
                    const checked = form.expertise.includes(opt)
                    return (
                      <div
                        key={opt}
                        role="checkbox"
                        aria-checked={checked}
                        tabIndex={0}
                        onClick={() => toggleExpertise(opt)}
                        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleExpertise(opt) } }}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg cursor-pointer transition-all select-none"
                        style={{
                          border: `1.5px solid ${checked ? '#5B2EFF' : '#E8E4FF'}`,
                          background: checked ? 'rgba(91,46,255,0.05)' : '#fff',
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded shrink-0 flex items-center justify-center"
                          style={{
                            border: `1.5px solid ${checked ? '#5B2EFF' : '#C4BAF5'}`,
                            background: checked ? '#5B2EFF' : '#fff',
                          }}
                        >
                          {checked && (
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className="text-sm" style={{ color: checked ? '#3B2099' : '#3B3566' }}>{opt}</span>
                      </div>
                    )
                  })}
                </div>
                {errors.expertise && <p className="text-xs" style={{ color: '#DC2626' }}>{errors.expertise}</p>}
              </div>

              {/* Section C — Why Mentor */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#5B2EFF' }}>
                  Your Motivation
                </h3>
                <Field label="Why would you like to mentor with Skill Banao?" error={errors.whyMentor}>
                  <textarea
                    rows={4}
                    placeholder="Tell us what drives you to mentor and what you'd bring to our community…"
                    value={form.whyMentor}
                    onChange={(e) => set('whyMentor', e.target.value)}
                    className="w-full px-4 py-3 text-sm outline-none resize-none"
                    style={{ ...inputStyle(errors.whyMentor), lineHeight: '1.6' }}
                  />
                </Field>
              </div>

              {/* Section D — Consent */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: '#5B2EFF' }}>
                  Consent
                </h3>
                {([
                  { key: 'consent1' as const, text: 'I agree to be contacted by Skill Banao regarding mentoring opportunities.' },
                  { key: 'consent2' as const, text: 'I understand that submission does not guarantee selection as a mentor.' },
                  { key: 'consent3' as const, text: 'I confirm that the information provided is accurate.' },
                ]).map(({ key, text }) => (
                  <div key={key} className="flex flex-col gap-1">
                    <div
                      role="checkbox"
                      aria-checked={form[key]}
                      tabIndex={0}
                      onClick={() => set(key, !form[key])}
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); set(key, !form[key]) } }}
                      className="flex items-start gap-3 cursor-pointer select-none"
                    >
                      <div
                        className="w-4 h-4 rounded shrink-0 mt-0.5 flex items-center justify-center"
                        style={{
                          border: `1.5px solid ${errors[key] ? '#DC2626' : form[key] ? '#5B2EFF' : '#C4BAF5'}`,
                          background: form[key] ? '#5B2EFF' : '#fff',
                        }}
                      >
                        {form[key] && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm leading-snug" style={{ color: '#3B3566' }}>{text}</span>
                    </div>
                    {errors[key] && <p className="text-xs ml-7" style={{ color: '#DC2626' }}>{errors[key]}</p>}
                  </div>
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-opacity"
                style={{
                  background: '#5B2EFF',
                  borderRadius: 10,
                  color: '#fff',
                  opacity: loading ? 0.65 : 1,
                  border: 'none',
                }}
              >
                {loading ? 'Submitting…' : 'Submit Application →'}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  )
}
