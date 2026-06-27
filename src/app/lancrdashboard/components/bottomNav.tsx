"use client"
import { CircleUserRound, BriefcaseBusiness, MessageSquareText, LayoutGrid, Star, Palette, Info } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useModals } from "../layout"
import { useState, useEffect } from "react"

export default function BottomNav() {
  const pathname = usePathname()
  const { openFeedbackModal } = useModals()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-purple-50 h-16 border-t border-purple-200 md:hidden">
      <div className="relative h-full">

        {/* Left fade */}
        <div className="pointer-events-none z-20 absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-purple-50 to-transparent" />

        {/* Scrollable container */}
        <div className="flex overflow-x-auto no-scrollbar h-full gap-6 px-6 py-2 snap-x snap-mandatory relative z-10">
          <Link href="/lancrdashboard/profile" className="nav-item">
            <div className={pathname.includes("profile") ? "selected-on-bottom-nav" : "hidden"} />
            <CircleUserRound className="mt-1" />
            <p className="text-xs">Profile</p>
          </Link>

          <Link href="/lancrdashboard/projects" className="nav-item">
            <div className={pathname.includes("projects") ? "selected-on-bottom-nav" : "hidden"} />
            <BriefcaseBusiness className="mt-1" />
            <p className="text-xs">Projects</p>
          </Link>

          <Link href="/lancrdashboard/services" className="nav-item">
            <div className={pathname.includes("services") ? "selected-on-bottom-nav" : "hidden"} />
            <LayoutGrid className="mt-1" />
            <p className="text-xs">Services</p>
          </Link>

          <Link href="/lancrdashboard/branding" className="nav-item">
            <div className={pathname.includes("branding") ? "selected-on-bottom-nav" : "hidden"} />
            <Palette className="mt-1" />
            <p className="text-xs">Branding</p>
          </Link>

          <Link href="/lancrdashboard/testimonials" className="nav-item">
            <div className={pathname.includes("testimonials") ? "selected-on-bottom-nav" : "hidden"} />
            <Star className="mt-1" />
            <p className="text-xs">Testimonials</p>
          </Link>

          <Link href="/lancrdashboard/metadata" className="nav-item">
            <div className={pathname.includes("metadata") ? "selected-on-bottom-nav" : "hidden"} />
            <Info className="mt-1" />
            <p className="text-xs">Metadata</p>
          </Link>

          <button onClick={openFeedbackModal} className="nav-item">
            <MessageSquareText className="mt-1" />
            <p className="text-xs">Feedback</p>
          </button>

        </div>

        {/* Right fade */}
        <div className="pointer-events-none z-20 absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-purple-50 to-transparent" />
      </div>
    </nav>
  )
}