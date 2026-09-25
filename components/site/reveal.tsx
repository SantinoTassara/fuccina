'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'

import { DURATION_REVEAL, EASE_OUT } from '@/components/site/motion'

type RevealProps = {
  children: ReactNode

  delay?: number

  distance?: number
  className?: string
}


export function Reveal({ children, delay = 0, distance = 18, className }: RevealProps) {
  return (
    <m.div
      data-motion-hidden=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DURATION_REVEAL, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  )
}
