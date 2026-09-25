import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

/**
 * `sitemap.xml` de Fuccina.
 *
 * La landing es una sola página, así que el sitemap tiene una sola URL. Las
 * secciones son anclas (`#precios`, `#producto`, …) y **no van en el sitemap**:
 * el protocolo de sitemaps no transporta fragmentos y Google los ignora.
 *
 * Next.js cachea esta ruta por defecto: se regenera en el build, no en cada
 * request.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
