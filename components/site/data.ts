/**
 * Contenido de la landing.
 *
 * Vive en su propio módulo para que las Server Components lo importen sin
 * arrastrarlo al bundle del navegador, y para que el Client Component de la
 * navegación (`components/site/header.tsx`) pueda usar `navItems` sin importar
 * la página completa.
 *
 * Los datos de negocio (planes, integraciones) son reales: ver AGENTS.md §5.
 * No se inventan ni se modifican acá.
 */

export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Producto', href: '#producto' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Integraciones', href: '#integraciones' },
  { label: 'Precios', href: '#precios' },
]

export const integrationLogos = [
  { name: 'Shopify', logo: '/Shopify.png' },
  { name: 'TiendaNube', logo: '/tiendanube.png' },
  { name: 'Google Analytics', logo: '/Google.png' },
]

export type Plan = {
  name: string
  price: string
  suffix: string
  text: string
  features: string[]
  featured: boolean
}

export const plans: Plan[] = [
  {
    name: 'Slancio · Inicio',
    price: '30',
    suffix: '/mes',
    text: 'Hasta 500 carritos recuperados por mes',
    features: [
      'Recuperación de carritos',
      'Automatizaciones esenciales',
      'Analítica de recuperación',
    ],
    featured: false,
  },
  {
    name: 'Slancio · Escala',
    price: '50',
    suffix: '/mes',
    text: 'Hasta 1.000 carritos recuperados por mes',
    features: [
      'Todo en Inicio',
      'Mayor volumen de recuperación',
      'Soporte para escalar',
    ],
    featured: true,
  },
  {
    name: 'Faro',
    price: '30',
    suffix: '/mes',
    text: 'Después de cada compra, consulta la experiencia y deriva reseñas o tickets.',
    features: [
      'Gestión de reseñas',
      'Ruteo inteligente de opiniones',
      'Acompañamiento personalizado',
    ],
    featured: false,
  },
]

/** Pilares de la propuesta de valor, en el orden en que aparecen en el sitio. */
export const pillars = ['Genera clientes', 'Recupera ganancia', 'Crea reputación']
