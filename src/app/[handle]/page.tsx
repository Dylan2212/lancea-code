"use client"
import "./components/linkspage.css"
import { SocialLinks } from "@/lib/store/useOriginalUser"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { ProjectData } from "../lancrdashboard/projects/add+editproject/page"
import UserProject from "./components/userProject"
import { useContext, useState } from "react"
import { UserContext } from "./components/layoutClient"
import NoProjects from "./components/noProjects"
import ProjectModal from "./components/projectModal"

export type UserData = {
  id: string,
  email: string,
  title: string,
  profileImage: string,
  socialLinks: SocialLinks,
  username: string,
  bio: string,
  additional_links: AdditionalLink[],
  projects: ProjectData[],
  handle: string
}

export default function LancrLinksPage () {
  const { projects } = useContext(UserContext)
  const [displayFullProject, setDisplayFullProject] = useState({show: false, index: 0})

  if (!projects) return null

  return (
    <>
      {projects?.length ?
      <div className="grid grid-cols-1 w-full
      sm:grid-cols-2 sm:gap-4
      xl:grid-cols-3
      ">
        {projects?.map((project, index) => (
          <UserProject key={project.id} index={index} project={project} setDisplayFullProject={setDisplayFullProject}/>
        ))}
        {displayFullProject.show && <ProjectModal project={projects[displayFullProject.index]} onClose={() => setDisplayFullProject({show: false, index: 0})}/>}
      </div>
      :
      <NoProjects/>
      }
    </>
  )
}
