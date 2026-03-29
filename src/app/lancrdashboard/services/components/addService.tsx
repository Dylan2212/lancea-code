import { SquarePlus } from "lucide-react"
import Link from "next/link"

export default function AddService () {
  return (
    <Link href="/lancrdashboard/services/addeditservice?action=Add&idx=null" className="w-[300px] h-[200px] cursor-pointer rounded-2xl bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center gap-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] transition-all ease-in-out duration-200">
      <SquarePlus className="text-gray-700 h-14 w-14"/>
      <p className="text-gray-700 font-medium">Add New Service</p>
    </Link>
  )
}