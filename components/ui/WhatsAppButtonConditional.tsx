'use client'

import { usePathname } from 'next/navigation'
import { WhatsAppButton } from './WhatsAppButton'
import type { WhatsAppData } from '@/lib/types'

const STANDALONE_PATHS = ['/registration-success-msg-sb-uxcohourt-truelearning']

interface Props {
  data: WhatsAppData
}

export function WhatsAppButtonConditional({ data }: Props) {
  const pathname = usePathname()
  if (STANDALONE_PATHS.some((p) => pathname.startsWith(p))) return null
  return <WhatsAppButton data={data} />
}
