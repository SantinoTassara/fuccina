import { SITE } from '@/lib/site'

/**
 * Datos estructurados de la organización (schema.org/Organization).
 *
 * Va como un `<script type="application/ld+json">` en el HTML, que es donde lo
 * leen Google y el resto de los buscadores. No hay una prop de metadata de
 * Next.js para esto: se inyecta en el cuerpo del documento.
 *
 * **Solo campos verificables.** Deliberadamente NO lleva:
 * - `address` ni `telephone`: no hay datos de contacto publicados más allá del
 *   email del pie;
 * - `sameAs`: no hay redes sociales confirmadas;
 * - `offers` con los precios de los planes: volvería a duplicar los datos de
 *   negocio en un segundo lugar, que es exactamente el problema que se evitó
 *   con `lib/contact-limits.ts`. Si alguna vez se agrega `offers`, que sea
 *   leyendo de `components/site/data.ts`, no escribiendo los números a mano.
 */
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    slogan: SITE.tagline,
    description: SITE.description,
    logo: `${SITE.url}/icon.svg`,
  }

  return (
    <script
      type="application/ld+json"
      // `JSON.stringify` escapa las comillas del string, pero NO los `<`: sin
      // este reemplazo, un valor con `<` cerraría el tag y habilitaría XSS.
      // Los datos vienen de constantes propias, pero el patrón se mantiene
      // para que nadie introduzca un valor sin pensar en esto.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  )
}
