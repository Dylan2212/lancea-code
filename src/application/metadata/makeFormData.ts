import type { Metadata } from "@/src/types";

export function makeFormData (metadata: Partial<Metadata>): FormData {
  const form = new FormData() 

  form.append("file", metadata.ogImageFile as File)  

  for (const [key, value] of Object.entries(metadata)) {
    if (typeof value === "object") {
      form.append(key, JSON.stringify(value))
    } else {
      form.append(key, String(value))
    }
  }

  return form
}
