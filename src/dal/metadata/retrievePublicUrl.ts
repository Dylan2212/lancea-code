import { createAdminClient } from "@/utils/supabase/server";

export function retrievePublicUrl (filePath: string): string {
  const admin = createAdminClient()

  const { data } = admin.storage
    .from("og-thumbnail")
    .getPublicUrl(filePath)

  return data.publicUrl
}