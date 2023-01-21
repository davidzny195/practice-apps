import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { FormContext } from './App.jsx'
import validator from 'validator'
import InputField from './InputField.jsx'

const UserInfo = () => {
  const [errors, setErrors] = useState({zip: '', phone_number: ''})
  const [submitError, setSubmitError] = useState(false)
  const { form, setForm, setPage } = useContext(FormContext)

  const handleInput = (e) => {
    setSubmitError(false)
    const { name, value } = e.target

    let error = ''
    if (name === 'zip') error = value.length < 5 ? 'Bad zip' : ''
    if (name === 'phone_number') error =  validator.isMobilePhone(value) ? '' : 'bad number'

    setErrors({ ...errors, [name]: error })
    setForm(prev => ({ ...prev, userInfo: { ...prev.userInfo, [name]: value }}))
  }

  const handleNext = () => {
    if (Object.values(errors).some((field) => field !== '') || Object.entries(form.userInfo).some(([key, value]) => key !== 'address_line2' && !value)) {
      return setSubmitError(true)
    }
    setPage('paymentInfo')
  }

  // Clear errors
  useEffect(() => {
    for (let key in form.userInfo) {
      if (!form.userInfo[key]) {
        setErrors(prev => ({ ...prev, [key]: '' }))
      }
    }
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