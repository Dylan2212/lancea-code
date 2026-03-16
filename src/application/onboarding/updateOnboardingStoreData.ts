import { OnboardingCompletionData } from "@/src/types";
import { useOriginalUserStore } from "@/lib/store/useOriginalUser";

export function updateOnboardingStoreData (data: OnboardingCompletionData) {
  useOriginalUserStore.setState((state) => ({
    ...state,
    has_seen_onboarding: data.has_seen_onboarding,
    isLive: data.is_live,
    redirect: `${window.origin}`
  }))
}