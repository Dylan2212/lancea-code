export default function splitSkills (skills: string[], predefinedSkills: Map<string, string>): {
  predefined: string[],
  custom: string[]
} {
  const custom: string[] = []
  const predefined: string[] = []

  skills.forEach(skill => {
    if (predefinedSkills.has(skill)) {
      predefined.push(skill)
    } else {
      custom.push(skill)
    }
  })

  return { predefined, custom }
}