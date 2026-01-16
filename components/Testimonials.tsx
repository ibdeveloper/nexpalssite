'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function Testimonials() {
  const t = useTranslations('testimonials')

  // Placeholder testimonials - replace with real data
  const testimonials = [
    {
      id: 1,
      name: 'Alexandru Popescu',
      role: 'CEO, TechStart',
      content: 'Colaborarea cu NEXPALS a transformat complet viziunea noastră digitală. Rezultatele au depășit așteptările.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Maria Ionescu',
      role: 'CMO, BrandCo',
      content: 'Profesionalism de top și atenție la detalii. Echipa a înțeles perfect nevoile noastre și a livrat o soluție excepțională.',
      rating: 5,
    },
    {
      id: 3,
      name: 'David Smith',
      role: 'Founder, StartupXYZ',
      content: 'The quality of work and attention to detail is outstanding. NEXPALS truly understands modern digital experiences.',
      rating: 5,
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-white">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
