import type { ServicesData } from "@/src/types";
import { useServicesStore } from "@/lib/store/services/useServicesStore";
import { v4 as uuid } from "uuid";

export function saveServiceToStore (index: number|null, currServices: ServicesData[], service: Partial<ServicesData>): string {
  const id = service.id ?? uuid()
  if (index === null) {
    const newService: ServicesData = {
      title: service.title ?? "",
      description: service.description ?? "",
      price: service.price ?? "",
      id
    }
    useServicesStore.setState((state) => ({
      services: [...state.services, newService]
    }))
  } else {
    const updated = [...currServices]
    updated[index] = { ...updated[index], ...service, id}
    useServicesStore.setState(() => ({
      services: [...updated]
    }))
  }

  return id
}