'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import Header from '@/components/Header'

type Translations = {
  title: string
  description: string
  button: string
}

export default function UnderConstructionContent({ translations }: { translations: Translations }) {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <motion.div 
              className="inline-block p-4 rounded-full mb-4 relative" 
              style={{ backgroundColor: '#002BBA', opacity: 0.1 }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                className="w-12 h-12 sm:w-14 sm:h-14"
                style={{ color: '#002BBA' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 whitespace-nowrap"
            style={{ color: '#002BBA' }}
          >
            {translations.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm sm:text-base text-gray-600 mb-6 whitespace-nowrap"
          >
            {translations.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-out shadow-md hover:shadow-lg"
              style={{
                backgroundColor: '#002BBA',
                color: '#ffffff',
              }}
            >
              {translations.button}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
