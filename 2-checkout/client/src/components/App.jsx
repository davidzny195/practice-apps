import React from 'react'
import { useState } from 'react'
import Signup from './Signup.jsx'
import UserInfo from './UserInfo.jsx'
import PaymentInfo from './PaymentInfo.jsx'


const App = () => {

  const [page, setPage] = useState('signup')
  const [userInfo, setUserInfo] = useState({})

  const formComponents = {
    signup: <Signup next={() => setPage('userInfo')}/>,
    userInfo: <UserInfo />,
    payment: <PaymentInfo />
  }

  return (
    <>
      <div>
        <div>
          {formComponents[page]}
        </div>
      </div>
    </>
  )
}

export default App
