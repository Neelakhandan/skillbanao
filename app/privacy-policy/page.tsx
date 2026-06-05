import { getContentWithBody } from '@/lib/content'
import { LegalPage } from '@/components/ui/LegalPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the Skill Banao Privacy Policy — how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  const { data, content } = getContentWithBody('privacy-policy.md')
  return (
    <LegalPage
      title={data.title as string}
      lastUpdated={data.last_updated as string}
      content={content}
    />
  )
}
