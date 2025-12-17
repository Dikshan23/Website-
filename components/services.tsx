"use client"

import { useEffect, useRef, useState } from "react"
import { Dumbbell, Heart, UserCheck, Flame, Sparkles, Scale } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    description:
      "Build muscle, increase strength, and transform your physique with our comprehensive weight training programs.",
    features: ["Free Weights", "Machines", "Cable Systems"],
  },
  {
    icon: Heart,
    title: "Cardio Zone",
    description: "State-of-the-art cardio equipment to boost your endurance and burn calories effectively.",
    features: ["Treadmills", "Ellipticals", "Rowing Machines"],
  },
  {
    icon: UserCheck,
    title: "Personal Training",
    description: "One-on-one sessions with certified trainers who create customized workout plans for your goals.",
    features: ["Custom Plans", "Progress Tracking", "Nutrition Guide"],
  },
  {
    icon: Flame,
    title: "HIIT Classes",
    description: "High-intensity interval training classes that maximize calorie burn and boost metabolism.",
    features: ["Group Sessions", "All Levels", "Full Body Workout"],
  },
  {
    icon: Sparkles,
    title: "Yoga & Wellness",
    description: "Find balance and flexibility with our yoga sessions and wellness programs.",
    features: ["Hot Yoga", "Meditation", "Recovery Sessions"],
  },
  {
    icon: Scale,
    title: "Weight Loss Coaching",
    description: "Comprehensive weight loss programs combining exercise, nutrition, and accountability.",
    features: ["Body Analysis", "Meal Plans", "Weekly Check-ins"],
  },
]

export default function Services() {
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
    <section id="services" ref={sectionRef} className="py-16 md:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Our Services
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Programs Designed for <span className="text-primary">Your Success</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-lg transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            From beginners to advanced athletes, we have programs tailored to help you achieve your fitness goals faster
            and more effectively.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: (typeof services)[0]
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className={cn(
        "group glass rounded-2xl p-6 hover:neon-border transition-all duration-500 cursor-pointer",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
      )}
      style={{ transitionDelay: `${300 + index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
        <service.icon className="w-7 h-7 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground mb-5 leading-relaxed">{service.description}</p>

      {/* Features */}
      <div className="flex flex-wrap gap-2">
        {service.features.map((feature, i) => (
          <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}
