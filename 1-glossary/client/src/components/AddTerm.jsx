import React from 'react';
import { useState } from 'react'
import { postTerm } from '../lib/api.js'

const AddTerm = ({ refetch }) => {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    return postTerm({ term, definition }).then(() => {
      refetch()
    }).catch((error) => {
      console.log('Error updating')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
          Term:
          <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
        </label>
        <label>
          Definition:
          <input type="text" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  )
}

export default AddTerm;