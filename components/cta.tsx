"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Award } from "lucide-react"
import { ScrollLink } from "@/components/scroll-link"

export function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-4">
            Ready To Transform Your Space?
          </p>
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-primary-foreground text-balance">
            Get Your Free Estimate Today
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
            Schedule a consultation with our experts. We&apos;ll visit your home, take precise measurements, and help you select the perfect countertop for your space.
          </p>

          <div className="mt-10">
            <Button 
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-base"
            >
              <ScrollLink href="#estimate">
                Start Your Free Estimate
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </ScrollLink>
            </Button>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 gap-8 max-w-xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-foreground/10 rounded-sm flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-sm text-primary-foreground/70 mb-1">Hours</p>
              <p className="font-semibold text-primary-foreground text-center">
                Mon-Sat: 8am - 6pm<br />Sunday: Closed
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-primary-foreground/10 rounded-sm flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-sm text-primary-foreground/70 mb-1">Guarantee</p>
              <p className="font-semibold text-primary-foreground text-center">
                Lifetime Warranty<br />on Installation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
