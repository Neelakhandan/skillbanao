# CLAUDE.md — Skill Banao Website

> Single source of truth for Claude Code. Read before making any changes.

---

## Project

**Skill Banao** — Enterprise UX Design Fellowship landing page.  
Next.js 14 App Router · Tailwind CSS v4 · Framer Motion · Lucide React · DM Sans · `gray-matter` · `react-markdown`

**Dev:** `npm run dev` (localhost:3000) · **Build:** `npm run build` · **Lint:** `npm run lint`

---

## Core Rule

**Never hardcode content in components.** All copy lives in `/content/*.md` as YAML frontmatter. Components receive data as typed props. Read via `lib/content.ts → getContent<T>(filename)`.

---

## Page Section Order (top → bottom)

| # | Component | Content File | Section ID |
|---|---|---|---|
| 1 | Navbar | `site.md` | — |
| 2 | Hero | `hero.md` + `stats.md` | — |
| 3 | FeatureStrip | `feature-strip.md` | — |
| 4 | Instructors | `instructors.md` | `#instructors` |
| 5 | Placement | `placement.md` | `#placement` |
| 6 | LearningPath | `who-its-for.md` | `#learning-path` |
| 7 | SuccessStories | `testimonials.md` | `#success-stories` |
| 8 | WhatYouLearn | `curriculum-modules.md` | `#curriculum` |
| 9 | AIAdvantage | `curriculum.md` → `ai_section` | `#ai-advantage` |
| 10 | VibeCoding | hardcoded | `#vibe-coding` |
| 11 | SkillBanaoDifference | `difference.md` | `#difference` |
| 12 | LearningPhilosophy | `learning-philosophy.md` | `#learning-philosophy` |
| 13 | WhySkillBanao | `why-skill-banao.md` | `#why-skill-banao` |
| 14 | FAQ | `faqs.md` | `#faq` |
| 15 | Footer | `site.md` | — |
| — | StickyBarConditional → StickyBottomBar | `webinar-schedule.md` | — |
| — | WhatsAppButtonConditional → WhatsAppButton | `whatsapp.md` | — |
| — | ScrollToTop | hardcoded | — |

**Removed sections (do not re-add):** Certificate, ProgramTimeline, MentorCTA, SocialProof

---

## Content Files

| File | Controls |
|---|---|
| `site.md` | Navbar links, footer tagline, social links, legal text |
| `hero.md` | Badge, headline, CTAs, schedule, duration, meta pills |
| `stats.md` | Hero stat cards (value/suffix/label) |
| `feature-strip.md` | 6 feature icon+label+desc items |
| `curriculum.md` | AIAdvantage section only (`ai_section` key) |
| `curriculum-modules.md` | WhatYouLearn — 4 phases, 6 accordion modules |
| `learning-philosophy.md` | LearningPhilosophy — rhizomatic % per phase |
| `instructors.md` | 5 instructor profiles with real photos |
| `why-skill-banao.md` | Badge, heading, body, quote, stats, tags |
| `who-its-for.md` | LearningPath — 3 audience cards |
| `placement.md` | Stats, feature cards, company logos |
| `testimonials.md` | 4 student stories with real photos |
| `difference.md` | Comparison table rows + column headers |
| `faqs.md` | FAQ accordion items |
| `privacy-policy.md` | Privacy Policy page body (Markdown) |
| `refund-policy.md` | Refund Policy page body (Markdown) |
| `terms.md` | Terms & Conditions page body (Markdown) |
| `webinar-schedule.md` | **Single source of truth** for webinar `date`, `short_date`, `time` — feeds `/webinar` page, StickyBottomBar, and registration success page. `short_date` format: `"9th August"`. Update this file every week. |
| `whatsapp.md` | Floating WhatsApp chat button — `enabled` flag, `phone` (country code + number, no `+`), pre-filled `message`. Set `enabled: false` to hide the button site-wide. |
| `webinar/hero.md` | Webinar hero — eyebrow, headline, subheadlines, mode, price, CTAs, trust line |
| `webinar/lead-mentors.md` | "The People Behind The Session" — Anil + Rajesh cards |
| `webinar/core-hook.md` | "AI Can Build Fast…" section |
| `webinar/demo-flow.md` | 5-step live demo flow |
| `webinar/clarity.md` | What we will / will not do |
| `webinar/big-shift.md` | The big skill shift section |
| `webinar/takeaways.md` | 6 takeaway cards |
| `webinar/case-study.md` | "We'll Build A Simple App Concept Live" |
| `webinar/difference.md` | Comparison table vs regular sessions |
| `webinar/audience.md` | 5 audience persona cards |
| `webinar/not-for.md` | Who this is NOT for |
| `webinar/why-skill-banao.md` | Why Skill Banao section |
| `webinar/mentors.md` | "Backed By Industry Mentors" — 5 mentor cards |
| `webinar/inclusions.md` | 6 inclusion cards |
| `webinar/fellowship-bridge.md` | Bridge to the full fellowship |
| `webinar/pricing-cta.md` | Pricing + register CTA section |
| `webinar/faqs.md` | FAQ accordion |
| `webinar/final-cta.md` | Final CTA section |

