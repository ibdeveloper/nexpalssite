'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function WhyUs() {
  const t = useTranslations('whyUs')

  const values = [
    {
      key: 'excellence',
      icon: '⭐',
    },
    {
      key: 'innovation',
      icon: '🚀',
    },
    {
      key: 'partnership',
      icon: '🤝',
    },
    {
      key: 'results',
      icon: '📈',
    },
  ]

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl mb-6">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t(`${value.key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`${value.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
