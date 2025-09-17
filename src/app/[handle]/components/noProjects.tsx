import { useContext } from "react"
import { UserContext } from "./layoutClient"
import { FolderOpen } from "lucide-react"

export default function NoProjects () {
  const { username } = useContext(UserContext)
  return (
    <div className="w-2/3 mt-5 mx-auto flex justify-center items-center gap-5 flex-col">
      <FolderOpen className="w-10 h-10 text-gray-600" />
      <p className="text-center text-gray-600 text-lg">{username} does not have any projects to display</p>
    </div>
  )
}