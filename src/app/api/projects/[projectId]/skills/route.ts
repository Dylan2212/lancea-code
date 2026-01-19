import { NextResponse } from "next/server";
import processProjectSkills from "@/src/domain/skills/processProjectSkills";
import splitSkills from "@/src/domain/skills/splitSkills";
import { deletePredefinedProjectSkillsAdmin } from "@/src/dal/projects/predefinedSkills";
import { deleteCustomProjectSkillsAdmin } from "@/src/dal/projects/customSkills";
import { requireUser } from "@/src/domain/auth/requireUser";
import { userOwnsProject } from "@/src/domain/auth/userOwnsProject";

export async function POST (req: Request, { params }: { params: Promise<{ projectId: string }>}) {
  try {
    const { user } = await requireUser()

    const { skills } = await req.json()
    const { projectId } = await params

    await userOwnsProject(user.id, projectId)

    await processProjectSkills(projectId, skills)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    )
  }
}

export async function DELETE (req: Request, { params }: { params: Promise<{ projectId: string }>}) {
  try {
    const { user } = await requireUser()

    const { projectId } = await params

    await userOwnsProject(user.id, projectId)

    const { deletedSkills } = await req.json()

    const { predefined, custom } = splitSkills(deletedSkills)

    await deletePredefinedProjectSkillsAdmin(projectId, predefined.map(skill => skill.id))
    await deleteCustomProjectSkillsAdmin(projectId, custom.map(skill => skill.id))

    return NextResponse.json({ ok: true })
  } catch {
    NextResponse.json(
      { error: "Internal Error" },
      { status: 500 }
    )
  }
}