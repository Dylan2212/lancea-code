import Link from "next/link"
import Image from "next/image"
import { Globe, ChevronDown } from "lucide-react"

export default function LancrMainHeader () {
  return (
    <header className="lancr-main-header">
      <p className="ml-12 text-4xl font-inter font-bold text-purple-600">Lancr</p>
      <div className="flex mr-10 items-center w-fit gap-8 justify-between">
        <Link className="lancr-view-site-btn hov-standrd" href="../../../username/tplatesite" target="_blank" rel="noopener noreferrer"><Globe /> View My Site</Link>
        <div className="rounded-full py-2 px-4 hover:bg-gray-100 hov-standrd flex items-center gap-2">
          <Image className="img-in-lancr-main-header" src="/DylanHeadshot.png" width={40} height={40} alt="freelancer profile picture"/>
          <p className="text-sm text-gray-500">@Dylan2212</p>
          <ChevronDown />
        </div>
      </div>
    </header>
  )
}