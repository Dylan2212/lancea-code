import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getProjectsWithSkills } from "@/src/dal/projects/projects";
import { mergeSkills } from "@/src/domain/skills/mergeSkills";

export async function POST () {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: "Forbidden"},
      { status: 403 }
    )
  }

  const projectWithSkills = await getProjectsWithSkills(user.id)
  
  if (!projectWithSkills) {
    return NextResponse.json(
      { error: "Internal Error"},
      { status: 501 }
    )
  }

  const projects = mergeSkills(projectWithSkills)
  return NextResponse.json(projects)
}