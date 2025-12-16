import reservedHandle, { reservedHandles } from "@/lib/reservedHandle"

describe("Blocks reserved handles", () => {
  test.each([...reservedHandles, "ADMIN", "LoGiN"])("rejects '%s'", (handle) => {
    expect(reservedHandle(handle)).toBe(false)
  })
})

describe("Accepts unblocked handles", () => {
  const validHandles = [
    "dylan",
    "dylan123",
    "dylan_anderson",
    "lancrly",
    "user-name",
    "a",
    "a".repeat(30),
  ]

  test.each(validHandles)("Accepts '%s'", (handle) => {
    expect(reservedHandle(handle)).toBe(true)
  })
})