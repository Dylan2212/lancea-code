import { useState } from "react"
import { updateServiceCaller } from "@/lib/api/services/updateServiceCaller"
import { saveServiceToStore } from "@/src/application/services/saveServiceToStore"
import { useServicesStore } from "@/lib/store/services/useServicesStore"
import { v4 as uuid } from "uuid";

export type ServiceEditorReturn = {
  title: string,
  price: string,
  description: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setPrice: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  saving: boolean,
  saveService: (index: number|null) => Promise<void>
}

export function useServiceEditor (idx: number|null): ServiceEditorReturn {
  const { services } = useServicesStore()
  const edit = idx !== null && idx > -1
  const [title, setTitle] = useState<string>(edit ? services[idx].title : "")
  const [price, setPrice] = useState<string>(edit ? services[idx].price : "")
  const [description, setDescription] = useState<string>(edit ? services[idx].description : "")
  const [saving, setSaving] = useState<boolean>(false)

  async function saveService (index: number|null) {
    setSaving(true)

    const currServiceData = {
      title,
      price,
      description
    }

    const id = index !== null && index > -1 ? services[index].id : uuid()

    try {
      const serviceId = saveServiceToStore(index, services, { ...currServiceData, id })

      await updateServiceCaller({ id: serviceId, ...currServiceData})
    } finally {
      setSaving(false)
    }
  }

  return { title, price, description, setTitle, setPrice, setDescription, saveService, saving }
}