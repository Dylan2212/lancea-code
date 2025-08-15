import Link from "next/link"
import { ReactNode } from "react"

type MyProps = {
  href: string,
  content: string,
  icon: ReactNode
}
export default function SidebarButton ({ href, content, icon }: MyProps) {
  return (
    <Link className="h-12 text-xl flex pl-5 items-center bg-purple-50 border-b-2 border-gray-400 gap-3 hov-standrd hover:bg-purple-600 hover:text-white" href={href}>{icon}{content}</Link>
  )
}