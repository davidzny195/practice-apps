import React from 'react';
import { useState } from 'react'

const Search = ({ handleSearch }) => {
  return (
    <div>
      <label>
        Search:
        <input type="text" onChange={handleSearch}/>
      </label>
    </div>
  )
}

export default Search;