import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role key!
);

export async function updateUserSubscription(
  stripeCustomerId: string,
  status: string
) {

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: status,
      premium: status === 'active'
    })
    .eq('stripe_customer_id', stripeCustomerId);

  if (error) {
    console.error("Error updating user in Supabase:", error);
    throw error;
  }
}