import { Header } from '@/components/site/header'
import { ContactSection } from '@/components/site/sections/contact'
import { Footer } from '@/components/site/sections/footer'
import { HeroSection } from '@/components/site/sections/hero'
import { IntegrationsSection } from '@/components/site/sections/integrations'
import { PricingSection } from '@/components/site/sections/pricing'
import { ProductSection } from '@/components/site/sections/product'

/**
 * Landing de Fuccina.
 *
 * Server Component: compone secciones y deja el JavaScript del cliente sólo para
 * lo que realmente necesita estado (menú móvil, formulario y animaciones).
 *
 * `overflow-x-clip` en lugar de `overflow-hidden`: recorta el desbordamiento
 * horizontal —que es lo que se quiere— sin convertir el `main` en un contenedor
 * de scroll, lo que rompería el salto a los anclas de la navegación.
 */
export default function Page() {
  return (
    <main
      id="top"
      className="bg-stage grain rules relative min-h-screen overflow-x-clip text-foreground"
    >
      <Header />
      <HeroSection />
      <ProductSection />
      <IntegrationsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
