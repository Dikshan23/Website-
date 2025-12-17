# Architecture & Tech Stack

## Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Framework** | Next.js 16 (App Router) | Latest React features, Server Components, SEO. |
| **Language** | TypeScript | Type safety, maintainability. |
| **Styling** | Tailwind CSS v4 | Utility-first, optimized CSS bundle. |
| **UI Library** | Shadcn UI | Accessible, customizable components. |
| **Database** | Supabase (PostgreSQL) | Scalable, relational data storage. |
| **Payments** | Stripe | Industry standard for secure payments. |
| **Email** | SendGrid | Reliable transactional email delivery. |

## Folder Structure

```
/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes (Serverless)
│   │   ├── checkout/     # Stripe Checkout logic
│   │   ├── contact/      # Form submission logic
│   │   └── webhook/      # Stripe Webhook handler
│   ├── globals.css       # Global styles & Tailwind directives
│   ├── layout.tsx        # Root layout (Fonts, Meta)
│   └── page.tsx          # Landing Page (Home)
├── components/           # React Components
│   ├── ui/               # Reusable primitives (Button, Input)
│   ├── hero.tsx          # Hero Section
│   ├── pricing.tsx       # Pricing Cards
│   └── ...
├── lib/                  # Library/Utility functions
│   ├── supabaseClient.ts # Supabase connection
│   └── utils.ts          # Helper functions (CN class merger)
└── public/               # Static Assets (Images, Icons)
```

## System Design

### Client-Side
- Uses **React Server Components** for static content (Hero, Info).
- Uses **Client Components** (`'use client'`) for interactive elements (Forms, Pricing Buttons).

### Server-Side
- **API Routes**: Handle private logic (Secret Keys).
    - `/api/contact`: Validates input -> Saves to DB -> Sends Email.
    - `/api/checkout`: Creates Stripe Session.
    - `/api/webhook`: Listens for Stripe events -> Updates DB.
