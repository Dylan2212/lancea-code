import { SkillMeta } from "@/src/domain/skills/mergeSkills";

type InProjectSkillsProps = {
  skills: SkillMeta[] | undefined
}
export default function InProjectSkills ({ skills }: InProjectSkillsProps) {
  if (!skills) return
  if (skills.length === 0) return

  return (
    <>
    <p className="text-sm font-bold mt-3">Skills</p>
    <div className="flex flex-wrap gap-1 mb-3">
      {skills.map(skill =>
        (<span
        key={skill.id}
        className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-3 rounded-xl"
      >
        {skill.name}
      </span>))}
    </div>
    </>
  )
}