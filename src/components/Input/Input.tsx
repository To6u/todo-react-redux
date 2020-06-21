import React from 'react'

interface InputProps {
  value: string
  name?: string
  id?: string
  label?: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  inputRef?: any
}

export const Input: React.FC<InputProps> = ({value, name, id, label, onChange, inputRef}) => {
  return (
    <div className="form-group">
      { label
        ? <label className='font-weight-lighter' htmlFor={id}>{label}</label>
        : null
      }
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  )
}
