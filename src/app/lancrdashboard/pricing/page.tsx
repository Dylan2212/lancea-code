"use client"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

export default function Pricing () {
  const router = useRouter()
  const userId = useOriginalUserStore(state => state.userId)

  async function checkoutUser (priceId: string, mode: "subscription" | "payment") {
    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    const response = await fetch("../api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        mode,
        stripeCustomerId: user?.stripe_customer_id,
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
      <p>
        This is the pricing for premium (monthly and annual toggle)
      </p>
      <button onClick={() => checkoutUser("price_1SZxPZBfQy9tndTNJLEdKxlN", "subscription")}>Go Premium</button>
    </div>
  )
}