"use client"
import Hero from "../[handle]/components/hero"
import "../[handle]/components/linkspage.css"
import { useEffect, useRef } from "react"
import ProjectSection from "../[handle]/components/projectsSection"
import AboutSection from "../[handle]/components/aboutSection"
import LinksSection from "../[handle]/components/linksSection"
import Header from "../[handle]/components/header"
import Footer from "../[handle]/components/footer"
import { bioHasContent } from "../[handle]/utils/bioHasContent"
import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore"
import { lancrlyPortfolioColors as colors } from "@/src/businessRules"
import { useLiveSyncStore } from "@/lib/store/liveSyncStore"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useLiveSyncProjects } from "@/lib/store/liveSyncProjects"
import { useRouter } from "next/navigation"

export default function Page () {
  const aboutRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const projectRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLElement>(null)

  const bio = useLiveSyncStore(state => state.syncBio)
  const handle = useOriginalUserStore(state => state.handle)
  const projects = useLiveSyncProjects(state => state.syncProjects)
  const email = useOriginalUserStore(state => state.email)
  const username = useLiveSyncStore(state => state.syncUsername)
  const title = useLiveSyncStore(state => state.syncTitle)
  const socialLinks = useLiveSyncStore(state => state.syncSocialLinks)
  const additionalLinks = useAdditionalLinksStore(state => state.links)
  const profileImage = useLiveSyncStore(state => state.syncProfileImage)

  const router = useRouter()
  useEffect(() => {
    const channel = new BroadcastChannel("redirect-channel")

    channel.onmessage = (event) => {
      if (event.data.type === "REDIRECT") {
        router.push(event.data.url)
      }
    }

    return () => channel.close()
  }, [router])

  const userData = {
    bio,
    handle: handle || "Add Handle",
    projects,
    email,
    username: username || "Add Username",
    title: title || "Add Title",
    socialLinks,
    additionalLinks,
    profileImage: profileImage || "/profileImage.jpg"
  }
  
  return (
    <main style={{
        "--mainColor": colors.main,
        "--hoverColor": colors.hover,
        "--accentColor": colors.accent
      } as React.CSSProperties
    }>
      <Header refs={{aboutRef, heroRef, projectRef, linksRef}} userData={userData}/>
      <Hero ref={heroRef} userData={userData}/>
      {projects && projects.length > 0 && <ProjectSection ref={projectRef} projects={projects}/>}
      {additionalLinks &&  additionalLinks.length > 0 && <LinksSection ref={linksRef} links={additionalLinks}/>}
      {bio && bioHasContent(bio) && <AboutSection ref={aboutRef} bio={bio}/>}
      <Footer handle={handle}/>
    </main>
  )
}