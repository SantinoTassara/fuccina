'use client'

import { AnimatePresence, m } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { navItems } from '@/components/site/data'
import { Logo } from '@/components/site/logo'
import {
  DURATION_BASE,
  DURATION_FAST,
  EASE_IN,
  EASE_OUT,
  STAGGER,
} from '@/components/site/motion'
import { useBodyScrollLock } from '@/components/site/use-body-scroll-lock'

/** Umbral del breakpoint `md` de Tailwind, en píxeles. */
const DESKTOP_QUERY = '(min-width: 48rem)'

/**
 * Cabecera fija con navegación.
 *
 * Es el único Client Component de la navegación porque el menú móvil necesita
 * estado. El resto de la landing es Server Component.
 *
 * Accesibilidad del panel:
 * - el botón declara `aria-expanded` y `aria-controls` apuntando al panel;
 * - `Escape` cierra y devuelve el foco al botón;
 * - el scroll del documento queda bloqueado mientras está abierto, y se
 *   restaura al pasar a escritorio por si se redimensiona la ventana.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const panelId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const releaseScroll = useBodyScrollLock(menuOpen)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      closeMenu()
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) closeMenu()
    }

    desktop.addEventListener('change', handleChange)
    return () => desktop.removeEventListener('change', handleChange)
  }, [])

  /**
   * El scroll se libera antes de cerrar para que el salto al ancla funcione:
   * con `overflow: hidden` en el body el navegador no puede desplazar la
   * página hasta que el estilo vuelve a su valor original.
   */
  const handleNavClick = () => {
    releaseScroll()
    closeMenu()
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-black/60 backdrop-blur-xl">
      <AnimatePresence>
        {menuOpen && (
          <m.button
            key="scrim"
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={closeMenu}
            className="absolute left-0 top-full h-[100dvh] w-screen cursor-default bg-black/55 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION_FAST, ease: 'linear' }}
          />
        )}
      </AnimatePresence>

      <nav aria-label="Navegación principal" className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3 md:py-4">
          <Logo />

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contacto"
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Habla con nosotros
            </a>
            <a
              href="#precios"
              className="bracket rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Empezá a crecer
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="tap-icon -mr-2 rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground md:hidden"
          >
            <span className="relative h-5 w-5">
              <AnimatePresence initial={false}>
                <m.span
                  key={menuOpen ? 'close' : 'open'}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
                  transition={{ duration: DURATION_FAST, ease: EASE_OUT }}
                >
                  {menuOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </m.span>
              </AnimatePresence>
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <m.div
              key="panel"
              id={panelId}
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-white/8 bg-background/95 px-5 pb-8 pt-1 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: DURATION_FAST, ease: EASE_IN } }}
              transition={{ duration: DURATION_BASE, ease: EASE_OUT }}
            >
              <ul className="flex flex-col">
                {navItems.map((item, index) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: DURATION_BASE,
                      delay: STAGGER * (index + 1),
                      ease: EASE_OUT,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className="flex min-h-14 items-center border-b border-white/6 text-base text-foreground/90 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>

              <div className="mt-6 grid gap-3">
                <a
                  href="#precios"
                  onClick={handleNavClick}
                  className="bracket flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  Empezá a crecer
                </a>
                <a
                  href="#contacto"
                  onClick={handleNavClick}
                  className="btn-outline flex min-h-12 w-full items-center justify-center px-5 text-sm font-semibold"
                >
                  Habla con nosotros
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
