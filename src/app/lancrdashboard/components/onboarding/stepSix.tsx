import { SquarePlus } from "lucide-react"
import { useLayoutEffect, useState } from "react"
import AddProjectClient from "../../projects/components/addProjectComponent"
import Project from "../../projects/components/project"
import ConfirmDeleteModal from "../confirmDeleteModal"
import useProjectsManager from "@/src/app/hooks/useProjectsManager"

type MyProps = {
  nextStep: () => void,
  previousStep: () => void
}

export default function StepSix ({ nextStep, previousStep}: MyProps) {
  const [projectPage, setProjectPage] = useState({showing: false, index: -1, action: "Add"})
  const { projects, setShowDeleteModal, showDeleteModal, deleteProject, deleting } = useProjectsManager()

  useLayoutEffect(() => {
    if (projectPage) {
      const container = document.getElementById("scroll-container")
      if (!container) return
      container.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [projectPage])

  return (
    <>
      {!projectPage.showing ? <><div className="w-11/12 space-y-1">
        <p className="font-semibold text-2xl text-gray-900">
          Add your projects (Optional)
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Showcase your best work to make your profile stand out.
        </p>
      </div>
      <div className="space-y-6 mt-10 mb-14 w-full md:w-11/12 mx-auto grid justify-center">
        <div onClick={() => setProjectPage({showing: true, index: -1, action: "Add"})} className="border border-gray-400 rounded-lg shadow-md flex flex-col justify-center items-center w-[300px] h-fit aspect-[4/3] hov-standrd hover:bg-gray-100
          ">
          <SquarePlus className="w-12 h-12" />
          <p>Add A Project</p>
        </div>
        {projects?.length > 0 && projects.filter(Boolean).map((project, index) => (
          <Project setProjectPage={setProjectPage} idx={index} key={project.id} project={project} setShowDeleteModal={setShowDeleteModal}/>
        ))}
      {showDeleteModal.show && <ConfirmDeleteModal deleting={deleting} property="project" onClose={() => setShowDeleteModal({show: false, id: "", index: 0})} onDelete={deleteProject}/>}
      </div>
      <div className="w-full flex flex-row-reverse justify-between">
        <div className="flex gap-5">
          {projects.length === 0 && <button className="onboarding-btn" onClick={nextStep}>Skip</button>}
          {projects.length > 0 && <button className="onboarding-btn" onClick={nextStep}>Next</button>}
        </div>
        <button className="onboarding-btn" onClick={previousStep}>Previous</button>
      </div></>
    :
    <div>
      <AddProjectClient
        globalIndex={projectPage.index}
        projectAction={projectPage.action}
        setProjectPage={setProjectPage}
      />
    </div> 
    }
    </>
  )
}