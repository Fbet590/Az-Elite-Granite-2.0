"use client"

import { Ruler, Truck, Wrench, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollLink } from "@/components/scroll-link"

const services = [
  {
    icon: Ruler,
    title: "Precise Measurement",
    description: "Expert technicians create exact digital templates of your space for a perfect fit every time."
  },
  {
    icon: Sparkles,
    title: "Material Selection",
    description: "Choose from our curated collection of granite, quartz, marble, and quartzite slabs."
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Professional installation by certified craftsmen with attention to every detail."
  },
  {
    icon: Truck,
    title: "White Glove Delivery",
    description: "Careful handling and delivery of your custom countertops, protected at every step."
  }
]

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Our Process
          </p>
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-foreground text-balance">
            From Selection To Installation, We Handle Everything
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="bg-card p-8 rounded-sm border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mb-6">
                <service.icon className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl text-border font-bold">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
            <ScrollLink href="#estimate">
              Learn About Our Process
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </ScrollLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
