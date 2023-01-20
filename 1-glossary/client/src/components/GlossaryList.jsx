import React from 'react';
import { useEffect, useState } from 'react';
import AddTerm from './AddTerm.jsx';
import TermEntry from './TermEntry.jsx';
import Search from './Search.jsx';
import FormActions from './FormActions.jsx';
import Flashcard from './Flashcard.jsx';
import Modal from './Modal.jsx';
import { getGlossary } from '../lib/api.js';

const GlossaryList = (props) => {
  const [glossary, setGlossary] = useState([])
  const [loading, setLoading] = useState([])
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isFlashcard, setIsFlashcard] = useState(false)
  const [page, setPage] = useState(1)
  const [currentId, setCurrentId] = useState('')
  const [total, setTotal] = useState(0)

  const populateList = (newPage) => {
    getGlossary(newPage).then((res) => {
      setGlossary(res.data)
      return setTotal(res.total)
    }).catch((error) => {
      console.log('Error setting glossary')
    })
  }

  const openModal = (id) => {
    setIsOpen(true)
    setCurrentId(id)
  }

  const handleUpdate = () => {
    setLoading(!loading)
    setIsOpen(false)
  }


  const prevPage = () => {
    if (page === 1) return
    let newPage = page -1
    setPage(newPage)
    populateList(newPage)
  }

  const nextPage = () => {
    let maxPage = Math.ceil(total / 5)
    if (page === maxPage) {
      return alert('No More pages')
    }
    let newPage = page + 1
    setPage(newPage)
    populateList(newPage)
  }

  useEffect(() => {
    populateList()
  }, [loading])

  return (
    <div>
      <button onClick={() => setIsFlashcard(true)}>Flashcards!!!</button>
      <Search handleSearch={(e) => setQuery(e.target.value)}/>
      <AddTerm refetch={() => setLoading(!loading)}/>

      <div style={{display: 'flex'}}>
        <button onClick={prevPage}>Previous page</button>
        <button onClick={nextPage}>Next page</button>
      </div>
      <div>
        {glossary.filter((item) => item.term.includes(query) || item.definition.includes(query)).map((entry, idx) => {
          return <TermEntry key={idx} entry={entry} openModal={openModal}/>
        })}
      </div>
      {isOpen &&
        <Modal close={() => setIsOpen(false)}>
          <FormActions entry={currentId} refetch={handleUpdate} />
        </Modal>
      }

      {isFlashcard &&
        <Modal close={() => setIsFlashcard(false)}>
            <Flashcard glossary={glossary} />
        </Modal>
      }
    </div>
  )

}

export default GlossaryList;