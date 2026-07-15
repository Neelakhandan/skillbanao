'use client'

import { usePathname } from 'next/navigation'
import { StickyBottomBar } from './StickyBottomBar'

const STANDALONE_PATHS = ['/registration-success-msg-sb-uxcohourt-truelearning']

interface Props {
  date: string
  short_date: string
  time: string
}

export function StickyBarConditional({ date, short_date, time }: Props) {
  const pathname = usePathname()
  if (STANDALONE_PATHS.some((p) => pathname.startsWith(p))) return null
  return <StickyBottomBar date={date} short_date={short_date} time={time} />
}
