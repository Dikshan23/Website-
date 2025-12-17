"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#facilities", label: "Facilities" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 py-3"
          : "bg-background/80 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative">
            {/* Crown + Dumbbell Logo */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full group-hover:bg-primary/50 transition-all" />
              {/* Logo container */}
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                {/* Crown Icon */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-current">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm0 2h14v2H5v-2z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight leading-none text-foreground">LEGENDS</span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-primary">GYM</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+17276131110">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              Call Now
            </Button>
          </a>
          <a href="#contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold animate-pulse-glow">
              Join Now
            </Button>
          </a>
        </div>

        <button
          className="md:hidden relative z-50 p-2 rounded-lg bg-background border border-primary/30 text-foreground hover:bg-primary/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-0 top-0 z-40 transition-all duration-300",
          isMobileMenuOpen ? "visible" : "invisible",
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-background transition-opacity duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu content */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 pt-20 pb-8 px-6 transition-all duration-300",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-2 mt-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-semibold text-foreground hover:text-primary py-4 px-4 rounded-xl hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all",
                  isMobileMenuOpen && "animate-slide-up",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
              <a href="tel:+17276131110" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full py-6 text-base border-primary/50 text-foreground hover:bg-primary/10 bg-transparent"
                >
                  Call (727) 613-1110
                </Button>
              </a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Join Now
                </Button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
