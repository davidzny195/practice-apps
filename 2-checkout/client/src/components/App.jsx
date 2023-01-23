import React from 'react'
import { useState, createContext, useEffect } from 'react'
import Checkout from './Checkout.jsx'
import Signup from './Signup.jsx'
import UserInfo from './UserInfo.jsx'
import PaymentInfo from './PaymentInfo.jsx'
import Summary from './Summary.jsx'
import { init } from '../lib/api.js'

export const FormContext = createContext()

const App = () => {
  const [page, setPage] = useState('')
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

  console.log(page)
  useEffect(() => {
    return init().then((data) => {
      if (data) {
        const formData = {
          account: {
            username: data.username || '',
            email: data.email || '',
            password: data.password || '',
          },
          userInfo: {
            address_line1: data.address_line1 || '',
            address_line2: data.address_line2 || '',
            city: data.city || '',
            state: data.state || '',
            zip: data.zip || '',
            phone_number: data.phone_number || '',
          },
          paymentInfo: {
            credit: data.credit || '',
            expiry: data.expiry || '',
            CVV: data.CVV || '',
            billing_zip: data.billing_zip || ''
          }
        }
        setForm(formData)
        setPage(data.page || 'checkout')
      }
    })
  }, [])

  const formComponents = {
    checkout: <Checkout />,
    signup: <Signup />,
    userInfo: <UserInfo />,
    paymentInfo: <PaymentInfo />,
    summary: <Summary />
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
