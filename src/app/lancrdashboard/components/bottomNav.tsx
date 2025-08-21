"use client"
import { CircleUserRound, BriefcaseBusiness, MessageSquareText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useModals } from "../layout"

export default function BottomNav () {
  const pathname = usePathname()
  const { openFeedbackModal } = useModals()

  return (
    <nav className="fixed bottom-0 w-screen bg-purple-50 h-16 gap-5 flex md:justify-center
    lg:hidden
    ">
      <Link href="/lancrdashboard/profile" className="h-full w-16 px-2 ml-5 flex flex-col gap-1 items-center justify-center relative">
        <div className={pathname.includes("profile") ? "selected-on-bottom-nav" : "hidden"}/>
        <CircleUserRound className="mt-1" />
        <p className="text-xs">Profile</p>
      </Link>
      <Link href="/lancrdashboard/projects" className="h-full w-16 px-2 flex flex-col gap-1 items-center justify-center relative">
        <div className={pathname.includes("projects") ? "selected-on-bottom-nav" : "hidden"}/>
        <BriefcaseBusiness className="mt-1" />
        <p className="text-xs">Projects</p>
      </Link>
      <button onClick={() => openFeedbackModal()} className="h-full px-2 flex flex-col w-16 gap-1 items-center justify-center relative">
        <MessageSquareText className="mt-1" />
        <p className="text-xs">Feedback</p>
      </button>
    </nav>
  )
}