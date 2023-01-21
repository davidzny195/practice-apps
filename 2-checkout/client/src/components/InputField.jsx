import React from 'react'

const InputField = ({ name, value, errors, handleInput }) => {
  return (
    <div>
      <label>
      {name}:
      <input name={name} type="text" onChange={handleInput} value={value} />
      </label>
      <span className="errorMessage">{errors[name]}</span>
    </div>
  )
}

export default InputField