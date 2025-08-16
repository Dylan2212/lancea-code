"use client"
import { CircleUserRound, BriefcaseBusiness } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNav () {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 w-screen bg-purple-50 h-16 gap-5 flex md:justify-center
    lg:hidden
    ">
      <Link href="/lancrdashboard/profile" className="h-full px-2 ml-5 flex flex-col gap-1 items-center justify-center relative">
        <div className={pathname.includes("profile") ? "selected-on-bottom-nav" : "hidden"}/>
        <CircleUserRound className="mt-1" />
        <p className="text-sm">Profile</p>
      </Link>
      <Link href="/lancrdashboard/projects" className="h-full px-2 ml-5 flex flex-col gap-1 items-center justify-center relative">
        <div className={pathname.includes("projects") ? "selected-on-bottom-nav" : "hidden"}/>
        <BriefcaseBusiness className="mt-1" />
        <p className="text-sm">Projects</p>
      </Link>
    </nav>
  )
}