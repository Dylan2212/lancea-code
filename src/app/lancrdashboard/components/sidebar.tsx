import { useModals } from "../layout"
import SidebarButton from "./sidebarButton"
import { House, BriefcaseBusiness } from "lucide-react"

export default function Sidebar () {
    const { openFeedbackModal } = useModals()
  
  return (
    <nav className="fixed left-0 top-16 h-[calc(100dvh-4rem)] w-[15%] border-r-2 bg-gray-50">
      <SidebarButton href="/lancrdashboard/profile" content="Profile" icon={<House/>}/>
      <SidebarButton href="/lancrdashboard/projects" content="Projects" icon={<BriefcaseBusiness />}/>
      <button onClick={() => openFeedbackModal()} className="fixed left-5 bottom-5 hov-standrd hover:bg-purple-500 p-3 shadow-lg shadow-gray-500 rounded-full bg-purple-600 text-white">
        <p className="text-sm font-semibold leading-none">Share Your Thoughts</p>
      </button>
    </nav>
  )
}