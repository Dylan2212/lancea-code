import { useState } from "react"
import { saveTestimonialToStore } from "@/src/application/testimonials/saveTestimonialToStore";
import { useTestimonialsStore } from "@/lib/store/testimonials/useTestimonialsStore";
import { v4 as uuid } from "uuid";
import { updateTestimonialCaller } from "@/lib/api/testimonials/updateTestimonialCaller";

export type TestimonialEditorReturn = {
  name: string,
  body: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setBody: React.Dispatch<React.SetStateAction<string>>,
  saving: boolean,
  saveTestimonial: (index: number|null) => Promise<void>
}

export function useTestimonialEditor (idx: number|null): TestimonialEditorReturn {
  const { testimonials } = useTestimonialsStore()
  const edit = idx !== null && idx > -1
  const [name, setName] = useState<string>(edit ? testimonials[idx].name : "")
  const [body, setBody] = useState<string>(edit ? testimonials[idx].body : "")
  const [saving, setSaving] = useState<boolean>(false)

  async function saveTestimonial (index: number|null) {
    setSaving(true)

    const currTestimonial = {
      name,
      body
    }

    const id = index !== null && index > -1 ? testimonials[index].id : uuid()

    try {
      const testimonialId = saveTestimonialToStore(index, testimonials, { ...currTestimonial, id })

      await updateTestimonialCaller({ id: testimonialId, ...currTestimonial})
    } finally {
      setSaving(false)
    }
  }

  return { name, body, setName, setBody, saveTestimonial, saving }
}