import { Header } from '@/components/site/header'
import { ContactSection } from '@/components/site/sections/contact'
import { Footer } from '@/components/site/sections/footer'
import { HeroSection } from '@/components/site/sections/hero'
import { IntegrationsSection } from '@/components/site/sections/integrations'
import { PricingSection } from '@/components/site/sections/pricing'
import { ProductSection } from '@/components/site/sections/product'

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
