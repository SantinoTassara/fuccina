import { Anvil } from 'lucide-react'

/**
 * Logotipo de Fuccina. Sin `'use client'`: lo usan tanto la navegación
 * (Client Component) como el pie (Server Component), así que queda en el grafo
 * compartido sin arrastrar dependencias de servidor ni de cliente.
 */
export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Fuccina, ir al inicio">
      <span className="flex h-8 w-8 items-center justify-center text-primary">
        <Anvil className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-mono text-lg font-bold tracking-tight text-foreground">
        fuccina<span className="text-primary">.</span>
      </span>
    </a>
  )
}
