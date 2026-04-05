import type { DeleteObj, ServicesData } from "@/src/types"
import { useEffect, useState } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useServicesStore } from "@/lib/store/services/useServicesStore"
import { userServicesCaller } from "@/lib/api/services/userServicesCaller"
import { deleteServiceCaller } from "@/lib/api/services/deleteServiceCaller"


type UseServicesManagerReturn = {
  loading: boolean,
  services: ServicesData[],
  setShowDeleteModal: React.Dispatch<React.SetStateAction<DeleteObj>>,
  deleting: boolean,
  showDeleteModal: DeleteObj,
  deleteService: () => void
}

export default function useServicesManager (): UseServicesManagerReturn {
  const services = useServicesStore(state => state.services)
  const setServices = useServicesStore(state => state.setServices)
  const [loading, setLoading] = useState<boolean>(true)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<DeleteObj>({ id: "", index: -1, show: false })

  useEffect(() => {
    if (!useOriginalUserStore.getState().userId) return

    if (services.length > 0) {
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchData = async () => {
      const data = await userServicesCaller()
      if (!cancelled) {
        setServices(data)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  
  }, [services.length, setServices])

  async function deleteService () {
    setDeleting(true)

    try {
      await deleteServiceCaller(showDeleteModal.id)
      
      const updateArray = services.splice(showDeleteModal.index, 1)
      setServices(updateArray)
    } finally {
      setDeleting(false)
    }
  }

  return { services, loading, deleting, deleteService, showDeleteModal, setShowDeleteModal }
}