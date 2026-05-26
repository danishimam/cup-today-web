import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { MenuSection } from "@/components/menu-section"
import { OrderOnline } from "@/components/order-online"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Visit } from "@/components/visit"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <About />
      <MenuSection />
      <OrderOnline />
      <Gallery />
      <Testimonials />
      <Visit />
      <SiteFooter />
    </main>
  )
}
