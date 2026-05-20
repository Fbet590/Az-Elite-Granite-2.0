import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold tracking-tight text-accent">
                  AZ
                </span>
                <span className="text-2xl font-bold tracking-tight text-foreground ml-1">
                  ELITE
                </span>
                <span className="text-lg font-medium text-muted-foreground ml-2">
                  Granite
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Arizona&apos;s premier countertop installation company. Transforming kitchens and bathrooms with premium surfaces since 2004.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-3">
              <Link href="#services" className="block text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="#materials" className="block text-muted-foreground hover:text-foreground transition-colors">
                Materials
              </Link>
              <Link href="#gallery" className="block text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </Link>
              <Link href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Service Areas</h4>
            <nav className="space-y-3">
              <p className="text-muted-foreground">Phoenix</p>
              <p className="text-muted-foreground">Scottsdale</p>
              <p className="text-muted-foreground">Paradise Valley</p>
              <p className="text-muted-foreground">Tempe</p>
              <p className="text-muted-foreground">Mesa</p>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 AZ ELITE Granite. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
