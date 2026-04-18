import type { TestimonialData } from "@/src/types";

export async function updateTestimonialCaller (testimonial: TestimonialData) {
  fetch(`/api/testimonials/${testimonial.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testimonial })
  })
}