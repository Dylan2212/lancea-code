"use client"
import Image from "next/image"
import { ProjectData } from "../add+editproject/page"
import { Dispatch, SetStateAction } from "react"
import { DeleteObj } from "../page"
import Link from "next/link"

type MyProps = {
  project: ProjectData,
  setShowDeleteModal: Dispatch<SetStateAction<DeleteObj>>,
  idx: number
}

export default function Project ({ project, setShowDeleteModal, idx }: MyProps) {
  if (!project.cover?.coverUrl) return
  const isVideo = project.cover?.coverUrl.split('.').pop()?.match(/mp4|mov|webm/i)
  return (
    <div className="w-11/12 rounded-lg group mx-auto lg:mx-0 md:w-[300px]">
      <div className="relative aspect-[4/3] w-full">
        {isVideo ? (
          <video src={project.cover.coverUrl} controls className="object-cover aspect-[4/3]"/>
        ) :
          (<Image alt="project cover" priority className={`object-cover image-crisp aspect-[4/3] rounded-lg shadow-md shadow-gray-400`} fill sizes="300px" src={project.cover.coverUrl} />)
          }
        <div className="flex transition-all duration-300 bg-black/50 rounded-b-lg z-10 absolute w-full bottom-0 h-16 items-center justify-end gap-4 pr-5
        lg:pointer-events-none lg:group-hover:pointer-events-auto lg:opacity-0 lg:group-hover:opacity-100">
          <Link href={`/lancrdashboard/projects/add+editproject?action=edit&idx=${idx}`} className="py-2 px-4 text-white hover:bg-purple-500 hov-standrd bg-purple-600 rounded-lg">Edit</Link>
          <button onClick={() => setShowDeleteModal({show: true, id: project.id || "", index: idx})} className="py-2 px-4 rounded-lg bg-white text-red-600 hover:bg-gray-200 hov-standrd">Delete</button>
        </div>
      </div>
       <p className="h-16 p-2 line-clamp-2 text-lg">{project.title}</p>
     </div>
  )
}