export function checkForDeletedSkills (currSkills: string[], startingSkills: string[]): string[] {
  const currSet = new Set(currSkills)
  return startingSkills.filter(skill => !currSet.has(skill))
}