import isValidHandle from "@/lib/isValidHandle"

describe("Input rejects invalid input characters", () => {
  const validHandles = [
    "dylan-",
    "-dylan?",
    "dylan_ander/",
    "lancrly+",
    "-"
  ]
  test.each(validHandles)("Accepts '%s'", (handle) => {
    expect(isValidHandle(handle)).toBe(false)
  })
})

describe("Accepts valid characters", () => {
  const validHandles = [
    "dylan",
    "dylan",
    "dylan_ander",
    "lanc-rly",
    "a._-a"
  ]
  test.each(validHandles)("Accepts '%s'", (handle) => {
    expect(isValidHandle(handle)).toBe(true)
  })
})