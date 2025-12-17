"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

export default function PaymentSuccessToast() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (searchParams.get("success") === "true") {
            toast.success("Payment Successful!", {
                description: "Thank you for your purchase.",
                duration: 5000,
            })
            // Clean up the URL
            router.replace("/", { scroll: false })
        }
    }, [searchParams, router])

    return null
}
