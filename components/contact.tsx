"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["2232 2nd Avenue South", "St. Petersburg, FL 33712"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (727) 613-1110"],
    href: "tel:+17276131110",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@legendsgymstpete.com"],
    href: "mailto:info@legendsgymstpete.com",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Open 24/7", "Monday - Sunday"],
  },
]

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    plan: "standard",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "", plan: "standard" })
      toast.success("Message sent successfully!", {
        description: "We'll get back to you shortly.",
      })

      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to send message", {
        description: "Please try again later or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Get In Touch
          </span>
          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-foreground transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Start Your <span className="text-primary">Journey</span>
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-lg transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Ready to transform? Fill out the form below or visit us today at our St. Petersburg location.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form - Updated title */}
          <div
            className={cn(
              "glass rounded-2xl p-8 transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            )}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Join Legends Gym Today</h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">Thank You!</h4>
                <p className="text-muted-foreground">We'll contact you within 24 hours to discuss your membership.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@email.com"
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (727) 000-0000"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Interested Plan</label>
                    <select
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      className="w-full h-10 px-3 rounded-md bg-secondary border border-border text-foreground"
                    >
                      <option value="basic">Basic Plan</option>
                      <option value="standard">Standard Plan</option>
                      <option value="premium">Premium VIP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message (Optional)</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your fitness goals..."
                    className="bg-secondary border-border min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                  size="lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Start My Transformation"
                  )}
                </Button>
              </form>
            )}

            {/* Quick Actions - Updated phone and WhatsApp */}
            <div className="flex gap-4 mt-6 pt-6 border-t border-border">
              <a
                href="tel:+17276131110"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href="https://wa.me/17276131110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-400",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
            )}
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="glass rounded-xl p-5 hover:neon-border transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                  {info.details.map((detail, i) =>
                    info.href ? (
                      <a
                        key={i}
                        href={info.href}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ),
                  )}
                </div>
              ))}
            </div>

            {/* Map - Updated to St. Petersburg, FL location */}
            <div className="glass rounded-2xl overflow-hidden h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.8123456789!2d-82.64740!3d27.75880!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e1234567890%3A0xabcdef1234567890!2s2232%202nd%20Ave%20S%2C%20St.%20Petersburg%2C%20FL%2033712!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Legends Gym Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
