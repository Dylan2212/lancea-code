export default function predefinedSkillsToIds (skills: string[], predefinedSkills: Map<string, string>): string[] {
  const predefinedIds: string[] = []
  
  for (const skill in skills) {
    if (predefinedSkills.has(skill)) {
      predefinedIds.push(predefinedSkills.get(skill) as string)
    }
  }

  return predefinedIds
}