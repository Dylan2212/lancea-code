import { Link2Off } from "lucide-react"

export default function NoLinks () {
  return (
    <div className="w-2/3 mt-5 mx-auto flex justify-center items-center gap-5 flex-col">
      <Link2Off className="w-10 h-10 text-gray-600"/>
      <p className="text-center text-gray-600 text-lg">No links to show</p>
    </div>
  )
}