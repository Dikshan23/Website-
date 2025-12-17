import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/utils/supabase/server"
import { sendConfirmationEmail } from "@/lib/email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as any, // Cast to any to avoid strict typing issues
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
    const body = await req.text()
    const sig = (await headers()).get("stripe-signature") as string

    let event: Stripe.Event

    try {
        if (!sig || !endpointSecret) {
            console.error("Webhook Error: Missing signature or secret")
            return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
        }
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session

            console.log("Payment successful for session:", session.id)

            // Record in Supabase
            const supabase = await createClient()

            const { error } = await supabase.from("payments").insert({
                id: session.id,
                created_at: new Date(session.created * 1000).toISOString(),
                customer_email: session.customer_details?.email,
                amount: session.amount_total, // stored in cents
                plan_id: session.metadata?.priceId, // Retrieved from metadata we added
                status: session.payment_status,
            })

            if (error) {
                console.error("Supabase payment record error:", error)
                return NextResponse.json({ error: "Database error" }, { status: 500 })
            }

            // Send confirmation email
            if (session.customer_details?.email) {
                await sendConfirmationEmail(
                    session.customer_details.email,
                    session.amount_total || 0,
                    session.metadata?.priceId || "Unknown Plan"
                )
            }

            break
        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
}
