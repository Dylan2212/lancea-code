import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { SquarePlus, Trash2, Lock } from "lucide-react"
import Masonry from "react-masonry-css"
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from "react"
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { useSearchParams } from "next/navigation"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

export type MyFile = {
  file?: File
  url: string
  aspectRatio: string
  id: string
  name?: string
}

type MyProps = {
  files: MyFile[]
  setFiles: React.Dispatch<React.SetStateAction<MyFile[]>>,
  cover: number,
  setCover: React.Dispatch<React.SetStateAction<number>>,
  aspectRatio: string,
  setAspectRatio: React.Dispatch<React.SetStateAction<string>>,
  setRemovedFiles: React.Dispatch<React.SetStateAction<string[]>>,
  setAddedFile: React.Dispatch<React.SetStateAction<boolean>>,
  addedFile: boolean,
  fromAPC?: number
}

export default function ProjectGallery ({ files, setFiles, cover, setCover, setRemovedFiles, setAddedFile, addedFile, fromAPC }: MyProps) {
  const seenOnboarding = useOriginalUserStore(state => state.has_seen_onboarding)
  const projects = useProjectsStore(state => state.projects)
  const searchParams = useSearchParams()

  useEffect(() => {
    const idxParam = searchParams.get("idx")
    if (idxParam === "null" || idxParam === null && fromAPC !== 10) return
    const index = Number(idxParam)
    if (!projects[index] || !projects[index]?.uploaded_urls) return
    const alreadyAddedUrls: MyFile[] = projects[index].uploaded_urls.map((urlObj) => ({
      url: urlObj.url,
      aspectRatio: urlObj.aspectRatio,
      id: uuidv4()
    }))

    setFiles(alreadyAddedUrls)
  }, [projects, searchParams, setFiles, fromAPC])

  const onDrop = (acceptedFiles: File[]) => {
    if (!addedFile) {setAddedFile(true)}
    setFiles([...files, ...acceptedFiles.map(file =>
      Object.assign(file, {file: file, url: URL.createObjectURL(file), aspectRatio: "4/3", id: uuidv4() })
    )])

    if (cover === -1 && files.length === 0) {
      setCover(0)
    }
  }

  function deleteFile(toDelete: number) {
    if (!files[toDelete].file) {
      const split = files[toDelete].url.split("/projects/")
      const filePath = split[1]
      setRemovedFiles(prev => [...prev, filePath])
    }

    setFiles(prevFiles => {
      const fileToDelete = prevFiles[toDelete]
      if (fileToDelete?.url) {
        URL.revokeObjectURL(fileToDelete.url)
      }

      const newFiles = prevFiles.filter((_, idx) => idx !== toDelete)

      let newCover = cover
      if (toDelete === cover) {
        newCover = newFiles.length > 0 ? 0 : -1
      } else if (toDelete < cover) {
        newCover = cover - 1
      }

      setCover(newCover)

      return newFiles
    })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: {"image/*": [], "video/*": []}, maxSize: 100*1024*1024 })

  return (
    <div className="ml-2 mt-6">
      <label className="block text-lg" htmlFor="project-gallery">Gallery:<span className="text-red-500">* <span className="text-xs">(Add 1 picture as a cover image)</span></span></label>
      <section className="lancr-add-edit-sect w-full border rounded-md
      ">
        <div {...getRootProps({ className: "dropzone" })} className="flex flex-col items-center justify-center cursor-pointer border rounded-lg shadow-md p-2 hov-standrd">
          <input {...getInputProps()} />
          <SquarePlus className="h-10 w-10"/>
          <p className="text-center">Drag & drop some files here, or click to select files</p>
        </div>

        <Masonry breakpointCols={seenOnboarding ? {default: 3, 1024: 2, 768: 1} : {default: 1}} className="my-masonry-grid py-10 px-6" columnClassName="my-masonry-grid_column">
          {files.map((file, idx) => (
            <div key={file.id} className={`${cover === idx ? "ring ring-offset-4 ring-purple-600 rounded-lg" : "hover:ring-offset-4 hover:ring hover:ring-purple-300 hover:rounded-lg"} mb-6 transition-all ease-in-out duration-200`}>
              <div onClick={() => {
                  setCover(idx)
                  setFiles(prev => prev.map((f, i) =>  i === idx ? { ...f, aspectRatio: "4/3", file: f.file, name: f.name } : f))
                  }} style={{aspectRatio: `${file.aspectRatio}` }} className={`overflow-hidden mx-auto rounded group relative shadow-md border`}>
              {file.file?.type.startsWith("video/") ? (
                <video src={file.url} controls className="object-cover w-full h-full"/>
              ) :
                (<Image
                  src={file.url}
                  className={`image-crisp object-cover`}
                  alt={file.name || "Uploaded File"}
                  fill
                  sizes="300px"
                />
              )}
                <Trash2 onClick={() => deleteFile(idx)} className="absolute w-7 h-7 hover:text-red-600 hov-standrd top-2 right-2 bg-white/50 p-1 rounded-full z-20"/>
              </div>
              <div className="mt-3 mx-2 flex justify-around items-center border border-gray-500 shadow-sm rounded-lg py-1">
                <label className="flex flex-col" htmlFor="aspect-ratio">Aspect ratio:{cover === idx && <span className="text-xs">(Locked for cover image)</span>}</label>
                <div className="flex gap-1 items-center">
                  <select disabled={cover === idx ? true : false} value={file.aspectRatio} onChange={(e) => setFiles(prev => prev.map((f, i) =>  i === idx ? { ...f, aspectRatio: e.target.value, file: f.file, name: f.name } : f))} className={`cursor-pointer border-2 border-gray-300 rounded-md outline-none focus:border-purple-600`} name="aspect-ratio" id="aspect-ratio">
                    <option value="1/1">1:1</option>
                    <option value="16/9">16:9</option>
                    <option value="9/16">9:16</option>
                    <option value="4/3">4:3</option>
                  </select>
                  {cover === idx && <Lock className="h-4 w-4 text-gray-500" />}
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </section>
    </div>
  )
}