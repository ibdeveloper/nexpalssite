'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function PortfolioBanner() {
  const t = useTranslations('portfolioBanner')

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          aria-label="Portfolio background video"
        >
          <source src="/images/logo/9488542-uhd_4096_2160_25fps.mp4" type="video/mp4" />
        </video>
        {/* Overlay pentru contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Top Left - Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl sm:max-w-3xl md:max-w-4xl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Bottom Left - Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="self-start"
        >
          <Link
            href="/under-construction"
            className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base md:text-lg transition-all duration-300 ease-out backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
            }}
          >
            {t('button')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
