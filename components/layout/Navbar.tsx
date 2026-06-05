'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavLink, SiteData } from '@/lib/types'

interface NavbarProps {
  navLinks: NavLink[]
  ctaNav: NavLink
  logo: string
  siteName: string
}

export function Navbar({ navLinks, ctaNav, logo, siteName }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md',
          isScrolled ? 'border-b py-3' : 'py-5'
        )}
        style={{
          background: isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.85)',
          borderColor: isScrolled ? '#E4E2F5' : 'transparent',
        }}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0" aria-label={siteName}>
            <img
              src="/logo/skill-banao-logo.svg"
              alt={siteName}
              style={{
                height: '26px',
                width: 'auto',
                filter: isScrolled ? 'none' : 'brightness(0) invert(1)',
                transition: 'filter 0.3s ease',
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: isScrolled ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.7)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isScrolled ? 'var(--color-primary)' : '#ffffff'
                  e.currentTarget.style.background = 'rgba(91,46,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isScrolled ? 'var(--color-text-secondary)' : 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://design.skillbanao.com/learn/account/signin"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                boxShadow: '0 0 24px rgba(91,46,255,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary-light)'
                e.currentTarget.style.boxShadow = '0 0 36px rgba(91,46,255,0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-primary)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(91,46,255,0.4)'
              }}
            >
              Sign in
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: isScrolled ? 'var(--color-text-primary)' : '#ffffff' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col pt-20"
            style={{ background: 'var(--color-bg-dark)' }}
          >
            <nav className="flex flex-col px-6 py-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-4 text-xl font-medium border-b transition-colors cursor-pointer"
                  style={{
                    color: 'var(--color-text-primary)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                href="https://design.skillbanao.com/learn/account/signin"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-center py-4 rounded-full text-base font-semibold text-white"
                style={{
                  background: 'var(--color-primary)',
                  boxShadow: '0 0 24px rgba(91,46,255,0.4)',
                }}
              >
                Sign in
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
