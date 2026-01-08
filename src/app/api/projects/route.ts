import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getProjectsWithSkills } from "@/src/dal/projects";
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

  //CREATE SOMETHING TO HANDLE CREATING SKILLSMETA
  //THIS WILL BE {TYPE: STRING, ID: STRING, NAME: STRING}
  //WILL BE FOR EACH PROJECT
  //ADD TO PROJECT TYPE
  //USED FOR DELETIONS
  const projects = mergeSkills(projectWithSkills)
  return NextResponse.json(projects)
}