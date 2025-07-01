import Link from "next/link"
import { House, Settings, LogOut } from "lucide-react"

export default function LancrSidebar () {
  return (
    <aside className="lancr-sidebar">
      <nav className="flex flex-col justify-between h-full">
        <div className="grid mt-6">
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/lancrdashboard/overview"}><House className="mr-2" />Home</Link>
        </div>
        <div className="grid mb-6">
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/lancrdashboard/overview"}><Settings className="mr-2" />Settings</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/lancrdashboard/overview"}><LogOut className="mr-2" />Log Out</Link>
        </div>
      </nav>
    </aside>
  )
}