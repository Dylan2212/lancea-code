import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useEffect, useState } from "react"
import { useTestimonialsStore } from "@/lib/store/testimonials/useTestimonialsStore"
import { userTestimonialsCaller } from "@/lib/api/testimonials/userTestimonialsCaller"
import type { TestimonialData, DeleteObj } from "@/src/types"
import { deleteTestimonialCaller } from "@/lib/api/testimonials/deleteTestimonialCaller"

type TestimonialManagerReturn = {
  testimonials: TestimonialData[],
  loading: boolean,
  setShowDeleteModal: React.Dispatch<React.SetStateAction<DeleteObj>>,
  showDeleteModal: DeleteObj,
  deleting: boolean,
  deleteTestimonial: () => void
}

export default function useTestimonialManager (): TestimonialManagerReturn {
  const [loading, setLoading] = useState<boolean>(true)
  const testimonials = useTestimonialsStore(state => state.testimonials)
  const setTestimonials = useTestimonialsStore(state => state.setTestimonials)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<DeleteObj>({ id: "", index: -1, show: false })


    useEffect(() => {
      if (!useOriginalUserStore.getState().userId) return
  
      if (testimonials.length > 0) {
        setLoading(false)
        return
      }
  
      let cancelled = false
  
      const fetchData = async () => {
        const data = await userTestimonialsCaller()
        if (!cancelled) {
          setTestimonials(data)
          setLoading(false)
        }
      }
  
      fetchData()
  
      return () => {
        cancelled = true
      }
    
    }, [testimonials.length, setTestimonials])

    async function deleteTestimonial () {
      setDeleting(true)
  
      try {
        await deleteTestimonialCaller(showDeleteModal.id)
        
        const updated = testimonials.filter((_, i) => i !== showDeleteModal.index)
        setTestimonials(updated)
  
      } finally {
        setDeleting(false)
      }
    }

  return { loading, testimonials, deleting, deleteTestimonial, setShowDeleteModal, showDeleteModal }
}