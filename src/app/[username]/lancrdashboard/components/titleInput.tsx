type MyProps = {
  previewText: string
}

export default function TitleInput ({ previewText }: MyProps) {
  return (
    <div className="mt-6 mb-3 ml-2">
      <label className="block text-lg" htmlFor="title-input">Title:</label>
      <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder={previewText} />
      <p className="max-characters">Max: 100 characters</p>
    </div>
  )
}