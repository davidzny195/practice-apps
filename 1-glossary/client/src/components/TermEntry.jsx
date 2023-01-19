import React from 'react';
import FormActions from './FormActions.jsx'

const TermEntry = ({ entry, refetch }) => {

  return (
    <div>
      <div className='termEntry'>
        <p>{entry.term}</p>
        <FormActions entry={entry} refetch={refetch}/>
      </div>
        <p>{entry.definition}</p>
        <hr></hr>
    </div>
  )
}

export default TermEntry;