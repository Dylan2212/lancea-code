"use client"
import "./components/linkspage.css"
import { SocialLinks } from "@/lib/store/useOriginalUser"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { ProjectData } from "../lancrdashboard/projects/add+editproject/page"
import UserProject from "./components/userProject"
import { useContext } from "react"
import { UserContext } from "./components/layoutClient"

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
  return (
    <div>
      {projects?.map(project => (
        <UserProject key={project.id} project={project}/>
      ))}
    </div>
  )
}
