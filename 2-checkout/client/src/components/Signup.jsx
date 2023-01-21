import React from 'react'
import { useState, useContext } from 'react'
import { FormContext } from './App.jsx'
import validator from 'validator'
import InputField from './InputField.jsx'

const Signup = () => {
  const [errors, setErrors] = useState({ name: '', email: '', password: ''})

  const { form, setForm } = useContext(FormContext)

  const handleInput = (e) => {

    const { name, value } = e.target
    let error = ''
    if (name ===  'username') {
      error = value.length < 5 ? 'Username too short' : ''
    } else if (name === 'email') {
      error = validator.isEmail(value) ? '' : 'Bad Email'
    } else if (name === 'password') {
      error = validator.isStrongPassword(value) ? '' : 'Bad Password'
    }
    setErrors({ ...errors, [name]: error })
    setForm(prevState => ({ ...prevState, account: { ...prevState.account, [name]: value }}))
  }

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
    </>
  )
}

export default Signup
