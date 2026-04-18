import type { TestimonialData } from "@/src/types"

export async function userTestimonialsCaller (): Promise<TestimonialData[]> {
  return (await fetch("/api/testimonials")).json()
}