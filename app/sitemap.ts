import { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexpals.com'
  
  const routes = ['', '/under-construction']
  
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate sitemap entries for each locale
  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${baseUrl}/${locale}${route}`
      
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [
              loc,
              `${baseUrl}/${loc}${route}`,
            ])
          ),
        },
      })
    })
  })

  return sitemapEntries
}
