import type { TestimonialData } from "@/src/types";
import { v4 as uuid } from "uuid";
import { useTestimonialsStore } from "@/lib/store/testimonials/useTestimonialsStore";

export function saveTestimonialToStore (index: number|null, currTestimonial: TestimonialData[], testimonial: Partial<TestimonialData>): string {
  const id = testimonial.id ?? uuid()

  if (index === null) {
    const newTestimonial: TestimonialData = {
      name: testimonial.name ?? "",
      body: testimonial.body ?? "",
      id
    }
    useTestimonialsStore.setState((state) => ({
      testimonials: [...state.testimonials, newTestimonial]
    }))
  } else {
    const updated = [...currTestimonial]
    updated[index] = { ...updated[index], ...testimonial, id}
    useTestimonialsStore.setState(() => ({
      testimonials: [...updated]
    }))
  }

  return id
}