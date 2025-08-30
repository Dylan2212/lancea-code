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

export type ProjectData = Partial<{
  title: string,
  description: string,
  link: string,
  results: string[],
  uploaded_urls: Record<string, string>[],
  cover: string | null,
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
  const [cover, setCover] = useState<number>(0)
  const [aspectRatio, setAspectRatio] = useState("[4/3]")
  const [ProjectData, setProjectData] = useState<ProjectData>({
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
    
  }, [setProjectData, projects, searchParams])

  function filledResult () {
    if (!ProjectData.results) return true
    if (ProjectData.results?.length === 0) return true

    const last = ProjectData.results[ProjectData.results.length -1]

    if (last === "") {
      toast.error("Fill in the previous result before you add more results.")
      return false
    }

    return true
  }

  function addResult () {
    if (!filledResult()) return
    if (maxProjects) return
    if (ProjectData.results?.length === 4) setMaxProjects(true)
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
      .insert(finalProjectData)
      .eq("user_id", userId)


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
      if (!file.file || !file.name) continue
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

  async function saveProject (e: React.FormEvent) {
    e.preventDefault()
    setAdding(true)

    if (files.length === 0) {
      setAdding(false)
      toast.error("Add at least one project image.")
    }

    const finalLink = normalizeUrl(ProjectData.link)
    const uploadedUrls = await saveToStorage()

    const finalProjectData: ProjectData = {
      ...ProjectData,
      link: finalLink,
      uploaded_urls: uploadedUrls,
      id: uuidv4(),
      cover: uploadedUrls ? uploadedUrls[cover].url : null
    }

    const success = await saveToDb(finalProjectData)
    
    setProjects([...projects, finalProjectData])

    setAdding(false)
    if (success) {
      toast.success("Project added!")
      router.push("/lancrdashboard/projects")
    }

    return
  }

  return (
    <section className="pt-16">
      <h1 className="text-2xl font-semibold m-5 mb-0">{projectAction} Project</h1>
      <div className="div-for-lancr-dashboard-sects">
        <form className="lancr-add-edit-sect" onSubmit={(e) => saveProject(e)}>
          <TitleInput handleChange={(e) => onUpdate("title", e.target.value)} inputName="title" value={ProjectData.title} required labelTitle="Project Title" type="text" previewText="Project Title" maxChar={65} displayMaxChar/>
          <ProjectGallery removedFiles={removedFiles} setRemovedFiles={setRemovedFiles} aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} files={files} setFiles={setFiles} cover={cover} setCover={setCover}/>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="project-description">Description:<span className="text-red-500">*</span></label>
            <textarea value={ProjectData.description} required className="lancr-add-edit-text-input h-40 resize-none" onChange={(e) => onUpdate("description", e.target.value)} name="project-description" id="project-description"></textarea>
          </div>
          <div className="mt-6 mb-3 ml-2">
            <p className="text-lg">Results:</p>
            {
              ProjectData.results?.map((result, index) => (
                <div key={index} className="flex justify-between w-5/6 px-6 py-4 border rounded-md border-gray-400 shadow-sm mb-4 last:mb-0">
                  <div className="flex items-center gap-3 w-2/3">
                    <p>Result:</p>
                    <input onChange={(e) => resultChange(e.target.value, index)} value={result ?? ""} className="rounded-lg border py-1 px-3 focus:outline-purple-600 w-full" placeholder="Achieved..." type="text" name="" id="" />
                  </div>
                  <Trash2 className="w-12 h-6 mt-6 mb-3 cursor-pointer hov-standrd hover:text-red-600" onClick={() => deleteResult(index)}/>
                </div>
              ))
            }
            <button onClick={addResult} type="button" className="px-6 py-4 border border-black rounded-md shadow-lg flex justify-around gap-3 mb-4 hov-standrd hover:bg-gray-100 mt-2">
              <SquarePlus />
              Add Result
            </button>
          </div>
          <TitleInput handleChange={(e) => onUpdate("link", e.target.value)} inputName="link" value={ProjectData.link} required={false} labelTitle="Live Demo Link" type="text" previewText="https://example.com" maxChar={2000} displayMaxChar={false} />
          <div className="flex justify-end gap-5 w-5/ mt-10">
            <button className="rounded-md bg-gray-300 hover:bg-gray-400 hov-standrd w-40 text-lg px-6 py-2 mr-6
              lg:mr-0" onClick={() => router.back()}>Cancel</button>
            <button type="submit" className="rounded-md bg-purple-600 text-white hover:bg-purple-500 hov-standrd w-40 text-lg px-6 py-2 mr-6
              lg:mr-0">{adding ? "Adding..." : "Add Project"}</button>
          </div>
        </form>
      </div>
    </section>
  )
}