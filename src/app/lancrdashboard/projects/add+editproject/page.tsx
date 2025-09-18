"use client"
import { useRouter } from "next/navigation"
import TitleInput from "../../components/titleInput"
import { useEffect, useState } from "react"
import { SquarePlus, Trash2 } from "lucide-react"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabaseClient"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import ProjectGallery from "../components/dropzone"
import { normalizeUrl } from "../../profile/page"
import { v4 as uuidv4 } from 'uuid'
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { useSearchParams } from "next/navigation"
import { MyFile } from "../components/dropzone"

type CoverObj = {
  coverUrl: string,
  position: number
}

export type ProjectData = Partial<{
  title: string,
  description: string,
  link: string,
  results: string[],
  uploaded_urls: Record<string, string>[],
  cover: CoverObj | null,
  id: string
}>

function capitalizeFirstLetter(str: string | null) {
  if (!str) return "Add";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function AddProject () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectAction = capitalizeFirstLetter(searchParams.get("action"))
  const userId = useOriginalUserStore(state => state.userId)
  const { projects, setProjects } = useProjectsStore.getState()
  const [maxProjects, setMaxProjects] = useState(false)
  const [adding, setAdding] = useState(false)
  const [removedFiles, setRemovedFiles] = useState<string[]>([])
  const [files, setFiles] = useState<MyFile[]>([])
  const [aspectRatio, setAspectRatio] = useState("[4/3]")
  const [cover, setCover] = useState<number>(0)
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    description: "",
    link: "",
    results: [],
    uploaded_urls: [],
  })

  useEffect(() => {
    const idxParam = searchParams.get("idx")
    if (idxParam === "null") return
    const index = Number(idxParam)
    const projectToEdit = projects[index]
    setProjectData(projectToEdit)
    setCover(projectToEdit.cover?.position ? projectToEdit.cover?.position : 0)
  }, [setProjectData, projects, searchParams])

  function filledResult () {
    if (!projectData.results) return true
    if (projectData.results?.length === 0) return true

    const last = projectData.results[projectData.results.length -1]

    if (last === "") {
      toast.error("Fill in the previous result before you add more results.")
      return false
    }

    return true
  }

  function addResult () {
    if (!filledResult()) return
    if (maxProjects) return
    if (projectData.results?.length === 4) setMaxProjects(true)
    setProjectData(prev => ({...prev, results: [...prev.results ?? [], ""]}))
  }

  const onUpdate = <K extends keyof ProjectData>(name: K, value: ProjectData[K]) => {
    setProjectData(prev => ({...prev, [name]: value}))
  }

  function resultChange (value: string, index: number) {
    setProjectData(prev => {
      const updatedResults = [...(prev.results ?? [])]
      updatedResults[index] = value
      return { ...prev, results: updatedResults }
    })
  }

  function deleteResult (index: number) {
    setProjectData(prev => {
      const updatedResults = prev.results?.splice(index, 1)
      return { ...prev, results: updatedResults }
    })
  }

  async function saveToDb (finalProjectData: ProjectData) {
    const { error } = await supabase
      .from("projects")
      .upsert(finalProjectData, { onConflict: "id" })


    if (error) {
      console.error("Could not add project: " + JSON.stringify(error))
      toast.error("Failed to add project.")
      return false
    }

    return true
  }

  async function saveToStorage () {
    if (!files) return
    const uploadedUrls: Record<string, string>[] = []

    for (const file of files) {

      if (!file.file || !file.name) {
        uploadedUrls.push({url: file.preview, aspectRatio: file.aspectRatio})
        continue
      }

      const fileExtension = file.name.split('.').pop()
      const filePath = `${userId}/${uuidv4()}.${fileExtension}`

      const { error } = await supabase.storage
        .from("projects")
        .upload(filePath, file.file, {
          cacheControl: "3600",
          upsert: false,
        })

      if (error) {
        console.error("Upload error:", error.message)
        continue
      }

      const { data } = supabase.storage
        .from("projects")
        .getPublicUrl(filePath)

      if (data) {
        uploadedUrls.push({url: data.publicUrl, aspectRatio: file.aspectRatio})
      }
    }
    return uploadedUrls
  }

  async function deleteFromStorage () {
    const { error } = await supabase.storage
      .from("projects")
      .remove(removedFiles)

    if (error) {
      console.error("Error deleting from storage: ", error)
      toast.error("Could not delete project images.")
      return false
    }
    return true
  }

  async function saveProject (e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)

    try {
      if (removedFiles.length) {
        const couldRemoveImages = await deleteFromStorage()
        if (!couldRemoveImages) {
          toast.error("Could not save changes.")
          return
        }
      }

      if (files.length === 0) {
        setAdding(false)
        toast.error("Add at least one project image.")
      }

      const finalLink = normalizeUrl(projectData.link)
      const uploadedUrls = await saveToStorage()

      const finalProjectData: ProjectData = {
        ...projectData,
        link: finalLink,
        uploaded_urls: uploadedUrls,
        id: !projectData.id ? uuidv4() : projectData.id,
        cover: uploadedUrls && uploadedUrls[cover] ? {coverUrl: uploadedUrls[cover].url, position: cover} : {coverUrl: files[cover].preview, position: cover}
      }

      const success = await saveToDb(finalProjectData)

      if (success) {
        setAdding(false)
        if (projectAction === "Edit") {
          const index = Number(searchParams.get("idx"))
          const updatedProjectsArry = projects.map((project, i) => (
            i === index ? finalProjectData : project
          ))
          setProjects(updatedProjectsArry)
        } else {
          setProjects([...projects, finalProjectData])
        }

        if (projectAction === "Edit") {
          toast.success("Project updated!")
        } else {
          toast.success("Project added")
        }

        router.push("/lancrdashboard/projects")
      } else {
        toast.error("Could not add project.2/")
        setAdding(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Could not add project.1/")
      setAdding(false)
    }

    return
  }

  return (
    <section className="py-16 w-screen lg:pb-0 lg:w-full">
      <h1 className="text-2xl font-semibold m-5 mb-0">{projectAction} Project</h1>
      <div className="w-full mx-auto max-w-[1250px]">
        <form className="lancr-add-edit-sect" onSubmit={(e) => saveProject(e)}>
          <TitleInput handleChange={(e) => onUpdate("title", e.target.value)} inputName="title" value={projectData.title} required labelTitle="Project Title" type="text" previewText="Project Title" maxChar={115} displayMaxChar/>
          <ProjectGallery setRemovedFiles={setRemovedFiles} aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} files={files} setFiles={setFiles} cover={cover} setCover={setCover}/>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="project-description">Description:<span className="text-red-500">*</span></label>
            <textarea maxLength={1000} value={projectData.description} required className="lancr-add-edit-text-input h-40 resize-none" onChange={(e) => onUpdate("description", e.target.value)} name="project-description" id="project-description"></textarea>
            <p className={`max-characters ${projectData.description?.length === 1000 && "text-red-600"}`}>
              Max: {projectData.description?.length}/{1000} characters
            </p>
          </div>
          <div className="mt-6 mb-3 ml-2">
            <p className="text-lg">Results:</p>
            {
              projectData.results?.map((result, index) => (
                <div key={index} className="flex items-center gap-5 justify-between w-11/12 px-6 py-4 border rounded-md border-gray-400 shadow-sm mb-4 last:mb-0
                lg:w-5/6
                ">
                  <div className="flex flex-col gap-1 w-11/12 
                  lg:w-2/3 lg:flex-row lg:items-center lg:gap-3">
                    <p>Result:</p>
                    <div className="w-full">
                      <input maxLength={80} onChange={(e) => resultChange(e.target.value, index)} value={result ?? ""} className="rounded-lg border py-1 px-3 focus:outline-purple-600 w-full" placeholder="Achieved..." type="text" name="" id="" />
                      <p className={`max-characters ${result.length === 80 && "text-red-600"}`}>
                        Max: {result.length}/{80} characters
                      </p>
                    </div>
                  </div>
                  <Trash2 className="w-12 h-6 lg:mt-6 lg:mb-3 cursor-pointer hov-standrd hover:text-red-600" onClick={() => deleteResult(index)}/>
                </div>
              ))
            }
            <button onClick={addResult} type="button" className="px-6 py-4 border border-black rounded-md shadow-lg flex justify-around gap-3 mb-4 hov-standrd hover:bg-gray-100 mt-2">
              <SquarePlus />
              Add Result
            </button>
          </div>
          <TitleInput handleChange={(e) => onUpdate("link", e.target.value)} inputName="link" value={projectData.link} required={false} labelTitle="Live Demo Link" type="text" previewText="https://example.com" maxChar={2000} displayMaxChar={false} />
          <div className="flex justify-end gap-5 w-11/12 lg:w-5/6 mt-10">
            <button type="button" className="rounded-md bg-gray-300 hover:bg-gray-400 hov-standrd w-fit text-lg px-6 py-2 mr-6
              lg:mr-0" onClick={() => router.back()}>Cancel</button>
            <button type="submit" className="rounded-md bg-purple-600 text-white hover:bg-purple-500 hov-standrd w-fit text-lg px-6 py-2 mr-6
              lg:mr-0">{projectAction !== "Edit" ? (adding ? "Adding..." : "Add Project") : (adding ? "Saving..." : "Save Changes")}</button>
          </div>
        </form>
      </div>
    </section>
  )
}