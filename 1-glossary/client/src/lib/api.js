const server = 'http://localhost:3000/api/glossary'

const getGlossary =  (params) => {
  return fetch(`${server}?` + new URLSearchParams({
    page: params
  })).then((res) => {
    return res.json()
  })
}

const postTerm = (params) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
  return fetch(server, options).then((res) => {
    return res
  })
}

const deleteTerm = (params) => {
  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
  return fetch(server, options).then((res) => {
    return res
  })
}

const updateTerm = (params) => {
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }
  return fetch(server, options).then((res) => {
    return res
  })
}

export { getGlossary, postTerm, deleteTerm, updateTerm}