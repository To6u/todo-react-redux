import React from 'react'
import './textarea.sass'

export const Textarea = ({id, label, value, name, onChange}) => {
  return (
    <div className="form-group">
      { label
        ? <label className='font-weight-lighter' htmlFor={id}>{label}</label>
        : null
      }
      <textarea
        className="form-control"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  )
}