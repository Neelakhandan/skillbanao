import type { Metadata, Viewport } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { DM_Sans } from 'next/font/google'
import { MainLayout } from '@/components/layout/MainLayout'
import { StickyBottomBar } from '@/components/ui/StickyBottomBar'
import { getContent } from '@/lib/content'
import type { WebinarSchedule } from '@/lib/types'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const viewport: Viewport = {
  themeColor: '#5B2EFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://skillbanao.in'),
  title: {
    default: 'Skill Banao — UI/UX Design Fellowship | Live Mentorship & Placement',
    template: '%s | Skill Banao',
  },
  description:
    "Join Skill Banao's UI/UX Design Fellowship — India's most intensive live program with expert mentors, real projects, and 1-year placement support. 3500+ alumni placed.",
  keywords: [
    'UI UX design course India',
    'UX design fellowship',
    'learn UI UX online',
    'Figma course',
    'product design bootcamp India',
    'Skill Banao',
    'UX design mentorship',
    'UI design bootcamp',
    'design career India',
  ],
  authors: [{ name: 'Skill Banao', url: 'https://skillbanao.in' }],
  creator: 'Skill Banao',
  publisher: 'Skill Banao',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://skillbanao.in',
    siteName: 'Skill Banao',
    title: 'Skill Banao — UI/UX Design Fellowship',
    description: "India's most intensive UI/UX design fellowship — live mentorship, real projects, 94% placement rate.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Skill Banao — UI/UX Design Fellowship' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@skillbanao',
    creator: '@skillbanao',
    title: 'Skill Banao — UI/UX Design Fellowship',
    description: "India's most intensive UI/UX design fellowship — live mentorship, real projects, 94% placement rate.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://skillbanao.in',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  category: 'education',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schedule = getContent<WebinarSchedule>('webinar-schedule.md')

  return (
    <html
      lang="en"
      className={`${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: 'var(--font-body)' }} suppressHydrationWarning>
        <MainLayout>{children}</MainLayout>
        <StickyBottomBar date={schedule.date} short_date={schedule.short_date} time={schedule.time} />
        <GoogleAnalytics gaId="G-PB9NCRBKJS" />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2142014803010720');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  )
}
