import { createAdminClient } from "@/utils/supabase/server";
import type { TestimonialData } from "@/src/types";

export async function getUserTestimonials (userId: string): Promise<TestimonialData[]> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("testimonials")
    .select("id, name, body")
    .eq("user_id", userId)

  if (error) throw error

  return data
}