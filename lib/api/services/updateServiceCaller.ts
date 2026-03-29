import type { ServicesData } from "@/src/types";

export async function updateServiceCaller (service: ServicesData) {
  fetch(`/api/services/${service.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service })
  })
}