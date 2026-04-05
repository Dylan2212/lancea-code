import { createAdminClient } from "@/utils/supabase/server"

export async function checkServiceUserId (serviceId: string) {
  console.log(serviceId)
  const admin = createAdminClient()
  return await admin
    .from("user_services")
    .select("user_id")
    .eq("id", serviceId)
    .maybeSingle()
}