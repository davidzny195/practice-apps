import React from 'react';
import { useEffect, useState } from 'react'
import AddTerm from './AddTerm.jsx';
import TermEntry from './TermEntry.jsx';
import Search from './Search.jsx'
import { getGlossary } from '../lib/api.js'

const GlossaryList = (props) => {
  const [glossary, setGlossary] = useState([])
  const [loading, setLoading] = useState([])
  const [query, setQuery] = useState('')

  const populateList = () => {
    getGlossary().then((data) => {
      setGlossary(data)
    }).catch((error) => {
      console.log('Error setting glossary')
    })
  }


  useEffect(() => {
    populateList()
  }, [loading])

  return (
    <div>
      <Search handleSearch={(e) => setQuery(e.target.value)}/>
      <AddTerm refetch={() => setLoading(!loading)}/>
      <div>
        {glossary.filter((item) => item.term.includes(query) || item.definition.includes(query)).map((entry, idx) => {
          return <TermEntry key={idx} entry={entry} refetch={() => setLoading(!loading)}/>
        })}
      </div>
    </div>
  )
}

export default GlossaryList;