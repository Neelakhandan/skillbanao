# Skill Banao — Design System

> Single reference for all design decisions: colors, typography, spacing, components, animations, and patterns.

---

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#5B2EFF` | Brand purple — CTAs, badges, links, active states |
| `--color-primary-light` | `#7B5FFF` | Hover states, gradients |
| `--color-primary-dark` | `#3A0FCC` | Pressed states, deep accents |
| `--color-accent` | `#FFC200` | Gold — section badges, highlights |
| `--color-accent-2` | `#E05A22` | Orange — readable on white, secondary accent |

### Semantic Colors

| Token | Value | Usage |
|---|---|---|
| `--color-success` | `#15803D` | Success states |
| `--color-warning` | `#B45309` | Warning states |
| `--color-error` | `#DC2626` | Error / validation messages |

### Sticky Bar Accent
`#AAFF00` — Glowing green used exclusively for the sticky bottom CTA button. Not a global token.

---

## Page Background System

The site uses a **light base** with isolated dark sections via CSS class overrides.

| Context | Class | Background |
|---|---|---|
| Default (light) | `:root` | `#ffffff` |
| Alternate sections | `--color-bg-card` | `#f9fafc` |
| Elevated surfaces | `--color-bg-elevated` | `#EDE9FF` |
| Hero (dark) | `.section-hero` | `#080612` |
| Dark mid-page | `.section-dark` | `#0D0920` |

**Pattern:** Sections alternate between `var(--color-bg-dark)` and `var(--color-bg-card)` for visual rhythm. Dark sections use `.section-hero` or `.section-dark` which override all CSS variables locally — no hardcoded dark values needed in components.

### Sections with special backgrounds
- **WhySkillBanao** — `#ECFDF5` (pastel green)
- **FAQ** — `#FFF7ED` (pastel orange)
- **LearningPhilosophy** — `var(--color-bg-card)`
- **Apply as a Mentor banner** (in Instructors) — `#0D0F14`

---

## Typography

**Font:** `DM Sans` (Google Fonts) — used for both headings and body. Loaded via `next/font/google`.

| Element | Size | Weight | Line Height |
|---|---|---|---|
| `h1` | `clamp(2rem, 4.5vw, 3.5rem)` | 700 | 1.15 |
| `h2` | `clamp(1.75rem, 4vw, 3rem)` | 700 | 1.2 |
| `h3` | `clamp(1.25rem, 2.5vw, 1.75rem)` | 600 | 1.3 |
| `h4` | `1.125rem` | 600 | 1.4 |
| Body / `p` | `1rem` | 400 | 1.7 |
| Section labels | `0.75rem` uppercase, `tracking-widest` | 700 | — |

**Text colors:**
- `--color-text-primary` `#0F0A2E` — headings
- `--color-text-secondary` `#3B3566` — body copy
- `--color-text-muted` `#7A729E` — placeholders, captions

### Gradient Text
```tsx
<span className="text-gradient-primary">  {/* purple gradient */}
<span className="text-gradient-accent">   {/* gold → orange gradient */}
```

---

## Spacing & Layout

- **Section padding:** `py-20 md:py-32` via the `<Section>` component
- **Container:** `max-w-7xl mx-auto px-4 md:px-8`
- **Section heading bottom margin:** `mb-12 md:mb-16`
- **Card gaps:** `gap-6` standard, `gap-4` for dense grids
- **Border radius:** `rounded-xl` for cards, `rounded-lg` for smaller elements, `rounded-full` for pills/badges

---

## Core Components

### `<Section>`
Wrapper for every page section. Handles padding and container automatically.
```tsx
<Section id="instructors" style={{ background: 'var(--color-bg-card)' }}>
  {children}
</Section>
```

### `<SectionHeading>`
Standardised heading block with optional badge (gold pill), title, gradient highlight word, and subtitle.
```tsx
<SectionHeading
  badge="Who Teaches You"
  title="Mentors Who Set the Bar"
  highlight="Mentors"        // renders with text-gradient-primary
  subtitle="Learn directly from..."
  align="center"             // or "left"
/>
```

### Badges / Pills
```tsx
<span
  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
  style={{ background: 'var(--color-accent)', color: '#000' }}
>
  Label
</span>
```

---

## Modals

Three modals exist. All follow the same pattern:
- Fixed overlay with `rgba(0,0,0,0.55)` + `backdropFilter: blur(4px)`
- White card, `max-w` capped, `border-radius: 16px`
- Purple header bar (`#5B2EFF`) with title + X close button
- Scrollable body (`overflow-y-auto`, `max-height: 92vh`)
- Success state replaces form with a ✓ confirmation

