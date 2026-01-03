type InputProps = {
  onFocus: () => void,
  onBlur: () => void,
  input: string,
  newInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  isFocused: boolean,
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  results: string[],
  suggestedIndex: number
}

export default function SkillsInput ({ onFocus, onBlur, onKeyDown, newInput, isFocused, suggestedIndex, results, input }: InputProps) {
  return (
    <div className={`flex items-center gap-3 relative`}>
      <div className="relative w-[85%]">
        <input
          type="text"
          placeholder="Web design"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={newInput}
          onKeyDown={(e) => onKeyDown(e)}
          value={input}
          style={{
          backgroundColor: "transparent",
        }}
          className={`w-full rounded-xl relative z-20 ring-1 ring-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-[#E9D5FF] focus:ring-2 focus:outline-none transition`}
        />
        {input && isFocused && results[0] && (
          <span className="absolute left-4 top-[12px] text-gray-300 pointer-events-none">
            {suggestedIndex > -1 ? results[suggestedIndex] : results[0]}
          </span>
        )}
      </div>
      
        <button
        type="button"
        className={`
          relative rounded-lg py-3 px-4 text-[#7E22CE] border-2 border-[#7E22CE] 
          font-semibold shadow-md bg-white transition-all duration-200 ease-in-out hover:bg-gray-100
        `}
      >
        Add
      </button>
    </div>
  )
}