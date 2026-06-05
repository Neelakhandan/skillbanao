'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300"
          style={{
            background: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-muted)',
            boxShadow: '0 4px 20px rgba(91,46,255,0.12)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.borderColor = 'var(--color-primary)'
            el.style.color = 'var(--color-primary-light)'
            el.style.boxShadow = '0 0 24px rgba(91,46,255,0.3)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.borderColor = 'var(--color-border)'
            el.style.color = 'var(--color-text-muted)'
            el.style.boxShadow = '0 4px 20px rgba(91,46,255,0.12)'
          }}
          aria-label="Scroll to top"
        >
          {/* Rotate ChevronRight 270deg to point up */}
          <ChevronRight size={18} style={{ transform: 'rotate(-90deg)' }} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
