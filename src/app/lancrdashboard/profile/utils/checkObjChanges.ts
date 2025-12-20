export function checkObjChanges<T extends object> (data: T, originalData: T): Partial<T> {
  const changed: Partial<T> = {}

  for (const key in data) {
    const originalValue = originalData[key as keyof T]
    const newValue = data[key as keyof T]

    if (originalValue !== newValue) {
      changed[key as keyof T] = newValue
    }
  }

  return changed
}