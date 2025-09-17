import type { ProjectData } from "../../lancrdashboard/projects/add+editproject/page"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

type MyProps = {
  project: ProjectData,
  setDisplayFullProject: Dispatch<SetStateAction<{
    show: boolean,
    index: number
  }>>,
  index: number
}

export default function UserProject ({ project, setDisplayFullProject, index }: MyProps) {
  return (
    <div onClick={() => setDisplayFullProject({show: true, index: index})} className="
    w-[300px] mx-[auto] rounded-lg group mt-5 cursor-pointer
    ">
      <div className="w-[300px] relative aspect-[4/3]">
        <Image className="aspect-[4/3] group-hover:shadow-lg shadow-md object-cover rounded-lg transition-all ease-in-out duration-300" sizes="330px" fill src={project.cover?.coverUrl ? project.cover.coverUrl : ""} alt="Project cover"/>
        <p className="absolute group-hover:bg-black transition-all duration-200 ease-in-out bottom-2 right-2 text-sm font-semibold text-white bg-black/50 rounded-full px-3 py-2">View Project</p>
      </div>
      <p className="flex leading-tight items-center pl-1 text-lg mt-2">{project.title}</p>
    </div>
  )}