import { SkillMeta } from "@/src/domain/skills/mergeSkills"

type ApiOk = {
  ok: true
}

export async function saveProjectSkills (projectId: string, skills: SkillMeta[]): Promise<ApiOk> {
  const res = await fetch(`/api/projects/${projectId}/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skills, projectId })
  })

  if (!res.ok) {
    const err = await res.json()
    throw err
  }

  return { ok: true }
}

export async function deleteProjectSkills (projectId: string, deletedSkills: SkillMeta[]): Promise<ApiOk> {
  const res = await fetch(`/api/projects/${projectId}/skills`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deletedSkills })
  })

  if (!res.ok) {
    const err = await res.json()
    throw err 
  }

  return { ok: true }
}