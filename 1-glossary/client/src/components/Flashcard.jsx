import React from 'react'
import { useState } from 'react'

const Flashcard = ({ glossary }) => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * glossary.length))

  const generateNextWord = () => {
    const randomIndex = Math.floor(Math.random() * glossary.length)
    setCurrentIndex(randomIndex)
  }

  return (
    <>
      <div>
        <p>Term: {glossary[currentIndex].term}</p>
        <p>Definition: {glossary[currentIndex].definition}</p>
        <button onClick={generateNextWord}>Next Word</button>
      </div>
    </>
  )
}

export default Flashcard