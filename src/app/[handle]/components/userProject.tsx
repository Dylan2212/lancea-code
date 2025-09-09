import type { ProjectData } from "../../lancrdashboard/projects/add+editproject/page"

type MyProps = {
  project: ProjectData
}

export default function UserProject ({ project }: MyProps) {
  return (
    <div>
      {project.title}
    </div>
  )
}