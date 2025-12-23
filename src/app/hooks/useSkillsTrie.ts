import { useEffect, useState } from "react"
import predefinedSkillNames from "@/src/dal/predefinedSkillNames"
import { Trie } from "@/utils/trie"

export default function useSkillsTrie (): { loading: boolean, skillsTrie: Trie | undefined } {
  const [loading, setLoading] = useState<boolean>(true)
  const [skillsTrie, setSkillsTrie] = useState<Trie>()

  useEffect(() => {
    let mounted = true

    const fetchSkills = async () => {
      const skills = await predefinedSkillNames()

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