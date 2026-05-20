"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollLink } from "@/components/scroll-link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-accent">
                AZ
              </span>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground ml-1">
                ELITE
              </span>
              <span className="text-lg sm:text-xl font-medium text-muted-foreground ml-2">
                Granite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ScrollLink 
              href="#services" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </ScrollLink>
            <ScrollLink 
              href="#materials" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Materials
            </ScrollLink>
            <ScrollLink 
              href="#gallery" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Gallery
            </ScrollLink>
            <ScrollLink 
              href="#about" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </ScrollLink>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ScrollLink href="#estimate">Get Free Estimate</ScrollLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <ScrollLink 
                href="#services" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </ScrollLink>
              <ScrollLink 
                href="#materials" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Materials
              </ScrollLink>
              <ScrollLink 
                href="#gallery" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </ScrollLink>
              <ScrollLink 
                href="#about" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </ScrollLink>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                <ScrollLink href="#estimate" onClick={() => setIsMenuOpen(false)}>
                  Get Free Estimate
                </ScrollLink>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
