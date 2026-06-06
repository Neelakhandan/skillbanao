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
  description: 'A live demo masterclass showing how UX thinking, AI prompting, and vibe coding create working app prototypes. ₹199 · 25th July 2026 · 9:30 AM IST.',
  openGraph: {
    title: 'Design with UX. Build with AI. | Skill Banao Masterclass',
    description: 'Watch how UX thinking, AI prompting, and vibe coding turn a product idea into a working prototype. Live online · 25th July 2026 · ₹199.',
    url: 'https://skillbanao.com/webinar',
  },
}

export default function WebinarPage() {
  const schedule = getContent<WebinarSchedule>('webinar-schedule.md')

  return (
    <WebinarPageClient
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
