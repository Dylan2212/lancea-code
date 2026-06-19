import { Metadata } from "@/src/types";
import { createAdminClient } from "@/utils/supabase/server";

export async function updateUserMetaData (userId: string, metadata: Metadata) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("metadata")
    .update(metadata)
    .eq("id", userId)

  if (error) throw new Error("Error updating meta data: " + error.message)
}