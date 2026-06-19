import { createAdminClient } from "@/utils/supabase/server";

export async function uploadOgthumbnail (filePath: string, file: File) {
  const admin = createAdminClient()

  const { error } = await admin.storage
    .from("og-thumbnail")
    .upload(filePath, file, { cacheControl: "3600", upsert: true })

  if (error) throw new Error("Failed to upload image: " + error.message)
}