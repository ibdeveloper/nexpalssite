import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexpals.com'
  
  // Generate sitemap URLs for all locales
  const sitemapUrls = routing.locales.map(
    locale => `${baseUrl}/${locale}/sitemap.xml`
  )

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: sitemapUrls.length > 0 ? sitemapUrls : `${baseUrl}/sitemap.xml`,
  }
}
