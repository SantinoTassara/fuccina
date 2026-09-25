import { Mail, MessageSquareText } from 'lucide-react'

import { Logo } from '@/components/site/logo'

/**
 * Pie de página. Server Component y sin animación: es el final del documento,
 * no hay nada que revelar al entrar en pantalla.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 text-xs text-muted-foreground">
            La infraestructura invisible de tu crecimiento.
          </p>
        </div>

        <ul className="flex items-center gap-2 text-muted-foreground sm:gap-4">
          <li>
            <a
              href="#top"
              className="tap-target px-2 text-xs transition-colors hover:text-foreground"
            >
              Privacidad
            </a>
          </li>
          <li>
            <a
              href="#top"
              className="tap-target px-2 text-xs transition-colors hover:text-foreground"
            >
              Términos
            </a>
          </li>
          <li>
            <a
              href="mailto:santiagodaffe@gmail.com"
              aria-label="Escribir por email a Fuccina"
              className="tap-icon transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="mailto:santiagodaffe@gmail.com"
              aria-label="Contacto de Fuccina"
              className="tap-icon transition-colors hover:text-foreground"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
