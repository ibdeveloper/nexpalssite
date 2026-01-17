import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import UnderConstructionContent from './UnderConstructionContent'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-static'

export default async function UnderConstructionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('underConstruction')

  return <UnderConstructionContent translations={t} />
}