---

## Legal Pages

Three standalone pages using `LegalPage.tsx` + `react-markdown`:
- `/privacy-policy` → `app/privacy-policy/page.tsx`
- `/refund-policy` → `app/refund-policy/page.tsx`
- `/terms` → `app/terms/page.tsx`

Content uses `getContentWithBody()` (returns both frontmatter + markdown body).

---

## Standalone Pages (no Navbar / Footer / StickyBar)

Some pages are fully self-contained — no Navbar, Footer, or StickyBottomBar.

### How it works

1. **`middleware.ts`** sets an `x-pathname` header on every request.
2. **`components/layout/MainLayout.tsx`** (server component) reads that header via `headers()` and skips Navbar + Footer for paths in `STANDALONE_PATHS`.
3. **`components/ui/StickyBarConditional.tsx`** (client component) uses `usePathname()` to skip the sticky bar for the same paths.

To add a new standalone page, add its path to `STANDALONE_PATHS` in **both** files.

### Current standalone pages

| URL | File | Purpose |
|---|---|---|
| `/registration-success-msg-sb-uxcohourt-truelearning` | `app/registration-success-msg-sb-uxcohourt-truelearning/page.tsx` | Razorpay post-payment redirect — "You're In!" confirmation. `robots: noindex, nofollow`. Dynamic date from `webinar-schedule.md`. |

### Registration links (Razorpay)

All "Register" / "Buy Now" CTAs across the webinar page and sticky bar point to:
```
https://rzp.io/rzp/design-skillbanao
```
Files that contain this URL: `WebinarHero.tsx`, `WebinarFinalCTA.tsx`, `WebinarPricingCTA.tsx`, `WebinarFellowshipBridge.tsx`, `WebinarLeadMentors.tsx`, `StickyBottomBar.tsx`.

---

## Webinar Page (`/webinar`)

Standalone landing page for the live masterclass. 18 sections rendered by `WebinarPageClient` (client component) loaded from `app/webinar/page.tsx` (server component).

**Section order:** Hero → LeadMentors → CoreHook → DemoFlow → Clarity → BigShift → Takeaways → CaseStudy → Difference → Audience → NotFor → WhySkillBanao → Mentors → Inclusions → FellowshipBridge → PricingCTA → FAQ → FinalCTA → WebinarModal

**Key rules:**
- All content in `content/webinar/*.md` — never hardcode copy in components
- `content/webinar-schedule.md` is the only file to edit for weekly date/time changes
- `lib/webinar-types.ts` — all TypeScript interfaces for webinar content
- `components/webinar/` — one component per section
- **Navbar** hides all links and Sign In button on `/webinar` (logo only) — controlled via `usePathname()` in `Navbar.tsx`
- **WebinarModal** (`components/ui/WebinarModal.tsx`) — Name + Email + Phone → `/api/leads` → Google Sheet
- Mentor LinkedIn URLs live in `WebinarLeadMentors.tsx` (`mentorLinks` constant)
- Icon style: `w-14 h-14 rounded-lg` tinted Lucide icons at `size={24}` — matches main page FeatureStrip pattern

---

## Key Design Decisions

