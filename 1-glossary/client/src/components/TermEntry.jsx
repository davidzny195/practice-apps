import React from 'react';
import FormActions from './FormActions.jsx'
import { useState } from 'react';

const TermEntry = ({ entry, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className='termEntry'>
        <p>{entry.term}</p>
        <button onClick={() => setIsOpen(!isOpen)}>Actions</button>
        <FormActions entry={entry} refetch={refetch} handleClose={() => setIsOpen(!isOpen)}/>
      </div>
        <p>{entry.definition}</p>
        <hr></hr>
    </div>
  )
}

export default TermEntry;