import React from 'react'

const InputField = ({ name, value, errors, handleInput, type }) => {

  const fieldMapping = {
    username: 'Username',
    email: 'Email',
    password: 'Password',
    address_line1: 'Address line 1',
    address_line2: 'Address line 2',
    city: 'City',
    state: 'State',
    zip: 'Zip',
    phone_number: 'Phone number',
    credit: 'Credit card',
    expiry: 'Expiry date',
    CVV: 'CVV',
    billing_zip: 'Billing zip code'
  }

  return (
    <div>
      <label>
      {fieldMapping[name]}:
      <input name={name} type={type} onChange={handleInput} value={value} />
      </label>
      <span className="errorMessage">{errors[name]}</span>
    </div>
  )
}

export default InputField