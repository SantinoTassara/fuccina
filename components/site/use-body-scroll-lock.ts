'use client'

import { useCallback, useEffect, useRef } from 'react'


export function useBodyScrollLock(locked: boolean) {
  const restoreRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    const restore = () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }

    restoreRef.current = restore
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      restoreRef.current = null
      restore()
    }
  }, [locked])

  return useCallback(() => {
    restoreRef.current?.()
  }, [])
}
