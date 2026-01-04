export function normalizeSkillsArr (skills: string[]): string[] {
  return skills.map(skill => skill.trim().toLowerCase().replace(/\s+/g, " "))
}