import { createAdminClient } from "@/utils/supabase/server";
import type { TestimonialData } from "@/src/types";

export async function upsertTestimonial (userId: string, testimonialId: string, testimonial: TestimonialData) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("testimonials")
    .upsert({ name: testimonial.name, body: testimonial.body, id: testimonialId, user_id: userId })

  if (error) throw new Error("Internal service error")
}