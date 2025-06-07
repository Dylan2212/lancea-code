import { useState } from "react"

export default function useInputChangeHandler <T extends Record <string, string>> (initialValues: T) {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return {values, handleChange, setValues}
}