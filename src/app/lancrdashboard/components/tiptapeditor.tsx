'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect } from 'react'
import { Italic } from 'lucide-react'
import CharacterCount from '@tiptap/extension-character-count'
import { CharacterCountLimit } from '../tiptap/characterLimit'
import { useUserStore } from '@/lib/store/useUserStore'
import { useOriginalUserStore } from '@/lib/store/useOriginalUser'

export default function RichTextEditor() {
  const [color, setColor] = useState('#000000')
  const [editorStateUpdate, setEditorStateUpdate] = useState(0)
  const setBio = useUserStore(state => state.setBio)
  const bio = useOriginalUserStore(state => state.bio)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      CharacterCountLimit.configure({limit: 600}),
      CharacterCount.configure({
        limit: 600,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your text here...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
    ],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setBio(editor.getHTML())
    },
    content: bio
  })

  useEffect(() => {
    if (!editor) return

    const forceRerender = () => {
      setEditorStateUpdate((prev) => prev + 1)
    }

    editor.on('selectionUpdate', forceRerender)
    editor.on('transaction', forceRerender)

    if (editorStateUpdate === -1000) return
    return () => {
      editor.off('selectionUpdate', forceRerender)
      editor.off('transaction', forceRerender)
    }
  }, [editor, editorStateUpdate])

  if (!editor) return null

  const characterCount = editor?.storage.characterCount.characters()

  return (
    <>
      <div className="relative border border-gray-300 rounded-lg mt-1 shadow-sm p-4 bg-white w-11/12 lg:w-5/6">
        <div className="relative">
          <EditorContent
            editor={editor}
            className={`ProseMirror focus:outline-none min-h-[150px] p-4 pt-0 ${
              editor.isEmpty ? 'is-editor-empty' : ''
            } ${editor.isFocused ? 'is-editor-focus' : ''}`}
            data-placeholder="Start writing your text here..."
          />
        </div>

        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`text-sm h-8 w-8 flex justify-center items-center rounded border ${
              editor.isActive('bold') ? 'bg-purple-100 text-gray-700' : 'bg-white text-gray-700'
            }`}
          >
            <b>B</b>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`text-sm h-8 w-8 flex justify-center items-center rounded border ${
              editor.isActive('italic') ? 'bg-purple-100 text-gray-700' : 'bg-white text-gray-700'
            } italic`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="relative w-6 h-6">
            <input
              type="color"
              value={color}
              onChange={(e) => {
                const value = e.target.value
                setColor(value)
                editor.chain().focus().setColor(value).run()
              }}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              title="Text color"
            />
            <div
              className="w-full h-full rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
        <p className={`max-characters text-end w-full ${characterCount >= 600 && "text-red-600"}`}>{`Max: ${characterCount}/600 characters`}</p>
      </div>
    </>
  )
}