import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import { routing } from '@/i18n/routing'

// Generate static params for all locales at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Force static generation
export const dynamic = 'force-static'

type Props = {
  params: Promise<{ locale: string }>
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexpals.com'

// Generate metadata for each locale
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })
  const baseUrl = `${siteUrl}/${locale}`
  
  const title = t('title')
  const description = t('description')
  const keywords = t('keywords')

  return {
    title: {
      default: title,
      template: `%s | Nexpals`,
    },
    description,
    keywords: keywords.split(', '),
    authors: [{ name: 'Nexpals' }],
    creator: 'Nexpals',
    publisher: 'Nexpals',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: baseUrl,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: baseUrl,
      title,
      description,
      siteName: 'Nexpals',
      images: [
        {
          url: `${siteUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Nexpals - Premium Digital Agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/images/og-image.png`],
      creator: '@nexpals',
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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Nexpals',
            url: siteUrl,
            logo: `${siteUrl}/images/logo/logo.svg`,
            description: 'Premium Digital Agency specializing in web development, design, and brand identity',
            sameAs: [
              // Add social media links here when available
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: routing.locales,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Nexpals',
            url: siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Mission />
      </main>
    </>
  )
}
