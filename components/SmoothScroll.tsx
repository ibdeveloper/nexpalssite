'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Only apply on desktop (not touch devices)
    if (typeof window === 'undefined' || 'ontouchstart' in window) {
      return
    }

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout | null = null

    const smoothScroll = (e: WheelEvent) => {
      // Only apply to vertical scroll with mouse wheel
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return // Horizontal scroll, let it work normally
      }

      e.preventDefault()
      
      if (isScrolling) return
      
      isScrolling = true
      
      // Calculate scroll distance - 0.5 = 50% of normal speed (mai lent, mai profi)
      const scrollAmount = e.deltaY * 0.5
      
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      })
      
      // Reset scrolling flag after animation
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
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
