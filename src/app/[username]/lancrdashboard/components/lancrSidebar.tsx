import Link from "next/link"
import { House, FolderOpen, Laptop, User, Brain, GraduationCap, Trophy, Star, Heart, Settings, LogOut } from "lucide-react"

export default function LancrSidebar () {
  return (
    <aside className="lancr-sidebar">
      <nav className="flex flex-col justify-between h-full">
        <div className="grid mt-6">
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/overview"}><House className="mr-2" />Dashboard</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/portfolio"}><FolderOpen className="mr-2"/>Portfolio</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/services"}><Laptop className="mr-2" />Services</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/about"}><User className="mr-2"/>About Me</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/skills"}><Brain className="mr-2" />Skills</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/education"}><GraduationCap className="mr-2" />Education</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/achievements"}><Trophy className="mr-2" />Achievements</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/reviews"}><Star className="mr-2" />Reviews</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"/username/lancrdashboard/sociallinks"}><Heart className="mr-2" />Social Links</Link>
        </div>
        <div className="grid mb-6">
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"username/lancrdashboard/overview"}><Settings className="mr-2" />Settings</Link>
          <Link className="lancr-sidebar-nav-item hov-standrd" href={"username/lancrdashboard/overview"}><LogOut className="mr-2" />Log Out</Link>
        </div>
      </nav>
    </aside>
  )
}