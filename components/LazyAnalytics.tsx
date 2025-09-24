'use client'

import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function LazyAnalytics() {
  useEffect(() => {
    // Only load analytics after page is fully loaded
    const timer = setTimeout(() => {
      // Analytics will be loaded here
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
