"use client"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useModals } from "../layout"
import SidebarButton from "./sidebarButton"
import { OpenBilling } from "@/utils/stripe/openBilling"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BriefcaseBusiness, CircleUserRound, LayoutGrid, Star, Palette } from "lucide-react"

export default function Sidebar () {
  const router = useRouter()
  const { openFeedbackModal } = useModals()
  const userId = useOriginalUserStore(state => state.userId)
  const isPremium = useOriginalUserStore(state => state.isPremium)

  async function openBilling () {
    
    const url = await OpenBilling(userId)
    router.push(url)
  }

  
  return (
    <nav className="hidden
    md:block md:fixed md:left-0 md:top-16 md:h-[calc(100dvh-4rem)] md:w-[20%] md:border-r-2 md:bg-gray-50
    xl:w-[15%]
    max-w-[190px]
    ">
      <SidebarButton href="/lancrdashboard/profile" content="Profile" icon={<CircleUserRound/>}/>
      <SidebarButton href="/lancrdashboard/projects" content="Projects" icon={<BriefcaseBusiness />}/>
      <SidebarButton href="/lancrdashboard/services" content="Services" icon={<LayoutGrid />}/>
      <SidebarButton href="/lancrdashboard/testimonials" content="Testimonials" icon={<Star />}/>
      <SidebarButton href="/lancrdashboard/branding" content="Branding" icon={<Palette />}/>
      {!isPremium ? <Link className="h-12 text-xl flex pl-5 items-center bg-purple-50 border-b-2 border-gray-400 gap-3 hov-standrd hover:bg-purple-600 hover:text-white" href={"/lancrdashboard/pricing"}>Go Premium</Link> : 
      <button onClick={openBilling}>Billing</button>}
      <button onClick={() => openFeedbackModal()} className="fixed left-5 bottom-5 hov-standrd hover:bg-purple-500 p-3 shadow-lg shadow-gray-500 rounded-full bg-purple-600 text-white">
        <p className="text-sm font-semibold leading-none">Share Your Thoughts</p>
      </button>
    </nav>
  )
}