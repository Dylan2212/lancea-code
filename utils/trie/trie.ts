class TrieNode {
  children: Record<string, TrieNode>
  isEnd: boolean

  constructor () {
    this.children = {}
    this.isEnd = false
  }
}

export class Trie {
  private root: TrieNode

  constructor () {
    this.root = new TrieNode()
  }

  insert (word: string): void {
    let node = this.root

    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode
      }
      node = node.children[char]
    }
    node.isEnd = true
  }

  insertMany (words: string[]): void {
    for (const word of words) {
      this.insert(word)
    }
  }

  search (prefix: string): string[] {
    let node = this.root
    const results: string[] = []

    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) return []
      node = node.children[char]
    }

    this.collectWords(prefix.toLowerCase(), node, results)
    return results
  }

  private collectWords (prefix: string, node: TrieNode, results: string[]) {
    const queue: Array<{ prefix: string, node: TrieNode }> = [
      { prefix, node }
    ]

    while (queue.length > 0 && results.length < 6) {
      const current = queue.shift()
      if (current?.node.isEnd) {
        results.push(current.prefix)
        if (results.length === 6) return
      }

      const kids = current?.node.children
      if (!kids) continue
      
      Object.keys(kids).forEach((kid) => queue.push({ prefix: current.prefix + kid, node: kids[kid] }))
    }
  }
}