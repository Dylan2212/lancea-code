"use server"
import { supabase } from "@/lib/supabaseClient"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export async function POST (req: Request) {
  const { uid, email } = await req.json()

  const { data: user } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", uid)
    .single()

  if (user?.stripe_customer_id) {
    return NextResponse.json({ stripeId: user.stripe_customer_id})
  }

  const idempotencyKey = `create_customer_${uid}`

  const customer = await stripe.customers.create({
    email,
    metadata: { supabaseUserId: uid }
  },
  {
    idempotencyKey
  }
  )

  return NextResponse.json({ stripeId: customer.id})
}