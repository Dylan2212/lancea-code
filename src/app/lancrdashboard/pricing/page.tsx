"use client"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import MonthlyYearlyPricing from "../../components/pricing/monthlyYearlyPricing"

//PRICING FLOW FROM HOME PAGE
//THEN LETS MAKE PROPER PRODUCTS
//THEN SET UP BRANDING REMOVAL
//THEN META DATA CUSTOM
//THEN DOMAIN
//GET THIS CHECKOUT PROCESS REMOVED FROM FILE

export default function Pricing () {
  const router = useRouter()
  const userId = useOriginalUserStore(state => state.userId)

  async function checkoutUser (priceId: string, mode: "subscription" | "payment") {
    let stripeId: string

    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    if (!user?.stripe_customer_id) {
      const res = await fetch("/api/stripe/createStripeUser", {
        method: "POST"
      })

      const data = await res.json()

      stripeId = data.stripeId
    } else {
      stripeId = user.stripe_customer_id
    }


    //THIS NEEDS TO PUSH TO SUPABASE AND THEN RETRY

    const response = await fetch("/api/stripe/checkout-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        mode,
        stripeCustomerId: stripeId,
        successUrl: "/lancrdashboard/profile",
        cancelUrl: "/lancrdashboard/pricing"
      })
    })

    const data = await response.json()

    if (data.url) {
      router.push(data.url)
    } else {
      toast.error("Checkout failed")
    }
  }

  return (
    <div className="pl-32 pt-32">
      <MonthlyYearlyPricing checkout={checkoutUser} />
    </div>
  )
}