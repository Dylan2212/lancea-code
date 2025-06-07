"use client"
import SaveLancrSection from "../components/saveLancrSection";
import TitleInput from "../components/titleInput";
import useInputChangeHandler from "@/src/app/hooks/useInputChangeHandler";
import useSaveData from "@/src/app/hooks/useSaveData";
import { useUserStore } from "@/lib/store/useUserStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LancrSocialLinks () {
  const { saveData } = useSaveData()

  const hydrated = useUserStore(state => state.hasHydrated)
  const userId = useUserStore(state => state.userId)
  const socialLinks = useUserStore(state => state.socialLinks)

  const { values, handleChange, setValues } = useInputChangeHandler({
    x: socialLinks.x,
    medium: socialLinks.medium,
    threads: socialLinks.threads,
    facebook: socialLinks.facebook,
    instagram: socialLinks.instagram
  })
  
  useEffect(() => {
    if (hydrated) {
      setValues({
        x: socialLinks.x,
        medium: socialLinks.medium,
        threads: socialLinks.threads,
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram
      })
    }
  }, [hydrated, socialLinks, setValues])

  if (!hydrated) return null

  function checkForChanges () {
    const startData = JSON.stringify(socialLinks)
    const endData = JSON.stringify(values)
    if (startData === endData) {
      toast.error("No changes to save")
      return false
    }
    return true
  }

  function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (!checkForChanges()) return
    saveData(userId, {"socialLinks": values})
  }

  return (
      <form onSubmit={handleSubmit}>
        <div className="w-3/4 mx-auto mt-10">
          <section className="lancr-add-edit-sect box-support">
            <p className="lancr-add-edit-sect-ttle">Add Social Links</p>
            <p className="text-sm text-gray-500">Add links to your social profiles so potential clients can explore more of your work and connect with you on other platforms.</p>
            <TitleInput labelTitle="Facebook" type="url" previewText="Facebook.com" value={values.facebook} handleChange={handleChange} maxChar={2048} inputName="facebook" displayMaxChar={false}/>
            <TitleInput labelTitle="X" type="url" previewText="X.com" value={values.x} handleChange={handleChange} maxChar={2048} inputName="x" displayMaxChar={false}/>
            <TitleInput labelTitle="Instagram" type="url" previewText="Instagram.com" value={values.instagram} handleChange={handleChange} maxChar={2048} inputName="instagram" displayMaxChar={false}/>
            <TitleInput labelTitle="Medium" type="url" previewText="Medium.com" value={values.medium} handleChange={handleChange} maxChar={2048} inputName="medium" displayMaxChar={false}/>
            <TitleInput labelTitle="Threads" type="url" previewText="Threads.com" value={values.threads} handleChange={handleChange} maxChar={2048} inputName="threads" displayMaxChar={false}/>
            <SaveLancrSection type="submit"/>
          </section>
        </div>
      </form>
  )
}