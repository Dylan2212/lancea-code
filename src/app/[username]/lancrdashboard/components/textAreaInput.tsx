type MyProps = {
  previewText: string
}

export default function TextAreaInput ({ previewText }: MyProps ) {
  return (
    <div className="ml-2 flex flex-col">
      <label className="block text-lg" htmlFor="description-input">Description:</label>
      <textarea name="description-input" id="description-input" className="text-area-lancr-add-edit" placeholder={previewText}></textarea>
      <p className="max-characters">Max: 1,000 characters</p>
    </div>
  )
}