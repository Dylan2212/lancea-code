import TitleInput from "./titleInput";
import { SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore";

export default function AdditionalLinks () {
  const store = useAdditionalLinksStore(state => state)
  const [maxLinks, setMaxLinks] = useState(Boolean)

  function checkUrlFilled () {
    if (links.length === 0) return true

    const last = links[links.length - 1]

    const filledTitle = last.link_title?.trim() || ""
    const filledUrl = last.url?.trim() || ""
    
    if (!filledTitle || !filledUrl) {
      toast.error("Oops! Finish filling out the current link before adding a new one.")
      return false
    }
    return true
  }
  
  function addAdditionalLink () {
    if (!checkUrlFilled()) return
    if (links.length === 4) setMaxLinks(true)
    setLinks([...links, newLink])
  }

  function deleteLink(index: number) {
    const updated = [...links]
    updated.splice(index, 1)

    setLinks(updated)
  }

  if (!store) return null

  const { links, updateLink, setLinks } = store

  const newLink = {
    id: crypto.randomUUID(),
    link_title: "",
    url: "",
  }


  return (
      <div className="w-3/4 mx-auto mt-10">
        <section className="lancr-add-edit-sect box-support">
            <p className="lancr-add-edit-sect-ttle">Additional Links</p>
            <p className="text-sm text-gray-500">Add up to 5 additional links.</p>
            {links.map((link, index) => {
              return (
              <div key={link.id} className="flex items-center">
                <div className="grid grid-cols-2 flex-1">
                  <TitleInput required={true} previewText="Display text" value={link.link_title} inputName="link-title" type="text" maxChar={80} displayMaxChar={true} handleChange={(e) => updateLink(link.id, {link_title: e.target.value})} labelTitle="Title"/>
                  <TitleInput required={true} previewText="https://example.com" value={link.url} inputName="link" type="url" maxChar={2048} displayMaxChar={false} handleChange={(e) => updateLink(link.id, {url: e.target.value})} labelTitle="Url"/>
                </div>
                <Trash2 onClick={() => deleteLink(index)} className="w-12 h-6 mt-6 mb-3 cursor-pointer hov-standrd hover:text-red-600" />
              </div>
            )})}
            {!maxLinks && <button type="button" className="px-6 py-4 border border-black rounded-md shadow-lg ml-2 flex justify-around gap-3 mb-4 hov-standrd hover:bg-gray-100 mt-4" onClick={addAdditionalLink}>
              <SquarePlus />
              Add link
            </button>}
        </section>
      </div>
  )
}