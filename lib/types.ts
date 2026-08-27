export interface WebinarSchedule {
  date: string
  short_date: string
  time: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  href: string
  icon: string
}

export interface SiteData {
  name: string
  tagline: string
  logo: string
  url: string
  nav_links: NavLink[]
  cta_nav: NavLink
  footer: {
    tagline: string
    links: NavLink[]
    social: SocialLink[]
    legal: string
  }
}

export interface HeroStat {
  value: string
  label: string
}

export interface ScheduleItem {
  type: string
  days: string
  time: string
  icon: string
}

export interface HeroData {
  badge: string
  headline: string
  headline_highlight: string
  subheadline: string
  cta_primary: NavLink
  cta_secondary: NavLink
  stats: HeroStat[]
  schedule: ScheduleItem[]
  duration: string
  start_date: string
  live_classes: string
}

export interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
}

export interface CompanyLogo {
  name: string
  logo: string
}

export interface StatsData {
  title: string
  enrollment_count: string
  enrollment_label: string
  hero_stats: StatItem[]
  cohort_stats: StatItem[]
  alumni_companies: CompanyLogo[]
}

export interface CurriculumModule {
  title: string
  icon: string
  description: string
  weeks: string
}

export interface AiTool {
  name: string
  use: string
}

export interface CurriculumData {
  title: string
  title_highlight: string
  subtitle: string
  modules: CurriculumModule[]
  ai_section: {
    badge: string
    title: string
    title_highlight: string
    subtitle: string
    tools: AiTool[]
  }
}

export interface InstructorItem {
  name: string
  role: string
  company: string
  company_logo: string
  avatar: string
  bio: string
  expertise: string[]
  linkedin?: string
  website?: string
}

export interface InstructorsData {
  title: string
  title_highlight: string
  subtitle: string
  items: InstructorItem[]
}

export interface MentorItem {
  name: string
  role: string
  company: string
  avatar: string
}

export interface MentorsData {
  title: string
  title_highlight: string
  subtitle: string
  callout: string
  items: MentorItem[]
  mentor_count: string
  session_count: string
}

export interface PlacementFeature {
  icon: string
  title: string
  description: string
}

export interface PlacementData {
  title: string
  title_highlight: string
  subtitle: string
  features: PlacementFeature[]
  support_duration: string
  hiring_partners: string
  placement_rate: string
  companies: CompanyLogo[]
}

export interface TestimonialItem {
  name: string
  role: string
  company: string
  avatar: string
  package: string
  previous_role: string
  quote: string
}

export interface TestimonialsData {
  title: string
  title_highlight: string
  subtitle: string
  items: TestimonialItem[]
}

export interface ToolItem {
  name: string
  category: string
  logo: string
  description: string
}

export interface ToolsData {
  title: string
  title_highlight: string
  subtitle: string
  items: ToolItem[]
}

export interface TimelineWeek {
  week: string
  title: string
  description: string
}

export interface TimelinePhase {
  phase: string
  label: string
  weeks: string
  color: string
  items: TimelineWeek[]
}

export interface TimelineData {
  title: string
  title_highlight: string
  subtitle: string
  phases: TimelinePhase[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqData {
  title: string
  subtitle: string
  items: FaqItem[]
}

export interface WhoItsForCard {
  badge: string
  title: string
  hook: string
  description: string
}

export interface WhoItsForData {
  badge: string
  title: string
  title_highlight: string
  subtitle: string
  cards: WhoItsForCard[]
}

export interface WhySkillBanaoStat {
  value: string
  label: string
}

export interface WhySkillBanaoData {
  badge: string
  heading: string
  body: string
  quote: string
  stats: WhySkillBanaoStat[]
  tags: string[]
}

export interface HowItWorksStep {
  number: number
  text: string
}

export interface HowItWorksData {
  title: string
  steps: HowItWorksStep[]
  tagline: string
  tagline_sub: string
  cta_label: string
  cta_href: string
}

export interface LearningPhaseItem {
  number: number
  weeks: string
  label: string
  rhizomatic_percent: number
  topics: string[]
}

export interface LearningPhilosophyData {
  badge: string
  title: string
  description: string
  spectrum_left: string
  spectrum_right: string
  phases: LearningPhaseItem[]
}

export interface ModuleItem {
  id: string
  title: string
  weeks: string
  topics: string
  description: string
  can_do: string[]
  deliverables: string[]
}

export interface PhaseItem {
  number: number
  label: string
  weeks: string
  modules: ModuleItem[]
}

export interface CurriculumModulesData {
  badge: string
  title: string
  subtitle: string
  phases: PhaseItem[]
}

export interface FeatureItem {
  icon: string
  label: string
  desc: string
}

export interface FeatureStripData {
  features: FeatureItem[]
}

export interface DifferenceRow {
  think: string
  need: string
  deliver: string
}

export interface DifferenceColHeader {
  label: string
}

export interface DifferenceData {
  badge: string
  title: string
  title_highlight: string
  subtitle: string
  rows: DifferenceRow[]
  col_headers: DifferenceColHeader[]
}

export interface WhatsAppData {
  enabled: boolean
  phone: string
  message: string
}
