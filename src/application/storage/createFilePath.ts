export function createFilePath (userId: string, fileName: string) {
  const extension = fileName.split(".").pop()
  return `${userId}/thumbnail.${extension}`
}