'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Mission() {
  const t = useTranslations('mission')
  const description = t('description')

  // Funcție pentru a înlocui "Nexpals" și "website" cu span stilizat (italic)
  const formatText = (text: string) => {
    const parts = text.split(/(Nexpals|website)/gi)
    return parts.map((part, partIndex) => {
      if (part.toLowerCase() === 'nexpals') {
        return (
          <span key={partIndex} className="italic" style={{ color: '#002BBA' }}>
            Nexpals
          </span>
        )
      }
      if (part.toLowerCase() === 'website') {
        return (
          <span key={partIndex} className="italic" style={{ color: '#002BBA' }}>
            website
          </span>
        )
      }
      return <span key={partIndex}>{part}</span>
    })
  }

  return (
    <section id="mission" className="py-10 sm:py-14 md:py-20 lg:py-24 xl:py-32" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Stânga: Titlu "Misiune" - 20% */}
          <motion.div
            initial={{ opacity: 0.3 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-4 sm:mb-6 md:mb-0 md:col-span-1"
          >
            <h2 className="font-perfectly-nineties text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-[1.1] md:leading-tight" style={{ color: '#002BBA' }}>
              {t('title')}
            </h2>
          </motion.div>

          {/* Dreapta: Descriere lungă - 80% */}
          <p
            className="font-sans max-w-full md:col-span-4"
            style={{ 
              color: '#002BBA',
              fontSize: 'clamp(14px, 3.5vw, 30px)',
              fontWeight: 700,
              lineHeight: '1.4',
              marginLeft: '30px'
            }}
          >
            {formatText(description)}
          </p>
        </div>
      </div>
    </section>
  )
}
