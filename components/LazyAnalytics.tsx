'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function LazyAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const enable = () => setEnabled(true)
    // Enable analytics after first user interaction (click, scroll, keypress)
    window.addEventListener('click', enable, { once: true })
    window.addEventListener('scroll', enable, { once: true })
    window.addEventListener('keydown', enable, { once: true })
    return () => {
      window.removeEventListener('click', enable)
      window.removeEventListener('scroll', enable)
      window.removeEventListener('keydown', enable)
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
