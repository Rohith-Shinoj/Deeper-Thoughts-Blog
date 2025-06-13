'use client'

import { useEffect, useState } from 'react'
import { Particles } from '@tsparticles/react'
import { useMemo } from 'react'

const ParticlesBackground = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      particles: {
        number: { value: 60 },
        color: { value: '#06b6d4' },
        links: { enable: true, color: '#67e8f9', distance: 100 },
        move: { enable: true, speed: 0.8 },
        size: { value: 2 },
        opacity: { value: 0.5 },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 80 } },
      },
    }),
    []
  )

  if (!show) return null

  return (
    <div className="absolute top-0 left-0 -z-10 h-full w-full">
      <Particles id="tsparticles" options={options} />
    </div>
  )
}

export default ParticlesBackground
