import { useEffect } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { SquarePlus, Trash2 } from "lucide-react"

type MyFile = File & { preview: string }

type MyProps = {
  files: MyFile[]
  setFiles: React.Dispatch<React.SetStateAction<MyFile[]>>
}

export default function ProjectGallery ({ files, setFiles}: MyProps) {
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles.map(file =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    )])
  }

  function deleteFile (toDelete: number) {
    setFiles(files.filter((_, idx) => idx !== toDelete))
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <section className="p-4 border rounded-md w-5/6">
      <div {...getRootProps({ className: "dropzone" })} className="flex flex-col items-center justify-center cursor-pointer border rounded-lg shadow-md p-2 hov-standrd">
        <input {...getInputProps()} />
        <SquarePlus className="h-10 w-10"/>
        <p>Drag & drop some files here, or click to select files</p>
      </div>

      <aside className="mt-4 grid grid-cols-3 gap-2">
        {files.map((file, idx) => (
          <div key={idx} className="w-full h-24 overflow-hidden rounded relative">
            <Image
              src={file.preview}
              className="w-full h-full object-cover"
              alt={file.name}
              width={50}
              height={50}
            />
            <Trash2 onClick={() => deleteFile(idx)} className="absolute w-7 h-7 hover:text-red-600 hov-standrd top-2 right-2 bg-white/50 p-1 rounded-full z-20"/>
          </div>
        ))}
      </aside>
    </section>
  )
}