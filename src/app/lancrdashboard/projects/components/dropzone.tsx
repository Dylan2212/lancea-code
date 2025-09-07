import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { SquarePlus, Trash2, Lock } from "lucide-react"
import Masonry from "react-masonry-css"
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from "react"
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { useSearchParams } from "next/navigation"

export type MyFile = {
  file?: File
  preview: string
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
  setRemovedFiles: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ProjectGallery ({ files, setFiles, cover, setCover, setRemovedFiles }: MyProps) {

  const projects = useProjectsStore(state => state.projects)
  const searchParams = useSearchParams()

  useEffect(() => {
    const idxParam = searchParams.get("idx")
    if (idxParam === "null") return
    const index = Number(idxParam)
    if (!projects[index] || !projects[index]?.uploaded_urls) return
    const alreadyAddedUrls: MyFile[] = projects[index].uploaded_urls.map((urlObj) => ({
      preview: urlObj.url,
      aspectRatio: urlObj.aspectRatio,
      id: uuidv4()
    }))

    setFiles(alreadyAddedUrls)
  }, [projects, searchParams, setFiles])

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles.map(file =>
      Object.assign(file, {file: file, preview: URL.createObjectURL(file), aspectRatio: "4/3", id: uuidv4() })
    )])
  }

  function deleteFile (toDelete: number) {

    if (!files[toDelete].file) {
      const split = files[toDelete].preview.split("/projects/")
      const filePath = split[1]
      setRemovedFiles(prev => [...prev, filePath])
    }
    
    setFiles(prevFiles => {
      const fileToDelete = prevFiles[toDelete];
      if (fileToDelete?.preview) {
        URL.revokeObjectURL(fileToDelete.preview);
      }

      const newFiles = prevFiles.filter((_, idx) => idx !== toDelete);

      setCover(prevCover => {
        if (toDelete === prevCover) {
          return 0
        } else if (toDelete < prevCover) {
          return prevCover - 1
        } else if (newFiles.length === 0) {
          return -1
        }
        return prevCover;
      });

      return newFiles;
    });
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="ml-2 mt-6">
      <label className="block text-lg" htmlFor="project-gallery">Gallery:<span className="text-red-500">* <span className="text-xs">(Add 1 picture as a cover image)</span></span></label>
      <section className="lancr-add-edit-sect w-11/12 border rounded-md
      lg:w-5/6
      ">
        <div {...getRootProps({ className: "dropzone" })} className="flex flex-col items-center justify-center cursor-pointer border rounded-lg shadow-md p-2 hov-standrd">
          <input {...getInputProps()} />
          <SquarePlus className="h-10 w-10"/>
          <p>Drag & drop some files here, or click to select files</p>
        </div>

        <Masonry breakpointCols={{default: 2, 768: 1}} className="my-masonry-grid py-10 px-6" columnClassName="my-masonry-grid_column">
          {files.map((file, idx) => (
            <div key={file.id} className={`${cover === idx ? "ring ring-offset-4 ring-purple-600 rounded-lg" : ""} mb-6`}>
              <div style={{aspectRatio: `${file.aspectRatio}` }} className={`overflow-hidden mx-auto rounded relative shadow-md border`}>
                <Image
                  src={file.preview}
                  className={`image-crisp object-cover`}
                  alt={file.name || "Uploaded File"}
                  fill
                  sizes="300px"
                />
                {cover !== idx && <div onClick={() => {
                  setCover(idx)
                  setFiles(prev => prev.map((f, i) =>  i === idx ? { ...f, aspectRatio: "4/3", file: f.file, name: f.name } : f))
                  }} className="opacity-0 hover:opacity-100 absolute w-full hov-standrd h-full bg-black/50 top-0 flex justify-center items-center">
                  <button className="text-white">
                    Set As Cover
                  </button>
                </div>}
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