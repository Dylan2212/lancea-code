import { useState } from "react";
import { updateColorsCaller } from "@/lib/api/user/updateColorsCaller";
import { useOriginalUserStore } from "@/lib/store/useOriginalUser";
import { brandColors } from "@/src/businessRules";

export function useColorManager () {
  const startMain = useOriginalUserStore(state => state.colors.main)
  const startHover = useOriginalUserStore(state => state.colors.hover)
  const startAccent = useOriginalUserStore(state => state.colors.accent)
  const [main, setMain] = useState<string>(startMain)
  const [accent, setAccent] = useState<string>(startAccent)
  const [hover, setHover] = useState<string>(startHover)
  const userId = useOriginalUserStore(state => state.userId)

  async function saveColors (): Promise<{ ok: boolean }> {
    try {
      await updateColorsCaller(userId, { main, hover, accent })

      useOriginalUserStore.setState(() => ({
        colors: { main, hover, accent }
      }))

      return { ok: true }
    } catch {
      return { ok: false }
    }
  }

  async function returnToDefault () {
    await updateColorsCaller(userId, { main: brandColors.main, hover: brandColors.hover, accent: brandColors.accent })

    useOriginalUserStore.setState(() => ({
      colors: { main: brandColors.main, hover: brandColors.hover, accent: brandColors.accent }
    }))

    setMain(brandColors.main)
    setHover(brandColors.hover)
    setAccent(brandColors.accent)
  }

  return { setMain, setAccent, setHover, hover, main, accent, saveColors, returnToDefault }
}