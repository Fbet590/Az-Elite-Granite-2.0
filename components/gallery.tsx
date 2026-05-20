"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollLink } from "@/components/scroll-link"

const projects = [
  {
    image: "/images/hero-countertop.jpg",
    title: "Modern Kitchen Renovation",
    location: "Paradise Valley, AZ",
    material: "Carrara Marble"
  },
  {
    image: "/images/granite-countertop.jpg",
    title: "Luxury Kitchen Island",
    location: "Scottsdale, AZ",
    material: "Black Galaxy Granite"
  },
  {
    image: "/images/quartz-countertop.jpg",
    title: "Contemporary Family Kitchen",
    location: "Phoenix, AZ",
    material: "Calacatta Quartz"
  },
  {
    image: "/images/bathroom-countertop.jpg",
    title: "Spa-Style Master Bath",
    location: "Tempe, AZ",
    material: "Statuario Marble"
  },
  {
    image: "/images/gallery-5.jpg",
    title: "Waterfall Edge Island",
    location: "Mesa, AZ",
    material: "White Quartz"
  },
  {
    image: "/images/gallery-6.jpg",
    title: "Double Vanity Bathroom",
    location: "Chandler, AZ",
    material: "Dark Granite"
  },
  {
    image: "/images/gallery-7.jpg",
    title: "Elegant Chef's Kitchen",
    location: "Gilbert, AZ",
    material: "Cream Marble"
  },
  {
    image: "/images/gallery-8.jpg",
    title: "Outdoor Entertainment Bar",
    location: "Scottsdale, AZ",
    material: "Polished Granite"
  },
  {
    image: "/images/gallery-9.jpg",
    title: "Minimalist Modern Kitchen",
    location: "Phoenix, AZ",
    material: "Blue-Gray Quartzite"
  },
  {
    image: "/images/gallery-10.jpg",
    title: "Rustic Farmhouse Kitchen",
    location: "Cave Creek, AZ",
    material: "Leathered Granite"
  }
]

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (lightboxOpen && e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextSlide, prevSlide])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen])

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (!lightboxOpen) {
        nextSlide()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [lightboxOpen, nextSlide])

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Our Portfolio
          </p>
          <h2 className="text-[2.25rem] md:text-[2.75rem] font-bold text-foreground text-balance">
            Craftsmanship You Can See And Feel
          </h2>
        </div>

        {/* Single Image Slideshow */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-card/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-card transition-all duration-200 hover:scale-105"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-card/90 backdrop-blur-sm border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-card transition-all duration-200 hover:scale-105"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Main Image */}
          <div 
            className="relative overflow-hidden rounded-2xl cursor-pointer aspect-[16/10] shadow-2xl"
            onClick={openLightbox}
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  index === currentIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                
                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <p className="text-sm uppercase tracking-wider text-card/80 mb-2">
                    {project.material}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-card mb-1">
                    {project.title}
                  </h3>
                  <p className="text-card/80">
                    {project.location}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Click to expand hint */}
            <div className="absolute top-6 right-6 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-foreground font-medium">
              Click to expand
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            {projects.map((project, index) => (
              <button
                key={project.title}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-background scale-105' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`Go to ${project.title}`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base">
            <ScrollLink href="#estimate">
              Start Your Project Today
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </ScrollLink>
          </Button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-card/10 hover:bg-card/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-card" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-card/10 hover:bg-card/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-card" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-card/10 hover:bg-card/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-card" />
          </button>

          {/* Image */}
          <div 
            className="relative w-[90vw] h-[80vh] max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={projects[currentIndex].image}
              alt={projects[currentIndex].title}
              fill
              className="object-contain"
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center bg-gradient-to-t from-foreground/80 to-transparent">
              <h3 className="text-xl font-semibold text-card">
                {projects[currentIndex].title}
              </h3>
              <p className="text-card/80 mt-1">
                {projects[currentIndex].material} | {projects[currentIndex].location}
              </p>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-card/60 text-sm">
            {currentIndex + 1} / {projects.length}
          </div>
        </div>
      )}
    </section>
  )
}
