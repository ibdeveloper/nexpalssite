'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'

const languages = [
  { code: 'ro', name: 'Română' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'pl', name: 'Polski' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'bg', name: 'Български' },
  { code: 'cs', name: 'Čeština' },
  { code: 'da', name: 'Dansk' },
  { code: 'et', name: 'Eesti' },
  { code: 'fi', name: 'Suomi' },
  { code: 'ga', name: 'Gaeilge' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'hr', name: 'Hrvatski' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'mt', name: 'Malti' },
  { code: 'hu', name: 'Magyar' },
  { code: 'sk', name: 'Slovenčina' },
  { code: 'sl', name: 'Slovenščina' },
  { code: 'sv', name: 'Svenska' },
]

interface LanguageSelectorProps {
  scrolled?: boolean
}

export default function LanguageSelector({ scrolled = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(languages[0])
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lang = languages.find((l) => l.code === locale) || languages[0]
    setCurrentLang(lang)
  }, [locale])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    // usePathname() from next-intl should return pathname without locale prefix
    // But we clean it to ensure no duplicate locale prefixes
    let cleanPathname = pathname || '/'
    
    // Remove any locale prefix that might be in the pathname
    // Match pattern: /[locale]/ or /[locale]
    cleanPathname = cleanPathname.replace(/^\/[a-z]{2}(\/.*)?$/, (match, rest) => rest || '/')
    
    // Ensure pathname starts with /
    if (!cleanPathname.startsWith('/')) {
      cleanPathname = '/' + cleanPathname
    }
    
    // Navigate to the new locale with the clean pathname
    router.replace(cleanPathname, { locale: langCode })
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md transition-colors duration-200 hover:opacity-80"
        style={{
          color: scrolled ? '#002BBA' : '#FFFFFF',
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <span>{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="py-1 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  currentLang.code === lang.code
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
