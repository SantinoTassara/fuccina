/**
 * Datos del sitio, compartidos por todo lo que declara la identidad pública.
 *
 * **Fuente única del dominio y del nombre.** El mismo valor aparece hoy en
 * cuatro lugares —`layout.tsx` (metadataBase, canonical, Open Graph), `sitemap.ts`,
 * `robots.ts` y el JSON-LD— y si el dominio cambia y no cambian todos, el
 * sitemap termina apuntando a un host distinto del canonical y Google lo toma
 * como contenido duplicado.
 *
 * Mismo criterio que `lib/contact-limits.ts`: se declara una vez y se importa.
 *
 * Ojo con lo que **no** va acá: precios, límites de plan, claims de producto,
 * dirección, teléfono o redes sociales. Esos datos no se inventan y necesitan
 * confirmación humana (ver AGENTS.md §5).
 */
export const SITE = {
  /** Dominio de producción, sin barra final. */
  url: 'https://fuccina.com.ar',
  name: 'Fuccina',
  tagline: 'La infraestructura invisible de tu crecimiento',
  description:
    'Recuperá los carritos que ya se habían perdido, construí reputación y escalá tu e-commerce. Slancio y Faro, dos motores con un mismo objetivo.',
  /** `es_AR` para Open Graph. El `lang` del documento sigue siendo `es`. */
  locale: 'es_AR',
} as const
