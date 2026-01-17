import { projectUserId } from "@/src/dal/projectUserId"
import { createClient } from "@/utils/supabase/server"

export async function userOwnsProject (userId: string, projectId: string) {
  const supabase = await createClient()

  const { data: project, error: projectError } = await projectUserId(supabase, projectId)

  if (projectError || !project || project.user_id !== userId) {
    throw new Error("Forbidden")
  }
}