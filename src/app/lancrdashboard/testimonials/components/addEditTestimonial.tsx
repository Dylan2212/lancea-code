import type { TestimonialEditorReturn } from "@/src/app/hooks/testimonials/useTestimonialEditor"

type AddEditTestimonialProps = {
  testimonialEditor: TestimonialEditorReturn
}

export default function AddEditTestimonial ({ testimonialEditor }: AddEditTestimonialProps) {
  const { setName, setBody, body, name } = testimonialEditor

  return (
    <div className="w-[325px] h-[225px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 flex flex-col gap-6 transition-all hover:shadow-[0_12px_40px_rgba(126,34,206,0.15)] hover:bg-white/70">
      <div className="grid gap-0">
        <input required maxLength={160} type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Add client name" className="font-semibold text-gray-800 text-lg mb-1 pl-1 rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF]"/>
        <input required maxLength={160} type="text" placeholder="Add testimonial" value={body} onChange={(e) => setBody(e.target.value)} className="font-medium text-gray-700 m-0 text-sm pl-1 rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF]"/>
      </div>
    </div>
  )
}