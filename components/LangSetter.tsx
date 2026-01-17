'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

export default function LangSetter() {
  const locale = useLocale()

  useEffect(() => {
    // Set lang attribute on html element
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return null
}
