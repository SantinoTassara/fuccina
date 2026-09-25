'use client'

import { useCallback, useEffect, useRef } from 'react'

/**
 * Bloquea el scroll del documento mientras el menú móvil está abierto.
 *
 * Al bloquear, el ancho de la barra de desplazamiento desaparece y el layout
 * salta horizontalmente. Por eso se compensa con `padding-right` igual al ancho
 * de la barra.
 *
 * Devuelve `release`, que permite restaurar los estilos **de forma
 * síncrona**. El menú lo necesita justo antes de navegar a un ancla: si el
 * `overflow: hidden` siguiera puesto cuando el navegador procesa el clic, el
 * salto a la sección no ocurriría.
 */
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
