import Image from 'next/image'

import { integrationLogos } from '@/components/site/data'
import { Reveal } from '@/components/site/reveal'

/**
 * Integraciones: Shopify, TiendaNube y Google Analytics.
 *
 * Server Component. Las imágenes van por `next/image` con `width`/`height`
 * explícitos, así que el navegador reserva el espacio y no hay CLS.
 */
export function IntegrationsSection() {
  return (
    <section id="integraciones" className="scroll-target section-pad">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
          <Reveal>
            <p className="section-index mb-5">02 / Integraciones</p>
            <h2 className="section-h2">
              Tu stack, pero <span className="text-primary">más inteligente.</span>
            </h2>
            <p className="mt-5 max-w-sm leading-7 text-muted-foreground">
              Fuccina se integra con las herramientas que ya usas para que tus datos trabajen
              juntos.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {integrationLogos.map((integration) => (
                <li
                  key={integration.name}
                  className="panel panel-lift panel-hover bracket-hover relative flex h-24 flex-col items-start justify-center gap-3 overflow-hidden p-4 sm:h-20 sm:flex-row sm:items-center sm:px-4"
                >
                  <span className="card-rule" aria-hidden="true" />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 p-1.5">
                    <Image
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="text-sm font-medium text-white/85">{integration.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
