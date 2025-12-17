"use client"

import { useState, useEffect } from "react"
import { X, Dumbbell } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDismissed) return null

  return (
    <a
      href="#contact"
      className={cn(
        "fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40 group transition-all duration-300 hidden md:flex",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
      )}
    >
      <div className="relative flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-lg animate-pulse-glow group-hover:scale-105 transition-transform">
        <Dumbbell className="w-5 h-5" />
        <span>Join Now</span>
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsDismissed(true)
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-background text-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </a>
  )
}
