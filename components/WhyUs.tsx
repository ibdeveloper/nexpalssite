'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function WhyUs() {
  const t = useTranslations('whyUs')

  const features = [
    {
      key: 'support',
      title: t('support.title'),
      description: t('support.description'),
      icon: 'help',
    },
    {
      key: 'design',
      title: t('design.title'),
      description: t('design.description'),
      icon: 'backups',
    },
    {
      key: 'technology',
      title: t('technology.title'),
      description: t('technology.description'),
      icon: 'technology',
    },
    {
      key: 'results',
      title: t('results.title'),
      description: t('results.description'),
      icon: 'results',
    },
  ]

  return (
    <section id="why-us" className="py-10 sm:py-14 md:py-20 lg:py-24 xl:py-32" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl" style={{ color: '#1a1a1a' }}>
            {t('subheading')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-6 h-16 sm:h-20 flex items-center">
                {feature.icon === 'help' && (
                  <div className="flex gap-2">
                    {['h', 'e', 'l', 'p'].map((letter, i) => (
                      <motion.div
                        key={letter}
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: [0, -5, 5, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 * i }}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-md flex items-center justify-center text-xl sm:text-2xl font-bold"
                        style={{ color: '#1a1a1a' }}
                      >
                        {letter}
                      </motion.div>
                    ))}
                  </div>
                )}
                {feature.icon === 'backups' && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 rounded-full" style={{ borderColor: '#002BBA' }}></div>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#002BBA' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md" style={{ backgroundColor: '#002BBA' }}></div>
                  </div>
                )}
                {feature.icon === 'technology' && (
                  <div className="text-3xl sm:text-4xl font-light" style={{ color: '#cccccc' }}>
                    2x = 1
                  </div>
                )}
                {feature.icon === 'results' && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <svg className="w-full h-full" viewBox="0 0 60 60" fill="none">
                      <path
                        d="M10 50 L20 35 L35 25 L50 15"
                        stroke="#002BBA"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line x1="50" y1="15" x2="50" y2="50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                      <line x1="10" y1="50" x2="50" y2="50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg leading-relaxed" style={{ color: '#1a1a1a' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
