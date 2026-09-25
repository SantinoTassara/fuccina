import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

/**
 * `robots.txt` de Fuccina.
 *
 * La landing es pública de punta a punta, así que se permite todo. Se bloquea
 * `/api/` por higiene: es el endpoint de captura de leads, devuelve JSON, no
 * tiene nada que indexar y no queremos que un crawler lo golpee.
 *
 * El `Sitemap:` es lo que le dice a Google dónde está el sitemap, y se deriva
 * de la misma fuente que el canonical.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
