"use client"
import Hero from "../../[handle]/components/hero"
import "../../[handle]/components/linkspage.css"
import { useRef } from "react"
import ProjectSection from "../../[handle]/components/projectsSection"
import AboutSection from "../../[handle]/components/aboutSection"
import LinksSection from "../../[handle]/components/linksSection"
import Header from "../../[handle]/components/header"
import Footer from "../../[handle]/components/footer"
import { bioHasContent } from "../../[handle]/utils/bioHasContent"
import { useUserStore } from "@/lib/store/useUserStore"
import { useProjectsStore } from "@/lib/store/useProjectsStore"
import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore"

export default function Page () {
  const aboutRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const projectRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLElement>(null)

  const bio = useUserStore(state => state.bio)
  const handle = useUserStore(state => state.handle)
  const projects = useProjectsStore(state => state.projects)
  const email = useUserStore(state => state.email)
  const username = useUserStore(state => state.username)
  const title = useUserStore(state => state.title)
  const socialLinks = useUserStore(state => state.socialLinks)
  const additionalLinks = useAdditionalLinksStore(state => state.links)
  
  const userData = {
    bio,
    handle,
    projects,
    email,
    username,
    title,
    socialLinks,
    additionalLinks
  }
  
  return (
    <>
      <Header refs={{aboutRef, heroRef, projectRef, linksRef}} userData={userData}/>
      <Hero ref={heroRef} userData={userData}/>
      {projects && projects.length > 0 && <ProjectSection ref={projectRef} projects={projects}/>}
      {additionalLinks &&  additionalLinks.length > 0 && <LinksSection ref={linksRef} links={additionalLinks}/>}
      {bio && bioHasContent(bio) && <AboutSection ref={aboutRef} bio={bio}/>}
      <Footer handle={handle}/>
    </>
  )
}