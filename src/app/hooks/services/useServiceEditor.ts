import { useState } from "react"
import { updateServiceCaller } from "@/lib/api/services/updateServiceCaller"
import { saveServiceToStore } from "@/src/application/services/saveServiceToStore"
import { useServicesStore } from "@/lib/store/services/useServicesStore"

export type ServiceEditorReturn = {
  title: string,
  price: string,
  description: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setPrice: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  saving: boolean,
  saveService: (title: string, price: string, description: string, index: number|null) => Promise<void>
}

export function useServiceEditor (): ServiceEditorReturn {
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [saving, setSaving] = useState<boolean>(false)
  const { services } = useServicesStore()

  const currServiceData = {
    title,
    price,
    description
  }

  async function saveService (title: string, price: string, description: string, index: number|null) {
    setSaving(true)
    const serviceId = saveServiceToStore(index, services, currServiceData)

    updateServiceCaller({ id: serviceId, ...currServiceData})
  }

  return { title, price, description, setTitle, setPrice, setDescription, saveService, saving }
}