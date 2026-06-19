import type { Metadata, OgData, SearchData } from "@/src/types";

export function separateMetadata (metadata: Metadata): { ogData: OgData, searchData: SearchData } {
  const ogData: OgData = {
    ogTitle: metadata.ogTitle,
    ogDescription: metadata.ogDescription,
    ogImageUrl: metadata.ogImageUrl,
    ogImageFile: metadata.ogImageFile
  }

  const searchData: SearchData = {
    searchTitle: metadata.searchTitle,
    searchDescription: metadata.searchDescription
  }

  return { ogData, searchData }
}