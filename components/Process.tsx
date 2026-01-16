'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function Process() {
  const t = useTranslations('process')

  // Funcție pentru a formata textul cu bold pentru cuvintele **bold**
  const formatHeading = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const word = part.replace(/\*\*/g, '')
        return (
          <span key={index} className="italic text-white/90">
            {word}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  const steps = [
    {
      key: 'strategy',
    },
    {
      key: 'design',
    },
    {
      key: 'development',
    },
    {
      key: 'marketing',
    },
    {
      key: 'photoVideo',
    },
    {
      key: 'cybersecurity',
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32" style={{ backgroundColor: '#002BBA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        {/* Main Heading - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20"
        >
          <h2 
            className="font-bold text-white max-w-full md:max-w-4xl" 
            style={{ 
              fontSize: 'clamp(1.25rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            {formatHeading(t('heading'))}
          </h2>
        </motion.div>

        {/* Process Steps - Grid cu 6 servicii */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 50,
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              className="relative"
            >
              {/* Decorative Line - Animated */}
              <motion.div
                variants={{
                  hidden: { width: 0, opacity: 0 },
                  visible: {
                    width: '100%',
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  },
                }}
                className="h-px bg-white/30 mb-6 sm:mb-8"
              />

              {/* Title and Duration Row - Animated */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  },
                }}
                className="flex items-baseline justify-between mb-3 sm:mb-4"
              >
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white leading-tight">
                  {t(`${step.key}.title`)}
                </h3>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        delay: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    },
                  }}
                  className="text-xs sm:text-sm md:text-base text-white/80 font-normal ml-3 sm:ml-4 flex-shrink-0"
                >
                  {t(`${step.key}.duration`)}
                </motion.span>
              </motion.div>

              {/* Description - Animated */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    },
                  },
                }}
                className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90 mt-2 sm:mt-3"
              >
                {t(`${step.key}.description`)}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
