"use client"
import{ usePathname } from "next/navigation"
import Link from "next/link"
import "./linkspage.css"

type MyProps = {
  handle: string
}

export default function UserPageNavigation ({ handle }: MyProps) {
  const pathname = usePathname()

  return (
    <nav className="mt-6">
      <div className="p-2 border-2 rounded-full w-2/3 mx-auto mt-2 flex gap-4">
        <Link className={`user-nav-link transition-all ease-in-out duration-300 hover:bg-gray-100 ${!pathname.includes("links") ? `bg-gray-200` : `bg-white`}`} href={`/${handle}`}>Projects</Link>
        <Link className={`user-nav-link transition-all ease-in-out duration-300 hover:bg-gray-100 ${pathname.includes("links") ? `bg-gray-200` : `bg-white`}`} href={`/${handle}/links`}>Links</Link>
      </div>
    </nav>
  )
}