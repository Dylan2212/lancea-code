"use client"
import Modal from "react-modal"
import { useEffect, useState } from "react"
import StarRating from "./rating"
import NumberRating from "./numberRating"
import ContactPermission from "./contactPermission"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabaseClient"

type FeedbackModalProps = {
  onClose: () => void
}

export type FormData = Partial<{
  rating: number,
  like_most: string,
  improve_how: string,
  additional_comment: string,
  recommend_ranking: number,
  email: string
}>

export default function FeedbackModal({ onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState({
    rating: 0,
    like_most: "",
    improve_how: "",
    additional_comment: "",
    recommend_ranking: 0,
    email: ""
  })

  function isFormEmpty(data: FormData) {
    return Object.entries(data).every(([, value]) => {
      if (typeof value === "string") return value.trim() === "";
      if (typeof value === "number") return value === 0;
      return false;
    });
  }

  const onUpdate = <K extends keyof FormData>(name: K, value: FormData[K]) => {
    setFormData(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isFormEmpty(formData)) {
      toast.error("No data added.")
      return
    }
    
    const { error } = await supabase
      .from("feedback")
      .insert([formData])

    if (error) {
      toast.error("Failed to submit form.")
      return
    }
    toast.success("Thanks for your feedback!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 box-border flex items-center justify-center z-50">
      <div className="bg-purple-50 box-border max-h-[750px] min-h-[625px] h-[90dvh] p-6 rounded-lg shadow-md w-11/12 text-center
        lg:w-7/12 lg:max-h[95dvh] lg:min-h-[300px]
      ">
        <h2 className="font-semibold text-2xl">We&apos;d love to hear your feedback</h2>
        <form onSubmit={handleSubmit} className="border box-border overflow-auto mb-2 h-[80%] shadow-lg rounded-xl form-scroll py-5 mt-5 border-gray-600 bg-white
          lg:my-5
        ">
          <StarRating value={formData.rating} onChange={(val: number) => onUpdate("rating", val)} />
          <div className="flex box-border flex-col my-5 items-start mx-auto w-11/12
            lg:w-2/3
          ">
            <label htmlFor="like-most" className="text-lg">What did you like most?</label>
            <textarea onChange={(val: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate("like_most", val.target.value)} className="resize-none box-border border border-gray-500 w-full rounded-lg h-28 pl-3 pt-2 focus:outline-purple-600" name="like-most" id="like-most" placeholder="Start typing..."></textarea>
          </div>
          <div className="flex flex-col my-5 items-start mx-auto w-11/12
            lg:w-2/3
          ">
            <label htmlFor="improve" className="text-lg">How could we improve?</label>
            <textarea onChange={(val: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate("improve_how", val.target.value)} className="resize-none border border-gray-500 w-full rounded-lg h-28 pl-3 pt-2 focus:outline-purple-600" name="improve" id="improve" placeholder="Start typing..."></textarea>
          </div>
          <div className="flex flex-col my-5 items-start mx-auto w-11/12
            lg:w-2/3
          ">
            <label htmlFor="additional" className="text-lg text-start">Any additional comments or suggestions?</label>
            <textarea onChange={(val: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate("additional_comment", val.target.value)} className="resize-none border border-gray-500 w-full rounded-lg h-28 pl-3 pt-2 focus:outline-purple-600" name="additional" id="additional" placeholder="Start typing..."></textarea>
          </div>
          <NumberRating value={formData.recommend_ranking} onChange={(val: number) => onUpdate("recommend_ranking", val)}/>
          <ContactPermission value={formData.email} onChange={(val: string) => onUpdate("email", val)}/>
          <button type="submit" className="hov-standrd w-32 mt-8 hover:bg-purple-500 p-3 shadow-md shadow-gray-400 rounded-full bg-purple-600 text-white">
            Sumbit
          </button>
        </form>
        <button onClick={onClose} className="px-4 w-32 py-2 rounded hov-standrd bg-white hover:bg-gray-100 border border-black">Cancel</button>
      </div>
    </div>
  )
}