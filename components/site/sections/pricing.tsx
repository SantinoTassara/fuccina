import { ArrowRight, CircleCheck } from 'lucide-react'

import { plans } from '@/components/site/data'
import { Reveal } from '@/components/site/reveal'

/**
 * Planes publicados. Los precios y los límites son datos reales: ver AGENTS.md §5.
 *
 * Server Component.
 */
export function PricingSection() {
  return (
    <section id="precios" className="scroll-target section-pad">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-index mb-5">03 / Precios</p>
            <h2 className="section-h2">
              Elige tu siguiente <span className="text-primary">nivel.</span>
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Empieza sin compromiso. Escala cuando tus resultados lo pidan.
            </p>
          </div>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-4xl items-center gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.name}
              delay={index * 0.07}
              // El margen negativo vive en el contenedor de la animación: si
              // quedara en la tarjeta, se saldría de su celda del grid.
              className={plan.featured ? 'lg:-my-4' : undefined}
            >
              <div
                className={`relative flex h-full flex-col rounded-2xl p-6 panel-lift ${
                  plan.featured
                    ? 'bracket border border-primary/70 bg-primary/10 shadow-[0_24px_60px_-30px_var(--primary)] lg:py-10'
                    : 'border border-white/15 bg-white/[.025]'
                }`}
              >
                <span className="card-rule" aria-hidden="true" />
                {plan.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
                    Más elegido
                  </span>
                )}

                <p className="font-mono text-xs uppercase tracking-widest text-white/55">
                  {plan.name}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{plan.text}</p>
                <p className="mt-7 text-4xl font-semibold tracking-[-.03em]">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">{plan.suffix}</span>
                </p>

                <a
                  href="#contacto"
                  className={`mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'btn-outline'
                  }`}
                >
                  Seleccionar plan
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CircleCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
