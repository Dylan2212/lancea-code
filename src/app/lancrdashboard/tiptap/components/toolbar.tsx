import { Italic as ItalicIcon, ChevronDown, ChevronUp } from 'lucide-react'
import type { Editor } from '@tiptap/react'

type ToolBarProps = {
  editor: Editor,
  color: string,
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export default function ToolBar ({ editor, color, setColor }: ToolBarProps) {
  const buttonClass = "text-sm h-8 w-8 flex justify-center items-center rounded-md shadow-sm border"
  return (
    <div className="absolute bottom-2 left-2 flex items-center gap-2">
      <div className="relative group">
        <select
          id='editor-heading-selector'
          defaultValue={6}
          onChange={(e) => {
            const level = Number(e.target.value) as |1|2|3|6
            editor.commands.toggleHeading({ level })
            document.getElementById("editor-heading-selector")?.blur()
          }}
          onMouseDown={(e) => {
            const select = e.currentTarget;
            if (select === document.activeElement) {
              e.preventDefault(); // stop native toggle moment
              select.blur();
              return;
            }
          }}
          className="appearance-none text-sm h-8 pl-3 pr-8 rounded-md shadow-sm border bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#E9D5FF] transition cursor-pointer"
        >
          <option value={1}>Heading 1</option>
          <option value={2}>Heading 2</option>
          <option value={3}>Heading 3</option>
          <option value={6}>Normal</option>
        </select>
        <ChevronDown className='pointer-events-none absolute inset-y-0 right-2 flex items-center my-auto opacity-100 transition-all duration-100 group-focus-within:opacity-0' />
        <ChevronUp className='pointer-events-none absolute inset-y-0 right-2 flex items-center my-auto opacity-0 transition-all duration-100 group-focus-within:opacity-100' />
      </div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${buttonClass} ${
          editor.isActive('bold') ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-700'
        }`}
      >
        <b>B</b>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${buttonClass} ${
          editor.isActive('italic') ? 'bg-gray-100 text-gray-700' : 'bg-white text-gray-700'
        }`}
      >
        <ItalicIcon className="w-4 h-4" />
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
  )
}