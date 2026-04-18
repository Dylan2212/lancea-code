import { createAdminClient } from "@/utils/supabase/server";

export async function deleteTestimonial (id: string) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("testimonials")
    .delete()
    .eq("id", id)

  if (error) throw new Error("Internal service error")
}

export async function deleteAllTestimonials (id: string) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("testimonials")
    .delete()
    .eq("user_id", id)

  if (error) throw new Error("Internal service error")
}