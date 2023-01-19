import React from 'react';
import { useState } from 'react';
import { deleteTerm, updateTerm } from '../lib/api.js'

const FormActions = ({ entry, refetch, handleClose }) => {
  const [newTerm, setNewTerm] = useState('')
  const [newDefinition, setNewDefinition] = useState('')

  const handleDelete = () => {
    return deleteTerm({ id: entry._id}).then(() => {
      return refetch()
    }).catch((error) => {
      console.log('Error delete')
    })
  }

  const handleUpdate = () => {
    return updateTerm({ id: entry._id, term: newTerm, definition: newDefinition}).then(() => {
      return refetch()
    }).catch((error) => {
      console.log('Error update')
    })
  }

  return (
    <div>
      <label>
          Term:
          <input type="text" value={newTerm} onChange={(e) => setNewTerm(e.target.value)} />
        </label>
        <label>
          Definition:
          <input type="text" value={newDefinition} onChange={(e) => setNewDefinition(e.target.value)} />
        </label>
     <button onClick={handleDelete}>Delete</button>
     <button onClick={handleUpdate}>Update</button>
     <button onClick={handleClose}>X</button>
    </div>
  )
}

export default FormActions;