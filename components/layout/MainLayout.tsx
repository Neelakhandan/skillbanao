import { getContent } from '@/lib/content'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import type { SiteData } from '@/lib/types'

export async function MainLayout({ children }: { children: React.ReactNode }) {
  const site = getContent<SiteData>('site.md')

  return (
    <>
      <Navbar
        navLinks={site.nav_links}
        ctaNav={site.cta_nav}
        logo={site.logo}
        siteName={site.name}
      />
      <main className="flex-1 pt-16 pb-16">
        {children}
      </main>
      <Footer footer={site.footer} siteName={site.name} />
    </>
  )
}
