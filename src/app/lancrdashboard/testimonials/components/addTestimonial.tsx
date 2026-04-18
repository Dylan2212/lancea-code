import { SquarePlus } from "lucide-react"
import Link from "next/link"

export default function AddTestimonial () {
  return (
    <Link href="/lancrdashboard/testimonials/addedittestimonial?action=Add&idx=null" className="w-[325px] h-[225px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-6 transition-all hover:shadow-[0_12px_40px_rgba(126,34,206,0.15)] hover:bg-white/70 ease-in-out duration-200 items-center justify-center">
      <SquarePlus className="text-gray-700 h-14 w-14"/>
      <p className="text-gray-700 font-medium">Add New Testimonial</p>
    </Link>
  )
}