import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

type MyProps = {
  type: string,
  previewText: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  inputName: string
  maxChar: number,
  value: string | undefined,
  displayMaxChar: boolean,
  labelTitle: string,
  required: boolean,
  loading?: boolean
}

export default function TitleInput ({ previewText, inputName, displayMaxChar, handleChange, value, maxChar, type, labelTitle, required, loading = false }: MyProps) {
  if (value == null) return
  const isMaxCharacters = maxChar <= value.length

  return (
    <div className="mt-6 mb-3 ml-2">
      <label className="block text-lg" htmlFor="title-input">{labelTitle}:{required && <span className="text-red-500">*</span>}</label>

      <div className="relative w-full">
        {loading ? (
          <div className="lancr-add-edit-text-input">
            <Skeleton height={20} width="60%" />
          </div>
        ) : (
          <input
            className="lancr-add-edit-text-input"
            required={required}
            name={inputName}
            type={type}
            id="title-input"
            maxLength={maxChar}
            value={value}
            placeholder={previewText}
            onChange={handleChange}
          />
        )}
      </div>

      {displayMaxChar && (
        <p className={`max-characters ${isMaxCharacters && "text-red-600"}`}>
          Max: {value.length}/{maxChar} characters
        </p>
      )}
    </div>
  )
}