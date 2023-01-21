import React from 'react'
import { useState, useContext } from 'react'
import { FormContext } from './App.jsx'
import validator from 'validator'
import InputField from './InputField.jsx'

const PaymentInfo = () => {
  const [errors, setErrors] = useState({credit: '', expiry: '', CVV: '', billing_zip: ''})
  const { form, setForm } = useContext(FormContext)

  const handleInput = (e) => {
    const { name, value } = e.target
    let error = ''
    if (name === 'credit') error = !validator.isCreditCard(value) ? 'Bad card' : ''
    if (name === 'CVV') error = value.length !== 3 ? 'Bad cvv' : ''
    if (name === 'billing_zip') error =  value.length < 5 ? 'Bad billing' : ''
    if (name === 'expiry') {
      let date = new Date(value)
      error = new Date() < date ? '' : 'Bad date'
    }

    setErrors({ ...errors, [name]: error })
    setForm(prevState => ({ ...prevState, paymentInfo: { ...prevState.paymentInfo, [name]: value }}))
  }

  return (
    <>
      <div>
        PAYMENT INFO
        <form>
        <div className="display-column">
          {Object.entries(Object.values(form)[2]).map((keyVal, idx) => {
            return <div key={idx}>
              <InputField name={keyVal[0]} value={keyVal[1]} type={keyVal[0] === 'expiry' ? 'date' : 'text'} errors={errors} handleInput={handleInput} />
              </div>
          })}
        </div>
        </form>
      </div>
    </>
  )
}

export default PaymentInfo