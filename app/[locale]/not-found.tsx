'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'
import Header from '@/components/Header'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-8xl sm:text-9xl font-bold mb-4"
            style={{ color: '#002BBA' }}
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6"
            style={{ color: '#002BBA' }}
          >
            {t('title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg text-gray-600 mb-8"
          >
            {t('description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: '#002BBA',
                color: '#ffffff',
              }}
            >
              {t('button')}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
