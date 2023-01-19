import React from 'react';
import FormActions from './FormActions.jsx'
import ReactModal from 'react-modal';
import { useState } from 'react';

const TermEntry = ({ entry, refetch }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className='termEntry'>
        <p>{entry.term}</p>
        <button onClick={() => setIsOpen(!isOpen)}>Actions</button>
        <ReactModal isOpen={isOpen} ariaHideApp={false}>
          <FormActions entry={entry} refetch={refetch} handleClose={() => setIsOpen(!isOpen)}/>
        </ReactModal>
      </div>
        <p>{entry.definition}</p>
        <hr></hr>
    </div>
  )
}

export default TermEntry;