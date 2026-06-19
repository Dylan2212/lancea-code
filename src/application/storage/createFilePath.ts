import { v4 as uuidv4 } from "uuid"

export function createFilePath (userId: string, fileName: string) {
  const extension = fileName.split(".").pop()
  return `${userId}/${uuidv4()}.${extension}`
}