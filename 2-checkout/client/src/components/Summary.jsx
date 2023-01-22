import React from 'react'
import { useState, useContext } from 'react'
import { FormContext } from './App.jsx'

const Summary = () => {

  const { form } = useContext(FormContext)
  return (
    <>
      <div>
        {Object.entries(form).map(([field, value], idx) => {
          return <div key={idx}>
            <h3>{field}</h3>
            {Object.entries(value).map(([name, val], ind) => {
              return <div key={ind}>{name}: {val}</div>
            })}
          </div>
        })}

      </div>
    </>
  )

}

export default Summary