- **Brand purple:** `#5B2EFF` · **Accent gold:** `#FFC200` · **Accent green:** `#AAFF00` (sticky bar)
- **Logo:** `filter: brightness(0) invert(1)` for white on dark navbar; no filter when scrolled
- **Hero:** Two-column layout — left: text/stats, right: `/images/hero-mentors.png` (transparent PNG)
- **WhatYouLearn:** Light pastel "vertical journey" layout — a single gradient rail (`#5B2EFF` → `#0EA5E9` → `#E11D48` → `#059669`) with opaque pastel icon nodes per phase, giant low-opacity ghost phase numbers, and accordion module cards below each phase heading. Phase colours: P1 purple, P2 sky, P3 rose `#E11D48`, P4 green. Background `#FAFAFC`. Final (P4/M6) card gets a subtle gradient highlight.
- **StickyBottomBar:** Glowing green CTA, no dismiss button, no countdown timer
- **WhatsAppButton:** Fixed `bottom-24 right-6 z-40` — must stay above `StickyBottomBar` (`bottom-0`, full-width, `z-50`, ~60-70px tall), which otherwise covers anything at `bottom-6`. Also sits clear of `ScrollToTop` (`bottom-6 right-6`, only visible after scrolling past 600px).
- **Sections with pastel backgrounds:** WhySkillBanao `#ECFDF5` (green accent `#059669` throughout), FAQ `#FFF7ED` (orange accent `#EA580C` throughout), Placement `#EFF6FF` (blue accent `#2563EB` throughout stat/feature cards), FeatureStrip `linear-gradient(180deg, #FFD84D 0%, #FFC200 55%, #FFAA00 100%)` (top-to-bottom brand gold, same hue family as AIAdvantage's gradient; white translucent icon chips `rgba(255,255,255,0.5)`, each icon a distinct amber/brown tone from the gold family — `#7A5C00`/`#92400E`/`#713F12`/`#A16207`/`#854D0E`/`#B45309` — dark-ink text for contrast), LearningPhilosophy uses `var(--color-bg-card)`
- **h1 size:** `clamp(2rem, 4.5vw, 3.5rem)` — reduced from default

---

## Images

| Path | Used by |
|---|---|
| `/public/logo/skill-banao-logo.svg` | Navbar, Footer |
| `/public/images/hero-mentors.png` | Main page hero right column |
| `/public/images/webinar-lead-mentors.png` | Webinar hero right column (transparent PNG, both mentors together) |
| `/public/images/instructors/` | Anil, Rajesh, Lingko, Anish, Meril |
| `/public/images/companies/` | Mentor company logos (`ibm.png`, `mitu.png`, `guide.png`) — shown beside each mentor's name in Instructors |
| `/public/images/students/` | Pooja, Subham, Ondrilla, Amkitha (testimonials) |

---

## Modals

- **CurriculumModal** — Name + Email + Phone → PDF download + Google Sheet ("Curriculum Downloads" tab)
- **CallbackModal** — Name + Phone → Google Sheet ("Callback Requests" tab)
- **MentorModal** (`components/ui/MentorModal.tsx`) — 10 fields + 14 expertise checkboxes + motivation + 3 consents → `/api/mentor-apply` → Google Sheet ("Mentor Applications" tab, auto-created on first submission). Triggered from the "Join as a mentor" button in the Instructors section.
- Lead endpoint: `LEADS_ENDPOINT` env var → `/api/leads/route.ts` proxy → Google Sheet "Skill Banao Leads" (configured and live)
- **Checkbox pattern:** Use `div + role="checkbox" + onClick` — never `label + hidden input` (causes double-toggle bug in real browsers)

---

## Animations

Shared variants in `lib/motion.ts`: `fadeUp`, `staggerContainer`, `scaleIn`, `slideInLeft`, `slideInRight`.  
All sections use `useInView({ once: true, margin: '-80px' })` to trigger on scroll.  
Custom keyframes in `app/globals.css`: `glow-pulse` (sticky CTA), `gradient-shift` (AIAdvantage bg), `aurora`, `float`, `marquee`.

---

## TypeScript

All content interfaces in `lib/types.ts`. Every new content file needs a matching interface. Component props must be typed — no `any`.

- `lib/types.ts` — main site interfaces including `WebinarSchedule { date, short_date, time }`
- `lib/webinar-types.ts` — all webinar page interfaces (one per section)
