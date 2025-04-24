import FreelancerHeader from "./components/lancerHeader"
import { ReactNode } from "react"
import TplateFooter from "./components/tplateFooter"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <FreelancerHeader/>
      <main>{children}</main>
      <TplateFooter/>
    </>
  )
}