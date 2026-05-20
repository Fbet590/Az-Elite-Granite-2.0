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
        {/* Elegant gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="max-w-xl pt-8 lg:pt-16">
            <p className="text-sm uppercase tracking-[0.3em] text-stone-300 font-light mb-6 drop-shadow-sm">
              Arizona&apos;s Premier Countertop Experts
            </p>
            <h1 className="text-balance">
              <span 
                className="block text-[3.25rem] sm:text-[3.75rem] md:text-[4.5rem] lg:text-[5rem] font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              >
                $4,500. New Quartz Countertops.
              </span>
              <span 
                className="block text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[4.5rem] font-medium leading-[1.05] tracking-tight text-white/90 mt-2 drop-shadow-lg"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              >
                No need to rip out the whole kitchen.
              </span>
            </h1>
            <div className="mt-10 border-l-2 border-stone-400/50 pl-5 max-w-md">
              <p 
                className="text-base font-normal text-stone-200 leading-relaxed tracking-wide"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
              >
                Pricing applies to most standard kitchens. Final quote confirmed at your free in-home visit.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div>
                <p 
                  className="text-3xl md:text-4xl font-light text-white tracking-tight"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                >
                  20+
                </p>
                <p className="text-sm mt-1 font-light tracking-wide" style={{ color: '#eee9e9' }}>Years Experience</p>
              </div>
              <div>
                <p 
                  className="text-3xl md:text-4xl font-light text-white tracking-tight"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                >
                  5K+
                </p>
                <p className="text-sm mt-1 font-light tracking-wide" style={{ color: '#f0ecec' }}>Projects Completed</p>
              </div>
              <div>
                <p 
                  className="text-3xl md:text-4xl font-light text-white tracking-tight"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
                >
                  4.9
                </p>
                <p className="text-sm mt-1 font-light tracking-wide" style={{ color: '#f2ecec' }}>Star Rating</p>
              </div>
            </div>

            {/* Testimonial Card - Desktop */}
            <div className="hidden lg:block relative mt-14">
              <div className="border-l border-white/20 pl-6 max-w-[340px]">
                <p 
                  className="text-lg font-light text-white/90 italic leading-relaxed"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                >
                  &quot;Absolutely stunning work. They transformed our kitchen.&quot;
                </p>
                <p className="mt-4 text-sm text-stone-400 font-light tracking-wider">— Sarah M., Scottsdale</p>
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
