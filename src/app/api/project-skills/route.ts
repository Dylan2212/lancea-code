import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import processProjectSkills from "@/src/domain/skills/processProjectSkills";

export async function POST (req: Request) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }

  const { skills, projectId } = await req.json()

  //can be moved to DAL as userOwnsProject
  const { data:  project, error: projectError } = await supabase
    .from("projects")
    .select("user_id")
    .eq("id", projectId)
    .single()

  if (projectError || !project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    )
  }

  if (project.user_id !== user.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }

  try {
    await processProjectSkills(projectId, skills)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to process skills" },
      { status: 500 }
    )
  }

}