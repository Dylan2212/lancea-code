export const reservedHandles = new Set(
  ["admin", "api", "login", "signup", "logout", "settings"]
)

export default function reservedHandle (handle: string): boolean {
  if (reservedHandles.has(handle.toLowerCase())) {
    return false
  }

  return handle.length > 0 && handle.length <= 30 && !handle.includes(" ")
}