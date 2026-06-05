import { getContentWithBody } from '@/lib/content'
import { LegalPage } from '@/components/ui/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Read the Skill Banao Terms & Conditions — enrollment, conduct, placement support, and more.',
}

export default function TermsPage() {
  const { data, content } = getContentWithBody('terms.md')
  return (
    <LegalPage
      title={data.title as string}
      lastUpdated={data.last_updated as string}
      content={content}
    />
  )
}
