import { useTranslations } from 'next-intl'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Process from '@/components/Process'
import { routing } from '@/i18n/routing'

// Generate static params for all locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Force static generation
export const dynamic = 'force-static'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Mission />
      <Process />
    </main>
  )
}
