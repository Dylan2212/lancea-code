import { createAdminClient } from "@/utils/supabase/server";
import type { Metadata } from "@/src/types";

export async function updateUserMetaData (userId: string, metadata: Partial<Metadata>) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("metadata")
    .upsert({ ...metadata, id: userId })
    .eq("id", userId)

  if (error) throw new Error("Error updating meta data: " + error.message)
}