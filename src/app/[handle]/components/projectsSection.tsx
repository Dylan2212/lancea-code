import type { ProjectData } from "../../lancrdashboard/projects/components/addProjectComponent"
import React from "react"

const ProjectSection = React.forwardRef<HTMLElement, { projects: ProjectData[] }> (({ projects }, ref) => {
  return (
    <section
    id="projects"
    ref={ref}
    className="w-full py-10 bg-white flex justify-center px-6"
    >
      {projects.map(project => project.title)}
    </section>
  )
})

ProjectSection.displayName = "ProjectSection"
export default ProjectSection