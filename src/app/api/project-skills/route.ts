import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import processProjectSkills from "@/src/domain/skills/processProjectSkills";
import { projectUserId } from "@/src/dal/projectUserId";

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

  const { data: project, error: projectError } = await projectUserId(supabase, projectId)

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
    await processProjectSkills(supabase, projectId, skills)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to process skills" },
      { status: 500 }
    )
  }

}

export async function DELETE (req: Request) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user || error) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }

  const { projectId } = await req.json()

  //User owns project
  const { data: project, error: projectError } = await projectUserId(supabase, projectId)

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

  await supabase.from("project_skills").delete()
}