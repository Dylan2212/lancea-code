type MyProps = {
  type: string,
  previewText: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  inputName: string
  maxChar: number,
  value: string,
  displayMaxChar: boolean,
  labelTitle: string
}

export default function TitleInput ({ previewText, inputName, displayMaxChar, handleChange, value, maxChar, type, labelTitle }: MyProps) {
  
  const isMaxCharacters = maxChar <= value.length

  return (
    <div className="mt-6 mb-3 ml-2">
      <label className="block text-lg" htmlFor="title-input">{labelTitle}:</label>
      <input className="lancr-add-edit-text-input" name={inputName} type={type} id="title-input" maxLength={maxChar} value={value} placeholder={previewText} onChange={handleChange} />
      {displayMaxChar && <p className={`max-characters ${isMaxCharacters && "text-red-600"}`}>Max: {value.length}/{maxChar} characters</p>}
    </div>
  )
}