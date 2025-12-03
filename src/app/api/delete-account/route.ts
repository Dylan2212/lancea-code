import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  // Create supabase client with service role key (server-side only!)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Extract the access token from the request headers (or cookies) if needed
  // Alternatively, you can expect the client to send the user's access token in the request header or body
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = authHeader.split(" ")[1];

  // Get the user session from access token
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uid = user.id;

  // Step 1: Fetch profile info from your DB
  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, profileImage, stripe_customer_id")
    .eq("id", uid)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "User profile not found" }, { status: 404 });
  }

  if (profile.stripe_customer_id) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: profile.stripe_customer_id,
        status: 'all', // or 'active' if you only care about active
      });
    
      for (const sub of subscriptions.data) {
        await stripe.subscriptions.update(sub.id, {
          cancel_at_period_end: false, // immediate cancellation; set true if you want to end at period end
        });
      }
    
      await stripe.customers.del(profile.stripe_customer_id);
    } catch (err: unknown) {
      console.error("Failed to delete Stripe customer or cancel subscriptions:", err);
    }
  }

  // Step 2: Delete additional_links rows
  const { error: linksError } = await supabase
    .from("additional_links")
    .delete()
    .eq("user_id", uid);

  if (linksError) {
    return NextResponse.json({ error: linksError.message }, { status: 500 });
  }

  // Step 3: Delete profile image from storage (if exists)
  if (profile.profileImage) {
    // Assuming profileImage contains the public URL, extract the path relative to bucket
    // For example, if URL is https://xyz.supabase.co/storage/v1/object/public/profile-images/abc.jpg
    // You want to extract 'abc.jpg'
    const imagePathMatch = profile.profileImage.match(/profile-images\/(.+)(\?.*)?$/);
    const imagePath = imagePathMatch ? imagePathMatch[1] : null;

    if (imagePath) {
      const { error: imageDeleteError } = await supabase.storage
        .from("profile-images")
        .remove([imagePath]);

      if (imageDeleteError) {
        console.error("Failed to delete profile image:", imageDeleteError.message);
      }
    }
  }

  // Step 4: Delete the user row from users table
  const { error: userDeleteError } = await supabase
    .from("users")
    .delete()
    .eq("id", uid);

  if (userDeleteError) {
    return NextResponse.json({ error: userDeleteError.message }, { status: 500 });
  }

  // Step 5: Delete user from Supabase Auth (requires service role key and admin client)
  try {
    await supabase.auth.admin.deleteUser(uid);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to delete user from auth:", err.message);
    } else {
      console.error("Failed to delete user from auth:", err);
    }
    return NextResponse.json({ error: "Failed to delete user from auth" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}