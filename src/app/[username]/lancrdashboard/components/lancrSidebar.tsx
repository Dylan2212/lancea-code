import Link from "next/link"
import { House, FolderOpen, Laptop } from "lucide-react"

export default function LancrSidebar () {
  return (
    <aside className="lancr-sidebar">
      <nav className="flex flex-col justify-between h-full">
        <div className="grid mt-6">
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}><House className="mr-2" />Dashboard</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/portfolio"}><FolderOpen className="mr-2"/>Portfolio</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/services"}><Laptop className="mr-2" />Services</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}>About Me</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}>Skills</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}>Education</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}>Achievements</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}>Reviews</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}>Social Links</Link>
        </div>
        <div className="grid mb-6">
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"username/lancrdashboard/overview"}>Settings</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"username/lancrdashboard/overview"}>Log Out</Link>
        </div>
      </nav>
    </aside>
  )
}