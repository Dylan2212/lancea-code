import { NextResponse } from "next/server";
import { createAdminClient, createClient } from "@/utils/supabase/server";
import processProjectSkills from "@/src/domain/skills/processProjectSkills";
import { projectUserId } from "@/src/dal/projectUserId";
import splitSkills from "@/src/domain/skills/splitSkills";
import { deletePredefinedProjectSkills } from "@/src/dal/projects/predefinedSkills";
import { deleteCustomProjectSkills } from "@/src/dal/projects/customSkills";

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
      { error: "Error fetching project" },
      { status: 500 }
    )
  }

  if (project.user_id !== user.id) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }

  try {
    const admin = createAdminClient()
    await processProjectSkills(admin, projectId, skills)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Failed to process skills" },
      { status: 500 }
    )
  }

}

export async function DELETE (req: Request, { params }: { params: Promise<{ projectId: string }>}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user || error) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }

  const { deletedSkills } = await req.json()
  const { projectId } = await params

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

  const { predefined, custom } = splitSkills(deletedSkills)

  await Promise.all([
    deletePredefinedProjectSkills(supabase, projectId, predefined.map(skill => skill.id)),
    deleteCustomProjectSkills(supabase, projectId, custom.map(skill => skill.id))
  ])

  return NextResponse.json({ ok: true })
}