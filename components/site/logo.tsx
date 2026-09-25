import { Anvil } from 'lucide-react'


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
