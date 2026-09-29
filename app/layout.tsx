import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { MotionProvider } from '@/components/site/motion'
import { StructuredData } from '@/components/site/structured-data'
import { SITE } from '@/lib/site'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

/** El dominio sale de `lib/site.ts`, la misma fuente que usan el sitemap, el
 *  robots.txt y el JSON-LD. Verificá ahí si cambia la URL de producción. */
export const metadata: Metadata = {
  // Sin `metadataBase`, Next.js no puede resolver las URLs relativas del
  // canonical y de Open Graph.
  metadataBase: new URL(SITE.url),
  title: 'Fuccina - Forja el futuro de tu negocio',
  description: 'La infraestructura invisible para hacer crecer tu e-commerce. Recupera ventas y construye reputación con Fuccina.',
  generator: 'Next.js 16',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    // `summary_large_image`, no `summary`: con la imagen de 1200x630 en su
    // lugar, `summary` la muestra chica en la timeline y desperdicia el
    // formato. Si algún día se saca `opengraph-image`, hay que volver a `summary`.
    card: 'summary_large_image',
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#060502',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (

    <html lang="es" className="bg-background" data-scroll-behavior="smooth">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {}
        <noscript>
          <style>{'[data-motion-hidden]{opacity:1!important;transform:none!important}'}</style>
        </noscript>

        <StructuredData />

        <MotionProvider>{children}</MotionProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
