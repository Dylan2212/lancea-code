import type { OnboardingCompletionData } from "@/src/types";
import { supabase } from "@/lib/supabaseClient";

export async function updateOnboardingInfo (userId: string, isLive: boolean): Promise<OnboardingCompletionData> {
  const { data, error } = await supabase
    .from("users")
    .update({"has_seen_onboarding": true, "is_live": isLive})
    .eq("id", userId)
    .select()
    .single()

  if (error) throw new Error(`Failed to update onboarding data: ${error.message}`)

  return data
}