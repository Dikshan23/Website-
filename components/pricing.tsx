"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const plans = [
  {
    name: "Basic",
    price: "29",
    duration: "month",
    description: "Perfect for beginners starting their fitness journey",
    features: [
      "Full Gym Access",
      "Locker Room Access",
      "Basic Equipment Training",
      "Mobile App Access",
      "Community Forum Access",
    ],
    popular: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC,
  },
  {
    name: "Standard",
    price: "59",
    duration: "month",
    description: "Most popular choice for dedicated fitness enthusiasts",
    features: [
      "Everything in Basic",
      "All Group Classes",
      "2 Personal Training Sessions/mo",
      "Nutrition Consultation",
      "Body Composition Analysis",
      "Priority Booking",
    ],
    popular: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_STANDARD,
  },
  {
    name: "Premium VIP",
    price: "99",
    duration: "month",
    description: "Ultimate package for serious transformation seekers",
    features: [
      "Everything in Standard",
      "Unlimited Personal Training",
      "24/7 Gym Access",
      "Private Locker",
      "Towel Service",
      "Guest Passes (2/mo)",
      "Recovery Room Access",
      "Premium App Features",
    ],
    popular: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM,
  },
]


export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(1) // Default to Standard (index 1)
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

  const handleCheckout = async (priceId: string | undefined) => {
    if (!priceId) {
      alert("Configuration Error: Stripe Price ID is missing. Please check your .env.local file and restart the server.")
      return
    }

    setLoadingId(priceId)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Error connecting to Stripe:", error)
      alert("Checkout failed. Please try again later.")
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <section id="pricing" ref={sectionRef} className="py-16 md:py-24 relative">
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
            Membership Plans
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Invest in Your <span className="text-primary">Health</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-lg transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Choose the perfect plan that fits your goals and budget. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          onMouseLeave={() => setActiveIndex(1)} // Reset to Standard (index 1) on leave
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "relative rounded-2xl p-8 transition-all duration-500",
                index === activeIndex ? "glass neon-border scale-105 z-10" : "glass opacity-90 scale-100 blur-[0.5px] hover:opacity-100 hover:blur-0",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Popular Badge - Keep it statically on the popular plan */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-primary px-4 py-1 rounded-full">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                    <span className="text-sm font-bold text-primary-foreground">Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-black text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/{plan.duration}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => handleCheckout(plan.priceId)}
                className={cn(
                  "w-full font-bold transition-all duration-300",
                  index === activeIndex
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
                )}
                size="lg"
                disabled={loadingId === plan.priceId}
              >
                {loadingId === plan.priceId ? "Processing..." : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <p
          className={cn(
            "text-center text-muted-foreground mt-12 transition-all duration-700 delay-600",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          ✨ 7-day free trial on all plans • 💰 30-day money-back guarantee
        </p>
      </div>
    </section>
  )
}
