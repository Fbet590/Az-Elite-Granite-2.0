"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollLink } from "@/components/scroll-link"

const materials = [
  {
    name: "Granite",
    description: "Natural stone with unique patterns, exceptional durability, and heat resistance. Perfect for busy kitchens.",
    image: "/images/granite-countertop.jpg",
    features: ["Heat Resistant", "Unique Patterns", "Highly Durable"]
  },
  {
    name: "Quartz",
    description: "Engineered stone combining beauty and function. Non-porous, low maintenance, and available in countless colors.",
    image: "/images/quartz-countertop.jpg",
    features: ["Non-Porous", "Low Maintenance", "Stain Resistant"]
  },
  {
    name: "Marble",
    description: "Timeless elegance with distinctive veining. The choice of luxury homes for centuries.",
    image: "/images/bathroom-countertop.jpg",
    features: ["Timeless Beauty", "Cool Surface", "Premium Quality"]
  }
]

export function Materials() {
  return (
    <section id="materials" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Premium Materials
            </p>
            <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-foreground text-balance">
              Choose From Nature&apos;s Finest Surfaces
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div 
              key={material.name}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-6">
                <Image
                  src={material.image}
                  alt={`${material.name} countertop`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                {material.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {material.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {material.features.map((feature) => (
                  <span 
                    key={feature}
                    className="text-xs uppercase tracking-wider text-muted-foreground bg-secondary px-3 py-1 rounded-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base">
            <ScrollLink href="#estimate">
              Explore All Materials
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </ScrollLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
