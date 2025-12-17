"use client"

import { useEffect, useRef, useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Jennifer M.",
    image: "/avatar-1.png",
    rating: 5,
    text: "IRONFORGE completely changed my life! The trainers are incredibly supportive and the equipment is top-notch. Lost 40 lbs in 5 months!",
    membership: "Premium Member",
  },
  {
    name: "David L.",
    image: "/fit-man-headshot-athletic.jpg",
    rating: 5,
    text: "Best gym in New York hands down. The HIIT classes are intense but rewarding. The community here is like family.",
    membership: "Standard Member",
  },
  {
    name: "Amanda R.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "I was intimidated to start, but the staff made me feel so welcome. Now I can't imagine my life without IRONFORGE!",
    membership: "Basic Member",
  },
  {
    name: "Marcus T.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The personal training here is next level. My trainer understood my goals and created a perfect program. Gained 20 lbs of muscle!",
    membership: "VIP Member",
  },
  {
    name: "Lisa K.",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "At 45, I thought it was too late to get in shape. IRONFORGE proved me wrong. The yoga classes are amazing for recovery!",
    membership: "Premium Member",
  },
]

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

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

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Testimonials
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            What Our Members <span className="text-primary">Say</span>
          </h2>
        </div>

        {/* Testimonials Slider */}
        <div
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="relative">
            {/* Current Testimonial */}
            <div className="glass rounded-2xl p-8 md:p-12 text-center">
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Name & Membership */}
              <h4 className="text-lg font-bold text-foreground">{testimonials[currentIndex].name}</h4>
              <p className="text-sm text-primary">{testimonials[currentIndex].membership}</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full glass flex items-center justify-center hover:neon-border transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full glass flex items-center justify-center hover:neon-border transition-all"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
