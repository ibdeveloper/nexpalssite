import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '../../i18n/routing'
import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import CookieConsent from '@/components/CookieConsent'
import SmoothScroll from '@/components/SmoothScroll'
import LangSetter from '@/components/LangSetter'

// Generate static params for all locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Force static generation
export const dynamic = 'force-static'

// Base metadata - specific metadata is generated in page.tsx
export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#002BBA',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Enable static rendering
  setRequestLocale(locale)
  
  // Get messages for the current locale
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LangSetter />
      <SmoothScroll />
      {children}
      <CookieConsent />
      <SpeedInsights />
    </NextIntlClientProvider>
  )
}
