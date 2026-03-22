import { createAdminClient } from "@/utils/supabase/server";
import type { ServicesData } from "@/src/types";

export async function getUserServices (userId: string): Promise<ServicesData[]> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from("user_services")
    .select("id, title, description, price")
    .eq("user_id", userId)

  if (error) throw error

  return data
}