
export async function userOwnsResource (userId: string, resourceId: string, fetchFn: (id: string) => Promise<{ user_id: string } | null>): Promise<{ ok: boolean }> {
  const resource  = await fetchFn(resourceId)

    if (resource && resource.user_id !== userId) return { ok: false }

  return { ok: true }
}