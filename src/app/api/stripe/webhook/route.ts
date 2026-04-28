import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateUserSubscription } from '@/lib/db';

export const runtime = 'nodejs';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
    return
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        let simpleStatus: "inactive" | "active"

          switch (subscription.status) {
            case 'active':
            case 'trialing':
            case 'past_due':
              simpleStatus = 'active';
              break;
            default:
              simpleStatus = 'inactive';
              break;
          }
        if (!subscription.customer) break;
        await updateUserSubscription(subscription.customer.toString(), simpleStatus);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        if (!subscription.customer) break;
        await updateUserSubscription(subscription.customer.toString(), 'inactive');
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        if (!invoice.customer) break;
        await updateUserSubscription(invoice.customer.toString(), 'active');
        break;
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        if (!invoice.customer) break;
        await updateUserSubscription(invoice.customer.toString(), 'inactive');
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error('Error handling webhook event:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
};