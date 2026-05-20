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
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-medium mb-6 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md w-fit">
              Arizona&apos;s Premier Countertop Experts
            </p>
            <h1 className="text-balance">
              <span className="block text-[2.75rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg w-fit">
                $4,500. New Quartz Countertops.
              </span>
              <br />
              <span className="block text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] font-semibold leading-[1.1] tracking-tight text-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg w-fit">
                No need to remodel the whole kitchen.
              </span>
            </h1>
            <div className="mt-8 bg-background/90 backdrop-blur-sm border-l-4 border-accent px-5 py-4 rounded-r-lg max-w-md shadow-md">
              <p className="text-base font-semibold text-foreground leading-relaxed">
                Pricing applies to most standard kitchens. Final quote confirmed at your free in-home visit!
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-6">
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
