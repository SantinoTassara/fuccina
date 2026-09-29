import { HeroActions } from '@/components/site/hero-actions'


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
