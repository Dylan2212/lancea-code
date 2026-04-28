"use server";

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { customerId } = await req.json();

    if (!customerId) {
      return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lancrdashboard/profile`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating billing portal session:", err);
      return NextResponse.json(
        { error: err.message || "Unknown error" },
        { status: 500 }
      );
    }
  }
}