export interface WebinarHeroData {
  eyebrow: string
  headline: string
  subheadline: string
  subheadline_2: string
  date: string
  time: string
  mode: string
  price: string
  cta_primary: string
  cta_secondary: string
  trust_line: string
  mentor_card_eyebrow: string
}

export interface WebinarLeadMentor {
  name: string
  role: string
  experience: string
  credibility: string
  image: string
  has_website: boolean
}

export interface WebinarLeadMentorsData {
  label: string
  heading: string
  body: string
  supporting_line: string
  cta: string
  mentors: WebinarLeadMentor[]
}

export interface WebinarCoreHookData {
  label: string
  heading: string
  body: string
  key_message: string
}

export interface WebinarDemoStep {
  number: string
  title: string
  description: string
}

export interface WebinarDemoFlowData {
  label: string
  heading: string
  body: string
  steps: WebinarDemoStep[]
}

export interface WebinarClarityData {
  label: string
  heading: string
  body: string
  will_do: string[]
  will_not_do: string[]
}

export interface WebinarBigShiftData {
  label: string
  heading: string
  body: string
  skills: string[]
  pull_quote: string
}

export interface WebinarTakeawayItem {
  title: string
  body: string
}

export interface WebinarTakeawaysData {
  label: string
  heading: string
  items: WebinarTakeawayItem[]
}

export interface WebinarCaseStudyData {
  label: string
  heading: string
  body: string
  example_heading: string
  example: string
  example_note: string
  what_you_will_see: string[]
  note: string
}

export interface WebinarDifferenceRow {
  regular: string
  skillbanao: string
}

export interface WebinarDifferenceData {
  label: string
  heading: string
  body: string
  regular_label: string
  skillbanao_label: string
  rows: WebinarDifferenceRow[]
}

export interface WebinarPersona {
  title: string
  body: string
}

export interface WebinarAudienceData {
  label: string
  heading: string
  personas: WebinarPersona[]
}

export interface WebinarNotForData {
  label: string
  heading: string
  body: string
  disqualifiers: string[]
  honest_line: string
}

export interface WebinarWhySkillBanaoData {
  label: string
  heading: string
  body: string
  core_belief: string
  focus_items: string[]
}

export interface WebinarMentor {
  name: string
  role: string
  experience: string
  image: string
}

export interface WebinarMentorsData {
  label: string
  heading: string
  body: string
  mentors: WebinarMentor[]
}

export interface WebinarInclusionItem {
  title: string
  body: string
}

export interface WebinarInclusionsData {
  label: string
  heading: string
  items: WebinarInclusionItem[]
}

export interface WebinarFellowshipBridgeData {
  label: string
  heading: string
  body: string
  depth_items: string[]
  cta: string
  supporting_line: string
}

export interface WebinarPricingCtaData {
  label: string
  heading: string
  body: string
  date: string
  time: string
  mode: string
  price: string
  cta: string
  supporting_line: string
}

export interface WebinarFaqItem {
  question: string
  answer: string
}

export interface WebinarFaqsData {
  items: WebinarFaqItem[]
}

export interface WebinarFinalCtaData {
  heading: string
  body: string
  cta: string
  event_reminder: string
}
