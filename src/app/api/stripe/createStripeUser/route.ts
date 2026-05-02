"use server"
import { supabase } from "@/lib/supabaseClient"
import { requireUser } from "@/src/domain/auth/requireUser"
import { createAdminClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)




export async function POST () {
  const { user } = await requireUser()

  const { data } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single()

  if (data?.stripe_customer_id) {
    return NextResponse.json({ stripeId: data.stripe_customer_id})
  }

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { supabaseUserId: user.id }
  }
  )

  const admin = createAdminClient()

  await admin.from("users").update({ stripe_customer_id: customer.id }).eq("id", user.id)

  return NextResponse.json({ stripeId: customer.id})
}