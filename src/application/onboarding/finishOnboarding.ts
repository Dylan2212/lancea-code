import { updateOnboardingInfo } from "@/src/dal/users/updateOnboardingInfo"
import { updateOnboardingStoreData } from "./updateOnboardingStoreData"
import { resetSyncStores } from "./resetSyncStores"
import { redirectChannel } from "@/lib/broadcast/broadcastChannel"

export async function finishOnboarding (userId: string, isLive: boolean, handle: string) {

  const data = await updateOnboardingInfo(userId, isLive)
  updateOnboardingStoreData(data)
  resetSyncStores()

  redirectChannel.postMessage({
    type: "REDIRECT",
    url: `${window.origin}/${handle}`
  })
}