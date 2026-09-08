'use client'

import { useState } from 'react'
import {
  Anvil,
  ArrowRight,
  CircleCheck,
  Mail,
  Menu,
  MessageSquareText,
  ShoppingCart,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Producto', href: '#producto' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Integraciones', href: '#integraciones' },
  { label: 'Precios', href: '#precios' },
]

const integrations = ['Shopify', 'TiendaNube', 'Google Analytics']

const plans = [
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

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Fuccina inicio">
      <span className="flex h-8 w-8 items-center justify-center text-primary">
        <Anvil className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-mono text-lg font-bold tracking-tight text-foreground">
        fuccina<span className="text-primary">.</span>
      </span>
    </a>
  )
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/6 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#contacto" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            Habla con nosotros
          </a>
          <a
            href="#precios"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Empezar gratis
          </a>
        </div>

        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/8 bg-background px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm text-muted-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#precios"
            className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Empezar gratis
          </a>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-36 lg:px-8 lg:pb-28 lg:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="eyebrow mx-auto mb-7 w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          La infraestructura invisible de tu crecimiento
        </div>

        <h1 className="title-glow text-balance text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-7xl">
          Más ventas.
          <br />
          <span className="text-primary">Menos fricción.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          Fuccina convierte tu e-commerce en una máquina de crecimiento. Recupera ventas,
          construye reputación y escala sin añadir complejidad.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#precios"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:w-auto"
          >
            Empieza a crecer
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-center font-mono text-[10px] uppercase tracking-widest text-white/30">
        <span>+€2.4M generados</span>
        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
        <span>+340 tiendas activas</span>
        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
        <span>4.9/5 satisfacción</span>
      </div>
    </section>
  )
}

