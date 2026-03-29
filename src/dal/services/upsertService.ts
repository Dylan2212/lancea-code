import { createAdminClient } from "@/utils/supabase/server";
import type { ServicesData } from "@/src/types";

export async function upsertService (userId: string, serviceId: string, service: ServicesData) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("user_services")
    .upsert({ title: service.title, price: service.price, description: service.description, id: serviceId, user_id: userId })

  if (error) throw new Error("Internal service error")
}