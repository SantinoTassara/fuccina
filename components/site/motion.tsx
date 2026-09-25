'use client'

import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion'
import type { ReactNode } from 'react'

/*
 * Escala de movimiento.
 *
 * Estos valores replican uno a uno las custom properties de la sección MOVIMIENTO
 * de `app/globals.css`:
 *
 *   --motion-ease-out → EASE_OUT     --motion-fast   → DURATION_FAST
 *   --motion-ease-in  → EASE_IN      --motion-base   → DURATION_BASE
 *                                    --motion-reveal → DURATION_REVEAL
 *
 * framer-motion es el motor, pero la escala sigue siendo la del sistema de
 * diseño: si se cambia una custom property hay que cambiar acá, y al revés.
 *
 * Se declaran como tuplas de 4 números porque son curvas cúbicas Bézier.
 * Si se dejaran inferir como `number[]`, TypeScript rechazaría la prop `ease`.
 */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1]

export const DURATION_FAST = 0.16
export const DURATION_BASE = 0.3
export const DURATION_REVEAL = 0.62

/** Escalonado entre hermanos de un mismo bloque. */
export const STAGGER = 0.07

/**
 * Proveedor único de animaciones de la landing.
 *
 * `LazyMotion` + `m` es la vía que framer-motion recomienda para recortar el
 * bundle: el componente `m` sólo trae lo necesario para el primer render, y las
 * capacidades de animación, presencia y gestos entran con `domAnimation`.
 *
 * `domAnimation` se importa de forma estática y se pasa como objeto (no como
 * función). Eso hace que las features se registren de forma **síncrona** durante
 * el render, así que no hay un primer frame sin animar. Con
 * `features={() => import(...)}` el contenido aparecería en su estado final y
 * después saltaría hacia el estado de entrada.
 *
 * `reducedMotion="user"` hace que framer-motion respete `prefers-reduced-motion`:
 * el sistema deja de enviar transformaciones animadas y el contenido se
 * muestra igual. Es el complemento de los `@media` de `globals.css`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
