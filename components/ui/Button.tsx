'use client'

import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', href, className, children, ...props }: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer'

  const variants = {
    primary: [
      'bg-[var(--color-primary)] text-white',
      'hover:bg-[var(--color-primary-light)]',
      'shadow-[0_0_32px_rgba(91,46,255,0.4)]',
      'hover:shadow-[0_0_48px_rgba(91,46,255,0.6)]',
    ].join(' '),
    secondary: [
      'bg-[var(--color-accent)] text-black',
      'hover:brightness-110',
      'shadow-[0_0_24px_rgba(255,194,0,0.3)]',
    ].join(' '),
    outline: [
      'border border-[var(--color-border)] text-[var(--color-text-primary)]',
      'hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
      'bg-transparent',
    ].join(' '),
  }

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
