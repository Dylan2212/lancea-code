"use client"
import Hero from "./components/hero"
import "./components/linkspage.css"
import { SocialLinks } from "@/lib/store/socialLinksType"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { ProjectData } from "../lancrdashboard/projects/components/addProjectComponent"
import { UserContext } from "./components/layoutClient"
import { useContext, useRef } from "react"
//import ProjectSection from "./components/projectsSection"
import AboutSection from "./components/aboutSection"
import Header from "./components/header"

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

  const aboutRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  return (
    <>
      <Header refs={{aboutRef, heroRef}} userData={userData}/>
      <Hero ref={heroRef} userData={userData}/>
      {/* {userData.projects && <ProjectSection/>} */}
      {userData.bio && userData.bio?.trim().length > 0  && <AboutSection ref={aboutRef} bio={userData.bio}/>}
    </>
  )
}
