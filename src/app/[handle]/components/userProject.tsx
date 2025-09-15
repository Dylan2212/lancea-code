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
    <div onClick={() => setDisplayFullProject({show: true, index: index})} className="w-[350px] rounded-lg group mt-5 cursor-pointer transition-all ease-in-out duration-300 hover:scale-105">
      <div className="w-[300px] relative aspect-[4/3]">
        <Image className="aspect-[4/3] group-hover:shadow-lg shadow-md object-cover rounded-lg transition-all ease-in-out duration-300" sizes="330px" fill src={project.cover?.coverUrl ? project.cover.coverUrl : ""} alt="Project cover"/>
      </div>
      <p className="h-10 flex items-center pl-1">{project.title}</p>
    </div>
  )}