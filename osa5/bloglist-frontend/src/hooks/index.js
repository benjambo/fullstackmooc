import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  const reset = word => {
    setValue(word)
  }

  return {
    type,
    name,
    value,
    onChange,
    reset
  }
}
