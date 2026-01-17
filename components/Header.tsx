'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import LanguageSelector from './LanguageSelector'

export default function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/under-construction', label: t('services') },
    { href: '/under-construction', label: t('projects') },
    { href: '/under-construction', label: t('about') },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'shadow-sm'
          : 'bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? '#fafafa' : 'transparent',
        borderBottom: scrolled ? '1px solid #002BBA' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="relative flex items-center justify-between h-16 lg:h-20">
          {/* Left - Logo pe mobile, Navigation pe desktop */}
          <div className="flex items-center flex-1 lg:flex-none lg:flex-1">
            {/* Logo - Stânga pe mobile, Centrat pe desktop */}
            <Link
              href="/"
              className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 flex items-center justify-center"
              aria-label="Home"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-32 h-10 sm:w-36 sm:h-11 md:w-44 md:h-14 lg:w-52 lg:h-16"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scrolled ? 'scrolled' : 'default'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={scrolled ? '/images/logo/Group 1772 (1).svg' : '/images/logo/logo.svg'}
                      alt="NEXPALS Logo"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 128px, (max-width: 1024px) 176px, 208px"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{
                    color: scrolled ? '#002BBA' : '#FFFFFF',
                  }}
                >
                  {item.label}
                  <span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out"
                    style={{
                      backgroundColor: scrolled ? '#002BBA' : '#FFFFFF',
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right - Hamburger pe mobile, Contact + Language Selector pe desktop */}
          <div className="flex items-center justify-end gap-4">
            {/* Mobile Menu Button - Dreapta */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md transition-all duration-200 touch-manipulation"
              style={{
                color: scrolled ? '#002BBA' : '#FFFFFF',
                fontWeight: 400,
                minWidth: '44px',
                minHeight: '44px',
              }}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <motion.span
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.95 }}
                className="font-sans text-base font-bold"
              >
                {t('menu')}
              </motion.span>
            </button>

            {/* Desktop - Contact + Language Selector */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Contact Link */}
              <Link
                href="/under-construction"
                className="text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                style={{
                  color: scrolled ? '#002BBA' : '#FFFFFF',
                }}
              >
                {t('hosting')}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ease-out"
                  style={{
                    backgroundColor: scrolled ? '#002BBA' : '#FFFFFF',
                  }}
                />
              </Link>
              
              {/* Language Selector */}
              <LanguageSelector scrolled={scrolled} />
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 z-40"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              />
              
              {/* Full Screen Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden fixed inset-0 z-50"
                style={{ backgroundColor: '#fafafa' }}
              >
                {/* Header - Logo Left, Close Right */}
                <div className="flex items-center justify-between px-6 sm:px-8 py-6 sm:py-8">
                  {/* Logo Left */}
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center"
                    aria-label="Home"
                  >
                    <div className="relative w-32 h-10 sm:w-36 sm:h-11">
                      <Image
                        src="/images/logo/Group 1772 (1).svg"
                        alt="NEXPALS Logo"
                        fill
                        className="object-contain"
                        priority
                        sizes="128px"
                      />
                    </div>
                  </Link>

                  {/* Close Button Right */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 focus:outline-none"
                    aria-label="Close menu"
                    style={{ color: '#002BBA' }}
                  >
                    <span className="font-sans text-lg sm:text-xl font-bold">
                      {t('close')}
                    </span>
                    {/* Close Icon - Circle with X */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="8" y1="8" x2="16" y2="16" />
                      <line x1="16" y1="8" x2="8" y2="16" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Items - Centered Vertically */}
                <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] px-6 sm:px-8">
                  <nav className="w-full max-w-md space-y-0">
                    {navItems.map((item, index) => (
                      <div key={item.href} className="relative">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-center py-6 sm:py-8 transition-opacity duration-200 hover:opacity-70 block"
                          style={{
                            color: '#002BBA',
                          }}
                        >
                          <span className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold">
                            {item.label}
                          </span>
                        </Link>
                        {/* Separator Line - except last item */}
                        {index < navItems.length - 1 && (
                          <div
                            className="h-px w-full"
                            style={{ backgroundColor: '#e5e5e5' }}
                          />
                        )}
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Language Selector - Bottom */}
                <div className="absolute bottom-8 left-0 right-0 px-6 sm:px-8">
                  <div className="flex justify-center">
                    <LanguageSelector scrolled={true} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
