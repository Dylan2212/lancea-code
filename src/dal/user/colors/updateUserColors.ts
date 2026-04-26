import { createAdminClient } from "@/utils/supabase/server";
import type { Colors } from "@/src/types";

export async function updateUserColors (id: string, colors: Colors) {
  const admin = createAdminClient()

  const { error } = await admin
    .from("users")
    .update(colors)
    .eq("id", id)

  if (error) throw new Error("Error updating colors: " + error.message)
}