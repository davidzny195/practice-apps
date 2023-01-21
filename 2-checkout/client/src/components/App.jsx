import React from 'react'
import { useState, createContext } from 'react'
import Checkout from './Checkout.jsx'
import Signup from './Signup.jsx'
import UserInfo from './UserInfo.jsx'
import PaymentInfo from './PaymentInfo.jsx'

export const FormContext = createContext()

const App = () => {
  const [page, setPage] = useState('checkout')
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
      credit: '5555555555554444',
      expiry: '',
      CVV: '',
      billing_zip: ''
    }
  })

  const handlePrev = () => {
    if (page === 'paymentInfo') setPage('userInfo')
  }

  const handleNext = () => {
    if (page === 'signup') setPage('userInfo')
    if (page === 'userInfo') setPage('paymentInfo')
    if (page === 'paymentInfo') setPage('checkout')
  }

  const formComponents = {
    checkout: <Checkout />,
    signup: <Signup />,
    userInfo: <UserInfo />,
    paymentInfo: <PaymentInfo />
  }

  return (
    <>
      <FormContext.Provider value={{ form, setForm, page, setPage }}>
        <div>
          {formComponents[page]}
        </div>
        <div>
          {page === 'paymentInfo' &&  <button onClick={handlePrev}>Prev</button>}
          {page !== 'checkout' &&  <button onClick={handleNext}>
            {page === 'paymentInfo' ? 'Purchase' : page === 'signup' ? 'Create Account' : 'Next'}
            </button>}
        </div>
      </FormContext.Provider>
    </>
  )
}

export default App
