import { createAdminClient } from "@/utils/supabase/server"

export async function checkTestimonialUserid (testimonialId: string): Promise<{ user_id: string} | null> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("user_services")
    .select("user_id")
    .eq("id", testimonialId)
    .maybeSingle()

    if (error) throw new Error("Error fetching service: " + error.message)

  return data
}