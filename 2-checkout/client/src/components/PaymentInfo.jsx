import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { FormContext } from './App.jsx'
import { handleErrors, clearErrors, formValidator } from '../lib/helpers.js'
import { updateForm } from '../lib/api.js'
import InputField from './InputField.jsx'

const PaymentInfo = () => {
  const [errors, setErrors] = useState({credit: '', expiry: '', CVV: '', billing_zip: ''})
  const [submitError, setSubmitError] = useState(false)
  const { form, setForm, setPage } = useContext(FormContext)

  const handleInput = (e) => {
    setSubmitError(false)
    const res = handleErrors(e)
    setErrors({ ...errors, [res.name]: res.error })
    setForm(prev => ({ ...prev, paymentInfo: { ...prev.paymentInfo, [res.name]: res.value }}))
  }

  const handleSubmit = () => {
    const isValidated = formValidator(errors, form.paymentInfo)
    if (!isValidated) return setSubmitError(true)
    return updateForm({ ...form.paymentInfo, page: 'summary'})
      .then((res) => {
        if (res.status === 203) setPage('summary')
        else setSubmitError(true)
      })
  }


  // Clear errors
  useEffect(() => {
    clearErrors(form.paymentInfo, (key) => {
      setErrors(prev => ({ ...prev, [key]: '' }))
    })
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