| Modal | File | Trigger | Destination |
|---|---|---|---|
| CurriculumModal | `components/ui/CurriculumModal.tsx` | "Download Curriculum" | Google Sheet: Curriculum Downloads |
| CallbackModal | `components/ui/CallbackModal.tsx` | "Request a Callback" | Google Sheet: Callback Requests |
| MentorModal | `components/ui/MentorModal.tsx` | "Join as a Mentor" | Google Sheet: Mentor Applications |

**Checkbox pattern:** Use `div + role="checkbox" + onClick` — never `label + hidden input` (causes double-toggle bug in real browsers).

---

## Animations

All variants are in `lib/motion.ts`. Import and use directly.

| Variant | Effect | Use for |
|---|---|---|
| `fadeUp` | opacity 0→1, y 32→0 | Section content, cards |
| `fadeIn` | opacity 0→1 | Overlays, subtle reveals |
| `scaleIn` | opacity + scale 0.92→1 | Cards, instructor photos |
| `slideInLeft` | opacity + x -40→0 | Left-side content |
| `slideInRight` | opacity + x 40→0 | Right-side content |
| `staggerContainer` | staggers children by 80ms | Card grids |
| `staggerFast` | staggers children by 50ms | Dense lists |

**Scroll trigger pattern (used on every section):**
```tsx
const ref = useRef<HTMLDivElement>(null)
const inView = useInView(ref, { once: true, margin: '-80px' })

<motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
```

### Custom keyframe animations (globals.css)
| Class | Effect |
|---|---|
| `animate-aurora` | Slow shifting aurora gradient background |
| `animate-marquee` | Infinite horizontal scroll (logo strip) |
| `animate-float` | Gentle vertical bob (6s loop) |
| `glow-pulse` | Pulsing glow on sticky CTA (green) |
| `gradient-shift` | Shifting gradient background (AIAdvantage) |

### Inline CSS animations (page-level `<style>` tags)
Used on standalone pages where Framer Motion is not available (server components).

| Name | Effect | Used on |
|---|---|---|
| `rocketLaunch` | Float + wobble on the 🚀 icon (2.4s loop) | Registration success page heading |

---

## Icons

**Lucide React** — sole icon library. No other icon library is used.
- Default size: `size={16}` for inline, `size={24}` for feature icons
- Feature/section icons: `w-14 h-14 rounded-lg` tinted container at `size={24}`
- LinkedIn icon: custom inline SVG (Lucide doesn't include it)

---

## Images

| Path | Used by |
|---|---|
| `/public/logo/skill-banao-logo.svg` | Navbar, Footer |
| `/public/images/hero-mentors.png` | Main page hero (transparent PNG) |
| `/public/images/webinar-lead-mentors.png` | Webinar hero (transparent PNG) |
| `/public/images/instructors/` | Instructor cards (anil, rajesh, lingko, anish, meril) |
| `/public/images/students/` | Testimonial cards |

**Logo treatment in Navbar:** `filter: brightness(0) invert(1)` for white on dark hero; no filter when scrolled (dark logo on white).

---

## Cursor

All interactive elements show a pointer cursor via global base styles:
```css
button, [role="button"], [role="checkbox"], summary { cursor: pointer; }
```

---

## Standalone Dark Pages

Pages without Navbar/Footer (e.g. registration success) use a dedicated dark palette — do not use the main site light-base tokens here.

| Role | Value |
|---|---|
| Page background | `linear-gradient(160deg, #080612 0%, #0F0A1E 60%, #080612 100%)` |
| Primary text | `#F0EEFF` |
| Secondary text | `#A89EC8` |
| Muted text / labels | `#7A729E` |
| Card background | `rgba(255,255,255,0.04)` |
| Card border | `rgba(91,46,255,0.25)` |
| Divider lines | `rgba(255,255,255,0.07)` |

Icon color palette used on the registration success page (each icon gets its own color + matching tinted `rgba` background):
- Gold `#FFC200` — calendar / date
- Sky blue `#38BDF8` — video/time, email
- Green `#AAFF00` — payment / success states
- WhatsApp green `#25D366` — messaging / WhatsApp
- Orange `#E05A22` — video joining / action items

---

## Analytics

- **GA4:** `G-PB9NCRBKJS` via `@next/third-parties/google`
- **Meta Pixel:** `2142014803010720`
- GA4 events fired on: `generate_lead` (webinar register), `curriculum_download`
