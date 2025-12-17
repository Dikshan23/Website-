"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const transformations = [
  {
    before: "/overweight-man-before-fitness-transformation-dark-.jpg",
    after: "/fit-muscular-man-after-fitness-transformation-dark.jpg",
    name: "Michael R.",
    duration: "6 months",
    weightLoss: "45 lbs",
  },
  {
    before: "/woman-before-weight-loss-transformation-dark-backg.jpg",
    after: "/fit-athletic-woman-after-transformation-dark-backg.jpg",
    name: "Sarah K.",
    duration: "4 months",
    weightLoss: "30 lbs",
  },
  {
    before: "/skinny-man-before-muscle-gain-dark-background.jpg",
    after: "/muscular-man-after-bulk-transformation-dark-backgr.jpg",
    name: "James T.",
    duration: "8 months",
    weightLoss: "+25 lbs muscle",
  },
]

export default function Transformations() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length)
    setSliderPosition(50)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
    setSliderPosition(50)
  }

  const current = transformations[currentIndex]

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Success Stories
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Real <span className="text-primary">Transformations</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-lg transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            See the incredible results our members have achieved with dedication and guidance.
          </p>
        </div>

        {/* Transformation Slider */}
        <div
          className={cn(
            "max-w-2xl mx-auto transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="relative rounded-2xl overflow-hidden glass">
            {/* Image Container */}
            <div className="relative aspect-[4/5] select-none">
              {/* After Image (Background) */}
              <img
                src={current.after || "/placeholder.svg"}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before Image (Overlay with clip) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={current.before || "/placeholder.svg"}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Slider Handle */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              />

              {/* Visual Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary z-10 pointer-events-none"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-primary-foreground -ml-0.5" />
                  <ChevronRight className="w-4 h-4 text-primary-foreground -mr-0.5" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 text-foreground text-sm font-semibold z-20">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold z-20">
                After
              </div>
            </div>

            {/* Info */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">{current.name}</h3>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <span>⏱️ {current.duration}</span>
                <span>🔥 {current.weightLoss}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:neon-border transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <div className="flex gap-2">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setSliderPosition(50)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/50",
                  )}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:neon-border transition-all"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
