import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LEGENDS GYM | Transform Your Body. Transform Your Life. | St. Petersburg FL",
  description:
    "Join the #1 Gym in St. Petersburg, FL. Open 24/7. Modern Machines. Certified Trainers. Start your fitness journey at Legends Gym today!",
  keywords: [
    "gym",
    "fitness",
    "workout",
    "personal training",
    "weight loss",
    "muscle building",
    "St. Petersburg",
    "Florida",
    "24 hour gym",
  ],
  openGraph: {
    title: "LEGENDS GYM | Transform Your Body | St. Petersburg FL",
    description: "Join the #1 Gym in St. Petersburg, FL. Open 24/7. Modern Machines. Certified Trainers.",
    type: "website",
    url: "https://www.legendsgymstpete.com",
  },
  generator: 'v0.app'
}

export const viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Legends Gym",
              image: "/gym-hero.jpg",
              "@id": "https://www.legendsgymstpete.com",
              url: "https://www.legendsgymstpete.com",
              telephone: "+1-727-613-1110",
              address: {
                "@type": "PostalAddress",
                streetAddress: "2232 2nd Avenue South",
                addressLocality: "St. Petersburg",
                addressRegion: "FL",
                postalCode: "33712",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 27.7588,
                longitude: -82.6474,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "00:00",
                  closes: "23:59",
                },
              ],
              priceRange: "$$",
              sameAs: ["https://www.facebook.com/602979542892007", "https://www.instagram.com/legendsgymstpete"],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
