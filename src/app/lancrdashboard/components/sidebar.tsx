"use client"
import { useModals } from "../layout"
import SidebarButton from "./sidebarButton"
import { BriefcaseBusiness, CircleUserRound } from "lucide-react"

export default function Sidebar () {
    const { openFeedbackModal } = useModals()
  
  return (
    <nav className="hidden
    lg:block lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100dvh-4rem)] lg:w-[20%] lg:border-r-2 lg:bg-gray-50
    xl:w-[15%]
    ">
      <SidebarButton href="/lancrdashboard/profile" content="Profile" icon={<CircleUserRound/>}/>
      <SidebarButton href="/lancrdashboard/projects" content="Projects" icon={<BriefcaseBusiness />}/>
      <button onClick={() => openFeedbackModal()} className="fixed left-5 bottom-5 hov-standrd hover:bg-purple-500 p-3 shadow-lg shadow-gray-500 rounded-full bg-purple-600 text-white">
        <p className="text-sm font-semibold leading-none">Share Your Thoughts</p>
      </button>
    </nav>
  )
}