import { useState } from "react";

type ShowMoreReturn = {
  isExpanded: boolean,
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  body: string,
  isLong: boolean
}

export function useShowMore (previewLength: number, text: string): ShowMoreReturn {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const isLong: boolean = text.length > previewLength 

  const body = isExpanded ? text :
    text.length > previewLength ? text.slice(0, previewLength) + "..." :
      text
  
  return { isExpanded, setIsExpanded, body, isLong }
}