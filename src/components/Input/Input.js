import React from 'react'

export const Input = ({value, name, id, label, onChange}) => {
  return (
    <div className="form-group">
      { label
        ? <label className='font-weight-lighter' htmlFor={id}>{label}</label>
        : null
      }
      <input
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