import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { FormContext } from './App.jsx'
import validator from 'validator'
import InputField from './InputField.jsx'

const PaymentInfo = () => {
  const [errors, setErrors] = useState({credit: '', expiry: '', CVV: '', billing_zip: ''})
  const [submitError, setSubmitError] = useState(false)
  const { form, setForm, setPage } = useContext(FormContext)

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

  const handleSubmit = () => {
    if (Object.values(errors).some((field) => field !== '') || Object.values(form.paymentInfo).some((field) => !field)) {
      return setSubmitError(true)
    }
    setPage('checkout')
  }


  // Clear errors
  useEffect(() => {
    for (let key in form.paymentInfo) {
      if (!form.paymentInfo[key]) {
        setErrors(prev => ({ ...prev, [key]: '' }))
      }
    }
  }, [form.paymentInfo])

  return (
    <>
      <div>
        PAYMENT INFO
        <div className="display-column">
          {Object.entries(Object.values(form)[2]).map((keyVal, idx) => {
            return <div key={idx}>
              <InputField name={keyVal[0]} value={keyVal[1]} type={keyVal[0] === 'expiry' ? 'date' : 'text'} errors={errors} handleInput={handleInput} />
              </div>
          })}
        </div>
        <button onClick={() => setPage('userInfo')}>Prev</button>
        {submitError && <span className="errorMessage">Form is not completed</span>}
        <div>
          <button onClick={handleSubmit}>Purchase</button>
        </div>
      </div>
    </>
  )
}

export default PaymentInfo