import { normalizeUrl } from "@/utils/normalizeUrl"
import { isSafeLink } from "@/utils/validateLink"
import type { AdditionalLink } from "@/lib/store/useAdditionalLinksStore"

export function checkAdditionalLinksChanges (newLinks: AdditionalLink[], originalLinks: AdditionalLink[], userId: string): AdditionalLink[] {
  const finalLinks: AdditionalLink[] = []
  const originalMap = new Map(originalLinks.map(link => [link.id, link]))

  for (const link of newLinks) {
    const normalizedUrl = normalizeUrl(link.url)
    const normalizedLink = {
      ...link,
      url: normalizedUrl
    }

    if (!normalizedUrl || !checkLink(normalizedUrl)) continue
  
    const original = originalMap.get(link.id)
    
    if (!original) {
      finalLinks.push({
        ...normalizedLink,
        user_id: userId
      })
      continue
    }

    finalLinks.push({
      id: original.id,
      link_title: original.link_title !== normalizedLink.link_title ? normalizedLink.link_title : original.link_title,
      url: original.url !== normalizedLink.url ? normalizedLink.url : original.url,
      user_id: userId
    })
  }

  return finalLinks
}

function checkLink (link: string): boolean {
  return isSafeLink(link).safe
}