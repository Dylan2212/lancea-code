import type { ServicesData } from "@/src/types"

export async function userServicesCaller (): Promise<ServicesData[]> {
  return (await fetch("/api/services")).json()
}