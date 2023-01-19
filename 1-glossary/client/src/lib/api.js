const server = 'http://localhost:3000/api/glossary'

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
}

const getGlossary =  () => {
  return fetch(server).then((res) => {
    return res.json()
  })
}

const postTerm = (params) => {
  options.body = JSON.stringify(params)
  return fetch(server, options).then((res) => {
    return res
  })
}

const deleteTerm = (params) => {
  options.method = 'DELETE'
  options.body = JSON.stringify(params)
  return fetch(server, options).then((res) => {
    return res
  })
}

const updateTerm = (params) => {
  options.method = 'PUT'
  options.body = JSON.stringify(params)
  return fetch(server, options).then((res) => {
    return res
  })
}

export { getGlossary, postTerm, deleteTerm, updateTerm}