"use client"

import { useEffect, useRef, useState } from "react"
import { Users, Clock, CheckCircle2, Building2, Dumbbell } from "lucide-react"

const features = [
  { icon: Building2, text: "Sleek, Upscale Facility" },
  { icon: Dumbbell, text: "Top-of-the-Line Equipment" },
  { icon: Users, text: "Strong Community Spirit" },
  { icon: Clock, text: "Open 24/7" },
]

const certifications = [
  "Premium Equipment Brands",
  "Industry Leading Machines",
  "Innovation & Durability",
  "Performance Focused",
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/upscale-modern-gym-interior-with-premium-equipment.jpg"
                alt="Premium Training Facility at Legends Gym St. Petersburg"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-6 animate-float">
              <div className="text-4xl font-black text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Always Open</div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-xl" />
          </div>

          {/* Content Side - Updated with actual Legends Gym business profile */}
          <div
            className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground">
              Your New <span className="text-primary">Fitness Home</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Welcome to your new fitness home in the heart of downtown St. Petersburg. Our gym was built with one
              mission in mind: to create a space where{" "}
              <span className="text-foreground font-semibold">excellence meets community</span>, and where every member
              feels empowered on their fitness journey.
            </p>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Located in a sleek, upscale building, our facility features top-of-the-line equipment from the industry's
              leading brands, offering the best in performance, innovation, and durability. But what truly sets us apart
              isn't just the quality of our machines—
              <span className="text-foreground font-semibold">it's the strength of our community</span>.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 glass rounded-lg p-4 hover:neon-border transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                What Sets Us Apart
              </h4>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
