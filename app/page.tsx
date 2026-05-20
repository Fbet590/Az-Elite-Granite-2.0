import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Materials } from "@/components/materials"
import { Testimonials } from "@/components/testimonials"
import { Gallery } from "@/components/gallery"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Materials />
      <Testimonials />
      <Gallery />
      <CTA />
      <Footer />
    </main>
  )
}
