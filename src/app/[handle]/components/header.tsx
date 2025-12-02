"use client"
import { RefObject, useEffect, useState } from "react"
import { UserData } from "../page"
import useActiveSection from "../hooks/useActiveSection"
import { bioHasContent } from "../page"

type MyProps = {
  userData: Partial<UserData>,
  refs: Record<string, RefObject<HTMLElement | null>>
}

export default function Header ({ userData, refs }: MyProps) {  
  const [hidden, setHidden] = useState(false)

  const headerSections = {
    about: bioHasContent(userData.bio) ? true : false,
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

  useEffect(() => {
    let startingY = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      const diff = currentY - startingY

      if (diff > 8) {
        setHidden(true)
        startingY = currentY
      }

      if (diff < -8) {
        setHidden(false)
        startingY = currentY
      }
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const headerClass = `text-[var(--mainColor)] text-sm md:text-lg tracking-wide font-medium border-b-2 transition-colors duration-300 hover:text-[var(--hoverColor)]`
  return (
    <>
      {<header className={`
      ${hidden ? "-translate-y-[150%]" : "translate-y-0"}
      ${!headerSections.about && !headerSections.links && !headerSections.projects && "hidden"}
      h-12 flex fixed w-11/12 z-50 items-center bg-white top-5 rounded-full shadow-md left-1/2 -translate-x-1/2 border transition-all duration-300 ease-in-out
      md:w-dvw md:pr-8 md:h-16 md:justify-end md:top-0 md:rounded-none md:shadow-none md:left-0 md:-translate-x-0 md:border-none
      `}>
        <nav className="
        flex items-center h-full w-full justify-around
        md:gap-12 md:w-auto
        ">
          {(headerSections.about || headerSections.projects) && <a className={`${headerClass} ${active === "hero" ? `border-[var(--hoverColor)]` : "border-transparent"}`} href="#hero">Home</a>}
          {headerSections.projects && <a className={`${headerClass} ${active === "projects" ? `border-[var(--hoverColor)]` : "border-transparent"}`} href="#projects">Projects</a>}
          {headerSections.links && <a className={`${headerClass} ${active === "links" ? `border-[var(--hoverColor)]` : "border-transparent"}`} href="#links">Links</a>}
          {headerSections.about && <a className={`${headerClass} ${active === "about" ? `border-[var(--hoverColor)]` : "border-transparent"}`} href="#about">About</a>}
          {headerSections.cta && <a href={`mailto:${userData.email}`} className={`tracking-wide text-xs md:text-base font-medium bg-[var(--mainColor)] rounded-xl text-white py-2 px-3 border-transparent transition-all duration-300 ease-in-out hover:bg-[var(--hoverColor)]`}>Email Me</a>}
        </nav>
      </header>}
    </>
  )
}