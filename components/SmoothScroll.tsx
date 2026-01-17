'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const smoothScroll = (e: WheelEvent) => {
      // Check if the event target is inside a scrollable container (dropdown, modal, etc.)
      const target = e.target as HTMLElement
      const scrollableContainer = target.closest('[data-scrollable], [class*="overflow"], .overflow-y-auto, .overflow-y-scroll')
      
      // If inside a scrollable container, don't interfere
      if (scrollableContainer && scrollableContainer !== document.body && scrollableContainer !== document.documentElement) {
        return
      }

      // Check if we're already at the top or bottom of the page
      const isAtTop = window.scrollY <= 0
      const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1

      // Only apply smooth scroll if not at boundaries
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        return // Let browser handle edge cases
      }

      // Only apply to vertical scroll with mouse wheel
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return // Horizontal scroll, let it work normally
      }

      // Don't prevent default - just let native smooth scroll work
      // The CSS scroll-behavior: smooth will handle the smoothness
    }

    // Add event listener with passive: true for better performance
    // We're not preventing default, so passive is safe
    window.addEventListener('wheel', smoothScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', smoothScroll)
    }
  }, [])

  return null
}
