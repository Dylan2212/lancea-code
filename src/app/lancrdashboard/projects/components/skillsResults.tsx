import { SkillMeta } from "@/src/domain/skills/mergeSkills"
import { toTitleCase } from "@/utils/titleCase"
import { Plus } from "lucide-react"

type ResultProps = {
  results: SkillMeta[],
  isFocused: boolean,
  suggestedIndex: number,
  resultClicked: (skill: SkillMeta) => void
}

export default function SkillsResults ({ resultClicked, suggestedIndex, isFocused, results }: ResultProps) {
  return (
    <ul onMouseDown={(e) => e.preventDefault()} className="mt-4 space-y-2 h-[288px]">
      {results.map((result, index) => (
        <li
          key={index}
          onClick={() => resultClicked(result)}
          className={`
            px-4 py-2 rounded-xl cursor-pointer w-[85%]
            ${isFocused && index === suggestedIndex && "bg-gray-200 border-gray-200 shadow"}
           text-gray-800 shadow-sm flex justify-between items-center
            hover:bg-gray-200 hover:shadow
            border border-gray-100 hover:border-gray-200
            transition-all duration-150
          `}
        >
          <span>{toTitleCase(result.name)}</span>
          <Plus />
        </li>
      ))}
    </ul>
  )
}