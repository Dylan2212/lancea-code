import { createAdminClient } from "@/utils/supabase/server";

export async function getOrCreateUserMetaData (userId: string) {
  const admin = createAdminClient()

  const { data } = await admin
    .from("metadata")
    .select("*")
    .eq("id", userId)
    .single()

  if (data) {
    const { id, ...rest } = data
    void id
    return rest
  }

  const { data: created } = await admin
    .from("metadata")
    .insert({
      id: userId
    })
    .select()
    .single()

  return created
}