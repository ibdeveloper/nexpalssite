import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '../../i18n/routing'
import type { Metadata, Viewport } from 'next'
import '../globals.css'
import CookieConsent from '@/components/CookieConsent'

// Generate static params for all locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Force static generation
export const dynamic = 'force-static'

export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
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
  const messages = await getMessages()

  return (
    <html lang={locale || routing.defaultLocale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
