"use client"
import { useModals } from "../layout"
import SidebarButton from "./sidebarButton"
import { BriefcaseBusiness, CircleUserRound } from "lucide-react"
import Link from "next/link"
import OpenBilling from "@/utils/stripe/openBilling"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useRouter } from "next/navigation"

export default function Sidebar () {
  const { openFeedbackModal } = useModals()
  const router = useRouter()
  const userId = useOriginalUserStore(state => state.userId)

  async function openBilling () {
    const url = await OpenBilling(userId)
    router.push(url)
  }

  
  return (
    <nav className="hidden
    md:block md:fixed md:left-0 md:top-16 md:h-[calc(100dvh-4rem)] md:w-[20%] md:border-r-2 md:bg-gray-50
    xl:w-[15%]
    ">
      <SidebarButton href="/lancrdashboard/profile" content="Profile" icon={<CircleUserRound/>}/>
      <SidebarButton href="/lancrdashboard/projects" content="Projects" icon={<BriefcaseBusiness />}/>
      <Link href={"/lancrdashboard/pricing"}>Go Premium</Link>
      <button onClick={openBilling}>Billing</button>
      <button onClick={() => openFeedbackModal()} className="fixed left-5 bottom-5 hov-standrd hover:bg-purple-500 p-3 shadow-lg shadow-gray-500 rounded-full bg-purple-600 text-white">
        <p className="text-sm font-semibold leading-none">Share Your Thoughts</p>
      </button>
    </nav>
  )
}