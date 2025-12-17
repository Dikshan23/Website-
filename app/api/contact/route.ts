import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, message, plan } = body

        // 1. Initialize Supabase Client
        const supabase = await createClient()

        // 2. Insert into Supabase
        const { error: dbError } = await supabase.from("contact_submissions").insert({
            name,
            email,
            phone,
            message,
            plan,
        })

        if (dbError) {
            console.error("Supabase Error:", dbError)
            return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
        }

        // 3. Send Email via SendGrid
        const apiKey = process.env.SENDGRID_API_KEY
        const fromEmail = process.env.EMAIL_FROM
        const toEmail = process.env.EMAIL_TO

        if (apiKey && fromEmail && toEmail) {
            sgMail.setApiKey(apiKey)

            const msg = {
                to: toEmail,
                from: fromEmail,
                replyTo: email, // Allow replying directly to the user
                subject: `New Gym Lead: ${name}`,
                text: `New Gym Lead!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlan: ${plan}\nMessage: ${message}`,
                html: `
          <h1>New Gym Lead!</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Plan:</strong> ${plan}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
            }

            try {
                await sgMail.send(msg)
            } catch (emailError: any) {
                console.error("SendGrid Error:", emailError)
                if (emailError.response) {
                    console.error(emailError.response.body)
                }
                // We don't fail the request if email fails, but we log it.
            }
        } else {
            console.warn("SendGrid credentials missing, skipping email.")
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Server Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
