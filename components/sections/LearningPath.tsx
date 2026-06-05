'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Search, PenTool, LayoutGrid, MousePointerClick,
  Briefcase, ArrowRight, Repeat2,
  TrendingUp, Layers, Sparkles, GitBranch,
  GraduationCap, Star, Rocket,
} from 'lucide-react'
import { staggerContainer, scaleIn, fadeUp } from '@/lib/motion'
import { Section } from '@/components/ui/Section'
import type { WhoItsForData } from '@/lib/types'

const CARD_META = [
  { visual: 'skill',   panelBg: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',              accentColor: '#38BDF8' },
  { visual: 'reskill', panelBg: 'linear-gradient(145deg, #0F0A2E 0%, #1E1060 100%)',              accentColor: '#A78BFA' },
  { visual: 'upskill', panelBg: 'linear-gradient(145deg, #042F1E 0%, #065F46 40%, #0F4C35 100%)', accentColor: '#34D399' },
]

function SkillVisual({ color }: { color: string }) {
  const icons = [
    { Icon: Search, label: 'User Research', delay: 0, x: 0, y: 60 },
    { Icon: PenTool, label: 'Wireframing', delay: 0.1, x: 0, y: 38 },
    { Icon: LayoutGrid, label: 'Prototyping', delay: 0.2, x: 0, y: 18 },
    { Icon: MousePointerClick, label: 'Usability Testing', delay: 0.3, x: 0, y: 0 },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Star burst */}
      <div
        className="absolute top-6 right-8 w-14 h-14 flex items-center justify-center rounded-full"
        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
      >
        <Star size={22} style={{ color }} fill={color} fillOpacity={0.3} />
        <span className="absolute text-[8px] font-black tracking-tight" style={{ color, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '7px' }}>UX</span>
      </div>

      {/* Stacked skill bars */}
      <div className="flex flex-col gap-2 w-48">
        {icons.map(({ Icon, label }, i) => (
          <div
            key={label}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
            style={{
              background: i === 3 ? `${color}25` : 'rgba(255,255,255,0.06)',
              border: i === 3 ? `1px solid ${color}50` : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Icon size={13} style={{ color: i === 3 ? color : 'rgba(255,255,255,0.5)' }} />
            <span className="text-xs font-medium" style={{ color: i === 3 ? color : 'rgba(255,255,255,0.5)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Floating person icon */}
      <div
        className="absolute bottom-5 left-6 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
      >
        <GraduationCap size={16} style={{ color }} />
      </div>
    </div>
  )
}

function ReskillVisual({ color }: { color: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center gap-0">
      {/* Left: prior career */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Briefcase size={22} style={{ color: 'rgba(255,255,255,0.45)' }} />
        </div>
        <span className="text-[10px] font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>
          PRIOR CAREER
        </span>
      </div>

      {/* Bridge arrow */}
      <div className="flex flex-col items-center mx-3 gap-1">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-6 h-0.5 rounded-full"
              style={{ background: `${color}${i === 2 ? 'cc' : i === 1 ? '77' : '33'}` }}
            />
          ))}
          <ArrowRight size={14} style={{ color }} />
        </div>
        <div
          className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider"
          style={{ background: `${color}20`, color }}
        >
          RESKILL
        </div>
      </div>

      {/* Right: UX Design */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}50` }}
        >
          <PenTool size={22} style={{ color }} />
        </div>
        <span className="text-[10px] font-semibold tracking-wide" style={{ color: `${color}cc` }}>
          UX DESIGN
        </span>
      </div>

      {/* Background person */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Repeat2 size={13} style={{ color }} />
      </div>
    </div>
  )
}

function UpskillVisual({ color }: { color: string }) {
  const steps = [
    { Icon: Layers, label: 'Systems' },
    { Icon: GitBranch, label: 'Strategy' },
    { Icon: Sparkles, label: 'AI + UX' },
    { Icon: Rocket, label: 'Leadership' },
  ]
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central orbit */}
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: `${color}15`, border: `2px solid ${color}40` }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: `${color}25`, border: `1px solid ${color}60` }}
        >
          <TrendingUp size={20} style={{ color }} />
        </div>
        {/* Orbit ring label */}
        <span
          className="absolute -top-4 text-[9px] font-bold tracking-widest uppercase"
          style={{ color: `${color}90` }}
        >
          ITERATIVE
        </span>
      </div>

      {/* 4 orbiting icons */}
      {steps.map(({ Icon, label }, i) => {
        const angle = (i / 4) * 360 - 45
        const rad = (angle * Math.PI) / 180
        const r = 62
        const cx = Math.cos(rad) * r
        const cy = Math.sin(rad) * r
        return (
          <div
            key={label}
            className="absolute flex flex-col items-center gap-0.5"
            style={{ transform: `translate(${cx}px, ${cy}px)` }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${color}35` }}
            >
              <Icon size={13} style={{ color: `${color}cc` }} />
            </div>
            <span className="text-[8px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

interface LearningPathProps {
  data: WhoItsForData
}

export function LearningPath({ data }: LearningPathProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section id="learning-path" style={{ background: 'var(--color-bg-dark)' } as React.CSSProperties}>
      {/* Section heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="text-center mb-14"
        ref={ref}
      >
        <span
          className="inline-block mb-5 px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase"
          style={{ background: '#FFC200', color: '#000' }}
        >
          {data.badge}
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold leading-tight mb-4"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          {data.title}{' '}
          <span style={{ color: 'var(--color-primary)' }}>{data.title_highlight}</span>
        </h2>
        <p
          className="text-base leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {data.subtitle}
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {data.cards.map((card, i) => {
          const meta = CARD_META[i % CARD_META.length]
          return (
          <motion.div
            key={card.title}
            variants={scaleIn}
            className="group flex flex-col rounded-xl overflow-hidden border transition-all duration-300 cursor-default"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-dark)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = meta.accentColor + '55'
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = `0 20px 50px ${meta.accentColor}18`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {/* Visual panel */}
            <div
              className="relative h-52 overflow-hidden"
              style={{ background: meta.panelBg }}
            >
              {/* Badge */}
              <span
                className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase"
                style={{ background: '#FFC200', color: '#000' }}
              >
                {card.badge}
              </span>

              {/* Illustration */}
              {meta.visual === 'skill' && <SkillVisual color={meta.accentColor} />}
              {meta.visual === 'reskill' && <ReskillVisual color={meta.accentColor} />}
              {meta.visual === 'upskill' && <UpskillVisual color={meta.accentColor} />}
            </div>

            {/* Text content */}
            <div className="flex flex-col flex-1 p-6">
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm font-bold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {card.hook}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {card.description}
              </p>
            </div>
          </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
