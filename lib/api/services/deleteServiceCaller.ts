export async function deleteServiceCaller (id: string) {
  fetch(`/api/services/${id}`, {
    method: "DELETE"
  })
}