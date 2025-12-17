import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Facilities from "@/components/facilities"
import Pricing from "@/components/pricing"
import WhyChooseUs from "@/components/why-choose-us"
import Transformations from "@/components/transformations"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import FloatingCTA from "@/components/floating-cta"
import MobileBottomBar from "@/components/mobile-bottom-bar"
import PaymentSuccessToast from "@/components/payment-success-toast"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <PaymentSuccessToast />
      </Suspense>
      <Header />
      <Hero />
      <About />
      <Services />
      <Facilities />
      <Pricing />
      <WhyChooseUs />
      <Transformations />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingCTA />
      <MobileBottomBar />
    </main>
  )
}
