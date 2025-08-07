import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

export const CharacterCountLimit = Extension.create({
  name: 'characterCountLimit',

  addOptions() {
    return {
      limit: 280,
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleTextInput: (view, from, to, text) => {
            const currentText = view.state.doc.textContent
            const newLength = currentText.length - (to - from) + text.length

            if (newLength > this.options.limit) {
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})