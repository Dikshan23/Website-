"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const facilities = [
  {
    title: "Modern Machines",
    image: "/modern-gym-equipment-machines-dark-lighting-green-.jpg",
    description: "Latest Technogym and Life Fitness equipment",
  },
  {
    title: "Free Weights Zone",
    image: "/free-weights-dumbbells-area-dark-gym-green-neon.jpg",
    description: "Comprehensive dumbbell and barbell collection",
  },
  {
    title: "Locker Rooms",
    image: "/luxury-gym-locker-room-modern-dark-aesthetic.jpg",
    description: "Premium lockers with shower facilities",
  },
  {
    title: "CrossFit Area",
    image: "/crossfit-box-gym-area-functional-training.jpg",
    description: "Dedicated functional training space",
  },
  {
    title: "Studio Room",
    image: "/group-fitness-studio-room-mirrors-dark.jpg",
    description: "Spacious room for group classes",
  },
  {
    title: "Free Parking",
    image: "/gym-parking-lot-modern-building-night.jpg",
    description: "Convenient parking for all members",
  },
]

export default function Facilities() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
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
    <section id="facilities" ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Our Facilities
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            World-Class <span className="text-primary">Equipment</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-lg transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Experience fitness at its finest with our state-of-the-art facilities designed to support every aspect of
            your fitness journey.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className={cn(
                "group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
                <p className="text-sm text-muted-foreground">{facility.description}</p>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={facilities[selectedImage].image || "/placeholder.svg"}
              alt={facilities[selectedImage].title}
              className="w-full rounded-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-foreground">{facilities[selectedImage].title}</h3>
              <p className="text-muted-foreground mt-1">{facilities[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
