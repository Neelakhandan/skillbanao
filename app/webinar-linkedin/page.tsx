import type { Metadata } from 'next'
import { getContent } from '@/lib/content'
import { WebinarPageClient } from '@/components/webinar/WebinarPageClient'
import type { WebinarSchedule } from '@/lib/types'

import type {
  WebinarHeroData, WebinarLeadMentorsData, WebinarCoreHookData, WebinarDemoFlowData,
  WebinarClarityData, WebinarBigShiftData, WebinarTakeawaysData,
  WebinarCaseStudyData, WebinarDifferenceData, WebinarAudienceData,
  WebinarNotForData, WebinarWhySkillBanaoData, WebinarMentorsData,
  WebinarInclusionsData, WebinarFellowshipBridgeData, WebinarPricingCtaData,
  WebinarFaqsData, WebinarFinalCtaData,
} from '@/lib/webinar-types'

export const metadata: Metadata = {
  title: 'Design with UX. Build with AI. | Live Masterclass — Skill Banao',
  robots: 'noindex, nofollow',
}

const LINKEDIN_REGISTER_URL = 'https://pages.razorpay.com/webinar-02'

export default function WebinarLinkedInPage() {
  const schedule = getContent<WebinarSchedule>('webinar-schedule.md')

  return (
    <WebinarPageClient
      registerUrl={LINKEDIN_REGISTER_URL}
      heroData={{ ...getContent<WebinarHeroData>('webinar/hero.md'), ...schedule }}
      leadMentorsData={getContent<WebinarLeadMentorsData>('webinar/lead-mentors.md')}
      coreHookData={getContent<WebinarCoreHookData>('webinar/core-hook.md')}
      demoFlowData={getContent<WebinarDemoFlowData>('webinar/demo-flow.md')}
      clarityData={getContent<WebinarClarityData>('webinar/clarity.md')}
      bigShiftData={getContent<WebinarBigShiftData>('webinar/big-shift.md')}
      takeawaysData={getContent<WebinarTakeawaysData>('webinar/takeaways.md')}
      caseStudyData={getContent<WebinarCaseStudyData>('webinar/case-study.md')}
      differenceData={getContent<WebinarDifferenceData>('webinar/difference.md')}
      audienceData={getContent<WebinarAudienceData>('webinar/audience.md')}
      notForData={getContent<WebinarNotForData>('webinar/not-for.md')}
      whySkillBanaoData={getContent<WebinarWhySkillBanaoData>('webinar/why-skill-banao.md')}
      mentorsData={getContent<WebinarMentorsData>('webinar/mentors.md')}
      inclusionsData={getContent<WebinarInclusionsData>('webinar/inclusions.md')}
      fellowshipBridgeData={getContent<WebinarFellowshipBridgeData>('webinar/fellowship-bridge.md')}
      pricingCtaData={{ ...getContent<WebinarPricingCtaData>('webinar/pricing-cta.md'), ...schedule }}
      faqsData={getContent<WebinarFaqsData>('webinar/faqs.md')}
      finalCtaData={getContent<WebinarFinalCtaData>('webinar/final-cta.md')}
    />
  )
}
