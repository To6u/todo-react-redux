import React from 'react'
import './textarea.sass'

interface TextareaProps {
  id?: string
  label?: string
  value: any
  name?: string
  textareaRef?: any
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
  onKeyPress?(event: React.KeyboardEvent): void
}

export const Textarea: React.FC<TextareaProps> = ({id, label, value, name, textareaRef, onChange, onKeyPress}) => {
  return (
    <div className="form-group">
      { label
        ? <label className='font-weight-lighter' htmlFor={id}>{label}</label>
        : null
      }
      <textarea
        ref={textareaRef}
        className="form-control"
        value={value}
        name={name}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
