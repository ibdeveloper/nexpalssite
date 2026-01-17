'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout | null = null

    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isScrolling) return
      
      isScrolling = true
      
      // Calculate scroll distance - smaller value = slower scroll
      const scrollAmount = e.deltaY * 0.3 // 0.3 = 30% of normal speed (lent și profi)
      
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      })
      
      // Reset scrolling flag after animation
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 150)
    }

    // Add event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', smoothScroll, { passive: false })
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', smoothScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
