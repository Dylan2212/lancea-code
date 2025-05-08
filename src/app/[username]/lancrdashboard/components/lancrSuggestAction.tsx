import Link from "next/link"
import { IdCard } from "lucide-react"

export default function LancrSuggestedAction () {
  return (
    <div className="box-main w-80 h-40 grid">
      <div className="flex items-center mt-2 ml-5 gap-5">
        <IdCard className="scale-150" />
        <p className="font-semibold">Add About Section</p>
      </div>
      <p className="mt-2 ml-5 text-gray-700">Tell clients what you do and what makes you unique.</p>
      <div className="w-full flex justify-end">
        <Link className="bg-purple-600 h-fit text-white rounded-sm py-2 px-4 mr-5 hov-standrd hover:bg-purple-500" href="/">Add Now</Link>
      </div>
    </div>
  )
}