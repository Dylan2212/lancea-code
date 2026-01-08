export type PredefinedSkill = {
  normalized_name: string
}

export type ProjectSkill = {
  skill_id: string
  predefined_skills: PredefinedSkill
}

export type CustomSkill = {
  custom_skill_id: string
  custom_skills: {
    normalized_name: string
  }
}

export type UploadedUrl = {
  url: string
  aspectRatio: string
}

export type Cover = {
  coverUrl: string
  position: number
}

export type Project = {
  id: string
  user_id: string
  title: string
  description: string
  link: string
  cover?: Cover
  project_skills: ProjectSkill[]
  project_custom_skills: CustomSkill[]
  uploaded_urls?: UploadedUrl[]
  results?: string[]
}

export type SkillMeta = {
  type: "custom" | "predefined",
  id: string,
  name: string
}

export type MergedProject = Omit<Project, "project_skills" | "project_custom_skills"> & {
  addedSkills: SkillMeta[],
}

export function mergeSkills (projects: Project[]): MergedProject[] {
  if (!projects) return []  
  
  return projects.map(project => {
    const customSkills = project.project_custom_skills.map(skill => ({ type: "custom", id: skill.custom_skill_id, name: skill.custom_skills.normalized_name}))
    const predefinedSkills = project.project_skills.map(skill => ({type: "predefined", id: skill.skill_id, name: skill.predefined_skills.normalized_name}))

    const addedSkills = [...customSkills, ...predefinedSkills]

    return {
      ...project,
      project_skills: undefined,
      project_custom_skills: undefined,
      addedSkills
    } as MergedProject
  })
}