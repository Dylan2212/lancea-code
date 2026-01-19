import { NextResponse } from "next/server";
import { getProjectsWithSkillsAdmin } from "@/src/dal/projects/projects";
import { mergeSkills } from "@/src/domain/skills/mergeSkills";
import { requireUser } from "@/src/domain/auth/requireUser";

export async function POST () {
  try {
    const { user } = await requireUser()

    const projectWithSkills = await getProjectsWithSkillsAdmin(user.id)
    const projects = mergeSkills(projectWithSkills)

    return NextResponse.json(projects)
  } catch {
    return NextResponse.json(
      { error: "Internal Error"},
      { status: 501 }
    )
  }
}