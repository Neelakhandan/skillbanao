'use client'

import { usePathname } from 'next/navigation'
import { StickyBottomBar } from './StickyBottomBar'

const STANDALONE_PATHS = ['/registration-success-msg-sb-uxcohourt-truelearning']

const REGISTER_URL_MAP: Record<string, string> = {
  '/webinar-linkedin': 'https://pages.razorpay.com/webinar-02',
}

const DEFAULT_REGISTER_URL = 'https://pages.razorpay.com/webinar-02'

interface Props {
  date: string
  short_date: string
  time: string
}

export function StickyBarConditional({ date, short_date, time }: Props) {
  const pathname = usePathname()
  if (STANDALONE_PATHS.some((p) => pathname.startsWith(p))) return null
  const registerUrl = REGISTER_URL_MAP[pathname] ?? DEFAULT_REGISTER_URL
  return <StickyBottomBar date={date} short_date={short_date} time={time} registerUrl={registerUrl} />
}
