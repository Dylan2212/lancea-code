import { SkillMeta } from "@/src/domain/skills/mergeSkills";
import { toTitleCase } from "@/utils/titleCase";

type PreviewProps = {
  skills: SkillMeta[] | undefined
}
export default function PreviewSkills ({ skills }: PreviewProps) {
  if (!skills) return
  if (skills.length === 0) return

  return (
    <div className="flex flex-wrap gap-1 m-2">
      {skills.map(skill =>
      (<span
      key={skill.id}
      className="bg-gray-200 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
    >
      {toTitleCase(skill.name)}
    </span>))}
    </div>
  )
}