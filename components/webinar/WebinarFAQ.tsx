'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { WebinarFaqsData } from '@/lib/webinar-types'

interface Props { data: WebinarFaqsData }

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <motion.div variants={fadeUp} className="border-b" style={{ borderColor: 'rgba(91,46,255,0.1)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base font-medium leading-snug" style={{ color: open ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
          {question}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? '#5B2EFF' : 'rgba(91,46,255,0.1)', color: open ? '#fff' : '#5B2EFF', boxShadow: open ? '0 0 16px rgba(91,46,255,0.35)' : 'none' }}
        >
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function WebinarFAQ({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section style={{ background: '#FFF7ED' } as React.CSSProperties}>
      <SectionHeading badge="FAQ" title="Frequently Asked Questions" />
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="rounded-xl border px-6"
          style={{ background: '#fff', borderColor: 'rgba(91,46,255,0.12)' }}
        >
          {data.items.map((item, i) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} defaultOpen={i === 0} />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
