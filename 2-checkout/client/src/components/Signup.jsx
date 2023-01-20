import React from 'react'
import { useState } from 'react'
import validator from 'validator'

const Signup = ({ next }) => {
  const [errors, setErrors] = useState({ name: '', email: '', password: ''})

  const handleSignup = (e) => {
    e.preventDefault()
    const hasErrors = !Object.values(errors).every((x => !x))
    // need to check input fields have values

    // need to push to user database
    // need to create session
    next()
  }

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
  }


  return (
    <>
      <div>
        Signup
        <form onSubmit={handleSignup}>
        <div className="signup">
          <label>
            Name:
            <input name="username" type="text" onChange={handleInput} />
          </label>
          <span className="errorMessage">{errors.username}</span>
          <label>
            Email:
            <input name="email" type="text" onChange={handleInput}/>
          </label>
          <span className="errorMessage">{errors.email}</span>
          <label>
            Password:
            <input name="password" type="text" maxLength="12" onChange={handleInput}/>
          </label>
          <span className="errorMessage">{errors.password}</span>
        </div>
        <button>Next</button>
        </form>
      </div>
    </>
  )
}

export default Signup
