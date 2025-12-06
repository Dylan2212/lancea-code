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
}