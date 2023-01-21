import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { FormContext } from './App.jsx'
import { handleInputAndErrors, clearErrors, formValidator } from '../lib/helpers.js'
import validator from 'validator'
import InputField from './InputField.jsx'

const Signup = () => {
  const [errors, setErrors] = useState({ name: '', email: '', password: ''})
  const [submitError, setSubmitError] = useState(false)
  const { form, setForm, setPage } = useContext(FormContext)

  const handleInput = (e) => {
    setSubmitError(false)
    const res = handleInputAndErrors(e)
    setErrors({ ...errors, [res.name]: res.error })
    setForm(prev => ({ ...prev, account: { ...prev.account, [res.name]: res.value }}))
  }

  const handleNext = () => {
    const isValidated = formValidator(errors, form.account)
    if (!isValidated) return setSubmitError(true)
    setPage('userInfo')
  }

  useEffect(() => {
    clearErrors(form.account, (key) => {
      setErrors(prev => ({ ...prev, [key]: '' }))
    })
  }, [form.account])

  return (
    <>
      <div>
        SIGNUP
        <form>
        <div className="display-column">
          {Object.entries(Object.values(form)[0]).map((keyVal, idx) => {
            return <div key={idx}>
              <InputField name={keyVal[0]} value={keyVal[1]} errors={errors} handleInput={handleInput} />
              </div>
          })}
        </div>
        </form>
      </div>
        {submitError && <span className="errorMessage">Form is not completed</span>}
      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  )
}

export default Signup
