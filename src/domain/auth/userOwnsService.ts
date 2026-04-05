import { checkServiceUserId } from "@/src/dal/services/checkServiceUserId";

export async function userOwnsService (userId: string, serviceId: string): Promise<{ ok: boolean }> {
  const { data: existing, error: serviceError } = await checkServiceUserId(serviceId)

  if (serviceError) {
    throw new Error("Internal Service Error")
  }
  if (existing && existing.user_id !== userId) return { ok: false }

  return { ok: true }
}