function ProductSection() {
  return (
    <section id="producto" className="border-y border-white/6 bg-[#101214] py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5 w-fit">Dos motores. Un objetivo.</p>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">
              Todo lo que necesitas para <span className="text-primary">crecer mejor.</span>
            </h2>
          </div>

          <p className="max-w-md text-pretty leading-7 text-muted-foreground lg:justify-self-end">
            Una suite conectada para recuperar carritos abandonados y convertir la
            experiencia de tus clientes en reseñas, tickets y nuevas ventas.
          </p>
        </div>

        <div id="como-funciona" className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="module-card group">
            <div className="flex items-start justify-between">
              <div className="icon-box">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <span className="module-number">01 / SLANCIO</span>
            </div>

            <h3 className="mt-10 text-2xl font-semibold tracking-tight">
              Recupera lo que
              <br />
              ya era tuyo.
            </h3>
            <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
              Slancio detecta cada carrito abandonado y envía automáticamente un cupón de
              descuento. Tú decides los parámetros: porcentaje, monto, vigencia y
              condiciones de uso.
            </p>
            <a href="#contacto" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Descubre Slancio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="module-card group">
            <div className="flex items-start justify-between">
              <div className="icon-box">
                <Star className="h-5 w-5" />
              </div>
              <span className="module-number">02 / FARO · POST-COMPRA</span>
            </div>

            <h3 className="mt-10 text-2xl font-semibold tracking-tight">
              Haz que cada reseña
              <br />
              trabaje para ti.
            </h3>
            <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
              Faro consulta automáticamente cómo fue la experiencia después de cada compra.
              Si es positiva, invita al cliente a dejar una reseña; si es negativa, le
              pregunta si quiere generar un ticket directamente con tu tienda.
            </p>
            <a href="#contacto" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Descubre Faro
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntegrationsSection() {
  return (
    <section id="integraciones" className="border-b border-white/6 py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-center">
          <div>
            <p className="eyebrow mb-5 w-fit">Conecta. Sin reconstruir.</p>
            <h2 className="text-3xl font-semibold tracking-[-.035em] sm:text-4xl">
              Tu stack, pero <span className="text-primary">más inteligente.</span>
            </h2>
            <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
              Fuccina se integra con las herramientas que ya usas para que tus datos
              trabajen juntos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {integrations.map((name, index) => (
              <div
                key={name}
                className="flex h-20 items-center gap-3 rounded-xl border border-white/8 bg-white/2.5 px-4 transition-colors hover:border-primary/30 hover:bg-primary/4"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold ${index % 2 === 0 ? 'bg-primary/15 text-primary' : 'bg-white/8 text-white/55'
                    }`}
                >
                  {name.slice(0, 1)}
                </span>
                <span className="text-sm font-medium text-white/70">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="precios" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mx-auto mb-5 w-fit">Crece a tu ritmo</p>
          <h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">
            Elige tu siguiente <span className="text-primary">nivel.</span>
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Empieza sin compromiso. Escala cuando tus resultados lo pidan.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 ${plan.featured
                ? 'border-primary/60 bg-primary/8 shadow-xl shadow-primary/10'
                : 'border-white/10 bg-white/2.5'
                }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
                  Más elegido
                </span>
              )}

              <p className="font-mono text-xs uppercase tracking-widest text-white/45">{plan.name}</p>
              <p className="mt-3 text-sm text-muted-foreground">{plan.text}</p>
              <p className="mt-7 text-4xl font-semibold tracking-tight">
                ${plan.price}
                <span className="text-sm font-normal text-muted-foreground">{plan.suffix}</span>
              </p>

              <a
                href="#contacto"
                className={`mt-7 flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-semibold transition-all ${plan.featured
                  ? 'w-full bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-white/10 text-foreground hover:border-white/20'
                  }`}
              >
                Seleccionar plan
                <ArrowRight className="h-4 w-4" />
              </a>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CircleCheck className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })

      if (!response.ok) throw new Error('No se pudo enviar el formulario')

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contacto"
      className="mx-5 mb-20 overflow-hidden rounded-2xl border border-primary/20 bg-primary/8 lg:mx-auto lg:max-w-6xl"
    >
      <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 bg-primary/10 blur-[100px]" />

        <div className="relative">
          <Sparkles className="mx-auto h-6 w-6 text-primary" />
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-[-.04em] sm:text-5xl">
            Tu próximo gran mes
            <br />
            <span className="text-primary">empieza hoy.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-7 text-muted-foreground">
            Deja de perseguir el crecimiento. Construye un sistema que lo genere.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 grid max-w-xl gap-3 text-left"
          >
            <label className="sr-only" htmlFor="contact-name">
              Nombre
            </label>
            <input
              id="contact-name"
              name="nombre"
              required
              placeholder="Tu nombre"
              className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />

            <label className="sr-only" htmlFor="contact-email">
              Correo electrónico
            </label>
            <input
              id="contact-email"
              name="correo"
              type="email"
              required
              placeholder="Tu correo electrónico"
              className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />

            <label className="sr-only" htmlFor="contact-message">
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="mensaje"
              required
              rows={4}
              placeholder="¿En qué podemos ayudarte?"
              className="resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />

            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mx-auto inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar correo'}
              <ArrowRight className="h-4 w-4" />
            </button>

            {status === 'success' && (
              <p role="status" className="text-center text-sm text-primary">
                Recibimos tu mensaje. Te contactaremos a la brevedad.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-center text-sm text-red-300">
                No pudimos enviar el mensaje. Inténtalo nuevamente.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 text-xs text-muted-foreground">
            La infraestructura invisible de tu crecimiento.
          </p>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#top" className="text-xs hover:text-foreground">
            Privacidad
          </a>
          <a href="#top" className="text-xs hover:text-foreground">
            Términos
          </a>
          <a href="mailto:santiagodaffe@gmail.com" aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
          <a href="mailto:santiagodaffe@gmail.com" aria-label="Contacto">
            <MessageSquareText className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <ProductSection />
      <IntegrationsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
