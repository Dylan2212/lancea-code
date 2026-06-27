import Link from "next/link"
import { ReactNode } from "react"

type MyProps = {
  href: string,
  content: string,
  icon: ReactNode,
  flag?: boolean
}
export default function SidebarButton ({ href, content, icon, flag }: MyProps) {
  return (
    <Link
      href={flag ? "#" : href}
      className={`
        flex flex-col justify-center
        pl-5 pr-4 py-2 gap-1
        border-b border-gray-300
        transition-all duration-200
        ${flag 
          ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-70" 
          : "bg-purple-50 hover:bg-purple-600 hover:text-white"
        }
      `}
    >
      {/* Top row: icon + label */}
      <div className="flex items-center gap-3 text-lg">
        {icon}
        {content}
      </div>

      {/* Bottom row: Coming Soon */}
      {flag && (
        <div className="text-xs font-semibold text-purple-700">
          Coming Soon
        </div>
      )}
    </Link>
  )
}