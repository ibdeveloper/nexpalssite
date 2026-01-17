'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let isScrolling = false
    let scrollVelocity = 0
    let animationFrameId: number | null = null

    const smoothScroll = (e: WheelEvent) => {
      // Check if the event target is inside a scrollable container (dropdown, modal, etc.)
      const target = e.target as HTMLElement
      const scrollableContainer = target.closest('[data-scrollable], [class*="overflow"], .overflow-y-auto, .overflow-y-scroll')
      
      // If inside a scrollable container, don't interfere
      if (scrollableContainer && scrollableContainer !== document.body && scrollableContainer !== document.documentElement) {
        return
      }

      // Only apply to vertical scroll with mouse wheel
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return // Horizontal scroll, let it work normally
      }

      e.preventDefault()
      
      // Accumulate scroll velocity for smoother animation
      scrollVelocity += e.deltaY * 0.15 // 0.15 = 15% of normal speed (lent și profi)
      
      if (!isScrolling) {
        isScrolling = true
        animateScroll()
      }
    }

    const animateScroll = () => {
      if (Math.abs(scrollVelocity) < 0.1) {
        // Stop scrolling when velocity is very small
        scrollVelocity = 0
        isScrolling = false
        return
      }

      // Apply easing for smooth deceleration
      const friction = 0.92 // Higher = slower deceleration
      scrollVelocity *= friction

      // Scroll with smooth animation
      window.scrollBy({
        top: scrollVelocity,
        behavior: 'auto' // Use auto for custom smooth control
      })

      animationFrameId = requestAnimationFrame(animateScroll)
    }

    // Add event listener with passive: false to allow preventDefault
    // Apply to both desktop (mouse wheel) and touch devices
    window.addEventListener('wheel', smoothScroll, { passive: false })
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', smoothScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return null
}
