import { Colors } from "@/src/types";

export async function updateColorsCaller (id: string, colors: Colors): Promise<{ ok: boolean }> {
  try {
    fetch(`/api/user/${id}/colors`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ colors })
    })

    return { ok: true }
  } catch {
    return { ok: false }
  }
}