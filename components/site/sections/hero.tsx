import { HeroActions } from '@/components/site/hero-actions'

/**
 * Hero de la landing.
 *
 * Server Component: sólo el bloque de CTAs necesita estado de animación, y ese
 * vive en `HeroActions`.
 *
 * El `h1` y el párrafo **no** llevan animación de entrada a propósito:
 * 1. son el elemento LCP de la página, y arrancar en `opacity: 0` retrasa el
 *    momento en que el navegador lo registra como pintado;
 * 2. son la propuesta de valor: tiene que estar legible en el primer frame,
 *    sin depender de que una animación termine.
 *
 * La sección tampoco usa `whileInView`: está en pantalla al cargar, así que
 * alcanzaría a animar y quedaría congelada en un estado que no aporta nada.
 */
export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-48">
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="eyebrow mx-auto mb-7 w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          La infraestructura invisible de tu crecimiento
        </div>

        <h1 className="title-glow text-balance text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-7xl">
          Más ventas.
          <br />
          <span className="text-primary">Menos fricción.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Fuccina convierte tu e-commerce en una máquina de crecimiento. Recupera ventas,
          construye reputación y escala sin añadir complejidad.
        </p>

        <HeroActions />
      </div>
    </section>
  )
}
