import React from 'react';
import { useState } from 'react';

const TermEntry = ({ entry, openModal }) => {

  return (
    <div>
      <div className='termEntry'>
        <p>{entry.term}</p>
        <button onClick={() => openModal(entry._id)}>Actions</button>
      </div>
        <p>{entry.definition}</p>
        <hr></hr>
    </div>
  )
}

export default TermEntry;