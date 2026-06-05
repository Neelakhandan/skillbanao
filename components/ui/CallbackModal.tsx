'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

interface CallbackModalProps {
  open: boolean
  onClose: () => void
}

const PHONE_RE = /^[6-9]\d{9}$/

export function CallbackModal({ open, onClose }: CallbackModalProps) {
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const nameRef               = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setName(''); setPhone('')
      setErrors({}); setLoading(false); setSuccess(false)
      setTimeout(() => nameRef.current?.focus(), 80)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function validate() {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Full name is required'
    if (!PHONE_RE.test(phone)) e.phone = 'Enter a valid 10-digit mobile number'
    return e
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), type: 'callback' }),
      })
    } catch {
      // continue regardless
    }
    setLoading(false)
    setSuccess(true)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden"
        style={{ borderRadius: 16, background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
      >
        {/* Brand purple header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: '#5B2EFF', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
        >
          <span className="text-base font-semibold" style={{ color: '#fff' }}>
            Request a Callback
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: 6,
              color: 'rgba(255,255,255,0.8)',
              background: 'transparent',
            }}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {success ? (
            <div className="py-6 flex flex-col items-center gap-3 text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ background: '#F0FFF4', color: '#15803D' }}
              >
                ✓
              </div>
              <p className="font-bold text-base" style={{ color: '#0F0A2E' }}>
                We'll call you back shortly!
              </p>
              <p className="text-sm" style={{ color: '#7A729E' }}>
                Our team will reach out to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2 text-sm font-semibold"
                style={{ border: '1.5px solid #5B2EFF', borderRadius: 8, color: '#5B2EFF', background: 'transparent' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <h2 className="text-xl font-bold leading-snug" style={{ color: '#0F0A2E' }}>
                Please enter your details
              </h2>

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: '#3B3566' }}>
                  Full Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                  className="w-full px-4 py-2.5 text-sm outline-none transition-all"
                  style={{
                    border: `1.5px solid ${errors.name ? '#DC2626' : '#D6D0F5'}`,
                    borderRadius: 8,
                    color: '#0F0A2E',
                    background: '#fff',
                  }}
                  onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = '#5B2EFF' }}
                  onBlur={(e) => { if (!errors.name) e.currentTarget.style.borderColor = '#D6D0F5' }}
                />
                {errors.name && <p className="text-xs" style={{ color: '#DC2626' }}>{errors.name}</p>}
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: '#3B3566' }}>
                  Mobile Number <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <div
                  className="flex items-center transition-all"
                  style={{
                    border: `1.5px solid ${errors.phone ? '#DC2626' : '#D6D0F5'}`,
                    borderRadius: 8,
                    background: '#fff',
                  }}
                >
                  <span className="pl-3 text-base">🇮🇳</span>
                  <span className="px-2 text-sm font-medium" style={{ color: '#3B3566' }}>+91</span>
                  <span className="text-sm" style={{ color: '#D6D0F5' }}>|</span>
                  <input
                    type="tel"
                    placeholder="XXXXXXXXXX"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, ''))
                      setErrors((p) => ({ ...p, phone: '' }))
                    }}
                    className="flex-1 py-2.5 pl-2 pr-4 text-sm outline-none bg-transparent"
                    style={{ color: '#0F0A2E' }}
                  />
                </div>
                {errors.phone && <p className="text-xs" style={{ color: '#DC2626' }}>{errors.phone}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-opacity"
                style={{
                  border: '1.5px solid #1A1000',
                  borderRadius: 8,
                  color: '#1A1000',
                  background: 'transparent',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Please wait…' : 'Continue →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
