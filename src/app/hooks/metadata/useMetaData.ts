import { useOriginalUserStore } from "@/lib/store/useOriginalUser";
import { useEffect, useState } from "react";
import { fetchMetaDataCaller } from "@/lib/api/metadata/fetchMetaDataCaller";
import { useMetadataStore } from "@/lib/store/metadata/useMetadataStore";
import { separateMetadata } from "@/src/application/metadata/separateMetadata";
import { OgData, SearchData, Metadata } from "@/src/types";
import { updateMetaDataCaller } from "@/lib/api/metadata/updateMetaDataCaller";
import { makeFormData } from "@/src/application/metadata/makeFormData";
import { convertToJpeg } from "@/src/domain/images/convertToJpg";

export function useMetaDataManager () {
  const [ogMetaData, setOgMetaData] = useState<OgData>({
    ogTitle: `${useOriginalUserStore.getState().handle} | Lancrly`,
    ogDescription: `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`,
    ogImageUrl: "/lancrly.png",
    ogImageFile: null
  })
  const [searchMetaData, setSearchMetaData] = useState<SearchData>({
    searchTitle: `${useOriginalUserStore.getState().handle} | Lancrly`,
    searchDescription: `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`
  })

  useEffect(() => {
    if (!useOriginalUserStore.getState().userId) return

    let cancelled = false

    const fetchData = async () => {
      const data = await fetchMetaDataCaller()
      if (!cancelled) {
        useMetadataStore.setState(data)
        const { ogData, searchData } = separateMetadata(data)
        
        setOgMetaData({
          ogTitle: ogData.ogTitle ?? `${useOriginalUserStore.getState().handle} | Lancrly`,
          ogDescription: ogData.ogDescription ?? `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`,
          ogImageUrl: ogData.ogImageUrl ?? "/lancrly.png",
          ogImageFile: null
        })
      
        setSearchMetaData({
          searchTitle: searchData.searchTitle ?? `${useOriginalUserStore.getState().handle} | Lancrly`,
          searchDescription: searchData.searchDescription ?? `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`
        })
      }
    }

    fetchData()

    return () => { cancelled = true }
  }, [])

  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files || !files[0]) return

    URL.revokeObjectURL(ogMetaData.ogImageUrl)
    const url = URL.createObjectURL(files[0])

    setOgMetaData(prev => ({
      ...prev,
      ogImageUrl: url,
      ogImageFile: files[0]
    }))
  }

  async function saveMetaData (): Promise<boolean> {
    try {
      if (ogMetaData.ogImageFile) {
        const fileAsJpeg = await convertToJpeg(ogMetaData.ogImageFile)
        ogMetaData.ogImageFile = fileAsJpeg
      }
      const formData = makeFormData({ ...ogMetaData, ...searchMetaData })
      await updateMetaDataCaller(formData)
      return true
    } catch (error) {
      console.error("Error occurred while saving metadata:", error)
      return false
    }
  }

  async function resetSearchMetaData() {
    try {
      await updateMetaDataCaller(makeFormData({
        ...ogMetaData,
        searchTitle: `${useOriginalUserStore.getState().handle} | Lancrly`,
        searchDescription: `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`
      }))

      setSearchMetaData({
        searchTitle: `${useOriginalUserStore.getState().handle} | Lancrly`,
        searchDescription: `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`
      })
      return true
      } catch (error) {
        console.error("Error occurred while resetting search metadata:", error)
        return false
    }
  }

  async function resetOgMetaData() {
    try {
      await updateMetaDataCaller(makeFormData({
        ...searchMetaData,
        ogTitle: `${useOriginalUserStore.getState().handle} | Lancrly`,
        ogDescription: `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`,
        ogImageUrl: "/lancrly.png"
      }))

      setOgMetaData({
        ogTitle: `${useOriginalUserStore.getState().handle} | Lancrly`,
        ogDescription: `Check out ${useOriginalUserStore.getState().handle}'s profile on Lancrly`,
        ogImageUrl: "/lancrly.png",
        ogImageFile: null
      })
      
      return true
    } catch (error) {
      console.error("Error occurred while resetting OG metadata:", error)
      return false
    }
  }

  return { ogMetaData, searchMetaData, setOgMetaData, setSearchMetaData, saveMetaData, handleFileChange, resetSearchMetaData, resetOgMetaData }
}