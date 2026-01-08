import { SkillMeta } from "@/src/domain/skills/mergeSkills"

class TrieNode {
  children: Record<string, TrieNode>
  isEnd: string | null

  constructor () {
    this.children = {}
    this.isEnd = null
  }
}

export class Trie {
  private root: TrieNode

  constructor () {
    this.root = new TrieNode()
  }

  insert (skill: {name: string, id: string}): void {
    let node = this.root

    for (const char of skill.name.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode
      }
      node = node.children[char]
    }
    node.isEnd = skill.id
  }

  insertMany (skills: {id: string, normalized_name: string, usage: number}[]): void {
    for (const skill of skills) {
      this.insert({name: skill.normalized_name, id: skill.id})
    }
  }

  search (prefix: string): SkillMeta[] {
    let node = this.root
    const results: SkillMeta[] = []

    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) return []
      node = node.children[char]
    }

    this.collectWords(prefix.toLowerCase(), node, results)
    return results
  }

  private collectWords (prefix: string, node: TrieNode, results: SkillMeta[]) {
    const queue: Array<{ prefix: string, node: TrieNode }> = [
      { prefix, node }
    ]

    while (queue.length > 0 && results.length < 6) {
      const current = queue.shift()
      if (current?.node.isEnd) {
        results.push({type: "predefined", id: current.node.isEnd, name:current.prefix})
        if (results.length === 6) return
      }

      const kids = current?.node.children
      if (!kids) continue
      
      Object.keys(kids).forEach((kid) => queue.push({ prefix: current.prefix + kid, node: kids[kid] }))
    }
  }
}