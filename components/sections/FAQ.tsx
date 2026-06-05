'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Phone } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CallbackModal } from '@/components/ui/CallbackModal'
import type { FaqData } from '@/lib/types'

interface FAQProps {
  data: FaqData
}

function FAQItem({ item, index }: { item: FaqData['items'][number]; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <motion.div
      variants={fadeUp}
      className="border-b last:border-b-0"
      style={{ borderColor: 'rgba(234,88,12,0.12)' }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className="text-base font-medium leading-snug transition-colors duration-200"
          style={{ color: isOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}
        >
          {item.question}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? '#EA580C' : 'rgba(234,88,12,0.1)',
            color: isOpen ? '#fff' : '#EA580C',
            boxShadow: isOpen ? '0 0 16px rgba(234,88,12,0.35)' : 'none',
          }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="pb-5 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ({ data }: FAQProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [callbackOpen, setCallbackOpen] = useState(false)

  return (
    <Section id="faq" style={{ background: '#FFF7ED' } as React.CSSProperties}>
      <SectionHeading
        badge="FAQs"
        title={data.title}
        highlight="Questions"
        subtitle={data.subtitle}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="rounded-lg border px-6"
          style={{
            background: '#FFFFFF',
            borderColor: 'rgba(234,88,12,0.15)',
          }}
        >
          {data.items.map((item, i) => (
            <FAQItem key={item.question} item={item} index={i} />
          ))}
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-lg border"
          style={{
            background: 'rgba(234,88,12,0.06)',
            borderColor: 'rgba(234,88,12,0.2)',
          }}
        >
          <div>
            <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Still have questions?
            </p>
          </div>
          <button
            onClick={() => setCallbackOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: 'var(--color-primary)',
              boxShadow: '0 0 20px rgba(91,46,255,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(91,46,255,0.5)' }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(91,46,255,0.3)' }}
          >
            <Phone size={15} />
            Request a call back
          </button>
        </motion.div>
      </div>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </Section>
  )
}
