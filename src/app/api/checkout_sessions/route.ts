"use server"
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const body = await request.json()

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer: body.stripeCustomerId,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: body.mode as "payment" | "subscription",
      success_url: `${origin}/${body.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${body.cancelUrl}`
    });
    return session.url ? NextResponse.json({url: session.url}) : NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  } catch (err: unknown) {
    if (err instanceof Error) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
    }
  }
}