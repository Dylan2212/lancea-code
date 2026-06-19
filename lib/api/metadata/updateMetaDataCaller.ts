import type { Metadata } from "@/src/types";

export async function updateMetaDataCaller (data: Partial<Metadata>): Promise<{ ok: boolean }> {
  const res = fetch("/api/metadata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  })

  return await((await res).json())
}