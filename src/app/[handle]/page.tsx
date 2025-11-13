"use client"
import Hero from "./components/hero"
import "./components/linkspage.css"
import { SocialLinks } from "@/lib/store/socialLinksType"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { ProjectData } from "../lancrdashboard/projects/components/addProjectComponent"
import { UserContext } from "./components/layoutClient"
import { useContext } from "react"

export type UserData = {
  id: string,
  email: string,
  title: string,
  profileImage: string,
  socialLinks: SocialLinks,
  username: string,
  additional_links: AdditionalLink[],
  projects: ProjectData[],
  bio: string,
  handle: string
}

export default function LancrLinksPage () {
  const userData = useContext(UserContext)
  return (
    <>
      <Hero userData={userData}/>
    </>
  )
}
