import { ReactNode } from "react"
import LancrSidebar from "./components/lancrSidebar"
import LancrMainHeader from "./components/lancrMainHeader"
import "./lancrMain.css"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <LancrMainHeader/>
      <main className="flex flex-1 overflow-hidden">
        <LancrSidebar/>
          {children}
      </main>
    </div>
  )
}