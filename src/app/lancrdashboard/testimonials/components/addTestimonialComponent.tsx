"use client"

import { useRouter } from "next/navigation"
import AddEditTestimonial from "./addEditTestimonial"
import { useTestimonialEditor } from "@/src/app/hooks/testimonials/useTestimonialEditor"

type AddTestimonialComponentProps = {
  index: number|null,
  action: string
}
export default function AddTestimonialComponent ({ action, index }: AddTestimonialComponentProps) {
  const testimonialEditor = useTestimonialEditor(index)
  const { saving, saveTestimonial } = testimonialEditor
  const router = useRouter()
  
  return (
    <section className="pt-16 w-screen lg:w-full">
      <div>
        <div>
          <h1 className="text-2xl font-semibold m-5 mb-0">{action} Testimonial</h1>
          <h2 className="ml-5 text-sm max-w-[75%]">Use the fields below to {action === "Add" ? "create" : "edit"} your testimonial</h2>
        </div>
      </div>
      <form className="flex flex-col justify-center items-center py-12 w-fit px-10" onSubmit={(e) => {
        e.preventDefault()
        saveTestimonial(index)
        router.push("/lancrdashboard/testimonials")
      }}>
        <AddEditTestimonial testimonialEditor={testimonialEditor}/>
        <div className="flex justify-end pt-12 w-full gap-5">
          <button onClick={() => router.back()} className="py-2 px-4 rounded-lg bg-gray-200 text-black hover:text-red-600 hov-standrd">Cancel</button>
          <button type="submit" className="py-2 px-4 text-white hover:bg-[#6B21A8] hov-standrd bg-[#7E22CE] rounded-lg hov-standrd">
            {action !== "Edit" ? (saving ? "Adding..." : "Add Service") : (saving ? "Saving..." : "Save Changes")}
          </button>
        </div>
      </form>
    </section>
  )
}