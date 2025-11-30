import { RefObject } from "react"
import { UserData } from "../page"
import useActiveSection from "../hooks/useActiveSection"

type MyProps = {
  userData: Partial<UserData>,
  refs: Record<string, RefObject<HTMLElement | null>>
}

export default function Header ({ userData, refs }: MyProps) {  
  const headerSections = {
    about: userData.bio ? true : false,
    projects: userData.projects && userData.projects.length > 0 ? true : false,
    links: userData.additional_links && userData.additional_links.length > 0 ? true : false,
    cta: true,
  }

  const { aboutRef, heroRef, projectRef, linksRef } = refs
  
  const active = useActiveSection({
    about: aboutRef,
    hero: heroRef,
    projects: projectRef,
    links: linksRef
  })

  const headerClass = "text-[#7E22CE] text-sm md:text-lg tracking-wide font-medium border-b-2 transition-colors duration-300 hover:text-[#6B21A8]"
  return (
    <>
      {<header className="h-16 flex fixed w-dvw z-50 pr:4 md:pr-8 justify-end items-center backdrop-blur-md bg-white/60">
        <nav className="flex items-center h-full gap-6 md:gap-12">
          {(headerSections.about || headerSections.projects) && <a className={`${headerClass} ${active === "hero" ? "border-[#6B21A8]" : "border-transparent"}`} href="#hero">Home</a>}
          {headerSections.projects && <a className={`${headerClass} ${active === "projects" ? "border-[#6B21A8]" : "border-transparent"}`} href="#projects">Projects</a>}
          {headerSections.links && <a className={`${headerClass} ${active === "links" ? "border-[#6B21A8]" : "border-transparent"}`} href="#links">Links</a>}
          {headerSections.about && <a className={`${headerClass} ${active === "about" ? "border-[#6B21A8]" : "border-transparent"}`} href="#about">About</a>}
          {headerSections.cta && <a href={`mailto:${userData.email}`} className={`tracking-wide font-medium bg-[#7E22CE] rounded-xl text-white py-2 px-3 border-transparent transition-all duration-300 ease-in-out hover:bg-[#6B21A8]`}>Email Me</a>}
        </nav>
      </header>}
    </>
  )
}