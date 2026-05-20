"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollLink } from "@/components/scroll-link"

const testimonials = [
  {
    quote: "AZ ELITE Granite transformed our dated kitchen into a stunning showpiece. The attention to detail during installation was remarkable.",
    author: "Michael R.",
    location: "Scottsdale",
    rating: 5
  },
  {
    quote: "Professional from start to finish. They helped us choose the perfect quartz for our bathroom vanities. Couldn't be happier!",
    author: "Jennifer L.",
    location: "Phoenix",
    rating: 5
  },
  {
    quote: "The team was punctual, clean, and delivered exactly what they promised. Our marble countertops are absolutely gorgeous.",
    author: "David & Maria T.",
    location: "Paradise Valley",
    rating: 5
  },
  {
    quote: "Best decision we made for our kitchen remodel. The granite is stunning and the installation was flawless. Highly recommend!",
    author: "Robert K.",
    location: "Tempe",
    rating: 5
  },
  {
    quote: "From measurement to installation, everything was seamless. Our new quartz countertops exceeded all expectations.",
    author: "Amanda S.",
    location: "Mesa",
    rating: 5
  },
  {
    quote: "We've used AZ ELITE for two homes now. Consistent quality, fair pricing, and outstanding craftsmanship every time.",
    author: "Thomas & Linda M.",
    location: "Chandler",
    rating: 5
  },
  {
    quote: "The outdoor bar countertop they installed is incredible. Perfect for Arizona living. Great communication throughout the project.",
    author: "Steven P.",
    location: "Gilbert",
    rating: 5
  },
  {
    quote: "After getting quotes from several companies, AZ ELITE stood out for their expertise and transparency. The result speaks for itself.",
    author: "Catherine W.",
    location: "Scottsdale",
    rating: 5
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Testimonials
          </p>
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-foreground text-balance">
            Trusted By Homeowners Across Arizona
          </h2>
        </div>

        {/* Swipeable Testimonials */}
        <div 
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors -translate-x-1/2 md:translate-x-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-secondary transition-colors translate-x-1/2 md:translate-x-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Testimonial Cards */}
          <div className="flex justify-center items-center gap-6 px-8 md:px-16">
            <div className="relative w-full max-w-lg overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-secondary p-8 rounded-lg relative">
                      {/* Google Logo */}
                      <div className="absolute top-4 right-4">
                        <svg viewBox="0 0 24 24" className="w-6 h-6">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>

                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-accent w-6' 
                    : 'bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
            <ScrollLink href="#estimate">
              Join Our Happy Customers
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </ScrollLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
