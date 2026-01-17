'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('hero')

  const slides = [
    {
      id: 1,
      text: t('slide1'),
      video: '/images/logo/10679051-uhd_4096_2160_25fps.mp4',
    },
    {
      id: 2,
      text: t('slide2'),
      video: '/images/logo/10640372-uhd_4096_2160_25fps.mp4',
    },
    {
      id: 3,
      text: t('slide3'),
      video: '/images/logo/10678448-uhd_4096_2160_25fps.mp4',
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [videosLoaded, setVideosLoaded] = useState<Record<number, boolean>>({})

  // Preload următorul video când se schimbă slide-ul
  useEffect(() => {
    const preloadNextVideo = (nextIndex: number) => {
      const nextSlide = slides[nextIndex]
      if (!nextSlide || videosLoaded[nextIndex]) return

      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.src = nextSlide.video
      
      video.oncanplaythrough = () => {
        setVideosLoaded((prev) => ({ ...prev, [nextIndex]: true }))
      }
    }

    // Preload următorul și următorul-următorul
    const nextIndex = (currentSlide + 1) % slides.length
    const afterNextIndex = (currentSlide + 2) % slides.length
    preloadNextVideo(nextIndex)
    preloadNextVideo(afterNextIndex)
  }, [currentSlide, slides, videosLoaded])

  useEffect(() => {
    // Preload primul video la mount
    if (slides[0] && !videosLoaded[0]) {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.src = slides[0].video
      
      video.oncanplaythrough = () => {
        setVideosLoaded((prev) => ({ ...prev, [0]: true }))
      }
    }
  }, [slides, videosLoaded])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length
      
      // Dacă video-ul următor este încărcat, schimbă slide-ul
      if (videosLoaded[nextSlide] || videosLoaded[currentSlide]) {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentSlide(nextSlide)
          setIsAnimating(false)
        }, 300) // Delay pentru crossfade
      }
    }, 6000) // 6 secunde

    return () => clearInterval(interval)
  }, [currentSlide, slides.length, videosLoaded])

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isAnimating) {
      // Preload video-ul dacă nu este încărcat
      if (!videosLoaded[index] && slides[index]) {
        const video = document.createElement('video')
        video.preload = 'auto'
        video.muted = true
        video.src = slides[index].video
        
        video.oncanplaythrough = () => {
          setVideosLoaded((prev) => ({ ...prev, [index]: true }))
          setIsAnimating(true)
          setTimeout(() => {
            setCurrentSlide(index)
            setIsAnimating(false)
          }, 300)
        }
        
        // Timeout fallback - schimbă slide-ul după 2 secunde chiar dacă nu s-a încărcat
        setTimeout(() => {
          if (!videosLoaded[index]) {
            setIsAnimating(true)
            setTimeout(() => {
              setCurrentSlide(index)
              setIsAnimating(false)
            }, 300)
          }
        }, 2000)
      } else {
        setIsAnimating(true)
        setTimeout(() => {
          setCurrentSlide(index)
          setIsAnimating(false)
        }, 300)
      }
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Slider */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <video
                    key={slide.id}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    aria-label={`Background video ${slide.id}`}
                    poster=""
                    onLoadedData={() => {
                      setVideosLoaded((prev) => ({ ...prev, [index]: true }))
                    }}
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                  {/* Overlay pentru contrast */}
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Text Stânga Centrat - Responsive */}
      <div className="absolute top-1/2 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 transform -translate-y-1/2 right-4 sm:right-6 md:right-auto z-10 max-w-[calc(100%-2rem)] sm:max-w-2xl">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.h1
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white tracking-tight leading-[1.2] text-left"
                  style={{ 
                    whiteSpace: 'normal',
                  }}
                >
                  {slide.text}
                </motion.h1>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Responsive */}
      <div className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-2 sm:space-x-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className="relative group focus:outline-none touch-manipulation"
            aria-label={`Go to slide ${index + 1}`}
            style={{ minWidth: '44px', minHeight: '44px', padding: '8px' }}
          >
            <div className="w-10 h-0.5 sm:w-12 sm:h-1 bg-white/40 rounded-full overflow-hidden">
              {index === currentSlide && (
                <motion.div
                  key={`progress-${currentSlide}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="h-full bg-white rounded-full"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
