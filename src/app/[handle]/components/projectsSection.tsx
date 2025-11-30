"use client"

import type { ProjectData } from "../../lancrdashboard/projects/components/addProjectComponent"
import React from "react"
import Project from "./project"
import TitleText from "./titleText"
import { useState, useEffect } from "react"
import ProjectModal from "./projectModal"

const ProjectSection = React.forwardRef<HTMLElement, { projects: ProjectData[] }> (({ projects }, ref) => {
  const [fullProject, setFullProject] = useState({show: false, index: 0})

  useEffect(() => {
    const el = document.body
    if (!el) return
    
    if (fullProject.show) {
      el.classList.add("overflow-hidden")
    } else {
      el.classList.remove("overflow-hidden")
    }
  }, [fullProject.show])


  return (
    <section
    id="projects"
    ref={ref}
    className="w-full py-20 bg-white flex justify-center px-6"
    >
      <div className="w-full flex flex-col gap-8">
        <TitleText mainTitle="My Projects" bgTitle="Projects"/>
        <div className="flex items-center justify-center gap-20">
          {projects.map((project, index) => {
            return (
              <Project project={project} index={index} key={project.id} setFullProject={setFullProject}/>
            )
          })}
        </div>
        {fullProject.show && <ProjectModal project={projects[fullProject.index]} onClose={() => setFullProject({show: false, index: 0})}/>}
      </div>
    </section>
  )
})

ProjectSection.displayName = "ProjectSection"
export default ProjectSection