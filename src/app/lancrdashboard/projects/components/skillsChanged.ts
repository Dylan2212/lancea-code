export function skillsChanged (currSkills: string[], startingSkills: string[]): boolean {
  if (currSkills.length !== startingSkills.length) return true
  const startingSet = new Set(startingSkills)
  return currSkills.some(skill => !startingSet.has(skill))
}