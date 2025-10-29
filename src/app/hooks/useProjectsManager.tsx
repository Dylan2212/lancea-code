import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { useState } from "react";

export default function useProjectsManager () {
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

  return { projects, setShowDeleteModal, deleting, showDeleteModal, deleteProject}
}