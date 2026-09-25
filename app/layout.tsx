import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { MotionProvider } from '@/components/site/motion'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

/** Dominio de producción. Sin esto, Next.js no puede resolver las URLs
 *  relativas de `alternates.canonical` y de Open Graph. */
const SITE_URL = 'https://fuccina.com.ar'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Fuccina - Forja el futuro de tu negocio',
  description: 'La infraestructura invisible para hacer crecer tu e-commerce. Recupera ventas y construye reputación con Fuccina.',
  generator: 'Next.js 16',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Fuccina',
    title: 'Fuccina - La infraestructura invisible de tu crecimiento',
    description:
      'Recuperá los carritos que ya se habían perdido, construí reputación y escalá tu e-commerce. Slancio y Faro, dos motores con un mismo objetivo.',
  },
  twitter: {
    card: 'summary',
    title: 'Fuccina - La infraestructura invisible de tu crecimiento',
    description:
      'Recuperá los carritos que ya se habían perdido, construí reputación y escalá tu e-commerce.',
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
    // `data-scroll-behavior` le avisa a Next.js que la página usa scroll suave,
    // para que pueda anularlo durante una navegación y el salto no se vea lento.
    <html lang="es" className="bg-background" data-scroll-behavior="smooth">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {/*
          Sin JavaScript, framer-motion no corre y los elementos marcados con
          `data-motion-hidden` quedan en su estado inicial (`opacity: 0`).
          Este estilo los vuelve visibles. `!important` hace falta para ganarle
          al estilo inline que framer-motion escribe en el HTML.

          La regla es: todo elemento animado que arranque oculto lleva el
          atributo. Si olvidás marcarlo, desaparece sin JS.
        */}
        <noscript>
          <style>{'[data-motion-hidden]{opacity:1!important;transform:none!important}'}</style>
        </noscript>

        <MotionProvider>{children}</MotionProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
