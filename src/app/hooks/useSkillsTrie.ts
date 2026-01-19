import { useEffect, useState } from "react"
import { Trie } from "@/utils/trie"
import { getPredefinedSkillsClient } from "@/src/dal/predefinedSkills"
import { supabase } from "@/lib/supabaseClient"

export default function useSkillsTrie (): { loading: boolean, skillsTrie: Trie | undefined } {
  const [loading, setLoading] = useState<boolean>(true)
  const [skillsTrie, setSkillsTrie] = useState<Trie>()

  useEffect(() => {
    let mounted = true

    const fetchSkills = async () => {
      const skills = await getPredefinedSkillsClient(supabase)
      const t = new Trie()
      t.insertMany(skills)

      if (mounted) {
        setSkillsTrie(t)
        setLoading(false)
      }
    }

    fetchSkills()

    return () => {
      mounted = false
    }
  }, [])

  return { loading, skillsTrie }
}