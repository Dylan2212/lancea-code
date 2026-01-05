export async function saveProjectSkills (projectId: string, skills: string[]) {
  const res = await fetch("/api/project-skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skills, projectId })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error("Failed to save project skills", err?.error)
  }

  return true
}