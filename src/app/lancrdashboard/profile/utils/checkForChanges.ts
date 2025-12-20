import { useAdditionalLinksStore } from "@/lib/store/useAdditionalLinksStore"
import { useUserStore } from "@/lib/store/useUserStore"
export function checkForChanges () {
  const { bio, username, title, handle, changedProfileImage, socialLinks, userId } = useUserStore.getState()
  const additionalLinks = useAdditionalLinksStore.getState().links
  const changedBio = checkObjChanges({ bio, username, title, handle }, originalUserData)
  const changedSocialLinks = checkObjChanges(socialLinks, originalSocialLinks)
  const changedAdditionalLinks = checkAdditionalLinksChanges(additionalLinks, originalAdditionalLinks, userId)
}