'use client'

import { m } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

import { pillars } from '@/components/site/data'
import { DURATION_BASE, EASE_OUT, STAGGER } from '@/components/site/motion'


export function HeroActions() {
  return (
    <>
      <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <m.a
          href="#precios"
          data-motion-hidden=""
          className="bracket flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-colors hover:bg-primary/90 sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION_BASE, ease: EASE_OUT }}
        >
          Empezá a crecer
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </m.a>

        <m.a
          href="#como-funciona"
          data-motion-hidden=""
          className="btn-outline flex min-h-12 w-full items-center justify-center gap-2 px-5 text-sm font-semibold sm:w-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION_BASE, delay: STAGGER, ease: EASE_OUT }}
        >
          Ver cómo funciona
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </m.a>
      </div>

      <ul className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {pillars.map((pillar, index) => (
          <m.li
            key={pillar}
            data-motion-hidden=""
            className="flex items-center gap-x-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: DURATION_BASE,
              delay: 0.18 + STAGGER * index,
              ease: EASE_OUT,
            }}
          >
            {index > 0 && (
              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" aria-hidden="true" />
            )}
            {pillar}
          </m.li>
        ))}
      </ul>
    </>
  )
}
