import { Trash2, SquarePlus, Lock } from "lucide-react"
import { SetStateAction, useState } from "react"
import toast from "react-hot-toast"
import type { ProjectData } from "./addProjectComponent"
import Link from "next/link"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

type MyProps = {
  projectData: ProjectData,
  setProjectData: React.Dispatch<SetStateAction<ProjectData>>
}

export default function Results ({ projectData, setProjectData }: MyProps) {
  const [maxResults, setMaxResults] = useState(false)
  const premium = useOriginalUserStore(state => state.premium)

  const filledResult = () => {
    if (!projectData.results || projectData.results.length === 0) return true
    const last = projectData.results[projectData.results.length - 1]
    if (last === "") {
      toast.error("Fill in the previous result before you add more results.")
      return false
    }
    return true
  }

  const addResult = () => {
    if (!filledResult()) return
    if (maxResults) return
    if (projectData.results?.length === 4) setMaxResults(true)
    setProjectData(prev => ({ ...prev, results: [...(prev.results ?? []), ""] }))
  }

  const resultChange = (value: string, index: number) => {
    setProjectData(prev => {
      const updatedResults = [...(prev.results ?? [])]
      updatedResults[index] = value
      return { ...prev, results: updatedResults }
    })
  }

  const deleteResult = (index: number) => {
    setProjectData(prev => {
      const updatedResults = prev.results?.filter((_, i) => i !== index)
      return { ...prev, results: updatedResults }
    })
  }

  return (
    <div   className={`
    mt-16 mb-3 ml-2 relative p-3 rounded-2xl
    ${!premium ? "shadow-sm bg-black/10 overflow-hidden" : "shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)] border-[#E9D5FF] bg-white/80"}
  `}>
    {!premium && (
      <>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 pointer-events-none rounded-2xl" />

        <Link href={"/lancrdashboard/pricing"} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4
                        hover:bg-black/10 transition-all duration-300 cursor-pointer rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <Lock className="w-10 h-10 text-purple-600 drop-shadow" />
            <button className="bg-[#7E22CE] hover:bg-[#6B21A8] text-white text-sm px-4 py-2 rounded-full shadow-md transition">
              Unlock Project Results
            </button>
          </div>
        </Link>

        {/* Premium Label */}
        <span className="absolute top-2 right-2 z-30 bg-[#7E22CE] text-white text-xs px-2 py-1 rounded-md shadow">
          Premium
        </span>
      </>
    )}
      <p className="text-lg">Results:</p>
      {
        projectData.results?.map((result, index) => (
          <div key={index} className="flex items-center gap-5 justify-between px-6 py-4 border rounded-md border-gray-400 shadow-sm mb-4 last:mb-0
          w-full
          ">
            <div className="flex flex-col gap-1 w-11/12 
            lg:w-full lg:flex-row lg:items-center lg:gap-3">
              <p>Result:</p>
              <div className="w-full">
                <input required maxLength={80} onChange={(e) => resultChange(e.target.value, index)} value={result ?? ""} className="rounded-lg border py-1 px-3 focus:outline-purple-600 w-full" placeholder="Achieved..." type="text" name="" id="" />
                <p className={`max-characters ${result.length === 80 && "text-red-600"}`}>
                  Max: {result.length}/{80} characters
                </p>
              </div>
            </div>
            <Trash2 className="w-12 h-6 cursor-pointer hov-standrd hover:text-red-600" onClick={() => deleteResult(index)}/>
          </div>
        ))
      }
      <button onClick={addResult} type="button" className="px-6 py-4 border border-black rounded-md shadow-lg flex justify-around gap-3 mb-4 hov-standrd hover:bg-gray-100 mt-2 relative">
        <SquarePlus />
        Add Result
      </button>
    </div>
  )
}