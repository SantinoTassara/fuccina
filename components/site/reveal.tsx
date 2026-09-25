'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'

import { DURATION_REVEAL, EASE_OUT } from '@/components/site/motion'

type RevealProps = {
  children: ReactNode
  /** Retraso en segundos, para escalonar entradas de un mismo bloque. */
  delay?: number
  /** Desplazamiento vertical inicial, en píxeles. */
  distance?: number
  className?: string
}

/**
 * Entrada de un bloque cuando entra en pantalla.
 *
 * Es el motor de scroll reveal de la landing. Reemplaza al par `.reveal` /
 * `.is-in` de `globals.css`: en vez de una `IntersectionObserver` que alterna
 * clases y transiciones CSS, framer-motion mide el viewport con
 * `whileInView`. La escala de tiempos y la curva salen de los mismos tokens
 * (ver `motion.tsx`), así que el resultado visual es el mismo.
 *
 * Se anima una sola vez (`viewport.once`) y sólo mueve `transform` y `opacity`,
 * que viven en capa de compositor: no dispara layout ni paint en cada frame.
 *
 * El atributo `data-motion-hidden` marca todo lo que arranca en `opacity: 0`:
 * lo consume el `<noscript>` del layout para que, sin JavaScript, quede
 * visible. Si agregás una animación de entrada con estado inicial oculto,
 * marcá el elemento con el mismo atributo o va a quedar invisible sin JS.
 */
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
