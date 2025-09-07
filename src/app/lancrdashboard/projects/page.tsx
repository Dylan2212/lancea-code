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
  id: string,
  index: number
}

export default function Projects () {
  const projects = useProjectsStore((state) => state.projects)
  const [showDeleteModal, setShowDeleteModal] = useState({show: false, id: "", index: 0})
  const [deleting, setDeleting] = useState(false)
  const setProjects = useProjectsStore(state => state.setProjects)

  function removeFromStore () {
    const updated = projects.filter(project => project.id !== showDeleteModal.id)
    setProjects(updated)
  }

  async function deleteStoredImages () {
    const toDeleteImages = projects[showDeleteModal.index].uploaded_urls?.map(image => image.url.split("/projects/")[1])

    if (!toDeleteImages) return

    const { error } = await supabase.storage
      .from("projects")
      .remove(toDeleteImages)

    if (error) {
      console.error("Could not delete project: ", error)
      return false
    } else {
      return true
    }
  }

  async function deleteProject () {
    setDeleting(true)

    const deleteFromStorage = await deleteStoredImages()
    
    if (!deleteFromStorage) {
      toast.error("Could not delete project.")
      return
    }

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
    <section className="pt-16 w-screen lg:w-full">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Projects</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage the projects you want to showcase on your portfolio.</h2>
      <div className="w-full pb-16">
        <div className="px-2 grid gap-y-6 mt-8 w-full
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        ">
          <Link href="/lancrdashboard/projects/add+editproject?action=add&idx=null" className="border border-gray-400 rounded-lg shadow-md flex flex-col justify-center items-center w-11/12 h-fit aspect-[4/3] hov-standrd mx-auto hover:bg-gray-100
          md:w-[300px] lg:mx-0
          ">
            <SquarePlus className="w-12 h-12" />
            <p>Add A Project</p>
          </Link>
          {projects?.length > 0 && projects.filter(Boolean).map((project, index) => (
            <Project idx={index} key={project.id} project={project} setShowDeleteModal={setShowDeleteModal}/>
          ))}
        </div>
      </div>
      {showDeleteModal.show && <ConfirmDeleteModal deleting={deleting} property="project" onClose={() => setShowDeleteModal({show: false, id: "", index: 0})} onDelete={deleteProject}/>}
    </section>
  )
}