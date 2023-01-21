import React from 'react'
import { useState, createContext } from 'react'
import Checkout from './Checkout.jsx'
import Signup from './Signup.jsx'
import UserInfo from './UserInfo.jsx'
import PaymentInfo from './PaymentInfo.jsx'

export const FormContext = createContext()

const App = () => {
  const [page, setPage] = useState('paymentInfo')
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

  const formComponents = {
    checkout: <Checkout />,
    signup: <Signup />,
    userInfo: <UserInfo />,
    paymentInfo: <PaymentInfo />
  }

  return (
    <>
      <FormContext.Provider value={{ form, setForm, setPage }}>
        <div>
          {formComponents[page]}
        </div>
      </FormContext.Provider>
    </>
  )

}

export default App
