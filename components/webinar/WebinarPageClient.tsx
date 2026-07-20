'use client'

import { WebinarHero } from '@/components/webinar/WebinarHero'
import { WebinarLeadMentors } from '@/components/webinar/WebinarLeadMentors'
import { WebinarCoreHook } from '@/components/webinar/WebinarCoreHook'
import { WebinarDemoFlow } from '@/components/webinar/WebinarDemoFlow'
import { WebinarClarity } from '@/components/webinar/WebinarClarity'
import { WebinarBigShift } from '@/components/webinar/WebinarBigShift'
import { WebinarTakeaways } from '@/components/webinar/WebinarTakeaways'
import { WebinarCaseStudy } from '@/components/webinar/WebinarCaseStudy'
import { WebinarDifference } from '@/components/webinar/WebinarDifference'
import { WebinarAudience } from '@/components/webinar/WebinarAudience'
import { WebinarNotFor } from '@/components/webinar/WebinarNotFor'
import { WebinarWhySkillBanao } from '@/components/webinar/WebinarWhySkillBanao'
import { WebinarMentors } from '@/components/webinar/WebinarMentors'
import { WebinarInclusions } from '@/components/webinar/WebinarInclusions'
import { WebinarFellowshipBridge } from '@/components/webinar/WebinarFellowshipBridge'
import { WebinarPricingCTA } from '@/components/webinar/WebinarPricingCTA'
import { WebinarFAQ } from '@/components/webinar/WebinarFAQ'
import { WebinarFinalCTA } from '@/components/webinar/WebinarFinalCTA'

import type {
  WebinarHeroData, WebinarLeadMentorsData, WebinarCoreHookData, WebinarDemoFlowData,
  WebinarClarityData, WebinarBigShiftData, WebinarTakeawaysData,
  WebinarCaseStudyData, WebinarDifferenceData, WebinarAudienceData,
  WebinarNotForData, WebinarWhySkillBanaoData, WebinarMentorsData,
  WebinarInclusionsData, WebinarFellowshipBridgeData, WebinarPricingCtaData,
  WebinarFaqsData, WebinarFinalCtaData,
} from '@/lib/webinar-types'

interface Props {
  heroData: WebinarHeroData
  leadMentorsData: WebinarLeadMentorsData
  coreHookData: WebinarCoreHookData
  demoFlowData: WebinarDemoFlowData
  clarityData: WebinarClarityData
  bigShiftData: WebinarBigShiftData
  takeawaysData: WebinarTakeawaysData
  caseStudyData: WebinarCaseStudyData
  differenceData: WebinarDifferenceData
  audienceData: WebinarAudienceData
  notForData: WebinarNotForData
  whySkillBanaoData: WebinarWhySkillBanaoData
  mentorsData: WebinarMentorsData
  inclusionsData: WebinarInclusionsData
  fellowshipBridgeData: WebinarFellowshipBridgeData
  pricingCtaData: WebinarPricingCtaData
  faqsData: WebinarFaqsData
  finalCtaData: WebinarFinalCtaData
  registerUrl?: string
}

export function WebinarPageClient({ heroData, leadMentorsData, coreHookData, demoFlowData, clarityData, bigShiftData, takeawaysData, caseStudyData, differenceData, audienceData, notForData, whySkillBanaoData, mentorsData, inclusionsData, fellowshipBridgeData, pricingCtaData, faqsData, finalCtaData, registerUrl }: Props) {
  return (
    <>
      <WebinarHero             data={heroData}             registerUrl={registerUrl} />
      <WebinarLeadMentors      data={leadMentorsData}      registerUrl={registerUrl} />
      <WebinarCoreHook         data={coreHookData} />
      <WebinarDemoFlow         data={demoFlowData} />
      <WebinarClarity          data={clarityData} />
      <WebinarBigShift         data={bigShiftData} />
      <WebinarTakeaways        data={takeawaysData} />
      <WebinarCaseStudy        data={caseStudyData} />
      <WebinarDifference       data={differenceData} />
      <WebinarAudience         data={audienceData} />
      <WebinarNotFor           data={notForData} />
      <WebinarWhySkillBanao    data={whySkillBanaoData} />
      <WebinarMentors          data={mentorsData} />
      <WebinarInclusions       data={inclusionsData} />
      <WebinarFellowshipBridge data={fellowshipBridgeData} registerUrl={registerUrl} />
      <WebinarPricingCTA       data={pricingCtaData}       registerUrl={registerUrl} />
      <WebinarFAQ              data={faqsData} />
      <WebinarFinalCTA         data={finalCtaData}         registerUrl={registerUrl} />
    </>
  )
}
