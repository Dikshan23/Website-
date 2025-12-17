# Deployment Guide

This project is optimized for **Vercel**, the creators of Next.js.

## Vercel Deployment

1.  **Create a Vercel Account**: [https://vercel.com/signup](https://vercel.com/signup)
2.  **Import Project**:
    - Connect your GitHub account.
    - Select the **Legends Gym** repository.
3.  **Configure Project**:
    - **Framework Preset**: Next.js
    - **Root Directory**: `./`
4.  **Environment Variables**:
    - Copy all values from your local `.env.local` to the Vercel Environment Variables section.
    - *Tip*: You can copy the entire file content and paste it; Vercel will parse it.
5.  **Deploy**: Click **Deploy**.

## Post-Deployment Checks
- Verify the **Contact Form** sends emails.
- Verify **Stripe Checkout** redirects correctly.
- **Important**: Add your Vercel domain to the **Stripe Webhook** endpoints settings (e.g., `https://your-site.vercel.app/api/webhook`).
