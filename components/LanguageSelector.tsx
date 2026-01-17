'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

const languages = [
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'ga', name: 'Gaeilge', flag: '🇮🇪' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'mt', name: 'Malti', flag: '🇲🇹' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
]

interface LanguageSelectorProps {
  scrolled?: boolean
}

export default function LanguageSelector({ scrolled = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const locale = useLocale()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const currentLang = languages.find((l) => l.code === locale) || languages[0]

  // Filter languages based on search
  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode: string) => {
    if (langCode === locale) {
      setIsOpen(false)
      setSearchQuery('')
      return
    }

    setIsOpen(false)
    setSearchQuery('')

    let targetPath = pathname || '/'
    if (!targetPath.startsWith('/')) {
      targetPath = '/' + targetPath
    }

    const newUrl = `/${langCode}${targetPath === '/' ? '' : targetPath}`
    window.location.href = newUrl
  }

  const buttonTextColor = scrolled ? '#002BBA' : '#FFFFFF'

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md transition-colors duration-200 hover:opacity-80"
        style={{ color: buttonTextColor }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <span className="hidden sm:inline">{currentLang.name}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] sm:w-[320px] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-900">Language</label>
              <span className="text-xs text-gray-500">{currentLang.name}</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search language"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Language List */}
          <div className="max-h-[280px] sm:max-h-[320px] overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === locale
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Checkbox */}
                    <div className="flex-shrink-0 mr-3">
                      <div
                        className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Flag */}
                    <span className="text-xl mr-3 flex-shrink-0">{lang.flag}</span>

                    {/* Language Name */}
                    <span className={`flex-1 ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {lang.name}
                    </span>
                  </button>
                )
              })
            ) : (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No languages found
              </div>
            )}
          </div>

          {/* Clear All / Footer */}
          {searchQuery && (
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
