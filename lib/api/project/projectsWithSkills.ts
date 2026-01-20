export async function projectsWithSkillsCaller () {
  const res = await fetch("/api/projects", {
    method: "POST",
  })

  const projects = await res.json()
  return projects
}