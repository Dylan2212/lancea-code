"use client"
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { SquarePlus } from "lucide-react"
import Link from "next/link"

export default function Projects () {
  const projects = useProjectsStore(state => state.projects)
  console.log(projects)

  return (
    <section className="w-screen pt-16">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Projects</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage the projects you want to showcase on your portfolio.</h2>
      <div className="grid grid-cols-3 w-11/12 mx-auto mt-8">
        <Link href="/lancrdashboard/projects/addproject" className="border border-gray-400 rounded-lg shadow-md flex flex-col justify-center items-center w-[300px] h-[400px] hov-standrd hover:bg-gray-100">
          <SquarePlus className="w-12 h-12" />
          <p>Add A Project</p>
        </Link>
        {<p>{projects.map(project => project.title)}</p>}
      </div>
    </section>
  )
}