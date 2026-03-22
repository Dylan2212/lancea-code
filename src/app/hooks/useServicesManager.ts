import type { ServicesData } from "@/src/types"
import { useEffect, useState } from "react"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"
import { useServicesStore } from "@/lib/store/services/useServicesStore"
import { userServicesCaller } from "@/lib/api/services/userServicesCaller"


type UseServicesManagerReturn = {
  loading: boolean,
  services: ServicesData[],
  //setShowDeleteModal: React.Dispatch<React.SetStateAction<DeleteObj>>,
  //deleting: boolean,
  //showDeleteModal: DeleteObj,
  //deleteProject: () => void
}

export default function useServicesManager (): UseServicesManagerReturn {
  const services = useServicesStore(state => state.services)
  const setServices = useServicesStore(state => state.setServices)
  const [loading, setLoading] = useState<boolean>(true)

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

  return { services, loading }
}