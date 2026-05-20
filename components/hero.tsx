import Image from "next/image"
import { MultiStepForm } from "@/components/multi-step-form"

export function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpg"
          alt="Luxury kitchen with beautiful countertops"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay - Lightened for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="max-w-xl pt-8 lg:pt-16">
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-6">
              Arizona&apos;s Premier Countertop Experts
            </p>
            <h1 className="text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-foreground text-balance">
              Exquisite Surfaces Meet Expert Craftsmanship
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-md">
              Transform your kitchen and bathroom with premium countertops, installed by Arizona&apos;s most trusted craftsmen.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">20+</p>
                <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">5K+</p>
                <p className="text-sm text-muted-foreground mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground mt-1">Star Rating</p>
              </div>
            </div>

            {/* Testimonial Card - Desktop */}
            <div className="hidden lg:block relative mt-12">
              <div className="bg-card/80 backdrop-blur-sm p-6 shadow-lg rounded-lg max-w-[320px] border border-border">
                <p className="text-lg font-medium text-foreground">
                  &quot;Absolutely stunning work. They transformed our kitchen!&quot;
                </p>
                <p className="mt-3 text-sm text-muted-foreground">— Sarah M., Scottsdale</p>
              </div>
            </div>
          </div>

          {/* Multi-Step Form - Overlaps hero */}
          <div id="estimate" className="lg:sticky lg:top-24">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  )
}
