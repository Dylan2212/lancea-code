import { SkillMeta } from "@/src/domain/skills/mergeSkills"
import { toTitleCase } from "@/utils/titleCase"

type AddedSkillsProps = {
  addedSkills: SkillMeta[],
  removeSkill: (index: number) => void
}

export default function AddedSkills ({ addedSkills, removeSkill }: AddedSkillsProps) {
  return (
    <ul className="w-full flex flex-wrap gap-2 mt-4">
      {addedSkills.map((skill, index) => (
        <li
          key={skill.id}
          className="
            inline-flex items-center
            text-center
            px-3 py-1 
            bg-gray-100 text-gray-800
            rounded-full
            border border-gray-300
            w-fit
            font-medium transition-all duration-300 ease-in-out
            text-sm
          "
        >
          <span className="mr-2">{toTitleCase(skill.name)}</span>
          <button
          type="button"
            onClick={() => removeSkill(index)}
            className="
              text-gray-500 hover:text-red-600 font-bold
              transition-all duration-300 ease-in-out
            "
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}