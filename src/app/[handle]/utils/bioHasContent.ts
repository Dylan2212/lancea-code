export function bioHasContent(bio?: string) {
  if (!bio) return false

  const text = bio.replace(/<[^>]*>/g, "").trim()

  return text.length !== 0
}