import React from 'react'
import { useState, createContext, useEffect } from 'react'
import Checkout from './Checkout.jsx'
import Signup from './Signup.jsx'
import UserInfo from './UserInfo.jsx'
import PaymentInfo from './PaymentInfo.jsx'
import { init } from '../lib/api.js'

export const FormContext = createContext()

const App = () => {
  const [page, setPage] = useState('userInfo')
  const [form, setForm] = useState({
    account: {
      username: 'david',
      email: 'test@test.com',
      password: '12345Aa!a',
    },
    userInfo: {
      address_line1: '123',
      address_line2: '',
      city: '123',
      state: '123',
      zip: '12522',
      phone_number: '123123123',
    },
    paymentInfo: {
      credit: '5555555555554444',
      expiry: '2023-01-26',
      CVV: '333',
      billing_zip: '10011'
    }
  })


  useEffect(() => {
    init()
  }, [])

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
