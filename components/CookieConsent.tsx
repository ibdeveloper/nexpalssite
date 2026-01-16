'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

interface CookiePreferences {
  essentials: boolean
  marketing: boolean
  personalization: boolean
  analytics: boolean
}

export default function CookieConsent() {
  const t = useTranslations('cookies')
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essentials: true, // Always active
    marketing: false,
    personalization: false,
    analytics: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true)
      }, 1000)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(cookieConsent)
        setPreferences(saved)
      } catch (e) {
        // If parsing fails, use defaults
      }
    }
  }, [])

  const handleAccept = () => {
    const allAccepted: CookiePreferences = {
      essentials: true,
      marketing: true,
      personalization: true,
      analytics: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
    setShowBanner(false)
  }

  const handleDeny = () => {
    const denied: CookiePreferences = {
      essentials: true, // Always active
      marketing: false,
      personalization: false,
      analytics: false,
    }
    setPreferences(denied)
    localStorage.setItem('cookieConsent', JSON.stringify(denied))
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences))
    setShowPreferences(false)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      essentials: true,
      marketing: false,
      personalization: false,
      analytics: false,
    }
    setPreferences(rejected)
    localStorage.setItem('cookieConsent', JSON.stringify(rejected))
    setShowPreferences(false)
    setShowBanner(false)
  }

  const handleAcceptAll = () => {
    const accepted: CookiePreferences = {
      essentials: true,
      marketing: true,
      personalization: true,
      analytics: true,
    }
    setPreferences(accepted)
    localStorage.setItem('cookieConsent', JSON.stringify(accepted))
    setShowPreferences(false)
    setShowBanner(false)
  }

  if (!showBanner && !showPreferences) return null

  return (
    <>
      {/* Cookie Banner - Bottom Right */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 max-w-sm sm:max-w-md"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
              style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5' }}
            >
              <h3
                className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                style={{ color: '#002BBA' }}
              >
                {t('title')}
              </h3>
              <p
                className="text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed"
                style={{ color: '#002BBA', opacity: 0.8 }}
              >
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 touch-manipulation"
                  style={{
                    backgroundColor: '#002BBA',
                    color: '#ffffff',
                    minHeight: '44px',
                  }}
                >
                  {t('accept')}
                </button>
                <button
                  onClick={handleDeny}
                  className="flex-1 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 touch-manipulation border-2"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#002BBA',
                    borderColor: '#002BBA',
                    minHeight: '44px',
                  }}
                >
                  {t('deny')}
                </button>
              </div>
              <button
                onClick={() => {
                  setShowBanner(false)
                  setShowPreferences(true)
                }}
                className="w-full text-center text-sm sm:text-base font-medium transition-opacity duration-200 hover:opacity-70 touch-manipulation"
                style={{ color: '#002BBA' }}
              >
                {t('preferences')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPreferences(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                style={{ backgroundColor: '#fafafa', border: '1px solid #e5e5e5' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#e5e5e5' }}>
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: '#002BBA' }}
                  >
                    {t('preferencesTitle')}
                  </h2>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-70 touch-manipulation"
                    style={{
                      backgroundColor: '#002BBA',
                      color: '#ffffff',
                      minWidth: '44px',
                      minHeight: '44px',
                    }}
                    aria-label={t('close')}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Essentials - Always Active */}
                  <div className="pb-6 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3
                          className="text-base sm:text-lg font-bold mb-1"
                          style={{ color: '#002BBA' }}
                        >
                          {t('essentials')}
                        </h3>
                        <span
                          className="text-xs sm:text-sm font-semibold"
                          style={{ color: '#002BBA' }}
                        >
                          {t('alwaysActive')}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: '#002BBA', opacity: 0.7 }}
                    >
                      {t('essentialsDescription')}
                    </p>
                  </div>

                  {/* Marketing */}
                  <div className="pb-6 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-base sm:text-lg font-bold"
                        style={{ color: '#002BBA' }}
                      >
                        {t('marketing')}
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) =>
                            setPreferences({ ...preferences, marketing: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div
                          className="w-11 h-6 rounded-full peer transition-colors duration-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                          style={{
                            backgroundColor: preferences.marketing ? '#002BBA' : '#d4d4d4',
                          }}
                        />
                      </label>
                    </div>
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: '#002BBA', opacity: 0.7 }}
                    >
                      {t('marketingDescription')}
                    </p>
                  </div>

                  {/* Personalization */}
                  <div className="pb-6 border-b" style={{ borderColor: '#e5e5e5' }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-base sm:text-lg font-bold"
                        style={{ color: '#002BBA' }}
                      >
                        {t('personalization')}
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.personalization}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              personalization: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div
                          className="w-11 h-6 rounded-full peer transition-colors duration-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                          style={{
                            backgroundColor: preferences.personalization
                              ? '#002BBA'
                              : '#d4d4d4',
                          }}
                        />
                      </label>
                    </div>
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: '#002BBA', opacity: 0.7 }}
                    >
                      {t('personalizationDescription')}
                    </p>
                  </div>

                  {/* Analytics */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className="text-base sm:text-lg font-bold"
                        style={{ color: '#002BBA' }}
                      >
                        {t('analytics')}
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) =>
                            setPreferences({ ...preferences, analytics: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div
                          className="w-11 h-6 rounded-full peer transition-colors duration-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                          style={{
                            backgroundColor: preferences.analytics ? '#002BBA' : '#d4d4d4',
                          }}
                        />
                      </label>
                    </div>
                    <p
                      className="text-sm sm:text-base leading-relaxed"
                      style={{ color: '#002BBA', opacity: 0.7 }}
                    >
                      {t('analyticsDescription')}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t flex flex-col sm:flex-row gap-3 sm:gap-4" style={{ borderColor: '#e5e5e5' }}>
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 touch-manipulation border-2"
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#002BBA',
                      borderColor: '#002BBA',
                      minHeight: '44px',
                    }}
                  >
                    {t('rejectAll')}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:opacity-90 touch-manipulation"
                    style={{
                      backgroundColor: '#002BBA',
                      color: '#ffffff',
                      minHeight: '44px',
                    }}
                  >
                    {t('acceptAll')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
