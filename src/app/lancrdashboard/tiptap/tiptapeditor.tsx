'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { TextStyle } from '@tiptap/extension-text-style'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { ListKit } from '@tiptap/extension-list'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import { useState, useEffect } from 'react'
import CharacterCount from '@tiptap/extension-character-count'
import { useUserStore } from '@/lib/store/useUserStore'
import { useOriginalUserStore } from '@/lib/store/useOriginalUser'
import "./tiptap.css"
import ToolBar from './components/toolbar'

export default function RichTextEditor() {
  const [color, setColor] = useState('#000000')
  const [editorStateUpdate, setEditorStateUpdate] = useState(0)
  const setBio = useUserStore(state => state.setBio)
  const bio = useOriginalUserStore(state => state.bio)

  const editor = useEditor({
    extensions: [
      Document,
      TextStyle,
      Bold,
      Italic,
      Color,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3]
      }),
      ListKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CharacterCount.configure({
        limit: 600,
      }),
      Placeholder.configure({
        placeholder: 'Start writing your text here...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        emptyEditorClass: 'is-editor-empty'
      }),
    ],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setBio(editor.getHTML())
    },
    content: bio
  })

  useEffect(() => {
    if (editor && bio) {
      editor.commands.setContent(bio)
    }
  }, [editor, bio])

  useEffect(() => {
    if (!editor) return

    const forceRerender = () => {
      setEditorStateUpdate((prev) => prev + 1)
    }

    editor.on('selectionUpdate', forceRerender)
    editor.on('transaction', forceRerender)

    return () => {
      editor.off('selectionUpdate', forceRerender)
      editor.off('transaction', forceRerender)
    }
  }, [editor, editorStateUpdate])

  if (!editor) return null

  const characterCount = editor?.storage.characterCount.characters()

  return (
    <>
      <div className="relative ring-1 ring-gray-200 rounded-xl mt-1 pt-4 pb-4 shadow-sm bg-white focus-within:ring-[#E9D5FF] focus-within:ring-2 focus-within:outline-none">
        <div className="relative">
          <EditorContent
            editor={editor}
            className={`ProseMirror focus:outline-none min-h-[150px] p-4 pt-0 ${
              editor.isEmpty ? 'is-editor-empty' : ''
            } ${editor.isFocused ? 'border-green-200' : ''}`}
            data-placeholder="Start writing your text here..."
          />
        </div>
        <ToolBar editor={editor} color={color} setColor={setColor}/>
        <p className={`max-characters text-end pr-5 w-full ${characterCount >= 600 && "text-red-600"}`}>{`Max: ${characterCount}/600 characters`}</p>
      </div>
    </>
  )
}