"use client"
import Hero from "./components/hero"
import "./components/linkspage.css"
import { SocialLinks } from "@/lib/store/socialLinksType"
import { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"
import { ProjectData } from "../lancrdashboard/projects/components/addProjectComponent"
import { UserContext } from "./components/layoutClient"
import { useContext, useRef } from "react"
import ProjectSection from "./components/projectsSection"
import AboutSection from "./components/aboutSection"
import LinksSection from "./components/linksSection"
import Header from "./components/header"
import Footer from "./components/footer"
import { bioHasContent } from "./utils/bioHasContent"
import { Colors, ServicesData, TestimonialData } from "@/src/types"
import ServiceSection from "./components/serviceSection"
import TestimonialSection from "./components/testimonialSection"

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
  colors: Colors,
  handle: string,
  services: ServicesData[],
  testimonials: TestimonialData[],
  subscription_status: string
}

export default function LancrLinksPage () {
  const userData = useContext(UserContext)

  const aboutRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const projectRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const handle = userData.handle ? userData.handle : "User not found"

  return (
    <>
      <Header refs={{aboutRef, heroRef, projectRef, linksRef, servicesRef, testimonialsRef}} userData={userData}/>
      <Hero ref={heroRef} userData={userData}/>
      {userData.bio && bioHasContent(userData.bio) && <AboutSection ref={aboutRef} bio={userData.bio}/>}
      {userData.services && userData.services.length > 0 && <ServiceSection ref={servicesRef} services={userData.services}/>}
      {userData.projects && userData.projects.length > 0 && <ProjectSection ref={projectRef} projects={userData.projects}/>}
      {userData.additional_links &&  userData.additional_links.length > 0 && <LinksSection ref={linksRef} links={userData.additional_links}/>}
      {userData.testimonials && userData.testimonials.length > 0 && <TestimonialSection ref={testimonialsRef} testimonials={userData.testimonials}/>}
      <Footer handle={handle}/>
    </>
  )
}
