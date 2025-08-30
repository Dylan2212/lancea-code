"use client"
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { SquarePlus } from "lucide-react"
import Link from "next/link"
import Project from "./components/project";
import { useState } from "react";
import ConfirmDeleteModal from "../components/confirmDeleteModal";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export type DeleteObj = {
  show: boolean,
  id: string
}

export default function Projects () {
  const projects = useProjectsStore((state) => state.projects)
  const [showDeleteModal, setShowDeleteModal] = useState({show: false, id: ""})
  const [deleting, setDeleting] = useState(false)
  const setProjects = useProjectsStore(state => state.setProjects)

  function removeFromStore () {
    const updated = projects.filter(project => project.id !== showDeleteModal.id)
    setProjects(updated)
  }

  async function deleteProject () {
    setDeleting(true)

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", showDeleteModal.id)

    if (error) {
      toast.error("Could not delete project.")
      setDeleting(false)
      return
    }

    removeFromStore()
    toast.success("Project deleted.")
    setDeleting(false)
    return
  }

  return (
    <section className="w-screen pt-16">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Projects</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage the projects you want to showcase on your portfolio.</h2>
      <div className="w-full px-2 flex flex-wrap gap-6 mt-8">
        <Link href="/lancrdashboard/projects/add+editproject?action=add&idx=null" className="border border-gray-400 rounded-lg shadow-md flex flex-col justify-center items-center w-[300px] h-fit aspect-[4/3] hov-standrd hover:bg-gray-100">
          <SquarePlus className="w-12 h-12" />
          <p>Add A Project</p>
        </Link>
        {projects.map((project, index) => (
          <Project idx={index} key={project.id} project={project} setShowDeleteModal={setShowDeleteModal}/>
        ))}
      </div>
      {showDeleteModal.show && <ConfirmDeleteModal deleting={deleting} property="project" onClose={() => setShowDeleteModal({show: false, id: ""})} onDelete={deleteProject}/>}
    </section>
  )
}