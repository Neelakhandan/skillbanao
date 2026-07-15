import { headers } from 'next/headers'
import { getContent } from '@/lib/content'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import type { SiteData } from '@/lib/types'

const STANDALONE_PATHS = ['/registration-success-msg-sb-uxcohourt-truelearning']

export async function MainLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  if (STANDALONE_PATHS.some((p) => pathname.startsWith(p))) {
    return <>{children}</>
  }

  const site = getContent<SiteData>('site.md')

  return (
    <>
      <Navbar
        navLinks={site.nav_links}
        ctaNav={site.cta_nav}
        logo={site.logo}
        siteName={site.name}
      />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer footer={site.footer} siteName={site.name} />
    </>
  )
}
