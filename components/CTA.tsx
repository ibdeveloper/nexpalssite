'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from '@/i18n/routing'

export default function CTA() {
  const t = useTranslations('cta')
  const sectionRef = useRef<HTMLElement>(null)
  const [showVideo, setShowVideo] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Transformăm scroll progress în scale pentru pătrat albastru
  const containerScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1.2])
  const videoOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1])
  
  // Când scroll progress > 0.2, arătăm video-ul
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.2) {
      setShowVideo(true)
    }
  })

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#fafafa' }}
    >
      {/* Video Background - Apare pe scroll */}
      {showVideo && (
        <motion.div
          style={{
            opacity: videoOpacity,
          }}
          className="absolute inset-0 w-full h-full -z-10"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            aria-label="Background video"
          >
            <source src="/images/logo/5726125-uhd_3840_2160_30fps.mp4" type="video/mp4" />
          </video>
          {/* Overlay pentru lizibilitate */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      )}

      {/* Pătrat Albastru - Se mărește pe scroll */}
      <motion.div
        style={{
          scale: containerScale,
        }}
        className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 aspect-square sm:aspect-[4/3] max-w-4xl"
      >
        <div 
          className="w-full h-full rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center items-center space-y-6 sm:space-y-8 md:space-y-10 shadow-2xl"
          style={{ backgroundColor: '#002BBA' }}
        >
          {/* Titlu - Stil Hero */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-tight text-center"
          >
            {t('title')}
          </motion.h2>

          {/* Buton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/#contact"
              className="inline-block px-10 sm:px-14 py-4 sm:py-5 bg-white text-gray-900 rounded-full font-semibold text-base sm:text-lg md:text-xl hover:bg-gray-100 transition-all duration-300 ease-out shadow-lg hover:shadow-xl"
            >
              {t('button')}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
