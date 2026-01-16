'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'

export default function Portfolio() {
  const t = useTranslations('portfolio')

  // Placeholder projects - replace with real data
  const projects = [
    {
      id: 1,
      title: 'Premium E-Commerce Platform',
      category: 'E-Commerce',
      image: '/api/placeholder/600/400',
    },
    {
      id: 2,
      title: 'Enterprise SaaS Solution',
      category: 'Web App',
      image: '/api/placeholder/600/400',
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'Mobile',
      image: '/api/placeholder/600/400',
    },
    {
      id: 4,
      title: 'Brand Identity & Design',
      category: 'Branding',
      image: '/api/placeholder/600/400',
    },
    {
      id: 5,
      title: 'Healthcare Platform',
      category: 'Web App',
      image: '/api/placeholder/600/400',
    },
    {
      id: 6,
      title: 'FinTech Dashboard',
      category: 'SaaS',
      image: '/api/placeholder/600/400',
    },
  ]

  return (
    <section id="projects" className="py-24 lg:py-32 bg-gray-50">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-out"
            >
              {/* Image Placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-6xl opacity-20">✨</span>
              </div>

              {/* Content Overlay */}
              <div className="p-6">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <Link
                  href="/#contact"
                  className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group/link"
                >
                  {t('viewProject')}
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
