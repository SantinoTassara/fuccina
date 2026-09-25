import { Sparkles } from 'lucide-react'

import { ContactForm } from '@/components/site/contact-form'
import { Reveal } from '@/components/site/reveal'

/**
 * Llamada a la acción final. Server Component: el formulario interactivo queda
 * aislado en `ContactForm`.
 */
export function ContactSection() {
  return (
    <section
      id="contacto"
      className="scroll-target mx-5 mb-20 overflow-hidden rounded-2xl border border-primary/25 bg-primary/8 lg:mx-auto lg:max-w-6xl"
    >
      <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 bg-primary/10 blur-[100px]"
          aria-hidden="true"
        />

        <Reveal>
          <div className="relative">
            <Sparkles className="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="section-h2 mx-auto mt-5 max-w-2xl">
              Tu próximo gran mes
              <br />
              <span className="text-primary">empieza hoy.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-7 text-muted-foreground">
              Deja de perseguir el crecimiento. Construye un sistema que lo genere.
            </p>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
