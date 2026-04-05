"use client"

import AddServiceCard from "./addServiceCard"
import { useServiceEditor } from "@/src/app/hooks/services/useServiceEditor"
import { useRouter } from "next/navigation"


type AddServiceComponentProps = {
  index: number|null,
  action: string
}
export default function AddServiceComponent ({ action, index }: AddServiceComponentProps) {
  const serviceEditor = useServiceEditor()
  const { saving, saveService } = serviceEditor
  const router = useRouter()
  
  return (
    <section className="pt-16 w-screen lg:w-full">
      <div>
        <div>
          <h1 className="text-2xl font-semibold m-5 mb-0">{action} Service</h1>
          <h2 className="ml-5 text-sm max-w-[75%]">Use the fields below to {action === "Add" ? "create" : "edit"} your service</h2>
        </div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        saveService(index)
        router.push("/lancrdashboard/services")
      }}>
        {action === "Add" && <AddServiceCard serviceEditor={serviceEditor}/>}
        <button type="submit" className="rounded-md bg-purple-600 text-white hover:bg-purple-500 hov-standrd w-fit text-lg px-6 py-2 mr-6 lg:mr-0">
          {action !== "Edit" ? (saving ? "Adding..." : "Add Service") : (saving ? "Saving..." : "Save Changes")}
        </button>
      </form>
    </section>
  )
}