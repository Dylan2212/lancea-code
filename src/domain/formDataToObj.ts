export function formDataToObject(fd: FormData) {
  const obj: Record<string, any> = {}

  for (const [key, value] of fd.entries()) {
    try {
      obj[key] = JSON.parse(value as string)
    } catch {
      obj[key] = value
    }
  }

  return obj
}