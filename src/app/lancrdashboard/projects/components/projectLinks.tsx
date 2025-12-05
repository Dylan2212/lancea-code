import React from "react"
import { ProjectData } from "./addProjectComponent"
import TitleInput from "../../components/titleInput"
import Link from "next/link"
import { Lock, SquarePlus } from "lucide-react"

type MyProps = {
  projectData: ProjectData,
  onUpdate: <K extends keyof ProjectData>(name: K, value: ProjectData[K]) => void
}

export default function ProjectLinks ({ onUpdate, projectData }: MyProps) {
  const premium = false
  const isLink = projectData.link && projectData.link.length > 0
  return (
    <div   className="
      mt-16 mb-3 ml-2 relative p-3 rounded-2xl 
      border border-[#E9D5FF]
      shadow-[0_0_20px_-5px_rgba(126,34,206,0.15)]
      bg-white
    ">
      <TitleInput handleChange={(e) => onUpdate("link", e.target.value)} inputName="link" value={projectData.link} required={false} labelTitle="Live Demo Link" type="text" previewText="https://example.com" maxChar={2000} displayMaxChar={false} />
      {isLink && <div className="w-full relative h-28 rounded-2xl pt-4 bg-black/10">
        {!premium && (
          <>
            <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-10 pointer-events-none rounded-2xl" />

            <Link href={"/lancrdashboard/pricing"} className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-4
                            bg-black/0 hover:bg-black/20 transition-all duration-300 cursor-pointer rounded-2xl">
              <div className="flex flex-col items-center gap-3">
                <Lock className="w-10 h-10 text-purple-600 drop-shadow" />
                <button className="bg-[#7E22CE] hover:bg-[#6B21A8] text-white text-sm px-4 py-2 rounded-full shadow-md transition">
                  Unlock With Premium
                </button>
              </div>
            </Link>

            {/* Premium Label */}
            <span className="absolute top-2 right-2 z-30 bg-[#7E22CE] text-white text-xs px-2 py-1 rounded-md shadow">
              Premium
            </span>
          </>
        )}
        <button type="button" className="px-6 py-1 border border-black rounded-md shadow-lg flex justify-around gap-3 hov-standrd hover:bg-gray-100 relative ml-2">
          <SquarePlus />
          Add Link
        </button>
        {!premium && <p className="text-xs text-[black] ml-2 mt-1">Unlimited links with premium</p>}
      </div>}
    </div>
  )
}