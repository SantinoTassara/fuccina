import { ArrowRight, ShoppingCart, Star } from 'lucide-react'

import { Reveal } from '@/components/site/reveal'

/**
 * Bloque de producto: Slancio (01) y Faro (02).
 *
 * Server Component. El contenido llega al HTML del servidor y las animaciones
 * de framer-motion se aplican sobre contenedores, así que el texto sigue
 * disponible para crawlers y lectores de pantalla.
 */
export function ProductSection() {
  return (
    <section id="producto" className="scroll-target section-pad border-y border-white/8">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <Reveal>
            <p className="section-index mb-5">01 / Producto</p>
            <h2 className="section-h2 max-w-lg">
              Todo lo que necesitas para <span className="text-primary">crecer mejor.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-md text-pretty leading-7 text-muted-foreground lg:justify-self-end">
              Una suite conectada para recuperar carritos abandonados y convertir la
              experiencia de tus clientes en reseñas, tickets y nuevas ventas.
            </p>
          </Reveal>
        </div>

        <div id="como-funciona" className="scroll-target mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="panel panel-lift panel-hover bracket-hover group relative h-full">
              <span className="card-rule" aria-hidden="true" />
              <div className="flex items-start justify-between gap-3">
                <div className="icon-box">
                  <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="module-number">01 / SLANCIO</span>
              </div>

              <h3 className="mt-10 text-2xl font-semibold tracking-[-.045em]">
                Recupera lo que
                <br />
                ya era tuyo.
              </h3>
              <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
                Slancio detecta cada carrito abandonado y le devuelve un token de recuperación
                configurado a medida. Vos definís el incentivo según quién compra y qué lleva en
                el carrito; el sistema se encarga del resto.
              </p>
              <a
                href="#contacto"
                className="tap-target mt-7 gap-2 text-sm font-medium text-primary"
              >
                Descubre Slancio
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel panel-lift panel-hover bracket-hover group relative h-full">
              <span className="card-rule" aria-hidden="true" />
              <div className="flex items-start justify-between gap-3">
                <div className="icon-box">
                  <Star className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="module-number">02 / FARO · POST-COMPRA</span>
              </div>

              <h3 className="mt-10 text-2xl font-semibold tracking-[-.045em]">
                Haz que cada reseña
                <br />
                trabaje para ti.
              </h3>
              <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
                Faro consulta automáticamente cómo fue la experiencia después de cada compra.
                Si es positiva, invita al cliente a dejar una reseña; si es negativa, le
                pregunta si quiere generar un ticket directamente con tu tienda.
              </p>
              <a
                href="#contacto"
                className="tap-target mt-7 gap-2 text-sm font-medium text-primary"
              >
                Descubre Faro
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
