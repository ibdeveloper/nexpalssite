'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Mission() {
  const t = useTranslations('mission')

  const services = [
    t('brandDesign'),
    t('contentCreation'),
    t('digitalMarketing'),
    t('communicationStrategy'),
    t('webDesign'),
    t('webDevelopment'),
  ]

  return (
    <section id="mission" className="py-10 sm:py-14 md:py-20 lg:py-24 xl:py-32" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 leading-tight"
            style={{ color: '#1a1a1a' }}
          >
            {t('heading')}
          </motion.h2>

          {/* Services Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 max-w-4xl"
          >
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index, ease: 'easeOut' }}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium"
                style={{
                  backgroundColor: '#e5e5e5',
                  color: '#1a1a1a',
                }}
              >
                {service}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
