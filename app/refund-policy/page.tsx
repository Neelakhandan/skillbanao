import { getContentWithBody } from '@/lib/content'
import { LegalPage } from '@/components/ui/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund and Returns Policy',
  description: 'Read the Skill Banao Refund and Returns Policy — eligibility, process, and timelines.',
}

export default function RefundPolicyPage() {
  const { data, content } = getContentWithBody('refund-policy.md')
  return (
    <LegalPage
      title={data.title as string}
      lastUpdated={data.last_updated as string}
      content={content}
    />
  )
}
