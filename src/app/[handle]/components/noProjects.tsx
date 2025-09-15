import { useContext } from "react"
import { UserContext } from "./layoutClient"
import { FolderOpen } from "lucide-react"

export default function NoProjects () {
  const { title } = useContext(UserContext)
  return (
    <div>
      <FolderOpen />
      <p>{title} does not have any projects to display</p>
    </div>
  )
}