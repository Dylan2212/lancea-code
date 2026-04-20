import type { TestimonialEditorReturn } from "@/src/app/hooks/testimonials/useTestimonialEditor"
import { useAutosizeTextArea } from "@/src/app/hooks/useAutoSizeTextArea"

type AddEditTestimonialProps = {
  testimonialEditor: TestimonialEditorReturn
}

export default function AddEditTestimonial ({ testimonialEditor }: AddEditTestimonialProps) {
  const { setName, setBody, body, name } = testimonialEditor
  const textAreaRef = useAutosizeTextArea(body)

  return (
    <div className="w-[325px] flex items-center justify-center bg-white/60 backdrop-blur-xl rounded-2xl min-h-[225px] border border-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="relative w-fit mx-auto px-8 py-4">
        <span className="absolute top-3 left-0 text-6xl text-gray-300 select-none leading-none">
          “
        </span>

        <span className="absolute top-3 right-0 text-6xl text-gray-300 select-none leading-none">
          ”
        </span>

        <textarea ref={textAreaRef} required value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add testimonial" className="text-lg resize-none p-1 block text-gray-800 mx-auto italic text-center relative z-10 rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF]"/>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
          <span>—</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            placeholder="Client name"
            className="text-center bg-transparent outline-none rounded-sm hover:bg-gray-50 focus:outline-[#E9D5FF]"
          />
        </div>
      </div>
    </div>
  )
}