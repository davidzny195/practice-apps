import React from 'react'
import { useContext } from 'react'
import { FormContext } from './App.jsx'

const Checkout = () => {

  const { setPage } = useContext(FormContext)

  return (
    <>
      <div>
        THIS IS THE HOMEPAGE
        <button onClick={() => setPage('signup')}>CHECKOUT</button>
      </div>
    </>
  )
}

export default Checkout