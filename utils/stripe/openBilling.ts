import { supabase } from "@/lib/supabaseClient";

export default async function OpenBilling (userId: string) {
  const { data: user } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", userId)
    .single()

  const customerId = user?.stripe_customer_id

  const res = await fetch("/api/billingPortal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId })
  })

  const { url } = await res.json()
  return url
}