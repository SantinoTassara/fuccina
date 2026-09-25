'use client'

import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion'
import type { ReactNode } from 'react'

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1]

export const DURATION_FAST = 0.16
export const DURATION_BASE = 0.3
export const DURATION_REVEAL = 0.62


export const STAGGER = 0.07


export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
