"use client"

import { useEffect, useRef, useState } from "react"
import { Award, DollarSign, Clock, Settings, MapPin, TrendingUp, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const reasons = [
  {
    icon: Award,
    title: "Certified Trainers",
    description: "All our trainers are nationally certified with years of experience",
  },
  {
    icon: DollarSign,
    title: "Affordable Membership",
    description: "Premium facilities at prices that won't break your budget",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Open early mornings to late nights to fit your schedule",
  },
  {
    icon: Settings,
    title: "Modern Machines",
    description: "Latest equipment from top brands like Technogym and Life Fitness",
  },
  {
    icon: MapPin,
    title: "Local & Trusted",
    description: "Proudly serving the New York community for over 10 years",
  },
  {
    icon: TrendingUp,
    title: "500+ Transformations",
    description: "Proven track record of helping members achieve their goals",
  },
]

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Why Choose Us
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            The IRONFORGE <span className="text-primary">Difference</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-lg transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Discover why thousands of New Yorkers trust us with their fitness journey.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={cn(
                "glass rounded-xl p-6 hover:neon-border transition-all duration-500 group",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {reason.title}
              </h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Google Reviews Highlight */}
        <div
          className={cn(
            "glass rounded-2xl p-8 max-w-3xl mx-auto text-center transition-all duration-700 delay-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-2xl font-bold text-foreground mb-2">4.9 out of 5</p>
          <p className="text-muted-foreground">Based on 500+ Google Reviews</p>
        </div>
      </div>
    </section>
  )
}
