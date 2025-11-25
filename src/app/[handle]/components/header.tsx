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
    cta: true,
  }

  const { aboutRef, heroRef, projectRef } = refs
  
  const active = useActiveSection({
    about: aboutRef,
    hero: heroRef,
    projects: projectRef
  })

  const headerClass = "text-[#7E22CE] text-lg tracking-wide font-medium border-b-2 transition-colors duration-300 hover:text-[#6B21A8]"
  return (
    <>
      {<header className="h-16 hidden md:flex fixed w-dvw z-50 pr-8 justify-end items-center backdrop-blur-md bg-white/60">
        <nav className="flex items-center h-full gap-12">
          {(headerSections.about || headerSections.projects) && <a className={`${headerClass} ${active === "hero" ? "border-[#6B21A8]" : "border-transparent"}`} href="#hero">Home</a>}
          {headerSections.projects && <a className={`${headerClass} ${active === "projects" ? "border-[#6B21A8]" : "border-transparent"}`} href="#hero">Projects</a>}
          {headerSections.about && <a className={`${headerClass} ${active === "about" ? "border-[#6B21A8]" : "border-transparent"}`} href="#about">About</a>}
          {headerSections.cta && <a className={`${headerClass} border-transparent`} href="#hero">Hire Me</a>}
        </nav>
      </header>}
    </>
  )
}