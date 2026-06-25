import type { Metadata } from "@/src/types";

export async function updateMetaDataCaller (data: FormData): Promise<{ ok: boolean }> {
  const res = fetch("/api/metadata", {
    method: "POST",
    body: data
  })

  return await((await res).json())
}