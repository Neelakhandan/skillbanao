import dynamic from 'next/dynamic'
import { getContent } from '@/lib/content'
import { courseSchema, organizationSchema, faqSchema, websiteSchema } from '@/lib/seo'

// Above-fold: eager
import { Hero } from '@/components/sections/Hero'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

// Below-fold: dynamically imported for JS code-splitting
const FeatureStrip        = dynamic(() => import('@/components/sections/FeatureStrip').then(m => m.FeatureStrip))
const AIAdvantage         = dynamic(() => import('@/components/sections/AIAdvantage').then(m => m.AIAdvantage))
const WhatYouLearn        = dynamic(() => import('@/components/sections/WhatYouLearn').then(m => m.WhatYouLearn))
const LearningPath        = dynamic(() => import('@/components/sections/LearningPath').then(m => m.LearningPath))
const Instructors         = dynamic(() => import('@/components/sections/Instructors').then(m => m.Instructors))
const Placement           = dynamic(() => import('@/components/sections/Placement').then(m => m.Placement))
const SuccessStories      = dynamic(() => import('@/components/sections/SuccessStories').then(m => m.SuccessStories))
const VibeCoding          = dynamic(() => import('@/components/sections/VibeCoding').then(m => m.VibeCoding))
const WhySkillBanao       = dynamic(() => import('@/components/sections/WhySkillBanao').then(m => m.WhySkillBanao))
const SkillBanaoDifference = dynamic(() => import('@/components/sections/SkillBanaoDifference').then(m => m.SkillBanaoDifference))
const LearningPhilosophy  = dynamic(() => import('@/components/sections/LearningPhilosophy').then(m => m.LearningPhilosophy))
const FAQ                 = dynamic(() => import('@/components/sections/FAQ').then(m => m.FAQ))

import type {
  HeroData, StatsData, CurriculumData,
  InstructorsData, PlacementData,
  TestimonialsData, FaqData,
  WhySkillBanaoData, WhoItsForData, DifferenceData, FeatureStripData,
  CurriculumModulesData, LearningPhilosophyData,
} from '@/lib/types'

export default function Home() {
  const heroData         = getContent<HeroData>('hero.md')
  const featureStripData = getContent<FeatureStripData>('feature-strip.md')
  const statsData        = getContent<StatsData>('stats.md')
  const curriculumData        = getContent<CurriculumData>('curriculum.md')
  const curriculumModulesData   = getContent<CurriculumModulesData>('curriculum-modules.md')
  const learningPhilosophyData  = getContent<LearningPhilosophyData>('learning-philosophy.md')
  const instructorsData  = getContent<InstructorsData>('instructors.md')
  const placementData    = getContent<PlacementData>('placement.md')
  const testimonialsData = getContent<TestimonialsData>('testimonials.md')
  const faqData          = getContent<FaqData>('faqs.md')
  const whyData          = getContent<WhySkillBanaoData>('why-skill-banao.md')
  const whoData          = getContent<WhoItsForData>('who-its-for.md')
  const differenceData   = getContent<DifferenceData>('difference.md')

  return (
    <>
      {/* JSON-LD Structured Data — injected server-side for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqData.items)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />

      {/* Above-fold — eager loaded */}
      <Hero data={heroData} stats={statsData.hero_stats} />

      {/* Below-fold — JS code-split, still SSR */}
      <FeatureStrip data={featureStripData} />
      <Instructors data={instructorsData} />
      <Placement data={placementData} />
      <LearningPath data={whoData} />
      <SuccessStories data={testimonialsData} />
      <WhatYouLearn data={curriculumModulesData} />
      <AIAdvantage data={curriculumData.ai_section} />
      <VibeCoding />
      <SkillBanaoDifference data={differenceData} />
      <LearningPhilosophy data={learningPhilosophyData} />
      <WhySkillBanao data={whyData} />
      <FAQ data={faqData} />

      {/* UX utility */}
      <ScrollToTop />
    </>
  )
}
