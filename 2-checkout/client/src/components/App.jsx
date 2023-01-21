import React from 'react'
import { useState, createContext } from 'react'
import Signup from './Signup.jsx'
import UserInfo from './UserInfo.jsx'
import PaymentInfo from './PaymentInfo.jsx'

export const FormContext = createContext()

const App = () => {
  const [page, setPage] = useState('signup')
  const [form, setForm] = useState({
    account: {
      username: '',
      email: '',
      password: '',
    },
    userInfo: {
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      zip: '',
      phone_number: '',
    },
    paymentInfo: {
      credit: '',
      expiry: '',
      CVV: '',
      billing_zip: ''
    }
  })

  const handlePrev = () => {
    if (page === 'paymentInfo') return setPage('userInfo')
  }

  const handleNext = () => {
    if (page === 'signup') return setPage('userInfo')
    if (page === 'userInfo') return setPage('paymentInfo')
  }

  const formComponents = {
    signup: <Signup />,
    userInfo: <UserInfo />,
    payment: <PaymentInfo />
  }

  return (
    <>
      <FormContext.Provider value={{ form, setForm }}>
        {page}
        <div>
          {formComponents[page]}
        </div>
        <div>
          {page === 'paymentInfo' &&  <button onClick={handlePrev}>Prev</button>}
          {page !== 'paymentInfo' &&  <button onClick={handleNext}>Next</button>}
        </div>
      </FormContext.Provider>
    </>
  )
}

export default App
