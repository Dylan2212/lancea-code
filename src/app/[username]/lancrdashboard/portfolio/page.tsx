import "../components/lancrPortfolio.css"
import { SquarePlus } from "lucide-react"
import Link from "next/link"
import PortfolioProject from "../components/porfolioProject"

export default function LancrPortfolio () {
  return (
    <main className="overflow-auto w-full">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Your Portfolio<span className="text-lg text-gray-700">(0) Projects</span></p>
      <div className="grid grid-cols-3 gap-y-14 ml-5 mt-12 mb-5">
        <Link href="/username/lancrdashboard/portfolio/addEditProject" className="lancr-main-portfolio-project-cntnr hover:bg-gray-100 hov-standrd flex flex-col gap-3 justify-center items-center box-main">
          <SquarePlus className="w-14 h-14 text-purple-600" />
          <p>Add Project</p>
        </Link>
        <div className="relative w-fit">
          <PortfolioProject/>
          <button className="lancr-dlt-btn ml-auto absolute bottom-2 right-2 mr-5">Remove</button>
        </div>
        <div className="relative w-fit">
          <PortfolioProject/>
          <button className="lancr-dlt-btn ml-auto absolute bottom-2 right-2 mr-5">Remove</button>
        </div>
        <div className="relative w-fit">
          <PortfolioProject/>
          <button className="lancr-dlt-btn ml-auto absolute bottom-2 right-2 mr-5">Remove</button>
        </div>
      </div>
    </main>
  )
}