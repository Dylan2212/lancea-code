import { createAdminClient } from "@/utils/supabase/server";

export async function deleteService (id: string) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("user_services")
    .delete()
    .eq("id", id)

  if (error) throw new Error("Internal service error")
}

export async function deleteAllServices (id: string) {
  const admin = createAdminClient()
  const { error } = await admin
    .from("user_services")
    .delete()
    .eq("user_id", id)

  if (error) throw new Error("Internal service error")
}