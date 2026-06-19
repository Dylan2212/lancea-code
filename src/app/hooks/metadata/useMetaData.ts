import { useOriginalUserStore } from "@/lib/store/useOriginalUser";
import { useEffect, useState } from "react";
import { fetchMetaDataCaller } from "@/lib/api/metadata/fetchMetaDataCaller";
import { useMetadataStore } from "@/lib/store/metadata/useMetadataStore";
import { separateMetadata } from "@/src/application/metadata/separateMetadata";
import { OgData, SearchData, Metadata } from "@/src/types";
import { updateMetaDataCaller } from "@/lib/api/metadata/updateMetaDataCaller";

export function useMetaDataManager () {
  const [ogMetaData, setOgMetaData] = useState<OgData>({
    ogTitle: "Add Your Title",
    ogDescription: "Add your description",
    ogImageUrl: "/lancrly.png",
    ogImageFile: null
  })
  const [searchMetaData, setSearchMetaData] = useState<SearchData>({
    searchTitle: "Your Portfolio Title",
    searchDescription: "A short description of your portfolio will appear here."
  })

  useEffect(() => {
    if (!useOriginalUserStore.getState().userId) return

    let cancelled = false

    const fetchData = async () => {
      const data = await fetchMetaDataCaller()
      if (!cancelled) {
        useMetadataStore.setState(data)
        const { ogData, searchData } = separateMetadata(data)
        setOgMetaData(ogData)
        setSearchMetaData(searchData)
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

  async function saveMetaData (updatedMetaData: Partial<Metadata>) {
    await updateMetaDataCaller(updatedMetaData)
  }

  return { ogMetaData, searchMetaData, setOgMetaData, setSearchMetaData, saveMetaData, handleFileChange }
}