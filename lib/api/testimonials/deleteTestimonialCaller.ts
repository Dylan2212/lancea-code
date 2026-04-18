export async function deleteTestimonialCaller (id: string) {
  fetch(`/api/testimonials/${id}`, {
    method: "DELETE"
  })
}