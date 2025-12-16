export default function isValidHandle (input: string): boolean {
  if (input === "") return true
  const validChars = /^[a-zA-Z0-9._-]+$/
  const invalidEdgeHyphen = /^-|-$/.test(input)
  return validChars.test(input) && !invalidEdgeHyphen
}