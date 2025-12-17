"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight, Play, Star } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const heroImages = [
    "/muscular-athlete-lifting-heavy-weights-in-modern-d.jpg",
    "/fit-woman-doing-deadlift-in-premium-fitness-center.jpg",
    "/group-fitness-class-high-intensity-training-in-mod.jpg",
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img || "/placeholder.svg"}
              alt={`Legends Gym - Image ${index + 1}`}
              className="w-full h-full object-cover scale-105"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60 md:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 md:via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 md:from-background/80 via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements - hidden on mobile for performance */}
      <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 pt-20 sm:pt-24 pb-28 sm:pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 glass px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">St. Pete's Premier 24/7 Gym</span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <span className="text-foreground">Where</span>
              <br className="sm:hidden" />
              <span className="sm:hidden"> </span>
              <span className="text-primary neon-glow">Excellence</span>
              <br />
              <span className="text-foreground">Meets</span> <span className="text-primary neon-glow">Community</span>
            </h1>

            <p
              className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Your new fitness home in downtown St. Petersburg. Premium equipment. Expert trainers. A community that
              empowers your journey.
            </p>

            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 animate-pulse-glow group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="tel:+17276131110" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-background/50 backdrop-blur-sm"
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  (727) 613-1110
                </Button>
              </a>
            </div>

            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href="https://wa.me/17276131110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm font-medium">WhatsApp Us</span>
              </a>
              <a
                href="#facilities"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-primary/50 flex items-center justify-center">
                  <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary fill-primary ml-0.5" />
                </div>
                <span className="text-sm font-medium">Take a Tour</span>
              </a>
            </div>
          </div>

          {/* Right Content - Stats Cards - hidden on mobile, shown as grid below */}
          <div
            className={`relative hidden lg:block transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            {/* Main Feature Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-2 neon-border">
                <img
                  src="/fit-athletic-person-flexing-muscles-in-premium-gym.jpg"
                  alt="Transform at Legends Gym"
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
                {/* Floating Stats */}
                <div className="absolute -left-6 top-1/4 glass rounded-xl p-4 animate-float">
                  <div className="text-3xl font-black text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Always Open</div>
                </div>
                <div className="absolute -right-6 top-1/2 glass rounded-xl p-4 animate-float delay-300">
                  <div className="text-3xl font-black text-primary">500+</div>
                  <div className="text-xs text-muted-foreground">Transformations</div>
                </div>
                <div className="absolute -left-4 bottom-1/4 glass rounded-xl p-4 animate-float delay-500">
                  <div className="text-3xl font-black text-primary">15+</div>
                  <div className="text-xs text-muted-foreground">Expert Trainers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mt-8 sm:mt-12 lg:hidden transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <StatCard number="500+" label="Transformations" />
          <StatCard number="15+" label="Expert Trainers" />
          <StatCard number="10+" label="Years Experience" />
          <StatCard number="24/7" label="Always Open" />
        </div>
      </div>

      <div className="absolute bottom-32 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImage === index ? "w-6 sm:w-8 bg-primary" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="glass rounded-xl p-3 sm:p-4 text-center group hover:neon-border transition-all duration-300">
      <div className="text-xl sm:text-2xl md:text-3xl font-black text-primary mb-0.5 sm:mb-1">{number}</div>
      <div className="text-[10px] sm:text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
