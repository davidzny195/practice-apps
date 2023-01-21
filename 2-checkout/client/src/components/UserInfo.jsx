import React from 'react'
import { useState, useContext } from 'react'
import { FormContext } from './App.jsx'
import validator from 'validator'
import InputField from './InputField.jsx'

const UserInfo = () => {
  const [errors, setErrors] = useState({zip: '', phone_number: ''})
  const { form, setForm } = useContext(FormContext)

  const handleInput = (e) => {
    const { name, value } = e.target
    let error = ''
    if (name === 'zip') error = value.length < 5 ? 'Bad zip' : ''
    if (name === 'phone_number') error =  validator.isMobilePhone(value) ? '' : 'bad number'

    setErrors({ ...errors, [name]: error })
    setForm(prevState => ({ ...prevState, userInfo: { ...prevState.userInfo, [name]: value }}))
  }

  return (
    <>
      <div>
        USER
        <form>
        <div className="display-column">
          {Object.entries(Object.values(form)[1]).map((keyVal, idx) => {
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

export default UserInfo