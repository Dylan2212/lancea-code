"use client"

import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function PricingPage () {
  const router = useRouter()

  async function checkoutUser (priceId: string, mode: "subscription" | "payment") {
    const response = await fetch("../api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        mode,
        successUrl: "/pricing/checkout/success",
        cancelUrl: "/pricing"
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
    <div className="flex gap-10 pt-10 pl-10">
      <button>Free</button>
      <button onClick={() => checkoutUser("price_1SZxPZBfQy9tndTNJLEdKxlN", "subscription")}>Monthly</button>
      <button onClick={() => checkoutUser("price_1SZxPZBfQy9tndTNJLEdKxlN", "subscription")}>Annualy</button>
      <button onClick={() => checkoutUser("price_1SZxPZBfQy9tndTNJLEdKxlN", "subscription")}>Lifetime</button>
    </div>
  )
}