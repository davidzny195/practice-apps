import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { FormContext } from './App.jsx'
import { handleInputAndErrors, clearErrors, formValidator } from '../lib/helpers.js'
import validator from 'validator'
import InputField from './InputField.jsx'

const UserInfo = () => {
  const [errors, setErrors] = useState({zip: '', phone_number: ''})
  const [submitError, setSubmitError] = useState(false)
  const { form, setForm, setPage } = useContext(FormContext)

  const handleInput = (e) => {
    setSubmitError(false)
    const res = handleInputAndErrors(e)
    setErrors({ ...errors, [res.name]: res.error })
    setForm(prev => ({ ...prev, userInfo: { ...prev.userInfo, [res.name]: res.value }}))
  }

  const handleNext = () => {
    const isValidated = formValidator(errors, form.userInfo, 'address_line2')
    if (!isValidated) return setSubmitError(true)
    setPage('paymentInfo')
  }

  // Clear errors
  useEffect(() => {
    clearErrors(form.userInfo, (key) => {
      setErrors(prev => ({ ...prev, [key]: '' }))
    })
  }, [form.userInfo])

  return (
    <>
      <div>
        USER
        <div className="display-column">
          {Object.entries(Object.values(form)[1]).map((keyVal, idx) => {
            return <div key={idx}>
              <InputField name={keyVal[0]} value={keyVal[1]} errors={errors} handleInput={handleInput} />
              </div>
          })}
        </div>
        <button onClick={() => setPage('signup')}>Prev</button>
        {submitError && <span className="errorMessage">Form is not completed</span>}
        <div>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  )
}

export default UserInfo